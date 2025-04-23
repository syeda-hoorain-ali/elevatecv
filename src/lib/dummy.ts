const dummy = {
    name: "Syeda Hoorain Ali",
    jobtitle: "Fullstack Web Developer",
    summary: "Hi! I'm Hoorain, a 13-year-old tech enthusiast and a senior student at the Governor Sindh IT Initiative (GIAIC). I have a deep passion for web development and a keen interest in emerging technologies. My journey in the tech world has been both exciting and challenging, and I've enjoyed every step of it.",
    email: "syedahoorainali8@gmail.com",
    phone: "+92 3123456789",
    city: "Karachi",
    country: "Pakistan",
    template: "6742da59dc1dfc716828d3fc",
    image: '/images/user.png',

    interests: [
        { hobby: "Gamming" },
        { hobby: "Singing" },
        { hobby: "Reading" },
        { hobby: "Cooking" }
    ],

    socials: [
        { name: "Linkedin", url: "https://www.linkedin.com/in/syedahoorainali/" },
        { name: "Github", url: "https://github.com/syeda-hoorain-ali/" },
        { name: "Portfolio", url: "https://syeda-hoorain-ali.vercel.app/" }
    ],

    skills: [
        { name: "Typescript", rating: 4 },
        { name: "Next.js", rating: 4 },
        { name: "MERN Stack", rating: 3 },
        { name: "Python", rating: 2 },
    ],

    languages: [
        { language: "English", rating: 4 },
        { language: "Urdu", rating: 5 },
    ],

    experiences: [
        {
            title: "CEO",
            company: "Apple Inc.",
            city: "US",
            startDate: new Date("Jan 2018"),
            endDate: new Date("Dec 2020"),
            summary: "Led the company to record-breaking revenue growth and global market expansion. Spearheaded the development and launch of innovative products and services."
        }
    ],

    educations: [
        {
            universityName: "Western Illinois University",
            startDate: new Date("Jan 2018"),
            endDate: new Date("Dec 2020"),
            degree: "Master",
            major: "Computer Science",
        }
    ]
}

export default dummy;
