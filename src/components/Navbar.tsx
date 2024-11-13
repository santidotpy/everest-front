'use client'
import { Button } from "@/components/ui/button"
import { Mountain, ShoppingCart, Menu, X, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useAuth } from "@/providers/auth-provider"
import { toast } from 'sonner'

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  const router = useRouter()

  const handleLogout = () => {
    logout();
    router.push('/login');
    toast.info('You logged out');
  };

  return (
    <>
      <div className='fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center bg-black/20 backdrop-blur-md'>
        <Link className="flex items-center gap-2 text-2xl font-bold ml-2" href="/">
          <Mountain className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500">Everest</span>
        </Link>
        <nav className={`md:flex absolute md:relative top-16 md:top-0 left-0 right-0 flex-col md:flex-row items-center gap-6 bg-white md:bg-transparent p-4 md:p-0 text-white`}>
          <Link className="text-md font-bold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" href="/">
            Home
          </Link>
          <Link className="text-md font-bold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" href="/products">
            Products
          </Link>
        </nav>
        <div className="flex items-center gap-1">
          {isAuthenticated ? (
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
              <Link href="/register">
                <Button size="lg" className='font-bold hover:bg-indigo-800'>
                  Register
                </Button>
              </Link>
            </>
          )}
          <Link href={isAuthenticated ? "/cart" : "/login"}>
            <Button size="icon" variant="ghost" className='mx-2 bg-gradient-to-r from-i</div>ndigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500 hover:from-indigo-600 hover:to-purple-700 dark:hover:from-indigo-500 dark:hover:to-purple-600 transition-colors'>
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}