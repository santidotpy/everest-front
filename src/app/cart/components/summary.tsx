"use client";

import axios from "axios";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

import useCart from "@/hooks/use-cart";
import Currency from "@/components/Currency";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

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
    }
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <div className="text-black">
            <Currency value={totalPrice} />
          </div>
        </div>
      </div>
      <Button
        onClick={onCheckout}
        disabled={items.length === 0}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
