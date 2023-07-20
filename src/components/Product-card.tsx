"use client";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import OpenInFullRoundedIcon from "@mui/icons-material/OpenInFullRounded";

import { Product } from "../../types";
import Currency from "./Currency";
import { useRouter } from "next/navigation";

interface ProductCard {
  data: Product;
}

const ProductCard = ({ data }: ProductCard) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${data?._id}`);
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
              className="w-50 mt-2 bg-[#068ad1] text-white border-2 border-[#027bbd]  text-center justify-center align-center mx-auto"
              size="large"
              color="primary"
            >
              <OpenInFullRoundedIcon />
            </IconButton>
            <IconButton
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

// import Image from "next/image";
// import Card from "@mui/material/Card";
// import CardMedia from "@mui/material/CardMedia";
// import CardContent from "@mui/material/CardContent";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
// import OpenInFullRoundedIcon from "@mui/icons-material/OpenInFullRounded";

// import { Product } from "../../types";
// import Currency from "./Currency";

// interface ProductCard {
//   data: Product;
// }

// const ProductCard = ({ data }: ProductCard) => {
//   return (
//     <div className="max-w-md mx-auto mb-5 pb-5 hover:shadow-lg transition duration-200 ease-in-out cursor-pointer group">
//       <Card className="h-full flex flex-col justify-between">
//         <CardMedia
//           component="img"
//           alt={data.productName}
//           height="250"
//           image={data.thumbnail}
//         />
//         <CardContent className="flex flex-col justify-between">
//           <div>
//             <Typography variant="subtitle1" className="font-bold">
//               {data.productName}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               <Currency value={data.price} />
//             </Typography>
//           </div>
//           <div className="flex gap-x-6 justify-center mt-2 opacity-0 group-hover:opacity-100 transition

//           ">
//             <IconButton
//               className="w-12 h-12 bg-[#068ad1] text-white border-2 border-[#027bbd]"
//               size="large"
//               color="primary"
//             >
//               <OpenInFullRoundedIcon />
//             </IconButton>
//             <IconButton
//               className="w-12 h-12 bg-[#068ad1] text-white border-2 border-[#027bbd]"
//               size="large"
//               color="primary"
//             >
//               <ShoppingCartSharpIcon />
//             </IconButton>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default ProductCard;
