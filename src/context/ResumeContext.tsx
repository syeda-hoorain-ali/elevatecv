"use client";

import dummy from "@/lib/dummy";
import { addResume, updateResume } from "@/lib/userActions";
import type { IResume } from "@/types/data";
import { createContext, PropsWithChildren, useContext, useState } from "react";

interface IResumeContext {
    resumeId: string | undefined;
    setResumeId: (data: string | undefined | ((prev: string | undefined) => string | undefined)) => void;

    resumeData: IResume;
    setResumeData: (data: IResume | ((prev: IResume) => IResume)) => void;

    step: number;
    setStep: (data: number | ((prev: number) => number)) => void;

    saveResume: () => Promise<void>;
}

export const ResumeContext = createContext<IResumeContext | null>(null);
export const useResume = () => useContext(ResumeContext)!

export const ResumeProvider = ({ children }: PropsWithChildren) => {

    const [resumeId, setResumeId] = useState<string | undefined>();
    const [resumeData, setResumeData] = useState<IResume>(dummy);
    const [step, setStep] = useState<number>(1);

    const saveResume = async () => {
        if (resumeId) {
            updateResume(resumeId, resumeData);
            return;
        }
        addResume(resumeData)
    }


    return <ResumeContext.Provider value={{
        resumeId, setResumeId,
        resumeData, setResumeData,
        step, setStep,
        saveResume
    }}>
        {children}
    </ResumeContext.Provider>
}
