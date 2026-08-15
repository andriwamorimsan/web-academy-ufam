const breedsListResponse = [
    { id: "abys", name: "Abyssinian" },
    { id: "beng", name: "Bengal" },
    { id: "pers", name: "Persian" },
    { id: "siam", name: "Siamese" },
];

const catImagesResponse = [
    { id: "img1", url: "https://cdn2.thecatapi.com/images/xnzzM6MBI.jpg" },
    { id: "img2", url: "https://cdn2.thecatapi.com/images/H-lNPvvT_.jpg" },
];

export default async function mockFetch(url) {
    switch (url) {
        case "https://api.thecatapi.com/v1/breeds": {
            return {
                ok: true,
                status: 200,
                json: async () => breedsListResponse,
            };
        }
        case "https://api.thecatapi.com/v1/images/search?breed_ids=beng&limit=20":
        case "https://api.thecatapi.com/v1/images/search?breed_ids=abys&limit=20": {
            return {
                ok: true,
                status: 200,
                json: async () => catImagesResponse,
            };
        }
        default: {
            throw new Error(`Unhandled request: ${url}`);
        }
    }
}
