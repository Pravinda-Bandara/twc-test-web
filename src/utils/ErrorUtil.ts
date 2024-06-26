export type ApiError = {
    message: string;
    response?: {
        data?: {
            message: string;
        };
    };
};

export const getError = (error: ApiError) => {
    return error.response?.data?.message || error.message;
};
