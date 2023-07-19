import qs from "query-string";

import { Product, Docs } from "../../types";

const URL = `${process.env.BACKEND_URL}/api/products`;

interface Query {
  page?: number;
  limit?: number;
}

// const getProducts = async (query: Query): Promise<Product[]> => {
const getProducts = async (query: Query): Promise<Docs> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      page: query.page,
      limit: query.limit,
    },
  });

  const res = await fetch(
    url
    // { next: { revalidate: 10 } }
  );
  const data = await res.json();
  return data;
  //   return data.docs;
};

export default getProducts;
