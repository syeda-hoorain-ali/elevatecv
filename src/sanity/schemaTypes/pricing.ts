import { BadgeDollarSignIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const pricing = defineType({
    name: "pricing",
    title: "Pricing",
    type: "document",
    icon: BadgeDollarSignIcon,
    fields: [
        defineField({
            name: "name",
            title: "Name",
            type: "string",
            validation: (rule) => rule.required().min(5).max(50),
        }),

        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            validation: (rule) => rule.required(),
        }),

        defineField({
            name: "price",
            title: "Monthly Price",
            type: "number",
            validation: (rule) => rule.required().positive(),
        }),

        defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 2,
            validation: (rule) => rule.required().min(10).max(100),
        }),

        // defineField({
        //     name: "featured",
        //     title: "Featured",
        //     type: "",
        //     validation: (rule) => rule.required(),
        // }),

        defineField({
            name: "features",
            title: "Features",
            type: "array",
            of: [{ type: 'string' }],
            validation: (rule) => rule.required(),
        }),
    ]
})
