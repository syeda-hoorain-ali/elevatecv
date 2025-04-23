export interface IResume {
    _id?: string;
    title?: string;
    image: string | File;
    name: string;
    jobtitle: string;
    summary: string;
    email: string;
    phone: string;
    city: string;
    country: string;
    template: string;
    interests: IInterest[];
    languages: ILanguage[];
    skills: ISkill[];
    experiences: IExperience[];
    educations: IEducation[];
}

export interface IInterest {
    hobby: string;
}

export interface ILanguage {
    language: string;
    rating: number;
}

export interface ISkill {
    name: string;
    rating: number;
}

export interface IExperience {
    title: string;
    company: string;
    city: string;
    startDate: Date;
    endDate: Date;
    summary: string;
}

export interface IEducation {
    universityName: string;
    startDate: Date;
    endDate: Date;
    degree: string;
    major: string;
}

export interface ITemplate {
    id: string;
    image: string;
    name: string;
    htmlCode: string;
    isPaid: boolean;
}

export interface IComplain {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
}
