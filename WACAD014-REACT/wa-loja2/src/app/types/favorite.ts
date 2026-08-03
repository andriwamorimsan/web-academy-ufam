import type { Foto } from './product'

export type FavoriteProduct = {
  id: string
  productId?: string
  nome: string
  preco: string
  descricao: string
  foto?: Foto
  fotos?: Foto[]
}
