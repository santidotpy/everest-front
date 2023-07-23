import qs from "query-string";

import { Product, Docs } from "@/types";

const URL = `${process.env.BACKEND_URL}/api/product`;

interface Query {
  id?: string;
}

const getProduct = async (query: Query): Promise<Product> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      id: query.id,
    },
  });

  const res = await fetch(
    url
    // { next: { revalidate: 10 } }
  );
  const data = await res.json();
  return data;
};

export default getProduct;
