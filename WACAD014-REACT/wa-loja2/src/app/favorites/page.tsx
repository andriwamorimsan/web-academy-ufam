'use client'

import { ToastContainer } from 'react-toastify'
import { FavoritesList } from '../components/FavoritesList/FavoritesList'
import { useFavoritesList } from '../hooks/useFavoritesList'

export default function Favorites() {
  const {
    favorites,
    isPending,
    isError,
    removeFavorite,
    removingFavoriteId,
  } = useFavoritesList()

  if (isPending) {
    return (
      <main>
        <div className='container p-5'>
          <h1 className='h3 mb-4'>Produtos favoritos</h1>
          <div className='alert alert-secondary'>Carregando favoritos...</div>
        </div>
      </main>
    )
  }

  if (isError) {
    return (
      <main>
        <div className='container p-5'>
          <h1 className='h3 mb-4'>Produtos favoritos</h1>
          <div className='alert alert-danger'>
            Nao foi possivel carregar os favoritos.
          </div>
        </div>
      </main>
    )
  }

  return (
    <main>
      <div className='container p-5'>
        <ToastContainer />
        <h1 className='h3 mb-4'>Produtos favoritos</h1>
        <FavoritesList
          favorites={favorites}
          removeFavorite={removeFavorite}
          removingFavoriteId={removingFavoriteId}
        />
      </div>
    </main>
  )
}
