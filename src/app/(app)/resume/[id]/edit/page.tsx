"use client";

import FormSection from "@/components/form-section";
import ResumePreview from "@/components/resume-preview";
import { useResume } from "@/context/ResumeContext";
import { getResume } from "@/lib/userActions";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

interface IProps {
  params: Promise<{ id: string }>
}

const Page = ({ params }: IProps) => {

  const { resumeData, setResumeData, step } = useResume();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {

    const fetchResumeData = async () => {
      const { id } = await params
      const response = await getResume(id)

      if (!response.resume) {
        setLoading(false);
        setError(true);
        return
      }
      setResumeData(response.resume);
    }

    fetchResumeData()
  }, [params])

  if (loading) return <p>Loading...</p>
  if (error) return notFound()

  return (<>
    <div className={`max-w-screen-2xl bg-red-700 h-full mx-auto my-8 px-4 grid gap-4 grid-cols-1 grid-rows-[auto] ${step !== 7 ? 'md:grid-cols-2 md:grid-rows-1' : 'items-center'}`}>
      {/* Resume Form */}
      <FormSection />

      {/* Resume preview */}
      <ResumePreview data={resumeData} templateId={resumeData.template} />
    </div>
  </>)
}

export default Page
