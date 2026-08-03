'use client'

import { useParams, usePathname, useSearchParams} from "next/navigation";

export default function Exemple() {
    const params = useParams();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const value = searchParams.get("buscar");

    return (
        <>
            <h1>Exemplo de rota dinâmica</h1>
            <h2>{params.slug}</h2>
            <h2>A rota atual é: {pathname}</h2>
            <h2>O valor retornando no query é param é: {value}</h2>
        </>
    )
}