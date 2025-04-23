"use clinet";

import { useResume } from "@/context/ResumeContext"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { ChangeEvent, useState } from "react"
import { Loader2Icon, PlusIcon, Trash2Icon } from "lucide-react"
import { interestsSchema } from "@/schema/interestsSchema"
import { IInterest } from "@/types/data"
import { useSession } from "next-auth/react"
import * as z from "zod"
import { addResume } from "@/lib/userActions";

interface Handlers {
  handleDelete: (index: number) => void;
  handleChange: (i: number, value: ChangeEvent<HTMLInputElement>) => void;
}

const interests: IInterest = { hobby: '' };

const Interests = () => {
  type IData = z.infer<typeof interestsSchema>

  const { resumeData, setResumeData, setStep, saveResume, setResumeId } = useResume()
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<IData>({
    resolver: zodResolver(interestsSchema),
    defaultValues: {
      interests: resumeData.interests
    }
  })

  const { fields, append, remove } = useFieldArray({
    name: "interests",
    control: form.control
  })

  const addLanguage = () => {
    append(interests)
    setResumeData(prev => ({
      ...prev,
      interests: [...prev.interests, interests]
    }))
  }

  const handleDelete: Handlers["handleDelete"] = (index) => {
    remove(index)

    const newEntries = resumeData.interests.slice();
    newEntries.splice(index, 1);

    setResumeData(prev => ({
      ...prev,
      interests: newEntries
    }))
  }

  const handleChange: Handlers["handleChange"] = (i, e) => {
    const newEntries = resumeData.interests.slice();

    newEntries[i].hobby = e.target.value

    setResumeData(prev => ({
      ...prev,
      interests: newEntries
    }))
  }


  const onSubmit = async () => {
    setIsLoading(true);
    if (session) {
      await saveResume()

    } else {
      const response = await addResume(resumeData);
      setResumeId(response.resumeId)
    }
    setIsLoading(false);
    setStep(prev => prev + 1)
  }

  return (
    <div className="p-4 shadow-lg rounded-lg border-t-4 border-primary bg-white">
      <h2 className="font-bold text-2xl">Interests</h2>
      <p>Add your favorite hobbies</p>


      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-3">

          {fields.map((feild, i) => (
            <fieldset key={i} className="border border-input rounded-md py-1 pb-2 px-3 space-y-3">

              <div className="flex gap-3 justify-between">
                <FormField
                  name={`interests.${i}.hobby`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="space-y-1 w-ful">
                      <FormLabel>Hobby</FormLabel>
                      <FormControl>
                        <Input {...field} onChange={e => { handleChange(i, e); field.onChange(e) }} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button onClick={() => handleDelete(i)} variant="destructive" type="button" className="h-8 px-2 self-center">
                  <Trash2Icon size={50} />
                </Button>

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

export default Interests
