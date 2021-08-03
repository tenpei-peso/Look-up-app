import { push } from "connected-react-router"
import { db, FirebaseTimestamp } from "../../firebase"
import { fetchProductsInProduct } from "../users/operations";
import { fetchProductsAction, deleteProductAction } from "./actions"

const productsRef = db.collection('products');

export const deleteProduct = (id) => {
    return async (dispatch, getState) => {
        productsRef.doc(id).delete()
            .then(() => {
                const prevProducts = getState().products.list;
                const nextProducts = prevProducts.filter(product => product.id !== id)
                dispatch(deleteProductAction(nextProducts))
            })
    }
}

export const fetchProducts = () => {
    return async (dispatch) => {
        productsRef.orderBy('updated_at', 'desc').get()
            .then(snapshots => {
                const productList = []
                snapshots.forEach(snapshot => {
                    const product = snapshot.data()
                    productList.push(product)
                })
                dispatch(fetchProductsAction(productList))
                dispatch(fetchProductsInProduct(productList))
            })
    }
}

export const saveProduct = (id, name, description, category, gender, size, price, images) => {
    return async (dispatch) => {
        const timestamp = FirebaseTimestamp.now()

        const data = {
            category: category,
            description: description,
            gender: gender,
            images: images,
            name: name,
            price: parseInt(price, 10),
            size: size,
            updated_at: timestamp
            
        }

        if (!id) {
            const ref = productsRef.doc()
            data.created_at = timestamp
            id = ref.id
            data.id = id
        }
        if (id) {
            data.id = id
        }
        

        return productsRef.doc(id).set(data, {marge: true})
            .then(() => {
                dispatch(push('/'))
            }).catch((error) => {
                throw new Error(error)
            })
    }
}