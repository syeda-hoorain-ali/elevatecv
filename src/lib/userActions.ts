import { IApiResponse } from "@/types/apiResponse";
import { IResume } from "@/types/data";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";


export const signUp = async (data: { email: string, password: string }): Promise<IApiResponse> => {
    try {
        const response = await axios.post<IApiResponse>('/api/auth/sign-up', data);
        return response.data

    } catch (error) {
        console.error(error);
        const axiosError = error as AxiosError<IApiResponse>;
        const message = axiosError.response?.data.message || axiosError.message
        return { success: false, message }
    }
}

export const login = async (data: { email: string, password: string }): Promise<IApiResponse> => {
    try {
        const response = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password
        })

        if (response?.error) {
            if (response.error === 'CredentialsSignin') {
                return { success: false, message: "Incorrect email or password." }
            }
            return { success: false, message: response.error }
        }

        return { success: true, message: "Successfully sign in" }

    } catch (error) {
        console.error(error);
        const axiosError = error as AxiosError<IApiResponse>;
        const message = axiosError.response?.data.message || axiosError.message
        return { success: false, message }
    }
}

export const getAllResume = async (userId: string): Promise<IApiResponse> => {
    try {
        const response = await axios.get<IApiResponse>(`/api/resume/all?user-id=${userId}`);
        return response.data

    } catch (error) {
        console.error(error);
        const axiosError = error as AxiosError<IApiResponse>;
        const message = axiosError.response?.data.message || axiosError.message
        return { success: false, message }
    }
}

export const getResume = async (id: string): Promise<IApiResponse> => {
    try {
        const response = await axios.get<IApiResponse>(`/api/resume/${id}`);
        return response.data

    } catch (error) {
        const axiosError = error as AxiosError<IApiResponse>
        const message = axiosError.response?.data.message || axiosError.message
        return { success: false, message }
    }
}

export const addResume = async (data: IResume): Promise<IApiResponse> => {
    try {
        const response = await axios.post<IApiResponse>("/api/resume", data);
        return response.data

    } catch (error) {
        const axiosError = error as AxiosError<IApiResponse>
        const message = axiosError.response?.data.message || axiosError.message
        return { success: false, message }
    }
}

export const updateResume = async (id: string, data: IResume): Promise<IApiResponse> => {
    try {
        const response = await axios.patch<IApiResponse>(`/api/resume/${id}`, data);
        return response.data

    } catch (error) {
        const axiosError = error as AxiosError<IApiResponse>
        const message = axiosError.response?.data.message || axiosError.message
        return { success: false, message }
    }
}

export const deleteResume = async (id: string): Promise<IApiResponse> => {
    try {
        const response = await axios.delete<IApiResponse>(`/api/resume/${id}`);
        return response.data

    } catch (error) {
        const axiosError = error as AxiosError<IApiResponse>
        const message = axiosError.response?.data.message || axiosError.message
        return { success: false, message }
    }
}