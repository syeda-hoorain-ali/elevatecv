import type { IResume, ITemplate } from "./data";

export interface ICountries {
    error: boolean,
    msg: string,
    data: {
        name: string,
        flag: string,
        iso2: string,
        iso3: string
    }[]
}

export interface ICities {
    error: boolean,
    msg: string,
    data: string[]
}

export interface IApiResponse {
    success: boolean;
    message: string;
    imageUrl?: string;
    userId?: string;
    complainId?: string;
    resumeId?: string;
    resume?: IResume;
    resumeList?: IResume[];
    template?: ITemplate;
    templates?: ITemplate[];
}
