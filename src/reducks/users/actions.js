export const SIGN_IN = "SIGN_IN";

export const signInAction = (userState) => { /**この関数の引数は今はオブジェクト */
    return {
        type: "SIGN_IN",
        payload: {
            isSignedIn: true,
            role: userState.role,
            uid: userState.uid,
            username: userState.username
        }
    }
};

export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () => {
    return {
        type: "SIGN_OUT",
        payload: {
            isSignedIn: false,
            role: "",
            uid: "",
            username: ""
        }
    }
};

export const FETCH_PRODUCTS_IN_WISH = "FETCH_PRODUCTS_IN_WISH";
export const fetchProductsInWishAction = (products) => {
    return {
        type: "FETCH_PRODUCTS_IN_WISH",
        payload: products
    }
}

export const FETCH_PRODUCTS_IN_PRODUCT = "FETCH_PRODUCTS_IN_PRODUCT";
export const fetchProductsInProductAction = (products) => {
    return {
        type: "FETCH_PRODUCTS_IN_PRODUCT",
        payload: products
    }
}