export const FETCH_MAPS = "FETCH_MAPS";
export const fetchMapsAction = (products) => {
    return {
        type: "FETCH_MAPS",
        payload: products
    }
}