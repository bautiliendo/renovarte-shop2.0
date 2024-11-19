export const revalidate = 60

import { redirect } from "next/navigation";
import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid } from "@/components";
import Title from "@/components/ui/title/Title";


// interface Props {
//   searchParams: {
//     page?: string;
//   }
// }
interface Props {
  searchParams: Promise<{ page?: string }>
}

export default async function Home({ searchParams }: Props) {

  const page = (await searchParams).page ? Number((await searchParams).page) : 1

  const { products, totalPages } = await getPaginatedProductsWithImages({ page });

  if (products.length === 0) {
    redirect('/')
  }

  return (
    <>
      <Title
        title="Tienda"
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid
        products={products}
      />
      <Pagination totalPages={totalPages}/>

    </>
  );
}
