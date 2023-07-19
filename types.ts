export interface Product {
  _id: string;
  productName: string;
  description: string;
  code: string;
  price: number;
  thumbnail: string;
  stock: number;
  status: boolean;
  category: string;
}

export interface Docs {
  docs: Product[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number;
  nextPage: number;
  status: number;
}
