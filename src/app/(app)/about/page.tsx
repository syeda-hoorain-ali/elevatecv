// pages/about.tsx

import Link from "next/link";
import React from "react";

const Page: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-purple-600 mb-6">About ElevateCV</h1>
        <p className="text-lg text-gray-700 mb-4">
          ElevateCV is an AI-powered resume builder designed to help individuals 
          craft professional resumes effortlessly. Our platform offers intuitive 
          tools, modern templates, and personalized suggestions to ensure your resume 
          stands out in any job application.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Whether you&apos;re a fresh graduate, a seasoned professional, or exploring new 
          career opportunities, ElevateCV provides the resources you need to present 
          your skills and experience effectively.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700 mb-4">
          At ElevateCV, our mission is to empower job seekers by simplifying the resume 
          creation process and offering innovative tools that cater to diverse career goals.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Why Choose ElevateCV?</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Easy-to-use interface for creating resumes in minutes.</li>
          <li>A variety of free and premium templates to suit any industry.</li>
          <li>AI-powered suggestions to optimize your content.</li>
          <li>Customizable designs to reflect your personal brand.</li>
          <li>Flexible subscription plans to meet your needs.</li>
        </ul>
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get Started Today</h2>
          <p className="text-lg text-gray-700">
            Join thousands of satisfied users who have taken their resumes to the next 
            level with ElevateCV. <Link href="/sign-up" className="underline underline-offset-4 hover:no-underline transition-all">Sign up</Link> now and take the first step toward your dream job!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
