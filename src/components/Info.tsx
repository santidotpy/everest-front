"use client";

// import { ShoppingCart } from "lucide-react";

import Currency from "@/components/Currency";
import Button from "@mui/material/Button";
import { Product } from "../../types";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
// import useCart from "@/hooks/use-cart";

interface InfoProps {
  data: Product; 
}

const Info: React.FC<InfoProps> = ({ data }) => {
  //   const cart = useCart();

  //   const onAddToCart = () => {
  //     cart.addItem(data);
  //   }

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
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        {/* <Button onClick={onAddToCart} className="flex items-center gap-x-2">
          Add To Cart
          <ShoppingCart size={20} />
        </Button> */}
        <Button className="flex items-center gap-x-2 bg-[#068ad1]" variant="contained">
          Add To Cart
          <ShoppingCartSharpIcon />
        </Button>
      </div>
    </div>
  );
};

export default Info;
