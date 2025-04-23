"use client";

import TemplateCard from '@/components/template-card'
import { getTemplates } from '@/lib/data'
import { ITemplate } from '@/types/data'
import { useEffect, useState } from 'react'

const Page = () => {
  const [templates, setTemplates] = useState<ITemplate[]>([])

  useEffect(() => {
    const fetchTemplates = async () => {
      const templates = await getTemplates();
      setTemplates(templates);
    }
    fetchTemplates()
  }, [])

  return (
    <div className="max-w-screen-lg mx-auto my-20">

      <h2 className="text-2xl font-semibold text-center mb-8">Choose template to create your resume</h2>

      <div className="flex flex-wrap gap-4">
        {/* <TemplateCard id='a' image="/images/templates/elegant.jpg" name="Elegant" isPaid />
        <TemplateCard id='b' image="/images/templates/simple-professional.jpg" name="Simple Professional" /> */}
        {templates.map(item => (
          <TemplateCard
            key={item.id}
            id={item.id}
            image={item.image}
            name={item.name}
            isPaid={item.isPaid}
          />
        ))}
      </div>
    </div>
  )
}

export default Page
