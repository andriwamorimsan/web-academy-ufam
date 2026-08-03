import type { Product } from '@/app/types/product'
import type { FavoriteProduct } from '@/app/types/favorite'
import { favoritesApi } from './api'

export function addFavorite(product: Product) {
  return favoritesApi.post('/favoritos', {
    productId: product.id,
    nome: product.nome,
    preco: product.preco,
    descricao: product.descricao,
    foto: product.fotos[0],
  }).then((response) => response.data)
}

export function getFavoritesList() {
  return favoritesApi
    .get<FavoriteProduct[]>('/favoritos')
    .then((response) => response.data)
}

export function deleteFavorite(id: string) {
  return favoritesApi.delete(`/favoritos/${id}`).then((response) => response.data)
}
