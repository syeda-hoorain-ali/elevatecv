"use client";

import { Button } from '@/components/ui/button'
import { useResume } from '@/context/ResumeContext';
import { RWebShare } from "react-web-share";

const Congrates = () => {

  const { resumeData, resumeId } = useResume()

  const downloadResume = () => {
    window.print()
  }

  return (
    <div className='max-w-screen-md mx-auto my-8 flex flex-col gap-8 print:m-0 print:max-w-none'>

      <div className='print:hidden'>
        <h2 className='font-bold text-2xl text-center'>
          Congratulations! Your ultimate AI generated resume is ready
        </h2>

        <p className='text-gray-500 mt-1 text-center'>
          Now you are ready to download your resume and share with your family and friends.
        </p>
      </div>

      <div className='flex justify-between print:hidden'>
        <Button onClick={downloadResume}>Download</Button>
        <RWebShare
          data={{
            text: "Share your resume with your family and friends!",
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/resume/${resumeId}/view`,
            title: resumeData.name,
          }}
          onClick={() => console.log("shared successfully!")}
        >
          <Button>Share</Button>
        </RWebShare>
      </div>

    </div>
  )
}


export default Congrates
