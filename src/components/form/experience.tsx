"use clinet";

import { useResume } from "@/context/ResumeContext"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { ChangeEvent, useState } from "react"
import { StarsIcon, Loader2Icon, PlusIcon, Trash2Icon } from "lucide-react"
import { experienceSchema } from "@/schema/experienceShema"
import { IExperience } from "@/types/data"
import { DatePicker } from "../ui/date-picker"
import TextEditor, { ContentEditableEvent } from "../text-editor"
import { askGemini } from "@/lib/geminiAI"
import { useSession } from "next-auth/react"
import * as z from "zod"


interface Handlers {
  handleDelete: (index: number) => void;
  handleChange: (i: number, name: string, e: ChangeEvent<HTMLInputElement> | ContentEditableEvent) => void;
  handleDateChange: (i: number, value: Date, name: "startDate" | "endDate") => void;
}

const experience: IExperience = {
  title: '',
  company: '',
  city: '',
  startDate: new Date(),
  endDate: new Date(),
  summary: '',
}

const Experience = () => {
  type IData = z.infer<typeof experienceSchema>

  const { resumeData, setResumeData, setStep, saveResume } = useResume()
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<IData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      experiences: resumeData.experiences
    }
  })

  const { fields, append, remove } = useFieldArray({
    name: "experiences",
    control: form.control
  })

  const generateFromAi = async (index: number) => {

    setIsLoading(true)
    const prompt = `Experience Title: ${resumeData.experiences[index].title}, Depends on experience title write summary for my resume (experience field) within 1-2 lines. only give summary`

    const response = await askGemini(prompt)
    form.setValue(`experiences.${index}.summary`, response)

    const newEntries = resumeData.experiences.slice();
    newEntries[index].summary = response

    setResumeData(prev => ({
      ...prev,
      experiences: newEntries
    }))
    setIsLoading(false)
  }

  const addExperience = () => {
    append(experience)
    setResumeData(prev => ({
      ...prev,
      experiences: [...prev.experiences, experience]
    }))
  }

  const handleDelete: Handlers["handleDelete"] = (index) => {
    remove(index)

    const newEntries = resumeData.experiences.slice();
    newEntries.splice(index, 1);

    setResumeData(prev => ({
      ...prev,
      experiences: newEntries
    }))
  }

  const handleChange: Handlers["handleChange"] = (i, name, e) => {
    const key = name as ("title" | "company" | "city" | "summary");
    const newEntries = resumeData.experiences.slice();
    newEntries[i][key] = e.target.value

    setResumeData(prev => ({
      ...prev,
      experiences: newEntries
    }))
  }

  const handleDateChange: Handlers["handleDateChange"] = (i, value, name) => {
    const newEntries = resumeData.experiences.slice();
    newEntries[i][name] = value

    setResumeData(prev => ({
      ...prev,
      experiences: newEntries
    }))
  }

  const onSubmit = async () => {
    setIsLoading(true);
    if (session) await saveResume()
    await new Promise(r => setTimeout(r, 1000));
    setIsLoading(false);
    setStep(prev => prev + 1)
  }

  return (
    <div className="p-4 shadow-lg rounded-lg border-t-4 border-primary bg-white">
      <h2 className="font-bold text-2xl">Professional Experience</h2>
      <p>Add your previous job experience</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-3">

          {fields.map((feild, i) => (
            <fieldset key={i} className="relative border border-input rounded-md py-2 px-3 space-y-3">

              <Button
                onClick={() => handleDelete(i)}
                variant="destructive"
                type="button"
                className="h-8 px-2 absolute top-2 right-3">
                <Trash2Icon size={50} />
              </Button>

              <FormField
                name={`experiences.${i}.title`}
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field}
                        onChange={e => { handleChange(i, "universityName", e); field.onChange(e) }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid sm:grid-cols-2 gap-3">
                <FormField
                  name={`experiences.${i}.company`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input {...field}
                          onChange={e => { handleChange(i, "company", e); field.onChange(e) }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name={`experiences.${i}.city`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field}
                          onChange={e => { handleChange(i, "city", e); field.onChange(e) }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name={`experiences.${i}.startDate`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Start date</FormLabel>
                      <FormControl>
                        <DatePicker {...field}
                          onChange={v => { handleDateChange(i, v!, "startDate"); field.onChange(v) }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name={`experiences.${i}.endDate`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>End date</FormLabel>
                      <FormControl>
                        <DatePicker {...field}
                          onChange={v => { handleDateChange(i, v!, "endDate"); field.onChange(v) }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                name={`experiences.${i}.summary`}
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-1 mt-2">
                    <div className="flex justify-between items-center">
                      <FormLabel>Summary</FormLabel>
                      <Button
                        type="button"
                        onClick={() => generateFromAi(i)}
                        variant="outline"
                        size="sm"
                        className="text-sm text-primary border-primary">
                        <StarsIcon />
                        Generate from AI
                      </Button>
                    </div>
                    <FormControl>
                      <TextEditor {...field}
                        onChange={e => { handleChange(i, "summary", e); field.onChange(e) }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </fieldset>
          ))}


          <div className="flex mt-4 justify-between">

            <Button type="button" variant="outline" onClick={addExperience}>
              <PlusIcon /> Add experience
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

export default Experience
