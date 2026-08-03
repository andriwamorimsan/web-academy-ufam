import { useQuery } from '@tanstack/react-query'
import {getProductsList} from "@/app/service/products";

export function useProductList() {
    const { data, isPending, isError } = useQuery({
        queryKey: ['productList'],
        queryFn: getProductsList
    })
    return { products: data , isPending, isError }
}
