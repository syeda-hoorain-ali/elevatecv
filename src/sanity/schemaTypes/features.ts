import { BadgeCheckIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const features = defineType({
    name: "features",
    title: "Features",
    type: "document",
    icon: BadgeCheckIcon,
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (rule) => rule.required().min(5).max(50),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
            validation: (rule) => rule.required().min(20).max(255),
        }),
        defineField({
            name: "image",
            title: "Image",
            type: "image",
            validation: (rule) => rule.required()
        }),
    ]
})
