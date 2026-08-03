export type Foto = {
  titulo: string
  src: string
}

export type Product = {
  id: string
  nome: string
  preco: string
  fotos: Foto[]
  desconto: number
  descricao: string
  vendido: string
  usuario_id: string
}

export type Produto = Product
