"use clinet";

import { useResume } from "@/context/ResumeContext"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { useState } from "react"
import { Loader2Icon, PlusIcon, Trash2Icon } from "lucide-react"
import { ISkill } from "@/types/data"
import { skillsSchema } from "@/schema/skillsSchema"
import { Rating as ReactRating } from '@smastrom/react-rating'
import { useSession } from "next-auth/react"
import * as z from "zod"

interface Handlers {
  handleDelete: (index: number) => void;
  handleChange: (i: number, value: string | number) => void;
}

const skill: ISkill = {
  name: '',
  rating: 0
}

const Skills = () => {
  type IData = z.infer<typeof skillsSchema>

  const { resumeData, setResumeData, setStep, saveResume } = useResume()
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<IData>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: resumeData.skills
    }
  })

  const { fields, append, remove } = useFieldArray({
    name: "skills",
    control: form.control
  })

  const addSkill = () => {
    append(skill)
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, skill]
    }))
  }

  const handleDelete: Handlers["handleDelete"] = (index) => {
    remove(index)

    const newEntries = resumeData.skills.slice();
    newEntries.splice(index, 1);

    setResumeData(prev => ({
      ...prev,
      skills: newEntries
    }))
  }

  const handleChange: Handlers["handleChange"] = (i, value) => {
    const newEntries = resumeData.skills.slice();

    if (typeof value === 'string') newEntries[i].name = value
    if (typeof value === 'number') newEntries[i].rating = value

    setResumeData(prev => ({
      ...prev,
      skills: newEntries
    }))
  }


  const onSubmit = async () => {
    setIsLoading(true);
    if (session) await saveResume();
    await new Promise(r => setTimeout(r, 1000))
    setIsLoading(false);
    setStep(prev => prev + 1)
  }

  return (
    <div className="p-4 shadow-lg rounded-lg border-t-4 border-primary bg-white">
      <h2 className="font-bold text-2xl">Skills</h2>
      <p>Add your top professional skills</p>


      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-3">

          {fields.map((field, i) => (
            <fieldset key={i} className="border border-input rounded-md py-1 pb-2 px-3 space-y-3">

              <div className="grid sm:grid-cols-2 gap-3">

                <FormField
                  name={`skills.${i}.name`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field}
                          onChange={e => { handleChange(i, e.target.value); field.onChange(e) }} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-3 justify-between">
                  <FormField
                    name={`skills.${i}.rating`}
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

            <Button type="button" variant="outline" onClick={addSkill}>
              <PlusIcon /> Add skill
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

export default Skills
