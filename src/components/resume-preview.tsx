"use client";

import { IResume } from '@/types/data';
import mustache from 'mustache';
import '../../public/font-awesome/css/font-awesome.min.css'
import '../../public/font-awesome/css/font-awesome.css'
import { getTemplate } from '@/lib/data';
import { Suspense, useEffect, useState } from 'react';
import { Loader2Icon } from 'lucide-react';

interface Props {
  data: IResume;
  templateId: string;
}

const ResumePreview = ({ data, templateId }: Props) => {

  const [template, setTemplate] = useState<string>('')

  useEffect(() => {
    const fetchTemplate = async () => {
      const response = await getTemplate(templateId)
      const template = response.template?.htmlCode || ''
      setTemplate(template)
    }
    fetchTemplate()
  }, [templateId])

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const image = typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)

  // a = true // good
  // data.educations.map(item => {
  //   console.log("a.", item.startDate.toLocaleDateString(undefined, {
  //     month: 'short',
  //     year: 'numeric',
  //   }))
  //   // console.log("b.", item.startDate.toLocaleDateString(undefined, {
  //   //   month: 'short',
  //   //   year: 'numeric',
  //   //   dateStyle: 'medium'
  //   // }))
  //   console.log("c.", item.startDate.toLocaleDateString(undefined, {
  //     dateStyle: 'medium'
  //   }))
  // })

  const a = {
    ...data,
    image: image,

    educations: data.educations.map(item => ({
      ...item,
      startDate: `${months[item.startDate.getMonth()]} ${item.startDate.getFullYear()}`,
      endDate: `${months[item.endDate.getMonth()]} ${item.endDate.getFullYear()}`
    })),

    experiences: data.experiences.map(item => ({
      ...item,
      startDate: `${months[item.startDate.getMonth()]} ${item.startDate.getFullYear()}`,
      endDate: `${months[item.endDate.getMonth()]} ${item.endDate.getFullYear()}`
    }))
  }

  const resume = mustache.render(template, a)

  return (
    <Suspense fallback={<p><Loader2Icon className='animate-spin' /> Loading</p>}>
      <div
        id='resume'
        dangerouslySetInnerHTML={{ __html: resume }}
        className='max-w-[1000px] w-full h-auto min-h-[1000px] mb-4 mx-4 md:mx-0 rounded-lg border-t-4 border-primary print:block print:m-0 print:border-0 print:rounded-none overflow-hidden'
      ></div>
    </Suspense>
  )
}

export default ResumePreview



// const template = `
// <div class='container'>
// <style>
//   @font-face {
//     font-family: 'Poppins';
//     src: url('/poppins/Poppins-Regular.ttf') format('TrueType');
//   }

//   .container * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//     font-family: 'Poppins', sans-serif;
//   }

//   .container {
//     position: relative;
//     width: 100%;
//     max-width: 1000px;
//     min-height: 1000px;
//     background: #fff;
//     display: grid;
//     grid-template-columns: 1fr 2fr;
//     box-shadow: 0 35px 55px rgba(0, 0, 0, 0.1);
//   }

//   .container .left-side {
//     position: relative;
//     background: #003147;
//     padding: 40px;
//   }

//   .left-side .title {
//     color: #fff;
//     text-transform: uppercase;
//     font-weight: 600;
//     letter-spacing: 1px;
//     margin-bottom: 20px;
//   }

//   .profile-text {
//     position: relative;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     padding-bottom: 20px;
//     border-bottom: 1px solid rgba(255, 255, 255, 0.2);
//   }

//   .profile-text .img-box {
//     position: relative;
//     width: 200px;
//     height: 200px;
//     border-radius: 50%;
//     overflow: hidden;
//   }

//   .profile-text .img-box img {
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }

//   .profile-text h2 {
//     color: #fff;
//     font-size: 1.5em;
//     margin-top: 20px;
//     text-transform: uppercase;
//     text-align: center;
//     line-height: 1.4em;
//     font-weight: 600;
//   }

//   .profile-text h2 span {
//     font-size: 0.8em;
//     font-weight: 300;
//   }

//   .contact-info {
//     padding-top: 40px;
//   }

//   .contact-info ul {
//     position: relative;
//   }

//   .contact-info ul li {
//     position: relative;
//     list-style: none;
//     margin: 10px 0;
//     cursor: pointer;
//   }

//   .contact-info ul li .icon {
//     display: inline-block;
//     width: 30px;
//     font-size: 18px;
//     color: #03a9f4;
//   }

//   .contact-info ul li .text {
//     color: #fff;
//     font-weight: 300;
//   }

//   .education {
//     padding-top: 40px;
//   }

//   .education ul {
//     position: relative;
//   }

//   .education li {
//     position: relative;
//     list-style: none;
//     margin: 10px 0 15px 0;
//   }

//   .education h5 {
//     color: #03a9f4;
//     font-weight: 500;
//   }

//   .education h4 {
//     color: #fff;
//     font-weight: 300;
//   }

//   .education h4:nth-child(2) {
//     font-weight: 600;
//   }

//   .language {
//     padding-top: 40px;
//   }

//   .language ul li {
//     position: relative;
//     list-style: none;
//     margin: 10px 0;
//   }

//   .language .text {
//     color: #fff;
//     font-weight: 300;
//   }

//   .language .percent {
//     position: relative;
//     width: 100%;
//     height: 6px;
//     background: #081921;
//     display: block;
//     margin-top: 5px;
//   }

//   .language .percent div {
//     position: absolute;
//     top: 0;
//     left: 0;
//     height: 100%;
//     background: #03a9f4;
//   }

//   .container .right-side {
//     position: relative;
//     background: #fff;
//     padding: 40px;
//   }

//   .right-side .title {
//     color: #003147;
//     text-transform: uppercase;
//     letter-spacing: 1px;
//     margin-bottom: 10px;
//     font-size: 24px;
//     font-weight: 700;
//   }

//   .about {
//     margin-bottom: 50px;
//   }

//   .about:last-child {
//     margin-bottom: 0;
//   }

//   p {
//     color: #333;
//     line-height: 1.4;
//   }

//   .experience {
//     margin-bottom: 50px;
//   }

//   .experience .box {
//     display: flex;
//     margin: 20px 0;
//   }

//   .experience .box .year-company {
//     min-width: 150px;
//   }

//   .experience .box .year-company h5 {
//     text-transform: uppercase;
//     color: #848c90;
//     font-weight: 600;
//   }

//   .experience .box .text h4 {
//     text-transform: uppercase;
//     color: #03a9f4;
//     font-size: 16px;
//   }

//   .skills {
//     margin-bottom: 50px;
//   }

//   .skills .box {
//     position: relative;
//     width: 100%;
//     margin: 20px 0;
//     display: grid;
//     grid-template-columns: 150px 1fr;
//     justify-content: center;
//     align-items: center;
//   }

//   .skills .box h4 {
//     text-transform: uppercase;
//     color: #848c99;
//     font-weight: 500;
//   }

//   .skills .box .percent {
//     position: relative;
//     width: 100%;
//     height: 10px;
//     background: #f0f0f0;
//   }

//   .skills .box .percent div {
//     position: absolute;
//     top: 0;
//     left: 0;
//     height: 100%;
//     background: #03a9f4;
//   }

//   .interest ul {
//     display: grid;
//     grid-template-columns: repeat(4, 1fr);
//   }

//   .interest ul li {
//     list-style: none;
//     color: #333;
//     font-weight: 500;
//     margin: 10px 0;
//   }

//   @container resume (min-width: 600px) and (max-width: 768px) {
//     .container {
//       font-size: 90%;
//     }
//     .container .left-side {
//       padding: 20px;
//     }
//   }
  
//   @container resume (max-width: 600px) {
//     .container {
//       grid-template-columns: repeat(1, 1fr);
//     }
//   }

//   @container resume (max-width: 768px) {
//     .experience .box {
//       flex-direction: column;
//       gap: 5px;
//     }

//     .skills .box {
//       grid-template-columns: repeat(1, 1fr);
//     }

//     .interest ul {
//       grid-template-columns: repeat(2, 1fr);
//     }
//   }
// </style>

//   <div class='left-side'>
//     <div class='profile-text'>
//       <div class='img-box'>
//         <img src={{image}} />
//       </div>
//       <h2>{{name}}<br /><span>{{jobtitle}}</span></h2>
//     </div>

//     <div class='contact-info'>
//       <h3 class='title'>Contact Info</h3>
//       <ul>
//         <li>
//           <span class='icon'><i class='fa fa-phone' aria-hidden='true'></i></span>
//           <span class='text'>{{phone}}</span>
//         </li>

//         <li>
//           <span class='icon'><i class='fa fa-envelope' aria-hidden='true'></i></span>
//           <a class='text'>{{email}}</a>
//         </li>


//         <li>
//           <span class='icon'><i class='fa fa-globe' aria-hidden='true'></i></span>
//           <a class='text'>{{personalWebsite}}</a>
//         </li>

//         <li>
//           <span class='icon'><i class='fa fa-linkedin-square' aria-hidden='true'></i></span>
//           <a class='text'>{{linkedin}}</a>
//         </li>

//         <li>
//           <span class='icon'><i class='fa fa-map-marker' aria-hidden='true'></i></span>
//           <span class='text'>{{city}}, {{country}}</span>
//         </li>
//       </ul>
//     </div>

//     <div class='education'>
//       <h3 class='title'>Education</h3>

//       <ul>
//         {{#educations}}
//         <li>
//           <h5>{{startDate}} - {{endDate}}</h5>
//           <h4>{{degree}} in {{major}}</h4>
//           <h4>{{universityName}}</h4>
//         </li>
//         {{/educations}}
//       </ul>
//     </div>

//     <div class='language'>
//       <h3 class='title'>Languages</h3>

//       <ul>
//         {{#languages}}
//           <li>
//             <span class='text'>{{language}}</span>
//             <span class='percent'>
//               <div style='width: calc({{rating}} * 20%);'></div>
//             </span>
//           </li>
//         {{/languages}}
//       </ul>
//     </div>

//   </div>


//   <div class='right-side'>
//     <div class='about'>
//       <h2 class='title'>Profile</h2>
//       <p>{{summary}}</p>
//     </div>

//     <div class='experience'>
//       <h2 class='title'>Experience</h2>

//       {{#experiences}}
//       <div class='box'>
//         <div class='year-company'>
//           <h5>{{startDate}} - {{endDate}}</h5>
//           <h5>{{company}}</h5>
//           <h5>{{city}}</h5>
//         </div>
//         <div class='text'>
//           <h4>{{title}}</h4>
//           <p>{{summary}}</p>
//         </div>
//       </div>
//       {{/experiences}}

//     </div>

//     <div class='skills'>
//       <h2 class='title'>Professional Skills</h2>

//       {{#skills}}
//         <div class='box'>
//           <h4>{{name}}</h4>
//           <div class='percent'>
//             <div style='width: calc({{rating}} * 20%);'></div>
//           </div>
//         </div>
//       {{/skills}}
//     </div>


//     <div class='interest'>
//       <h2 class='title'>Interest</h2>

//       <ul>
//         <li>Gaming</li>
//         <li>Singing</li>
//         <li>Reading</li>
//         <li>Cooking</li>
//       </ul>
//     </div>


//   </div>

// </div>
// `