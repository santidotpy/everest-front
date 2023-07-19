import getProducts from "@/actions/get-products";
import ProductList from "@/components/Product-list";
import Container from "@/components/Container";

export default async function Products() {
  const productos = await getProducts({ page: 1, limit: 15 });
  return (
    <div>
      <Container>
        <div
          className="
         flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8
        "
        >
          <ProductList title="Products" items={productos} />
        </div>
      </Container>
    </div>
  );
}
