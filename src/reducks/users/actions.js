export const SIGN_IN = "SIGN_IN";

export const signInAction = (userState) => { /**この関数の引数は今はオブジェクト */
    return {
        type: "SIGN_IN",
        payload: {
            isSignedIn: true,
            role: userState.role,
            uid: userState.uid,
            username: userState.username,
            locate: userState.locate
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
            username: "",
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

export const FETCH_USER_PRODUCTS = "FETCH_USER_PRODUCTS";
export const fetchUserProductsAction = (products) => {
    return {
        type: "FETCH_USER_PRODUCTS",
        payload: products
    }
}

export const DELETE_USER_PRODUCTS = "DELETE_USER_PRODUCTS";
export const deleteUserProductsAction = (products) => {
    return {
        type: "DELETE_USER_PRODUCTS",
        payload: products
    }
}