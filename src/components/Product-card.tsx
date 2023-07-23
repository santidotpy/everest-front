"use client";
import { useRouter } from "next/navigation";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import OpenInFullRoundedIcon from "@mui/icons-material/OpenInFullRounded";
import { MouseEventHandler } from "react";

import { Product } from "@/types";
import Currency from "./Currency";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";

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
    <div
      onClick={handleClick}
      className="
     group cursor-pointer rounded-xl p-2 mb-5 pb-5 hover:shadow-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105
    "
    >
      <div className="aspect-square rounded-xl relative">
        <Card sx={{ maxWidth: 450 }}>
          <CardMedia
            component="img"
            alt={data.productName}
            height="250"
            style={{ height: "fit-content" }}
            image={data.thumbnail}
          />
          <CardContent>
            <Typography
              variant="subtitle1"
              // color="text.secondary"
              className="font-bold"
            >
              {data.productName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <Currency value={data.price} />
            </Typography>
          </CardContent>
        </Card>

        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-15">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={onPreview}
              className="w-50 mt-2 bg-[#068ad1] text-white border-2 border-[#027bbd]  text-center justify-center align-center mx-auto"
              size="large"
              color="primary"
            >
              <OpenInFullRoundedIcon />
            </IconButton>
            <IconButton
              onClick={onAddToCart}
              className="w-50 mt-2 bg-[#068ad1] text-white border-2 border-[#027bbd]  text-center justify-center align-center mx-auto"
              size="large"
              color="primary"
            >
              <ShoppingCartSharpIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
