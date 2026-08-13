import { useFavoirtesContext} from "@/app/context/FavoritesContext/useFavoritesContext";

export function useRemoveFaforites(id: string) {
    const { favorites, setFavorites } = useFavoirtesContext()

   const removeFavorite = () => {
        const newArray =  favorites.filter((item) => item.id !== id)
        return setFavorites(newArray)
   }
   return {removeFavorite}
}