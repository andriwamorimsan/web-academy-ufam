'use client'

import ProductCard from '../ProductCard/ProductCard'
import { useFavoritesProvider } from '@/app/context/FavoritesContext/useFavoritesContext'

export default function FavoritesSummary() {
  const { favorites, isLoadingFavorites } = useFavoritesProvider()
  const recentFavorites = favorites.slice(-3).reverse()

  return (
    <>
      <h5 className='mb-3 mt-4 mt-lg-0 ms-1'>Ultimos favoritados:</h5>

      <div className='row row-cols-1 g-3 border rounded-1 pb-3 mt-3 bg-light ms-1'>
        {isLoadingFavorites ? (
          <div>
            <p className='text-muted'>Carregando favoritos...</p>
          </div>
        ) : recentFavorites.length === 0 ? (
          <div>
            <p className='text-muted'>Sua lista esta vazia</p>
          </div>
        ) : (
          recentFavorites.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showImage={false}
              showButton={false}
            />
          ))
        )}
      </div>
    </>
  )
}
