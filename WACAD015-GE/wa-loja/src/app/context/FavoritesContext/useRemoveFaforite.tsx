import { useFavoritesProvider } from '@/app/context/FavoritesContext/useFavoritesContext'

export function useRemoveFaforites(id: string) {
  const { removeFavorite: removeFavoriteFromApi } = useFavoritesProvider()

  const removeFavorite = () => {
    removeFavoriteFromApi(id)
  }

  return { removeFavorite }
}
