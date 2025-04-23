"use client";

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { complain } from '@/lib/data';
import { client } from '@/sanity/lib/client';
import { contactSchema } from '@/schema/contactSchema';
import { IPage } from '@/types/sanity';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as z from "zod";

const ContactUs = () => {

  type Contact = z.infer<typeof contactSchema>

  const [isSubmittingForm, setIsSubmittingForm] = useState<boolean>(false)
  const [data, setData] = useState<IPage>({ heading: '', paragraph: '' })

  useEffect(() => {
    const fetchData = async () => {
      const data =  await client.fetch<IPage>("*[_type == 'contactPage']{heading,paragraph}[0]");
      setData(data)      
    }
    fetchData()
  }, [])


  const form = useForm<Contact>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      message: '',
    }
  })

  const onSubmit = async (data: Contact) => {
    setIsSubmittingForm(true)
    const { message, success } = await complain(data)

    if (success) toast.success(message)
    else toast.error(message);

    setIsSubmittingForm(false);
  }

  return (
    <div className="flex justify-center items-center min-h-screen py-6">
      <div className="w-full max-w-lg p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">{data.heading}</h1>
          <p className="mb-4">{data.paragraph}</p>
        </div>

        <Form {...form}>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            <div className='flex gap-6'>

              <FormField
                name="firstName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label>First Name</Label>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="lastName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label>Last Name</Label>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label>Email</Label>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="subject"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label>Subject</Label>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="message"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label>Message</Label>
                  <FormControl>
                    <Textarea {...field} rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <Button type="submit" disabled={isSubmittingForm}>
              {isSubmittingForm ? <Loader2Icon className="animate-spin" /> : "Send Message"}
            </Button>
          </form>
        </Form>


      </div>
    </div>
  )
}

export default ContactUs;
