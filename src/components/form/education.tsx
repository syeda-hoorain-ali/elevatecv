"use clinet";

import { useResume } from "@/context/ResumeContext"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { ChangeEvent, useState } from "react"
import { Loader2Icon, PlusIcon, Trash2Icon } from "lucide-react"
import { educationSchema } from "@/schema/educationSchema"
import { IEducation } from "@/types/data"
import { DatePicker } from "../ui/date-picker"
import { useSession } from "next-auth/react"
import * as z from "zod"

interface Handlers {
  handleDelete: (index: number) => void;
  handleChange: (i: number, name: string, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleDateChange: (i: number, value: Date, name: "startDate" | "endDate") => void;
}

const education: IEducation = {
  universityName: '',
  startDate: new Date(),
  endDate: new Date(),
  degree: '',
  major: '',
}

const Education = () => {
  type IData = z.infer<typeof educationSchema>

  const { resumeData, setResumeData, setStep, saveResume } = useResume()
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<IData>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      educations: resumeData.educations
    }
  })

  const { fields, append, remove } = useFieldArray({
    name: "educations",
    control: form.control
  })

  const addEducation = () => {
    append(education)
    setResumeData(prev => ({
      ...prev,
      educations: [...prev.educations, education]
    }))
  }

  const handleDelete: Handlers["handleDelete"] = (index) => {
    remove(index)

    const newEntries = resumeData.educations.slice();
    newEntries.splice(index, 1);

    setResumeData(prev => ({
      ...prev,
      educations: newEntries
    }))
  }

  const handleChange: Handlers["handleChange"] = (i, name, e) => {

    const key = name as ("universityName" | "degree" | "major");
    const newEntries = resumeData.educations.slice();
    newEntries[i][key] = e.target.value

    setResumeData(prev => ({
      ...prev,
      educations: newEntries
    }))
  }

  const handleDateChange: Handlers["handleDateChange"] = (i, value, name) => {
    const newEntries = resumeData.educations.slice();
    newEntries[i][name] = value

    setResumeData(prev => ({
      ...prev,
      educations: newEntries
    }))
  }

  const onSubmit = async () => {
    setIsLoading(true);
    if(session) await saveResume() 
    await new Promise(r => setTimeout(r, 1000))
    setIsLoading(false);
    setStep(prev => prev + 1)
  }

  return (
    <div className="p-4 shadow-lg rounded-lg border-t-4 border-primary bg-white">
      <h2 className="font-bold text-2xl">Education</h2>
      <p>Add your educational details</p>


      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-3">

          {fields.map((feild, i) => (
            <fieldset key={i} className="relative border border-input rounded-md py-2 px-3 space-y-3">

              <Button
                onClick={() => handleDelete(i)}
                variant="destructive"
                type="button"
                className="h-8 px-2 absolute top-2 right-3"
              >
                <Trash2Icon size={50} />
              </Button>

              <FormField
                name={`educations.${i}.universityName`}
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>University Name</FormLabel>
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
                  name={`educations.${i}.degree`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Degree</FormLabel>
                      <FormControl>
                        <Input {...field}
                          onChange={e => { handleChange(i, "degree", e); field.onChange(e) }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name={`educations.${i}.major`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Major</FormLabel>
                      <FormControl>
                        <Input {...field}
                          onChange={e => { handleChange(i, "major", e); field.onChange(e) }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name={`educations.${i}.startDate`}
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
                  name={`educations.${i}.endDate`}
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

            </fieldset>
          ))}


          <div className="flex mt-4 justify-between">

            <Button type="button" variant="outline" onClick={addEducation}>
              <PlusIcon /> Add education
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

export default Education
