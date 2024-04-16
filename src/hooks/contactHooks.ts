import { useQuery } from "@tanstack/react-query";
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

interface ContactResponse {
    _id: mongoose.Types.ObjectId | undefined;
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
            // Use the contact ID retrieved from localStorage in the API call
            return (await apiClient.get<ContactResponse[]>(`api/v1/contacts/${contactId}`)).data;
        },
    });
