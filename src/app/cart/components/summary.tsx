"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";


import useCart from "@/hooks/use-cart";
import Currency from "@/components/Currency";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const onCheckout = async () => {
    setIsLoading(true)
    try {
      for (const item of items) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/carts/product?id_prod=${item._id}&quantity=1`,
          null,

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }
      // purchase items
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/checkout`,
        null,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // empty cart items
      removeAll();
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Ups, something went wrong.");
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="lg:col-span-5">
      <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
        <h2 className="text-lg font-medium text-gray-900">
          Order summary
        </h2>
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <p className="text-base font-medium text-gray-900">Order total</p>
            <p className="text-black">
              <Currency value={totalPrice} />
            </p>
          </div>
        </div>
        <Button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white" onClick={onCheckout} disabled={items.length === 0}>
        {isLoading ? (
          <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
      </>
      ) : (
        <>
          Checkout <ArrowRight className="ml-2 h-4 w-4" />
        </>
      )}
        </Button>
      </div>
    </div>
  );
};

export default Summary;
