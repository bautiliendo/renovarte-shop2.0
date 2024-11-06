// 'use client'

import { ProductGrid } from "@/components";
import Title from "@/components/ui/title/Title";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
// import { notFound } from "next/navigation";

const SeedProducts = initialData.products

interface Props {
  params: {
    id: Category;
  }
}

export default function ({ params }: Props) {

  const { id } = params;

  const products = SeedProducts.filter(producto => producto.gender === id)

  const labels: Record<Category, string> = {
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
        title={`Artículos ${labels[id]}`}
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid
        products={products}
      />

    </>
  );
}