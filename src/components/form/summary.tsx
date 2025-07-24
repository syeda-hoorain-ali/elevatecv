"use client";

import { useResume } from "@/context/ResumeContext";
import { summarySchema } from "@/schema/summarySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { Loader2Icon, StarsIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { askGemini } from "@/lib/geminiAI";
import { useSession } from "next-auth/react";
import * as z from "zod"

interface AiSummary {
  experienceLevel: string; summary: string
}

const Summary = () => {
  type IData = z.infer<typeof summarySchema>

  const { resumeData, setResumeData, setStep, saveResume } = useResume()
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [, setAiSummaryList] = useState<AiSummary[]>([])

  const form = useForm<IData>({
    resolver: zodResolver(summarySchema),
    defaultValues: {
      summary: resumeData.summary
    }
  })

  const generateFromAi = async () => {

    setIsLoading(true)
    const prompt = `Job Title: ${resumeData.jobtitle}, Depends on job title give me summary for my resume within 4-5 lines in JSON format with fields of experienceLevel ("Fresher", "Mid-Level", "Experienced") and summary`

    const response = await askGemini(prompt)
    const data = response.replace('```json', '').replace('```', '')
    setAiSummaryList(JSON.parse(data))
    setIsLoading(false)
  }


  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setResumeData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
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
      <h2 className="font-bold text-2xl">Summary</h2>
      <p>Add your summary for you job title</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-3">

          <FormField
            name="summary"
            control={form.control}
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div className="flex justify-between items-center">
                  <FormLabel>Summary</FormLabel>
                  <Button
                    type="button"
                    onClick={generateFromAi}
                    variant="outline"
                    size="sm"
                    className="text-sm text-primary border-primary">
                    <StarsIcon />
                    Generate from AI
                  </Button>
                </div>

                <FormControl>
                  <Textarea rows={8} {...field} onChange={e => { handleChange(e); field.onChange(e) }} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex mt-4 justify-end">
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

        </form>
      </Form>


    </div>
  )
}

export default Summary


