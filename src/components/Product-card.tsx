"use client";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";

import { Product } from "@/types";
import Currency from "./Currency";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Star, ShoppingCart, Eye } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface ProductCard {
  data: Product;
}

const ProductCard = ({ data }: ProductCard) => {
  const cart = useCart();
  const previewModal = usePreviewModal();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${data?._id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    cart.addItem(data);
  };

  return (
    <div onClick={handleClick} className="cursor-pointer h-full">
      <Card className="overflow-hidden group h-full flex flex-col shadow-lg shadow-white/20 dark:shadow-dark rounded-lg">
        <div className="relative w-full h-64">
          <Image
            src={data.thumbnail}
            alt={data.productName}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button 
              variant="secondary" 
              size="sm" 
              className="mr-2 backdrop-blur-md hover:bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500"
              onClick={onPreview}
            >
              <Eye className="w-4 h-4 mr-2" />
              Quick View
            </Button>
            <Button 
              size="sm"
              onClick={onAddToCart}
              className="backdrop-blur-md hover:bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
        <CardContent className="p-4 flex-grow">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{data.productName}</h3>
          {/* TODO Ratings */}
          {/* <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(data?.rating || 0) 
                  ? 'text-yellow-400 fill-current' 
                  : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              ({data?.rating || 0})
            </span>
          </div> */}
          <p className="text-muted-foreground text-sm">{data.category}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 mt-auto">
          <Currency value={data.price} />
        </CardFooter>
      </Card>
    </div>
  );
};
export default ProductCard;
