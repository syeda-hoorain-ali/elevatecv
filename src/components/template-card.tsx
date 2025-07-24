"use client"

import Image from 'next/image';
import Link from 'next/link';
import { StarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';

interface TemplateCardProps {
  template: {
    id: string;
    name: string;
    image: string
    isPaid?: boolean;
  }
}

const TemplateCard = ({ template }: TemplateCardProps) => {

  const { data: session } = useSession()
  let link = `/resume/edit?template=${template.id}`;

  if (template.isPaid) {
    if (!session) link = "/login";
    else if (!session.user.isMember) link = "/pricing";
  }


  return (
    <div className="card relative h-full w-56">
      <Link
        href={link}
        className="h-full flex flex-col items-center gap-2 p-3 bg-primary/50 hover:scale-105 transition-all rounded-sm shadow-md">

        <span className={cn(template.isPaid ? 'flex' : 'hidden',
          "absolute top-1.5 right-1.5 size-6 bg-sky-300 rounded-full items-center justify-center"
        )}>
          <StarIcon size={12} fill="#000000" />
        </span>

        <Image src={template.image} alt={template.name} height={400} width={200} className="shadow-lg min-h-68 rounded block" />
        <span className="font-semibold">{template.name}</span>
      </Link>
    </div>
  )
}

export default TemplateCard
