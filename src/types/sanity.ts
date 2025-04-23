import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface ISocials {
    email: string,
    linkedin: string,
    github: string,
    twitter: string,
    facebook?: string,
    instagram?: string,
    youtube?: string,
}

export interface IPage {
    heading: string,
    paragraph: string,
}

export interface IFeature {
    title: string;
    description: string;
    image: SanityImageSource;
}
