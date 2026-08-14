import { useContext } from 'react'
import { FavoritesContext } from '@/app/context/FavoritesContext/FavoritesProvider'

export function useFavoritesProvider() {
  const favoritesContext = useContext(FavoritesContext)

  if (!favoritesContext) {
    throw new Error('useFavoritesProvider must be used within FavoritesProvider')
  }

  return favoritesContext
}

export function useFavoirtesContext() {
  return useFavoritesProvider()
}
