import { Product, Docs } from "@/types";
import NoResults from "@/components/No-result";
import ProductCard from "@/components/Product-card";

interface ProductListProps {
  title: string;
  items: Docs;
  // items: Product[]; antes era así
}

const ProductList = ({ title, items }: ProductListProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-3xl font-bold text-center text-[#3678e3]">{title}</h1>
      {items.docs.length === 0 && <NoResults />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.docs.map((item) => (
          <ProductCard key={item._id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
