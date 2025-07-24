"use clinet";

import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-hot-toast"
import { ChangeEvent, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Image from "next/image"
import { Loader2Icon, UploadCloudIcon } from "lucide-react"
import { useResume } from "@/context/ResumeContext"
import { basicSchema } from "@/schema/basicSchema"
import { getCities, getCountries, uploadImage } from "@/lib/data"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useSession } from "next-auth/react"
import * as z from "zod"

interface ICountry {
  name: string;
  flag: string;
}

const PersonalDetails = () => {
  type IData = z.infer<typeof basicSchema>

  const { resumeData, setResumeData, setStep, saveResume } = useResume()
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [countries, setCountries] = useState<ICountry[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [image, setImage] = useState<string | null>(null)


  useEffect(() => {
    const fetchData = async () => {
      const countries = await getCountries();
      setCountries(countries)
    }

    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const cities = await getCities(resumeData.country);
      setCities(cities)
    }

    fetchData()
  }, [resumeData.country])


  const form = useForm<IData>({
    resolver: zodResolver(basicSchema),
    defaultValues: {
      image: '',
      name: resumeData.name,
      jobtitle: resumeData.jobtitle,
      country: resumeData.country,
      city: resumeData.city,
      phone: resumeData.phone,
      email: resumeData.email,
    }
  })


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setResumeData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    form.setValue("image", files[0])
    setImage(URL.createObjectURL(files[0]))
    setResumeData(prev => ({
      ...prev,
      image: files[0],
    }))
  }

  const onSubmit = async () => {
    setIsLoading(true);

    if (typeof resumeData.image !== 'string') {
      const imageName = `resume-builder/users/${resumeData.name.toLowerCase().replaceAll(' ', '-')}-${Math.round(Math.random() * 1000)}`;
      const response = await uploadImage(resumeData.image, imageName)

      if (!response.success || !response.imageUrl) {
        toast.error("Error saving image")
        setIsLoading(false);
        return
      }

      setResumeData(prev => ({ ...prev, image: response.imageUrl! }))
    }

    if(session) await saveResume() 

    await new Promise(r => setTimeout(r, 1000))
    setIsLoading(false);
    setStep(prev => prev + 1)
  }

  return (
    <div className="p-4 shadow-lg rounded-lg border-t-4 border-primary bg-white">
      <h2 className="font-bold text-2xl">Personal Details</h2>
      <p>Get started with the basic information</p>


      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} method="POST" className="mt-4 flex flex-col gap-3">


          <FormField
            name="image"
            control={form.control}
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Profile picture</FormLabel>

                <div className="flex gap-4">
                  <FormLabel className="size-40 flex items-center justify-center rounded-xl border-2 border-dashed border-gray-400 cursor-pointer"><UploadCloudIcon size={40} /></FormLabel>
                  {image ?
                    <Image
                      src={image}
                      className="size-40 rounded-xl border border-black"
                      alt={resumeData.name}
                      width={160}
                      height={160}
                    /> : ''
                  }
                </div>

                <FormControl>
                  <Input {...field} value={field.value as string}
                    type="file"
                    className="hidden"
                    onChange={e => { handleFileChange(e); field.onChange(e) }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} onChange={e => { handleChange(e); field.onChange(e) }} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="jobtitle"
            control={form.control}
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input {...field} onChange={e => { handleChange(e); field.onChange(e) }} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid sm:grid-cols-2 gap-3">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} onChange={e => { handleChange(e); field.onChange(e) }} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Phone no</FormLabel>
                  <FormControl>
                    <Input {...field} onChange={e => { handleChange(e); field.onChange(e) }} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="country"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Country</FormLabel>
                  <Select defaultValue={field.value}
                    onValueChange={e => {
                      field.onChange(e)
                      setResumeData(prev => ({ ...prev, country: e }))
                    }}>

                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map(item => (
                        <SelectItem key={item.name} value={item.name}>
                          <div className="flex gap-2">
                            <Image src={item.flag.trim()} alt="" height={10} width={25} />
                            <span>{item.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="city"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>City</FormLabel>
                  <Select defaultValue={field.value}
                    onValueChange={e => {
                      field.onChange(e)
                      setResumeData(prev => ({ ...prev, city: e }))
                    }}>

                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your city" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cities.map(city => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex mt-4 justify-end">
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

export default PersonalDetails
