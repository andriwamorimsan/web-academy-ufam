import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { deleteFavorite, getFavoritesList } from '@/app/service/favorites'

export function useFavoritesList() {
  const queryClient = useQueryClient()

  const {
    data = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ['favoritesList'],
    queryFn: getFavoritesList,
  })

  const deleteFavoriteMutation = useMutation({
    mutationFn: (id: string) => deleteFavorite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favoritesList'] })
      toast.success('Produto removido dos favoritos!')
    },
    onError: () => {
      toast.error('Nao foi possivel remover o favorito.')
    },
  })

  return {
    favorites: data,
    isPending,
    isError,
    removeFavorite: deleteFavoriteMutation.mutate,
    removingFavoriteId: deleteFavoriteMutation.variables,
  }
}
