import { productsApi} from "@/app/service/api";

export function getProductsList() {
    return productsApi.get("/produto").then((response) => response.data);
}
