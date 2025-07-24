"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { login } from "@/lib/userActions"
import { signInSchema } from "@/schema/signInSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import * as z from "zod"

const Page = () => {
  type SignIn = z.infer<typeof signInSchema>

  const router = useRouter();

  const form = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  const onSubmit = async (data: SignIn) => {
    const response = await login(data);
    if (response.success) {
      toast.success(response.message)
      router.replace('/')
    } else {
      toast.error(response.message)
    }
  }

  return (<>
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4">
            Login
          </h1>
          <p className="mb-4">Login to start shopping</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} method="POST" className="space-y-6">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Sign in</Button>
          </form>
        </Form>

        <div className="relative flex flex-col gap-4 pt-4 border-t border-gray-400">
          <Button
            className="w-full h-12 text-black"
            variant="outline"
            onClick={() => signIn("google")}>
            <Image src="/images/logo/google.png" alt="Google" height={20} width={20} />
            Login with google
          </Button>

          <Button
            className="w-full h-12 text-black"
            variant="outline"
            onClick={() => signIn("github")}>
            <Image src="/images/logo/github.png" alt="Github" height={20} width={20} />
            Login with github
          </Button>

          <span className="absolute bg-white text-gray-500 px-2 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">or</span>
        </div>

        <div className="text-center mt-4">
          <p>
            New member?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              register now
            </Link>
          </p>
        </div>

      </div>
    </div>

  </>)
}

export default Page
