"use client";

import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {

  const router = useRouter()
  const params = useSearchParams()
  const type = params.get('type')

  if (type === 'monthly') {
    router.push("https://elevatecv.lemonsqueezy.com/buy/637db51c-6949-4a38-9bd0-6c4c566ce2da")

  } else if (type === 'yearly') {
    router.push("https://elevatecv.lemonsqueezy.com/buy/c02f103f-c5b8-4ac7-ad85-d4fc9e2f6a5f")

  } else {
    router.push('/')
  }

  return <p>Loading ...</p>
}

export default Page
