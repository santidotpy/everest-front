import Link from "next/link";
import Footer from "@/components/Footer";
import Underline from "@/components/Underline";

export default function Home() {
  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      {/* Efecto RBG */}
      <div className="main">
        <div className="gradient" />
      </div>
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-1 mt-1 background-gradient">
        <a
          href="/register"
          rel="noreferrer"
          className="border border-gray-700 rounded-lg py-2 px-4 text-gray-360 text-sm mb-5 transition duration-300 ease-in-out"
        >
          Join Everest today for{" "}
          <span className="text-blue-600 font-bold">FREE</span>
        </a>
        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-normal text-gray-300 sm:text-7xl">
          Conquer the{" "}
          <span className="relative whitespace-nowrap text-blue-600 mb-3">
            <Underline />
            <span className="relative">Everest</span>
          </span>{" "}
          <aside className="mt-3"> of online shopping </aside>
        </h1>
        <h2 className="mx-auto mt-12 max-w-xl text-lg sm:text-gray-360  text-gray-370 leading-7">
          Everest is a fictional e-commerce website. A place where you can
          browse products, add them to your cart, and checkout. Everest is built
          with Next.js, TypeScript, Material UI and TailwindCSS.
        </h2>
        <Link
          className="bg-blue-600 rounded-xl text-white font-medium px-4 py-3 sm:mt-10 mt-8 hover:bg-blue-500 transition"
          href="/products"
        >
          Browse Products
        </Link>
      </main>
      <Footer />
    </div>
  );
}
