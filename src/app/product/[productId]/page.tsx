import getProduct from "@/actions/get-product";
import Container from "@/components/Container";
import Info from "@/components/Info";
import Image from 'next/image';
import {
  Card,
  CardContent
} from "@/components/ui/card"
// import ProductList from "@/components/Product-list";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await getProduct({ id: params.productId });

  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden mt-16 mb-10 min-h-screen
    "
    >
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 text-black">
            {/* <Gallery images={product.images} /> */}
            <Card>
              <CardContent className="flex justify-center items-center">
                <Image
                  src={product.thumbnail}
                  alt={product.productName}
                  width={500}
                  height={500}
                  className="rounded-xl shadow-2xl"
                />
              </CardContent>
            </Card>

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
