import {useContext} from "react";
import {FavoritesContext} from "@/app/context/FavoritesContext/FavoritesProvider";

export function useFavoirtesContext() {
    const favoritesContext = useContext(FavoritesContext)

    if (!favoritesContext)
        throw new Error('useFavoirtesContext must be used within favoritesProvider')
    return favoritesContext

}