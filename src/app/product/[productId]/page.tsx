import getProduct from "@/actions/get-product";
import Container from "@/components/Container";
import Info from "@/components/Info";
import { CardMedia } from "@mui/material";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await getProduct({ id: params.productId });

  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden mt-10 mb-10
    "
    >
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 text-black">
            {/* <Gallery images={product.images} /> */}
            <CardMedia
              component="img"
              className="rounded-xl shadow-2xl"
              height="194"
              image={product.thumbnail}
              alt={product.productName}
            />

            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 text-black">
              <Info data={product} />
            </div>
          </div>
          {/* <hr className="my-10" /> */}
          {/* <ProductList title="Related Items" items={suggestedProducts} /> */}
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
