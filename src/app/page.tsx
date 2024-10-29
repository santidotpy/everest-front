"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
// import { Button } from "@/components/ui/button"

import Image from 'next/image'

export default function Component() {
  const [email, setEmail] = useState('')
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-700 text-white overflow-hidden">
      <main className="px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1
              className="text-6xl md:text-8xl font-extrabold mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Scale the peaks of
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
                digital commerce
              </span>
            </motion.h1>

            <motion.p
              className="text-xl mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Everest isn&apos;t just shopping—it&apos;s an expedition into a world of unparalleled products and experiences.
            </motion.p>
          </div>

          <div className="relative h-[500px]">
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-pink-500 to-indigo-500 rounded-full blur-3xl opacity-30"
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}

            // style={{
            // y: scrollY * 0.5,
            // }}
            >
              <Image
                src="/images/mountain.png"
                width={2500}
                height={2500}
                // fill
                alt="An image of a big mountain"
                className="w-full h-full object-contain"
              />


            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
