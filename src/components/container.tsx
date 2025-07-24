"use client";

import { useEffect, useState } from 'react';
import { getTemplates } from '@/lib/data';
import { ITemplate } from '@/types/data';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import TemplateCard from './template-card';

const Container = () => {

  const [loading, setLoading] = useState(true)
  const [templates, setTemplates] = useState<ITemplate[]>([])

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true)
      const templates = await getTemplates();
      setTemplates(templates.reverse());
      setLoading(false)
    }
    fetchTemplates()
  }, [])

  return (
    <div className="max-w-screen-xl mx-auto px-14 overflow-x-hidden">
      <Carousel
        className="max-w-5xl relative mx-20"
        opts={{ align: "start", loop: true }}
      >
        <CarouselContent className='py-4 mx-3 max-h-[24rem]'>
          {loading && Array.from({ length: 8 }).map((_, i) => (
            <CarouselItem className="basis-auto" key={i}>
              <div className='bg-slate-400 h-96 w-56 rounded-sm shadow-md animate-pulse'></div>
            </CarouselItem>
          ))}

          {templates.map(item => (
            <CarouselItem className="basis-auto" key={item.id}>
              <TemplateCard template={item} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default Container
