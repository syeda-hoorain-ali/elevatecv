"use client";

import Link from 'next/link'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { FacebookIcon, GithubIcon, InstagramIcon, MailIcon, TwitterIcon, YoutubeIcon } from 'lucide-react'

const Footer = () => {

  const socials = [
    { link: "https://twitter.com/syedahorainali", icon: <TwitterIcon /> },
    { link: "https://facebook.com/syedahoorainali8", icon: <FacebookIcon /> },
    { link: "https://instagram.com/syeda_hoorain_ali", icon: <InstagramIcon /> },
    { link: "https://youtube.com/@agentia-world", icon: <YoutubeIcon /> },
    { link: "https://github.com/syeda-hoorain-ali", icon: <GithubIcon /> },
    { link: "mailto:info@jagjets133@gmail.com", icon: <MailIcon /> },
  ]

  const year = new Date().getFullYear()

  return (
    <footer className=" bg-slate-900 py-8">
      <div className="max-w-screen-2xl mx-auto grid md:grid-cols-[2fr_1fr] gap-8 md:gap-0 px-8 md:px-20 text-white mt-12 mb-20">

        <div className='flex gap-10 md:gap-20 flex-wrap justify-between md:justify-normal'>
          <div>
            <h4 className="font-semibold mb-4">Solutions</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-400">
              <li><Link className="transition hover:text-white" href='#'>Marketing</Link></li>
              <li><Link className="transition hover:text-white" href='#'>Analytics</Link></li>
              <li><Link className="transition hover:text-white" href='#'>Automation</Link></li>
              <li><Link className="transition hover:text-white" href='#'>Commerce</Link></li>
              <li><Link className="transition hover:text-white" href='#'>Insights</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-400">
              <li><Link className="transition hover:text-white" href='#'>Submit ticket</Link></li>
              <li><Link className="transition hover:text-white" href='#'>Documentation</Link></li>
              <li><Link className="transition hover:text-white" href='#'>Guides</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-400">
              <li><Link className="transition hover:text-white" href='/about'>About</Link></li>
              <li><Link className="transition hover:text-white" href='#'>Blog</Link></li>
              <li><Link className="transition hover:text-white" href='#'>Jobs</Link></li>
              <li><Link className="transition hover:text-white" href='#'>Press</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="flex flex-col gap-4 text-sm text-gray-400">
              <li><Link className="transition hover:text-white" href='#'>Terms of service</Link></li>
              <li><Link className="transition hover:text-white" href='#'>Privacy policy</Link></li>
              <li><Link className="transition hover:text-white" href='#'>License</Link></li>
            </ul>
          </div>
        </div>


        <div>
          <h4 className="font-semibold mb-2">Subscribe to our newsletter</h4>
          <p className="text-gray-400 text-sm leading-relaxed">The latest news, articles, and resources, sent to your inbox weekly.</p>

          <div className="mt-6 flex gap-4">
            <Input placeholder="Enter your email" className="bg-white/5 border-slate-500" />
            <Button>Subscribe</Button>
          </div>
        </div>

      </div>

      <div className="max-w-screen-xl mx-auto my-8 h-px bg-zinc-700"></div>


      <div className="max-w-screen-2xl mx-auto px-2 md:px-20 flex gap-4 justify-between items-center flex-col md:flex-row text-gray-400">
        <p className="text-sm text-center">&copy; {year} ElevateCV, Inc. All rights reserved.</p>

        <div className="flex gap-4">
          {socials.map((item, i) => (
            <Link
              key={i}
              target="_blank"
              href={item.link}
              rel="noopener noreferrer"
              className="transition hover:text-white"
            >
              {item.icon}
            </Link>
          ))}
        </div>
      </div>

    </footer>
  )
}

export default Footer
