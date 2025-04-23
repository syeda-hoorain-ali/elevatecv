"use clinet";

import { useState } from "react"
import { useSession } from "next-auth/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { Loader2Icon, PlusIcon, Trash2Icon } from "lucide-react"
import { Rating as ReactRating } from "@smastrom/react-rating"
import languages from "iso-639-1"
import * as z from "zod"

import { ILanguage } from "@/types/data"
import { useResume } from "@/context/ResumeContext"
import { languageSchema } from "@/schema/languageSchema"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

interface Handlers {
  handleDelete: (index: number) => void;
  handleChange: (i: number, value: string | number) => void;
}

const language: ILanguage = {
  language: '',
  rating: 0,
}


const Languages = () => {
  type IData = z.infer<typeof languageSchema>

  const { resumeData, setResumeData, setStep, saveResume } = useResume()
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<IData>({
    resolver: zodResolver(languageSchema),
    defaultValues: {
      languages: resumeData.languages
    }
  })

  const { fields, append, remove } = useFieldArray({
    name: "languages",
    control: form.control
  })

  const addLanguage = () => {
    append(language)
    setResumeData(prev => ({
      ...prev,
      languages: [...prev.languages, language]
    }))
  }

  const handleDelete: Handlers["handleDelete"] = (index) => {
    remove(index)

    const newEntries = resumeData.languages.slice();
    newEntries.splice(index, 1);

    setResumeData(prev => ({
      ...prev,
      languages: newEntries
    }))
  }

  const handleChange: Handlers["handleChange"] = (i, value) => {
    const newEntries = resumeData.languages.slice();

    if (typeof value === 'string') newEntries[i].language = value
    if (typeof value === 'number') newEntries[i].rating = value

    setResumeData(prev => ({
      ...prev,
      languages: newEntries
    }))
  }


  const onSubmit = async () => {
    setIsLoading(true);
    if(session) await saveResume() 
      await new Promise(r => setTimeout(r, 1000));
    setIsLoading(false);
    setStep(prev => prev + 1)
  }

  return (
    <div className="p-4 shadow-lg rounded-lg border-t-4 border-primary bg-white">
      <h2 className="font-bold text-2xl">Language</h2>
      <p>Add your socials media platforms</p>


      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-3">

          {fields.map((feild, i) => (
            <fieldset key={i} className="border border-input rounded-md py-1 pb-2 px-3 space-y-3">

              <div className="grid sm:grid-cols-2 gap-3">

                <FormField
                  name={`languages.${i}.language`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Language</FormLabel>
                      <Select defaultValue={field.value}
                        onValueChange={v => { field.onChange(v); handleChange(i, v) }}>

                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {languages.getAllNames().map(item => (
                            <SelectItem key={item} value={item}>{item}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-3 justify-between">
                  <FormField
                    name={`languages.${i}.rating`}
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="space-y-1 w-ful">
                        <FormLabel>Rating</FormLabel>
                        <FormControl>
                          <ReactRating {...field} style={{ width: 150 }}
                            onChange={(r: number) => { handleChange(i, r); field.onChange(r) }} />

                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button onClick={() => handleDelete(i)} variant="destructive" type="button" className="h-8 px-2 self-center">
                    <Trash2Icon size={50} />
                  </Button>

                </div>
              </div>

            </fieldset>
          ))}


          <div className="flex mt-4 justify-between">

            <Button type="button" variant="outline" onClick={addLanguage}>
              <PlusIcon /> Add language
            </Button>

            <div className="flex gap-4">
              <Button onClick={() => setStep(prev => prev - 1)}>
                Previous
              </Button>

              <Button
                type="submit"

                disabled={isLoading}>
                {isLoading ?
                  <Loader2Icon className="animate-spin" /> :
                  'Next'
                }
              </Button>
            </div>
          </div>

        </form>
      </Form>

    </div>
  )
}

export default Languages
