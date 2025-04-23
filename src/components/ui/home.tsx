"use client";

import Image from "next/image";

interface FeatureProps {
  image: string;
  title: string;
  description: string;
}

export const Feature = ({ image, title, description }: FeatureProps) => {
  return (
    <div className="flex gap-4">
      <div className="flex">
        <span className="size-16 bg-white rounded-full">
          <Image src={image} alt="" height={64} width={64} className="size 16 object-cover rounded-full block" />
        </span>
        {/* Image */}
      </div>

      <div className="flex flex-col">
        <h5 className="text-primary text-lg font-semibold">{title}</h5>
        <p>{description}</p>
      </div>

    </div>
  )
}


