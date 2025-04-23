'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool,  StructureBuilder } from '@sanity/structure'

import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'
import { Layout, Navbar, Logo } from './src/sanity/components'
import { cusTheme, myTheme } from './src/sanity/theme'


// Define the actions that should be available for singleton documents
const singletonActions = new Set(["publish", "discardChanges", "restore"])

// Define the singleton document types
const singletonTypes = new Set(["homePage", "contactPage"])


export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  icon: Logo,
  schema,
  theme: myTheme,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  // document: {
  //   // For singleton types, filter out actions that are not explicitly included
  //   // in the `singletonActions` list defined above
  //   actions: (input, context) =>
  //     singletonTypes.has(context.schemaType)
  //       ? input.filter(({ action }) => action && singletonActions.has(action))
  //       : input,
  // },
})
