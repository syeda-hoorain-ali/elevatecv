import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const contactPage = defineType({
    name: "contactPage",
    title: "Contact page",
    type: "document",
    icon: UserIcon,
    fields: [
        defineField({
            name: "heading",
            title: "Heading",
            type: "string",
            initialValue: "Get in Touch",
            validation: (rule) => rule.required().min(5).max(50),
        }),
        defineField({
            name: "paragraph",
            title: "Paragraph",
            type: "text",
            initialValue: "We'd love to hear from you! Reach out with your questions, feedback, or inquiries, and we'll get back to you promptly.",
            validation: (rule) => rule.required().min(20).max(255),
        }),
    ]
})
