import {useMutation} from "@tanstack/react-query";
import apiClient from "../apiClient.ts";

type userID={
    userId:string
}

export const useLoginMutation = () =>
    useMutation({
        mutationFn: async ({
                               userName,
                               userPassword,
                           }: {
            userName: string
            userPassword: string
        }) =>
            (
                await apiClient.post<userID>(`api/v1/users/login`, {
                    userName,
                    userPassword,
                })
            ).data,
    })



export const useRegisterMutation = () =>
    useMutation({
        mutationFn: async ({
                               userName,
                               userPassword,
                           }: {
            userName: string
            userPassword: string
        }) =>
            (
                await apiClient.post<userID>(`api/v1/users/register`, {
                    userName,
                    userPassword,
                })
            ).data,
    })


