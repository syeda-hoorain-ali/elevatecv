import { IApiResponse, ICities, ICountries } from "@/types/apiResponse";
import { IComplain, ITemplate } from "@/types/data";
import axios, { AxiosError } from "axios"


export const getCountries = async (): Promise<{ name: string; flag: string; }[]> => {
    try {
        const URL = "https://countriesnow.space/api/v0.1/countries/flag/images"
        const response = await axios.get<ICountries>(URL)
        const countries = response.data.data.map(item => ({ name: item.name, flag: item.flag }))
        return countries || [];

    } catch (error) {
        const axiosError = error as AxiosError<ICountries>
        console.log(axiosError);
        return []
    }
}

export const getCities = async (country: string): Promise<string[]> => {
    try {
        const URL = "https://countriesnow.space/api/v0.1/countries/cities"
        const response = await axios.post<ICities>(URL, { country })
        return response.data.data || [];

    } catch (error) {
        const axiosError = error as AxiosError<ICities>
        console.log(axiosError);
        return []
    }
}

export const getTemplates = async (): Promise<ITemplate[]> => {
    try {
        const response = await axios.get<IApiResponse>("/api/templates");
        return response.data.templates || []

    } catch (error) {
        const axiosError = error as AxiosError<IApiResponse>
        const message = axiosError.response?.data.message || axiosError.message
        console.log(message)
        return []
    }
}

export const getTemplate = async (id: string): Promise<IApiResponse> => {
    try {
        const response = await axios.get<IApiResponse>(`/api/template/${id}`);
        return response.data

    } catch (error) {
        const axiosError = error as AxiosError<IApiResponse>
        const message = axiosError.response?.data.message || axiosError.message
        return { success: false, message }
    }
}

export const uploadImage = async (image: File, publicId: string): Promise<IApiResponse> => {

    const formData = new FormData();
    formData.append("file", image);
    formData.append("publicId", publicId);

    try {
        const response = await axios.post<IApiResponse>("/api/upload", formData);
        return response.data

    } catch (error) {
        console.error(error)
        const axiosError = error as AxiosError<IApiResponse>
        const message = axiosError.response?.data.message || axiosError.message
        return { success: false, message }
    }
}

export const complain = async (data: IComplain): Promise<IApiResponse> => {
    try {
        const response = await axios.post<IApiResponse>('/api/complain', data)
        return { success: true, message: response.data.message }

    } catch (error) {
        const axiosError = error as AxiosError<IApiResponse>;
        const message = axiosError.response?.data.message || axiosError.message

        console.log(axiosError);
        return { success: false, message }
    }
}
