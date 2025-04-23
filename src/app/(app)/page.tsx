"use client"

import Animate from "@/components/animate"
import Container from "@/components/container"
import { Button } from "@/components/ui/button"
import { Feature } from "@/components/ui/home"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { IFeature, IPage } from "@/types/sanity"
import Spline from "@splinetool/react-spline/next"
import Image from "next/image"
import { useEffect, useState } from "react"

const Page = () => {

  const a = "Getting that dream job can seem like an impossible task. We're here to change that. Give yourself a real advantage with the best online resume maker: created by experts, improved by data, trusted by millions of professionals.";
  const [features, setFeatures] = useState<IFeature[]>([])
  const [data, setData] = useState<IPage>({ heading: 'Build you resume using AI', paragraph: a, })

  useEffect(() => {
    const fetchData = async () => {
      const data = await client.fetch<IPage>("*[_type == 'homePage']{heading,paragraph}[0]");
      const features = await client.fetch<IFeature[]>("*[_type == 'features']{title,description,image}");

      setData(data)
      console.log()
      setFeatures(features)
    }
    fetchData()
  }, [])

  return (<>
    <div className='relative max-w-screen-2xl mx-auto grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 min-h-screen pt-10 md:pt-0 md:-mt-20'>

      <div className='flex flex-col justify-center gap-4 px-8 md:pl-16'>
        <Animate animate="left" fadeIn>
          <h1 className='text-3xl md:text-6xl font-bold'>{data.heading}</h1>
        </Animate>

        <Animate animate="left" fadeIn delay={0.1}>
          <p>{data.paragraph}</p>
        </Animate>

        <Animate animate="left" fadeIn delay={0.2}>
          <Button className="w-fit">Create your resume</Button>
        </Animate>
      </div>

      <div className="flex">
        {/* <Spline scene="/models/ai-robot.spline" />  
        */}
         {/*//*  3d model */}
      </div>
    </div>

    <div className="relative min-h-72 bg-primary wave-container py-8">
      <Animate animate="top" fadeIn>
        <h2 className="text-white text-xl font-semibold text-center">Our customers have been hired at:</h2>
      </Animate>

      <div className="flex items-center justify-center gap-12 mt-16 opacity-80 flex-wrap">
        {/* Use famous company logos here */}
        <Animate fadeIn><Image src="/images/logo/amazon.png" alt="Amazon" height={80} width={150} /></Animate>
        <Animate fadeIn><Image src="/images/logo/apple.png" alt="Apple" height={80} width={80} /></Animate>
        <Animate fadeIn><Image src="/images/logo/panaversity.png" alt="Panaversity" height={80} width={80} /></Animate>
        <Animate fadeIn><Image src="/images/logo/google-white.png" alt="Google" height={80} width={80} /></Animate>
        <Animate fadeIn><Image src="/images/logo/nvidia.png" alt="Nvidia" height={80} width={80} /></Animate>
        <Animate fadeIn><Image src="/images/logo/open-ai.png" alt="Open AI" height={80} width={150} /></Animate>
      </div>

    </div>

    <div className="max-w-screen-2xl mx-auto my-20">
      <h2 className="text-2xl font-bold text-center mb-4">Templates</h2>
      {/* Convert this into scroller */}
      <Container />
    </div>

    <div className="max-w-screen-2xl mx-auto bg-primary/20 mb-20 py-16">
      <h2 className="text-3xl font-semibold text-center mb-8">Features to help you win your dream job</h2>

      <div className="max-w-screen-xl mx-auto px-4 md:px-16 grid gap-8 
        grid-cols-1 grid- rows-6 
        sm:grid-cols-2 sm:grid-rows-3
        md:grid-cols-3 md:grid-rows-2">

        <Feature image="/images/online-resume-builder.jpg" title="Easy online resume builder" description="Create an awesome resume in minutes, without leaving your web browser." />
        <Feature image="/images/secure-data.png" title="Your data is safe" description="Your data is kept pirate and portected by strong 256-bit encryption." />
        <Feature image="/images/ai-text-generator.jpg" title="Automatic summary generator" description="Cteate a powerful resume profile or cover letter in on click. Writer's block is on longer an obstacle. Try for free!" />
        <Feature image="/images/approved-templates.png" title="Approved templates" description="Professionaiiy-designed resume templates and examples. Just edit and download in 5 minutes." />
        <Feature image="/images/ai-per-written-phrases.jpeg" title="AI per-written phrases" description="Use the power of AI andadta analysis, choose pre-generted effective phrases and keywords." />
        <Feature image="/images/optimized-seo.png" title="Optimized resumes" description="Formats and designs are optimized for resume-filtering alogrithms. Ensure humans see your application!" />

        {features.map((item, i) => (
          <Feature
            key={i}
            image={urlFor(item.image).url()}
            title={item.title}
            description={item.description}
          />
        ))}

      </div>

    </div>


  </>)
}

export default Page

// Rocket: https://app.spline.design/community/file/b4038f67-d1ec-4ebb-b906-22f501a72f25
// 3D Dropdown: https://app.spline.design/community/file/11c58f0f-0a51-4e93-b84f-0349c4c40a90













