export const revalidate = 60

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid } from "@/components";
import Title from "@/components/ui/title/Title";

import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";
// import { notFound } from "next/navigation";



// interface Props {
//   params: {
//     gender: string;
//   },
//   searchParams: {
//     page?: string;
//   }
// }


interface Props {
  params: Promise<{ gender: string }>
  searchParams: Promise<{ page?: string }>
}

export default async function GenderByPage({ params, searchParams }: Props) {

  // Desestructurar los params y searchParams
  const { gender } = await params
  const { page: pageParam } = await searchParams

  // Obtener el número de página, por defecto a 1
  const page = pageParam ? parseInt(pageParam) : 1

  // Obtener los productos con paginación e imágenes
  const { products, /* currentPage, */ totalPages } =
    await getPaginatedProductsWithImages({
      page,
      gender: gender as Gender
    })

  // Redireccionar si no hay productos
  if (products.length === 0) {
    redirect(`/gender/${gender}`)
  }



  const labels: Record<string, string> = {
    'men': 'para hombres',
    'women': 'para mujeres',
    'kid': 'para niños',
    'unisex': 'para todos'
  }

  // if (id === 'kids') {
  //   notFound();
  // }

  return (
    <>
      <Title
        title={`Artículos ${labels[gender]}`}
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid
        products={products}
      />

      <Pagination totalPages={totalPages} />

    </>
  );
}