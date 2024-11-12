'use client'
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Mountain, ShoppingCart, Menu, X, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const [isSearchOpen, setIsSearchOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    toast.info('You have been logged out')
    router.push('/')
    window.location.reload();
  }

  return (
    <>
      {/* <div className="flex h-16 items-center justify-between"> */}
      <div className='fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center bg-black/20 backdrop-blur-md'>
        <Link className="flex items-center gap-2 text-2xl font-bold ml-2" href="/">
          <Mountain className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500">Everest</span>
        </Link>
        <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-16 md:top-0 left-0 right-0 flex-col md:flex-row items-center gap-6 bg-white md:bg-transparent p-4 md:p-0 text-white`}>
          <Link className="text-md font-bold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" href="/">
            Home
          </Link>
          <Link className="text-md font-bold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" href="/products">
            Products
          </Link>
          {/* Coming Soon */}
          {/* <Link className="text-md font-bold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" href="#">
            Categories
          </Link>
          <Link className="text-md font-bold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" href="/about">
            About
          </Link>
          <Link className="text-md font-bold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" href="#">
            Contact
          </Link> */}
        </nav>
        <div className="flex items-center gap-1">
          {/* # For later */}
          {/* <Button variant="ghost" size="sm" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button> */}
          {isLoggedIn ? (
            <>
              <Button variant="ghost" size="lg" className='font-bold text-white hover:bg-red-800' onClick={handleLogout}>
                <LogOut /> Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="lg" className='font-bold text-white hover:bg-indigo-800'>
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="lg" className='font-bold hover:bg-indigo-800'>
                  Sign Up
                </Button>
              </Link>
            </>
          )}
          <Button size="icon" variant="ghost" className='mx-2 bg-gradient-to-r from-i</div>ndigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500 hover:from-indigo-600 hover:to-purple-700 dark:hover:from-indigo-500 dark:hover:to-purple-600 transition-colors'>
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Button>
          <Button size="icon" variant="ghost" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>
      {/* {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="container mx-auto mt-20 p-4">
            <Input className="w-full text-lg" placeholder="Search for products..." />
          </div>
        </div>
      )} */}
    </>
  )
}