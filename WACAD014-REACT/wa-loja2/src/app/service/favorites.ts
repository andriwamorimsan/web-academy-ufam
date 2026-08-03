import type { Product } from '@/app/types/product'
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
