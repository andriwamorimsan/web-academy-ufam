import {useQuery} from "@tanstack/react-query";
import {getProductDetail} from "@/app/service/products";


export function useProductDetail( product: string ) {
    const {data, isPending, isError} = useQuery({
        queryKey: ['productDetails', product],
        queryFn: () => getProductDetail(product)
    })
    return{product: data, isPending, isError}
}
