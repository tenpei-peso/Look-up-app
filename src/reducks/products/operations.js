import { push } from "connected-react-router"
import { db, FirebaseTimestamp } from "../../firebase"
import { deleteUserProductsAction, fetchUserProductsAction } from "../users/actions";
import {fetchUsersData } from '../maps/operations'

const userProductsRef = db.collection('users');

export const deleteProduct = (id) => {
    return async (dispatch, getState) => {
        const uid = getState().users.uid
        userProductsRef.doc(uid).collection('userProducts').doc(id).delete()
            .then(() => {
                const prevProducts = getState().users.product;
                const nextProducts = prevProducts.filter(product => product.id !== id)
                dispatch(deleteUserProductsAction(nextProducts))
            })
    }
}

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        const uid = getState().users.uid;
        userProductsRef.doc(uid).collection('userProducts').orderBy('updated_at', 'desc').get()
            .then(snapshots => {
                const productList = []
                snapshots.forEach(snapshot => {
                    const product = snapshot.data()
                    productList.push(product)
                })
                dispatch(fetchUserProductsAction(productList)) /**reduxのusersの中にproductの配列入れる */
                dispatch(fetchUsersData()) /**mapコレクションに情報追加 */
            })
    }
}

export const saveProduct = (id, name, description, category, gender, size, price, images) => {
    return async (dispatch, getState) => {
        const timestamp = FirebaseTimestamp.now()
        const uid = getState().users.uid;

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
            const ref = userProductsRef.doc(uid).collection('userProducts').doc()
            data.created_at = timestamp
            id = ref.id
            data.id = id
        }
        if (id) {
            data.id = id
        }
        

        return userProductsRef.doc(uid).collection('userProducts').doc(id).set(data, {marge: true})
            .then(() => {
                dispatch(push('/'))
            }).catch((error) => {
                throw new Error(error)
            })
    }
}

export const saveSell = (id, edit, name, category, gender, size, age, price) => {
    return async (dispatch, getState) => {
        const timestamp = FirebaseTimestamp.now()
        const uid = getState().users.uid;

        const data = {
            category: category,
            gender: gender,
            name: name,
            price: parseInt(price, 10),
            size: size,
            age: age,
            updated_at: timestamp
            
        }
        
        if (!edit) {
            const ref = userProductsRef.doc(uid).collection('userSell').doc()
            data.created_at = timestamp
            const sellId = ref.id
            data.id = sellId
        }
        if (edit) {
            data.id = id
        }
        

        return userProductsRef.doc(uid).collection('userSell').doc(id).set(data, {marge: true})
            .then(() => {
                dispatch(deleteProduct(id))
            }).then(() => {
                dispatch(push('/'))
            }).catch((error) => {
                throw new Error(error)
            })
    }
}