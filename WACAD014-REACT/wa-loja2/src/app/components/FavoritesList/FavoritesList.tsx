import type { FavoriteProduct } from '@/app/types/favorite'
import { FavoriteItem } from '../FavoriteItem/FavoriteItem'

type FavoritesListProps = {
  favorites: FavoriteProduct[]
  removeFavorite: (id: string) => void
  removingFavoriteId?: string
}

export function FavoritesList({
  favorites,
  removeFavorite,
  removingFavoriteId,
}: FavoritesListProps) {
  if (favorites.length === 0) {
    return (
      <div className='alert alert-info mb-0'>
        Nao ha produtos favoritos cadastrados.
      </div>
    )
  }

  return (
    <div className='card'>
      <div className='card-body'>
        <div className='table-responsive'>
          <table className='table align-middle mb-0'>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Preco</th>
                <th>Opcoes</th>
              </tr>
            </thead>
            <tbody>
              {favorites.map((favorite) => (
                <FavoriteItem
                  favorite={favorite}
                  removeFavorite={removeFavorite}
                  isRemovingFavorite={removingFavoriteId === String(favorite.id)}
                  key={favorite.id}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
