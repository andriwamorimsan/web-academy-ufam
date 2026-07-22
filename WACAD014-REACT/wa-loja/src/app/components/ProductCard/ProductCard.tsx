import Image from 'next/image'
import type { Product } from '../../types/product'
import { formatCurrency } from '../../utils/formatCurrency'

type ProductCardProps = {
  product: Product
  addToCart: (product: Product) => void
}

export function ProductCard({ product, addToCart }: ProductCardProps) {
  return (
    <div className='col'>
      <div className='card shadow-sm h-100'>
        <Image
          src={product.fotos[0]}
          className='card-img-top'
          alt={product.nome}
          width={300}
          height={320}
        />
        <div className='card-body bg-light d-flex flex-column'>
          <h5 className='card-title'>{product.nome}</h5>
          <p className='card-text text-secondary'>{product.descricao}</p>
          <p className='card-text fw-semibold mt-auto'>
            {formatCurrency(product.preco)}
          </p>
          <button
            className='btn btn-dark d-block w-100'
            type='button'
            onClick={() => addToCart(product)}
          >
            Adicionar no carrinho
          </button>
        </div>
      </div>
    </div>
  )
}
