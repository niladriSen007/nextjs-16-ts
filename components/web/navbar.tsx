"use client"
import Link from 'next/link'
import { Button, buttonVariants } from '../ui/button'
import { useConvexAuth } from 'convex/react'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const Navbar = () => {

  const { isAuthenticated } = useConvexAuth()
  const navigateTo = useRouter()

  return (
    <nav className="bg-black text-white border-b border-gray-800">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          Next<span className="text-blue-500">Pro</span>
        </Link>

        {/* Navigation Links */}
        <ul className="flex items-center gap-8">
          <li>
            <Link href="/" className="hover:text-gray-300 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/blog" className="hover:text-gray-300 transition-colors">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/create" className="hover:text-gray-300 transition-colors">
              Create
            </Link>
          </li>
        </ul>

        {/* Auth Buttons & Theme Toggle */}
        {
          isAuthenticated ? (
            <Button onClick={() => authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  toast.success("Logged out successfully")
                  navigateTo.push("/sign-in")
                },
                onError: (error) => {
                  toast.error(`Logout failed: ${error.error.message}`)
                }
              }
            })} className="bg-amber-300 text-black">
              Logout
            </Button>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/sign-up"
                className={buttonVariants({
                  variant: "secondary",
                  className: "bg-white text-black hover:bg-gray-200",
                })}
              >
                Sign up
              </Link>
              <Link
                href="/sign-in"
                className={buttonVariants({
                  variant: "outline",
                  className: "border-gray-700 hover:bg-gray-900",
                })}
              >
                Login
              </Link>
            </div>
          )
        }
      </div>
    </nav>
  )
}
export default Navbar