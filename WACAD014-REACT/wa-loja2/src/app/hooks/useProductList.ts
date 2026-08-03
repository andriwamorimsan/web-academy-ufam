import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import type { Product } from '@/app/types/product'
import { addFavorite } from '@/app/service/favorites'
import {getProductsList} from "@/app/service/products";

export function useProductList() {
    const { data, isPending, isError } = useQuery({
        queryKey: ['productList'],
        queryFn: getProductsList
    })

    const favoriteMutation = useMutation({
        mutationFn: (product: Product) => addFavorite(product),
        onSuccess: () => {
            toast.success('Produto adicionado aos favoritos!')
        },
        onError: () => {
            toast.error('Nao foi possivel favoritar o produto.')
        },
    })

    return {
        products: data,
        isPending,
        isError,
        favoriteProduct: favoriteMutation.mutate,
        isFavoritePending: favoriteMutation.isPending,
    }
}
