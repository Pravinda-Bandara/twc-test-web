import {useMutation} from "@tanstack/react-query";
import apiClient from "../apiClient.ts";
import { userRequest, userResponse} from "../types/UserTypes.ts";



export const useLoginMutation = () =>
    useMutation({
        mutationFn: async ({
                               userName,
                               userPassword,
                           }: userRequest) =>
            (
                await apiClient.post<userResponse>(`api/v1/users/login`, {
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
                           }: userRequest) =>
            (
                await apiClient.post<userResponse>(`api/v1/users/register`, {
                    userName,
                    userPassword,
                })
            ).data,
    })


