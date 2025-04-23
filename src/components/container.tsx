"use client";

import { useEffect, useState } from 'react';
import { getTemplates } from '@/lib/data';
import { ITemplate } from '@/types/data';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import TemplateCard from './template-card';

const Container = () => {

  const [templates, setTemplates] = useState<ITemplate[]>([])

  useEffect(() => {
    const fetchTemplates = async () => {
      const templates = await getTemplates();
      setTemplates(templates);
    }
    // fetchTemplates()
  }, [])

  return (
    <div className="max-w-screen-lg mx-auto flex flex-wrap gap-4 overflow-x-hidden">

      <Carousel
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >

        <CarouselContent className='py-4'>
          {templates.map(item => (
            <CarouselItem className="md:basis-1/2 lg:basis-1/4" key={item.id}>
              <TemplateCard id={item.id} image={item.image} name={item.name} isPaid={item.isPaid} />
            </CarouselItem>
          ))}

          {/* <CarouselItem className="md:basis-1/2 lg:basis-1/4"><Card /></CarouselItem> */}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />

      </Carousel>

    </div>
  )
}

export default Container
