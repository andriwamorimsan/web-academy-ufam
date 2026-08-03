'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useProductDetail } from '@/app/hooks/useProductDetail'
import { formatCurrency } from '@/app/utils/formatCurrency'

export default function ProductDetail() {
  const params = useParams()
  const productName = params.product as string
  const { product, isPending, isError } = useProductDetail(productName)

  if (isPending) return 'carregando...'

  if (isError) return 'Erro ao carregar produto'

  if (!product) return 'Produto nao encontrado'

  const { id, nome, preco, descricao, fotos } = product
  const mainImage = fotos?.[0]

  return (
    <main>
      <div className='container p-5'>
        <div className='card mb-4'>
          <div className='card-body'>
            <h5 className='card-title mb-4 fw-light'>Detalhes do produto</h5>

            <h5 className='card-title mb-4 fw-bold'>Nome produto: {nome}</h5>

            <div className='row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 mb-3'>
              <Image
                key={id}
                src={mainImage?.src ?? '/placeholder.png'}
                alt={mainImage?.titulo ?? nome}
                width={300}
                height={320}
              />
            </div>

            <p className='card-text fw-medium'>
              Valor: {formatCurrency(Number(preco))}
            </p>
            <p className='card-text fw-medium'>Descricao: {descricao}</p>
            <p className='card-text fw-medium'>Anunciado por: {product.usuario_id}</p>
          </div>
        </div>
      </div>
    </main>
  )
}
