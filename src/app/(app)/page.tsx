import Animate from "@/components/animate"
import Container from "@/components/container"
import { Button } from "@/components/ui/button"
import { Feature } from "@/components/ui/home"
import { cn } from "@/lib/utils"
import Spline from "@splinetool/react-spline/next"
import localFont from "next/font/local"
import Image from "next/image"
import Link from "next/link"

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


const Page = () => {
  return (<>
    <div className='relative max-w-screen-2xl mx-auto grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 min-h-screen pt-10 md:pt-0 md:-mt-20'>

      <div className={cn(geistMono.className, 'flex flex-col justify-center gap-4 px-8 md:pl-16')}>
        <Animate animate="left" fadeIn>
          <h1 className='text-3xl tracking-tighter md:text-6xl font-bold'>Build your resume using AI</h1>
        </Animate>

        <Animate animate="left" fadeIn delay={0.1}>
          <p className="text-gray-700 font-sans text-base font-medium">
            Getting that dream job can seem like an impossible task.
            We&apos;re here to change that. Give yourself a real advantage
            with the best online resume maker: created by experts,
            improved by data, trusted by millions of professionals.
          </p>
        </Animate>

        <Animate animate="left" fadeIn delay={0.2}>
          <Link href="/templates">
            <Button className="w-fit">Create your resume</Button>
          </Link>
        </Animate>
      </div>

      <div className="flex">
        {/* 3d robot model */}
        <Spline scene="/models/ai-robot.spline" />
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
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 drop-shadow-md">
        Stunning Resume Templates to Make You Stand Out
      </h2>
      {/* Convert this into scroller */}
      <Container />
    </div>

    {/* How It Works Section */}
    <div className="bg-primary/10 my20 px-4 py-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 drop-shadow-md">
        Land Your Dream Job in 3 Simple Steps!
      </h2>
      <div className="max-w-screen-xl mx-auto px-4 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <Animate animate="left" fadeIn>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h3 className="font-semibold text-lg mb-2">1. Choose a Template</h3>
            <p>Select from a variety of professional templates to get started.</p>
          </div>
        </Animate>
        <Animate animate="top" fadeIn delay={0.1}>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h3 className="font-semibold text-lg mb-2">2. Fill in Your Details</h3>
            <p>Enter your information and let our AI help you craft the perfect resume.</p>
          </div>
        </Animate>
        <Animate animate="right" fadeIn delay={0.2}>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h3 className="font-semibold text-lg mb-2">3. Download & Apply</h3>
            <p>Download your resume and start applying for your dream jobs!</p>
          </div>
        </Animate>
      </div>
    </div>

    {/* Testimonials Section */}
    <div className="max-w-screen-xl mx-auto py-16">
      <h2 className="text-3xl font-bold text-center mb-8 drop-shadow-md">
        See Why Job Seekers Love Us!
      </h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <Animate fadeIn>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="italic mb-2">“This resume builder made job applications so much easier. I landed interviews within a week!”</p>
            <span className="font-semibold">— Alex P.</span>
          </div>
        </Animate>
        <Animate fadeIn delay={0.1}>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="italic mb-2">
              “AI suggestions made my resume shine. It looks professional and got me noticed fast!”
            </p>
            <span className="font-semibold">— Jamie L.</span>
          </div>
        </Animate>
        <Animate fadeIn delay={0.2}>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="italic mb-2">
              “These templates are easy to use and looks great. I finished my resume in minutes. Love it!”
            </p>
            <span className="font-semibold">— Morgan S.</span>
          </div>
        </Animate>
      </div>
    </div>

    {/* Features */}
    <div className="max-w-screen-2xl mx-auto bg-primary/20 mb-20 py-16">
      <h2 className="text-3xl font-bold text-center mb-8 drop-shadow-md">
        Powerful Resume-Building Features
      </h2>

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
      </div>

    </div>

    {/* Call to Action Section */}
    <div className="bg-primary py-16 text-white text-center">
      <h2 className="text-3xl font-bold mb-4">Ready to build your standout resume?</h2>
      <p className="mb-8">Join thousands of successful job seekers. Start for free today!</p>
      <Link href="/login">
        <Button className="text-lg px-8 py-4" variant="secondary">
          Get Started
        </Button>
      </Link>
    </div>


    {/* FAQ Section */}
    <div className="max-w-screen-lg mx-auto my-20 px-4">
      <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div className="space-y-6">
        <Animate fadeIn>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold">Is this resume builder free?</h3>
            <p>Yes! You can create and download a basic resume for free. Premium features may require a subscription.</p>
          </div>
        </Animate>
        <Animate fadeIn delay={0.1}>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold">Can I customize my resume?</h3>
            <p>Absolutely! Choose templates, edit sections, and personalize your resume as you like.</p>
          </div>
        </Animate>
        <Animate fadeIn delay={0.2}>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold">Is my data secure?</h3>
            <p>We use strong encryption and never share your data with third parties.</p>
          </div>
        </Animate>
        <Animate fadeIn delay={0.3}>
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold">Do you offer support?</h3>
            <p>Yes, our team is here to help! Visit our <Link href="/contact" className="text-primary underline">contact page</Link> to get in touch.</p>
          </div>
        </Animate>
      </div>
    </div>
  </>)
}

export default Page

// Rocket: https://app.spline.design/community/file/b4038f67-d1ec-4ebb-b906-22f501a72f25
// 3D Dropdown: https://app.spline.design/community/file/11c58f0f-0a51-4e93-b84f-0349c4c40a90
