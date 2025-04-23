import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CheckIcon } from "lucide-react"
import Link from "next/link"

const tiers = [
  {
    name: 'Free Plan',
    id: 'tier-free',
    href: '/',
    price: 'PKR 0',
    description: "Perfect for beginners to get started with basic features.",
    features: [
      "Access to basic templates only",
      "Create up to 5 resumes",
      "Edit and customize resumes",
      "Email support",
      "12-hour support response time",
      "No access to premium templates",
    ],
  },
  {
    name: 'Yearly Plan',
    id: 'tier-yearly',
    href: '/subscription?type=yearly',
    price: 'PKR 1399',
    pricing: 'Yearly',
    description: "The best value plan for long-term users with unlimited access.",
    features: [
      "Access to all basic and premium templates",
      "Unlimited resume creation",
      "Edit and customize resumes",
      "Priority email support",
      "24-hour support response time",
      "Exclusive premium templates and updates",
      "Download resumes in multiple formats (PDF, Word, etc.)",
      "Advanced customization options",
      "Early access to new features",
    ],
    featured: true,
  },
  {
    name: 'Monthly Plan',
    id: 'tier-monthly',
    href: '/subscription?type=monthly',
    price: 'PKR 139',
    pricing: 'Monthly',
    description: "Ideal for users who want premium access without long-term commitment.",
    features: [
      "Access to all basic and premium templates",
      "Create up to 10 resumes",
      "Edit and customize resumes",
      "Priority email support",
      "24-hour support response time",
      "Regular updates and new premium templates",
    ],
    featured: false,
  },
]

const page = () => {
  return (
    <div className="relative isolate px-6 pt-4 pb-24 sm:pt-10 sm:pb-32 lg:px-8">
      <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base/7 font-semibold text-indigo-600">Pricing</h2>
        <p className="mt-2 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
          Choose the right plan for you
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-gray-600 sm:text-xl/8">
        Choose an affordable plan that’s packed with the best features for engaging your audience, creating customer loyalty, and driving sales.
      </p>
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-6xl lg:grid-cols-3">
        {tiers.map(tier => (
          <div
            key={tier.id}
            className={cn(
              tier.featured ? 'relative bg-gray-900 shadow-2xl scale-110' : 'bg-white/60 sm:mx-8 lg:mx-0',
              'rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10 h-full',
            )}
          >
            <h3
              id={tier.id}
              className={cn(tier.featured ? 'text-indigo-400' : 'text-indigo-600', 'text-base/7 font-semibold')}
            >
              {tier.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span
                className={cn(
                  tier.featured ? 'text-white' : 'text-gray-900',
                  'text-5xl font-semibold tracking-tight',
                )}
              >
                {tier.price}
              </span>
              <span className={cn(tier.featured ? 'text-gray-400' : 'text-gray-500', 'text-base')}>/{tier.pricing}</span>
            </p>
            <p className={cn(tier.featured ? 'text-gray-300' : 'text-gray-600', 'mt-6 text-base/7')}>
              {tier.description}
            </p>
            <ul
              role="list"
              className={cn(
                tier.featured ? 'text-gray-300' : 'text-gray-600',
                'mt-8 space-y-3 text-sm/6 sm:mt-10',
              )}
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    aria-hidden="true"
                    className={cn(tier.featured ? 'text-indigo-400' : 'text-indigo-600', 'h-6 w-5 flex-none')}
                  />
                  {feature}
                </li>
              ))}
            </ul>

            <Link href={tier.href} aria-describedby={tier.id}>
              <Button
                variant={tier.featured ? 'default' : 'outline'}
                className="font-bold w-full mt-8 sm:mt-10">
                Get started today
              </Button>
            </Link>
            <a href="https://elevatecv.lemonsqueezy.com/buy/637db51c-6949-4a38-9bd0-6c4c566ce2da?embed=1&logo=0" className="lemonsqueezy-button">Buy Monthly Plan</a><script src="https://assets.lemonsqueezy.com/lemon.js" defer></script>
          </div>
        ))}
      </div>
    </div>
  )
}

export default page