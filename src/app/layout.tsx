// import "./globals.css";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });
import "@/styles/globals.css";
import { Urbanist } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ModalProvider from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";
import { Toaster } from 'sonner';

// import AuthProvider from "@/providers/auth-provider";

const inter = Urbanist({ subsets: ["latin"] });

export const metadata = {
  title: "Everest - Shop The Peak",
  description: `Welcome to Everest, your ultimate destination for online shopping. 
  Discover a vast array of high-quality products carefully curated to meet your every need. 
  Enjoy an unparalleled shopping experience with secure transactions, fast shipping, and exceptional customer service. 
  Embark on your retail journey with Everest and ascend to new heights of convenience and delight. 
  Explore our collection today and experience the pinnacle of online shopping.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#17181C] text-white">
        <ToastProvider />
        <ModalProvider />
        <Navbar />
        <main >
          {/* <AuthProvider>{children}</AuthProvider> */}
          {children}
          <Toaster richColors theme="dark"/>
        </main>
        <div className="flex max-w-4xl mx-auto flex-col items-center justify-center py-2">
          <Footer />
        </div>
      </body>
    </html>
  );
}
