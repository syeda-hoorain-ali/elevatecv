"use client";

import FormSection from "@/components/form-section";
import ResumePreview from "@/components/resume-preview";
import { useResume } from "@/context/ResumeContext";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Page = () => {

  const { resumeData, setResumeData, step } = useResume();
  const params = useSearchParams()
  const template = params.get('template') || ''

  useEffect(() => {
    setResumeData(prev => ({ ...prev, template }));
  }, [template, setResumeData])

  return (<>
    <div className={`max-w-screen-2xl bgred-700 h-full mx-auto my-8 px-4 grid gap-4 grid-cols-1 grid-rows-[auto] ${step !== 8 ? 'md:grid-cols-2 md:grid-rows-1' : 'items-center'}`}>
      {/* Resume Form */}
      <FormSection />

      {/* Resume preview */}
      <ResumePreview data={resumeData} templateId={template} />
    </div>
  </>)
}

export default Page
