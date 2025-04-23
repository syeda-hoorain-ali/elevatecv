"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { ClipboardPenIcon, LayoutDashboardIcon, LogOutIcon, MenuIcon, SettingsIcon, XIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { User } from "next-auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";

const Navbar = () => {

  const { data: session } = useSession()
  const user: User = session?.user;
  console.log(user)

  const links = [
    { text: 'Templates', href: '/templates' },
    { text: 'Pricing', href: '/pricing' },
    { text: 'About', href: '/about' },
    { text: 'Contact', href: '/contact' },
  ]

  return (
    <nav className='bg-white shadow-lg w-screen py-4 px-8 fixed top-0 z-50 print:hidden'>
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between">

        <Link href='/' className="drop-shadow-xl flex items-center">
          <Image src="/logo-purple.png" alt="" width={40} height={40} />
          <span className="text-primary font-bold text-xl italic drop-shadow-xl">
            ElevateCV
          </span>
        </Link>

        <div className="hidden md:flex gap-4 items-center">

          <ul className="flex -space-x-4">
            {links.map((item, i) => (
              <li key={i}>
                <Link href={item.href}><Button variant="link">{item.text}</Button></Link>
              </li>
            ))}
          </ul>

          {session ?
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={user.logo} />
                  <AvatarFallback>{user.username}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuLabel className="-mb-3">{user.username}</DropdownMenuLabel>
                <DropdownMenuLabel className="font-light text-gray-600">{user.email}</DropdownMenuLabel>

                <DropdownMenuSeparator />
                {session.user.isAdmin ??
                  <DropdownMenuItem>
                    <Link href="/admin/dashboard" className="flex gap-1 items-center">
                      <LayoutDashboardIcon className="size-4" /> Dashboard
                    </Link>
                  </DropdownMenuItem>
                }

                <DropdownMenuItem>
                  <Link href="/resume/all" className="flex gap-1 items-center">
                    <ClipboardPenIcon className="size-4" /> Your Resume
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => signOut()} className="flex gap-1 items-center">
                  <LogOutIcon className="size-4" />
                  Logout
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                {session.user.isAdmin ??
                  <DropdownMenuItem>
                    <Link href="/studio" className="flex gap-1 items-center">
                      <SettingsIcon className="size-4" /> Settings
                    </Link>
                  </DropdownMenuItem>
                }

              </DropdownMenuContent>
            </DropdownMenu> :
            <>
              <Link href="/sign-up"><Button>Sign up</Button></Link>
              <Link href="/login"><Button>Sign in</Button></Link>
            </>}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" className="md:hidden"><MenuIcon /></Button>
          </SheetTrigger>

          <SheetContent className="w-full max-w-60 flex flex-col justify-between pt-20">
            <SheetClose className="absolute right-6 top-4">
              <Button size="icon"><XIcon /></Button>
            </SheetClose>


            <ul>
              {links.map((item, i) => (
                <li key={i}>
                  <SheetClose asChild>
                    <Link href={item.href}><Button variant="link">{item.text}</Button></Link>
                  </SheetClose>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-4">
              <Link href="/sign-up"><Button>Sign up</Button></Link>
              <Link href="/login"><Button>Sign in</Button></Link>
            </div>
          </SheetContent>
        </Sheet>


      </div>
    </nav>
  )
}

export default Navbar
