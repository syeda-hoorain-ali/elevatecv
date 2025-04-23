import { HomeIcon } from "lucide-react";
import { defineField, defineType, ValidationError } from "sanity";

// const d: ValidationError = {
//     message: "aaaa",
//     path: [{_key: ""}]
// };

export const homePage = defineType({
    name: "homePage",
    title: "Home page",
    type: "document",
    icon: HomeIcon,
    // validation: rule => rule.custom(doc => doc ? true : d),
    // validation: (a) => {
    //     return a.custom(b => {
    //         if(!b) return d
    //         return true
    //     })
    // },
    // __experimental_actions: ['update', 'publish'],
    // __experimental_omnisearch_visibility: true,
    groups: [
        { name: "content", title: "Content" },
        { name: "socialMedia", title: "Social Media" },
    ],
    components: {},

    fields: [
        defineField({
            name: "heading",
            title: "Heading",
            type: "string",
            group: "content",
            initialValue: "Build your resume using AI",
            validation: (rule) => rule.required().min(10).max(50),
        }),

        defineField({
            name: "paragraph",
            title: "Paragraph",
            type: "text",
            group: "content",
            initialValue: "Getting that dream job can seem like an impossible task. We're here to change that. Give yourself a real advantage with the best online resume maker: created by experts, improved by data, trusted by millions of professionals.",
            validation: (rule) => rule.required().min(50).max(255),
        }),


        defineField({
            name: "email",
            title: "Email address",
            type: "email",
            group: "socialMedia",
            initialValue: "jagjets133@gmail.com",
            validation: (rule) => rule.required(),
        }),

        defineField({
            name: "linkedin",
            title: "LinkedIn",
            type: "url",
            group: "socialMedia",
            initialValue: "https://www.linkedin.com/in/syedahoorainali/",
            validation: (rule) => rule.required()
        }),

        defineField({
            name: "github",
            title: "GitHub",
            type: "url",
            group: "socialMedia",
            initialValue: "https://github.com/syeda-hoorain-ali/",
            validation: (rule) => rule.required()
        }),

        defineField({
            name: "twitter",
            title: "Twitter",
            type: "url",
            group: "socialMedia",
            initialValue: "https://twitter.com/",
            validation: (rule) => rule.required()
        }),

        defineField({
            name: "facebook",
            title: "Facebook",
            type: "url",
            group: "socialMedia",
        }),

        defineField({
            name: "instagram",
            title: "Instagram",
            type: "url",
            group: "socialMedia",
        }),

        defineField({
            name: "youtube",
            title: "YouTube",
            type: "url",
            group: "socialMedia",
        }),
    ]
})
