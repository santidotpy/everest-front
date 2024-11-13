"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, User, Mail, Lock, Calendar } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"


export default function SignUpSection() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        age: '',
        email: '',
        password: '',
    })
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.first_name.trim()) newErrors.first_name = 'First name is required'
        if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required'
        if (!formData.age.trim()) newErrors.age = 'Age is required'
        else if (isNaN(Number(formData.age)) || Number(formData.age) < 18) newErrors.age = 'Age must be a number 18 or above'
        else if (Number(formData.age) > 120) newErrors.age = 'Age can not be more than 120'
        if (!formData.email.trim()) newErrors.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email'
        if (!formData.password) newErrors.password = 'Password is required'
        else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters long'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return
        setIsLoading(true)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/session/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, age: Number(formData.age) }),
            })

            const data = await response.json()

            if (response.ok) {
                // Successful signup
                setErrors({})
                toast.success('Welcome To Everest!', {
                    description: 'Your Journey to Top-Quality Products',
                })

                // Redirect to login page
                router.push('/login')
            } else {
                // Failed login
                setErrors(data.message || 'Invalid credentials')
                toast.error(data.message || 'Please check your credentials')
            }
        } catch (error) {
            // Handle network or other errors
            console.error(JSON.stringify({ ...formData, age: Number(formData.age) }))
            setErrors({ general: 'An error occurred. Please try again later.' })
            toast.error('An error occurred. Please try again later.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Create Your Account</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="first_name" className="text-gray-700 dark:text-gray-300">First Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                                <Input
                                    id="first_name"
                                    name="first_name"
                                    placeholder="John"
                                    className="pl-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.first_name && <p className="text-red-500 dark:text-red-400 text-sm">{errors.first_name}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="last_name" className="text-gray-700 dark:text-gray-300">Last Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                                <Input
                                    id="last_name"
                                    name="last_name"
                                    placeholder="Doe"
                                    className="pl-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.last_name && <p className="text-red-500 dark:text-red-400 text-sm">{errors.last_name}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="age" className="text-gray-700 dark:text-gray-300">Age</Label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                            <Input
                                id="age"
                                name="age"
                                type="number"
                                placeholder="25"
                                className="pl-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                value={formData.age}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.age && <p className="text-red-500 dark:text-red-400 text-sm">{errors.age}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="john.doe@example.com"
                                className="pl-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.email && <p className="text-red-500 dark:text-red-400  text-sm">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">Password</Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                            <Input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="pl-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 dark:text-red-400 text-sm">{errors.password}</p>}
                    </div>

                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Reaching the peak...
                            </>
                        ) : (
                            'Register'
                        )}
                    </Button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{' '}
                    <a href="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    )
}