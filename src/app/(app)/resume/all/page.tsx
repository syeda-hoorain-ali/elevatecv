"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useResume } from "@/context/ResumeContext"
import { getAllResume } from "@/lib/userActions"
import { resumeTitleSchema } from "@/schema/resumeTitleSchema"
import { IResume } from "@/types/data"
import { zodResolver } from "@hookform/resolvers/zod"
import { MoreVerticalIcon, CirclePlusIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { RWebShare } from "react-web-share"
import * as z from "zod"


const Page = () => {
  type IData = z.infer<typeof resumeTitleSchema>

  const { setResumeData } = useResume()
  const [resumeList, setResumeList] = useState<IResume[]>([])
  const { data: session } = useSession()
  const router = useRouter()

  // Move hooks above any return
  const form = useForm<IData>({
    resolver: zodResolver(resumeTitleSchema),
    defaultValues: { name: '' }
  })

  useEffect(() => {
    if (!session?.user?._id) return;
    const fetchResumes = async () => {
      const response = await getAllResume(session.user._id!)
      setResumeList(response.resumeList || [])
    }
    fetchResumes()
  }, [session?.user?._id])

  // If session is not loaded yet, render nothing (or a loader if you want)
  if (!session) return null

  const onSubmit = async (data: IData) => {
    setResumeData(prev => ({ ...prev, title: data.name }))
    router.push('/templates')
  }



  return (
    <div className="min-h-screen max-w-screen-xl mx-auto my-4 p-4 grid gap-4 grid-rows-min grid-cols-6 bg-white">

      <div className="bg-neutral-300 h-60 p-2 rounded-md">

        <Dialog>
          <DialogTrigger className="w-full h-full flex items-center justify-center"><CirclePlusIcon /></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} method="POST">

                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="py-4 grid grid-cols-4 items-center gap-4">
                      <FormLabel>Resume Name</FormLabel>
                      <FormControl>
                        <Input {...field} className="col-span-3" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {resumeList.map(item => (
        <div key={item._id} className="relative h-60 rounded flex flex-col p-2 overflow-hidden bg-pink-500">

          <div className="bg-gradient-to-br from-primary/70 to-blue-400/70 bg-white h-full rounded flex items-center justify-center">
            <Image src="/images/resume.png" alt="" height={100} width={100} />
          </div>


          <div className="w-full h-10 pt-2 flex justify-between items-center">
            <span className="text-white text-sm px-2">{item.name}</span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-6 p-0 rounded-full text-white hover:text-black">
                  <MoreVerticalIcon />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuItem>
                  <RWebShare
                    data={{
                      text: "Share your resume with your family and friends!",
                      url: `${process.env.NEXT_PUBLIC_BASE_URL}/resume/${item._id}/view`,
                      title: item.name,
                    }}>Share
                  </RWebShare>
                </DropdownMenuItem>
                <DropdownMenuItem><Link href={`/resume/${item._id}/edit`}>Edit</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href={`/resume/${item._id}/view`}>View</Link></DropdownMenuItem>
                <DropdownMenuItem><Link href={`/resume/${item._id}/delete`}>Delete</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

        </div>
      ))}

    </div>
  )
}

export default Page
