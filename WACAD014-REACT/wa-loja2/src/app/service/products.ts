import { productsApi} from "@/app/service/api";

export function getProductsList() {
    return productsApi.get("/produto").then((response) => response.data);
}

export function getProductDetail(product:string) {
    return productsApi
        .get(`/produto/${product}`)
        .then((response) => response.data);
}