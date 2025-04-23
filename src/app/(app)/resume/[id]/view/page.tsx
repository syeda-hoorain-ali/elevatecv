"use client"

import ResumePreview from '@/components/resume-preview'
import { getResume } from '@/lib/userActions'
import { IResume } from '@/types/data'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Props {
  params: Promise<{
    id: string
  }>
}

const page = ({ params }: Props) => {

  const [resume, setResume] = useState<IResume | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchResume = async () => {
      const { id } = await params
      const response = await getResume(id)
      console.log(response)
      setResume(response.resume)
      setIsLoading(false)
    }
    fetchResume()
  }, [params])

  if (isLoading) return <p>Loading...</p>
  if (!resume) return notFound;
  // const { resumeData } = useResume()

  return (
    <div className='max-w-screen-lg min-h-screen mx-auto my-8 flex flex-col gap-8'>
      <ResumePreview data={resume} templateId='t1' />
    </div>
  )
}

export default page
