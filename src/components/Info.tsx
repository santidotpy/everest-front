"use client";

import Currency from "@/components/Currency";
import { Product } from "@/types";
import useCart from "@/hooks/use-cart";

import { ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useAuth } from "@/providers/auth-provider";
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

interface InfoProps {
  data: Product;
}


const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onAddToCart = () => {

    setIsLoading(true)
    try {
      if (!isAuthenticated) {
        router.push('/login');
        toast.info('Please login to add to cart');
        return;
      }
      cart.addItem(data);
    } catch (error) {
      toast.error('An error occurred while adding to cart');
    }
    finally {
      setIsLoading(false)
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.productName}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-2">
          <h2 className="text-xl font-bold text-gray-900">Description</h2>
          <p className="text-gray-700">{data.description}</p>
          <p className="mt-2 text-sm text-red-600">Only {data.stock} units left!</p>
        </div>
      </div>

      {/* <div className="mt-5">
        <QuantitySelector maxQuantity={data.stock} />
      </div> */}
      <div className="mt-8 flex items-center gap-x-3">
        <Button
          size="sm"
          onClick={onAddToCart}
          disabled={isLoading || !isAuthenticated}
          className={`backdrop-blur-md bg-transparent text-black border border-gray-300 border-transparent hover:border-gray-400 hover:bg-gray-100 dark:border-gray-700 dark:hover:border-gray-600 ${isLoading ? 'cursor-not-allowed opacity-75' : ''
            }`}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-black dark:text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Adding to cart...
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </>
          )}
        </Button>

      </div>
    </div>
  );
};

export default Info;
