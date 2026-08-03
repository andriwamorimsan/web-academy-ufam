'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import type { Product } from '../../types/product'
import { formatCurrency } from '../../utils/formatCurrency'

type ProductCardProps = {
  product: Product
  addToCart: (product: Product) => void
  addToFavorites: (product: Product) => void
  isAddingFavorite: boolean
}

export function ProductCard({
  product,
  addToCart,
  addToFavorites,
  isAddingFavorite,
}: ProductCardProps) {
  const router = useRouter()

  function viewProductDetails(productName: string): void {
    const sanitizedProductName = productName
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]/g, '')
      .toLowerCase()

    router.push(`/product/${sanitizedProductName}`)
  }

  return (
    <div className='col'>
      <div className='card shadow-sm h-100'>
        <Image
          src={product.fotos[0].src}
          className='card-img-top'
          alt={product.fotos[0].titulo}
          width={300}
          height={320}
          onClick={() => viewProductDetails(product.nome)}
          role='button'
        />
        <div className='card-body bg-light d-flex flex-column'>
          <h5 className='card-title'>{product.nome}</h5>
          <p className='card-text text-secondary'>{product.descricao}</p>
          <p className='card-text fw-semibold mt-auto'>
            {formatCurrency(Number(product.preco))}
          </p>
          <button
            className='btn btn-dark d-block w-100'
            type='button'
            onClick={() => addToCart(product)}
          >
            Adicionar no carrinho
          </button>
          <button
            className='btn btn-outline-danger d-block w-100 mt-2'
            type='button'
            onClick={() => addToFavorites(product)}
            disabled={isAddingFavorite}
          >
            {isAddingFavorite ? 'Favoritando...' : 'Favoritar'}
          </button>
        </div>
      </div>
    </div>
  )
}
