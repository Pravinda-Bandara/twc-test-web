import {useMutation, useQuery} from "@tanstack/react-query";
import apiClient from "../apiClient.ts";
import * as mongoose from "mongoose";

// Define a function to get the contact ID from localStorage
const getContactIdFromLocalStorage = () => {
    /*let contactId = localStorage.getItem('userInfo');
    if (contactId) {
        contactId = contactId.replace(/^"(.*)"$/, '$1');
    }*/
    const contactId =JSON.parse(localStorage.getItem('userInfo')!);
    return contactId ? contactId : '';


};

export enum Gender {
    MALE = "male",
    FEMALE = "female"
}
interface ContactRequest {
    number: string;
    name: string;
    email: string;
    gender: Gender;
    user: string;
}

export interface ContactResponse {
    _id: mongoose.Types.ObjectId | undefined |string ;
    number: string;
    name: string;
    email: string;
    gender: Gender;
}

export const useGetContactListQuery = () =>
    useQuery({
        queryKey: ['contacts'],
        queryFn: async () => {
            const contactId = getContactIdFromLocalStorage();
            if (!contactId) {
                throw new Error('Contact ID not found in localStorage');
            }
            return (await apiClient.get<ContactResponse[]>(`api/v1/contacts/${contactId}`)).data;
        },
    });

export const useDeleteContactMutation = () =>
    useMutation({
        mutationFn: async (userId: string) =>
            (await apiClient.delete<{ message: string }>(`api/v1/contacts/${userId}`)).data,
    })



export const useSignupMutation = () =>
    useMutation({
        mutationFn: async ({
                               user,
            number,name,email,gender
                           }: ContactRequest) =>
            (
                await apiClient.post<ContactResponse>(`api/v1/contacts/`, {
                    user,name,number,email,gender
                })
            ).data,
    })