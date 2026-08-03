import type { Product } from '../../types/product'
import { ProductCard } from '../ProductCard/ProductCard'
import {useProductList} from "@/app/hooks/useProductList";

type ProductListProps = {
  addToCart: (product: Product) => void
}

export function ProductList({ addToCart }: ProductListProps) {
  const {
    products,
    isPending,
    isError,
    favoriteProduct,
    isFavoritePending,
  } = useProductList()

  if (isPending) return 'carregando dados...'

  if (isError) return 'error'

  if (products.length === 0) return 'Nao ha produtos disponiveis'

  return (
    <div className='row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3'>
      {products.map((product: Product)=> (
        <ProductCard
          product={product}
          addToCart={addToCart}
          addToFavorites={favoriteProduct}
          isAddingFavorite={isFavoritePending}
          key={product.id}
        />
      ))}
    </div>
  )
}
