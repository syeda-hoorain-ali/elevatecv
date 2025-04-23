"use client"

import Image from 'next/image';
import Link from 'next/link';
import { StarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';

interface TemplateCardProps {
  id: string;
  name: string;
  image: string
  isPaid?: boolean;
}

const TemplateCard = ({ id, name, image, isPaid }: TemplateCardProps) => {

  const { data: session } = useSession()
  let link = `/resume/edit?template=${id}`;

  if (isPaid) {
    if (!session) link = "/login";
    else if (!session.user.isMember) link = "/pricing";
  }


  return (
    <div className="card relative">
      <Link
        href={link}
        className="flex flex-col items-center gap-2 p-4 bg-primary/50 hover:scale-105 transition-all rounded-sm shadow-md">

        <span className={cn(isPaid ? 'flex' : 'hidden',
          "absolute top-2 right-2 size-6 bg-sky-300 rounded-full items-center justify-center"
        )}>
          <StarIcon size={12} fill="#000000" />
        </span>

        <Image src={image} alt="" height={400} width={200} className="shadow-lg min-h-68 rounded block" />
        <span className="font-semibold">{name}</span>
      </Link>
    </div>
  )
}

export default TemplateCard
