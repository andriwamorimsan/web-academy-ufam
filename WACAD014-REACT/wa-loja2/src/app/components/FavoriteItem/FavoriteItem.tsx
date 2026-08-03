import Image from 'next/image'
import type { FavoriteProduct } from '@/app/types/favorite'
import { formatCurrency } from '@/app/utils/formatCurrency'

type FavoriteItemProps = {
  favorite: FavoriteProduct
  removeFavorite: (id: string) => void
  isRemovingFavorite: boolean
}

export function FavoriteItem({
  favorite,
  removeFavorite,
  isRemovingFavorite,
}: FavoriteItemProps) {
  const favoriteImage = favorite.foto ?? favorite.fotos?.[0]

  return (
    <tr>
      <td>
        <div className='d-flex align-items-center gap-3'>
          <Image
            src={favoriteImage?.src ?? '/placeholder.png'}
            alt={favoriteImage?.titulo ?? favorite.nome}
            width={72}
            height={72}
            className='rounded object-fit-cover'
          />
          <div>
            <p className='fw-semibold mb-1'>{favorite.nome}</p>
            <p className='text-secondary small mb-0'>{favorite.descricao}</p>
          </div>
        </div>
      </td>
      <td>{formatCurrency(Number(favorite.preco))}</td>
      <td>
        <button
          className='btn btn-danger btn-sm'
          type='button'
          onClick={() => removeFavorite(String(favorite.id))}
          disabled={isRemovingFavorite}
        >
          {isRemovingFavorite ? 'Excluindo...' : 'Excluir'}
        </button>
      </td>
    </tr>
  )
}
