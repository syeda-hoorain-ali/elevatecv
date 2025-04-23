import { defineField, defineType } from "sanity";

export const pages = defineType({
    name: "pages",
    title: "Abc",
    type: "document",
    fields: [
        defineField({
            name: 'a',
            title: 'Unknown',
            type: 'string'
        })
    ]
})
