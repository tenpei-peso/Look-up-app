import {fetchProductsInProductAction, fetchProductsInWishAction, signInAction, signOutAction} from './actions';
import { push } from 'connected-react-router';
import {auth, db, FirebaseTimestamp} from '../../firebase/index'

export const addProductWish = (addedProduct) => {
    return async (dispatch, getState) => {
        const uid = getState().users.uid;
        const wishRef = db.collection('users').doc(uid).collection('wish').doc();
        addedProduct['wishId'] = wishRef.id;
        await wishRef.set(addedProduct)
        dispatch(push('/'))
    }
}

export const fetchProductsInWish = (products) => {
    return async (dispatch) => {
        dispatch(fetchProductsInWishAction(products))
    }
}

export const fetchProductsInProduct = (products) => {
    return async (dispatch) => {
        dispatch(fetchProductsInProductAction(products))
    }
}

export const listenAuthState = () => {
    return async (dispatch) => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                const uid = user.uid

                    db.collection('users').doc(uid).get()
                        .then(snapshot => {
                            const data = snapshot.data()

                            dispatch(signInAction({
                                isSignedIn: true,
                                role: data.role,
                                uid: uid,
                                username: data.username
                            }))

                        })
            } else {
                dispatch(push('/signin'))
            }
        })
    }
}

export const resetPassword = (email) => {
    return async (dispatch) => {
        auth.sendPasswordResetEmail(email)
            .then(() => {
                alert('入力されたアドレスに再設定メールをお送りしました')
                dispatch(push('/signin'))
            }).catch(() => {
                alert('送信に失敗しました')
            })
    }
}

export const signIn = (email, password) => {
    return async (dispatch) => {
        auth.signInWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user

                if(user) {
                    const uid = user.uid

                    db.collection('users').doc(uid).get()
                        .then(snapshot => {
                            const data = snapshot.data()

                            dispatch(signInAction({
                                isSignedIn: true,
                                role: data.role,
                                uid: uid,
                                username: data.username
                            }))

                            dispatch(push('/'))
                        })
                }
            }).catch(err => alert(err))
    }
}

export const signUp = (username, email, password, confirmPassword) => {
    return async (dispatch) => {
        // Validation
        if (password !== confirmPassword) {
            alert("パスワードが一致しません")
            return false
        }

        return auth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user

                if (user) {
                    const uid = user.uid
                    const timestamp = FirebaseTimestamp.now()

                    const userInitialData = {
                        created_at: timestamp,
                        email: email,
                        role: "customer",
                        uid: uid,
                        updated_at: timestamp,
                        username: username
                    }

                    db.collection('users').doc(uid).set(userInitialData)
                        .then(() => {
                            dispatch(push('/'))
                        })
                }
            })
    }
}
export const signOut = () => {
    return async (dispatch) => {
        auth.signOut()
            .then(() => {
                dispatch(signOutAction())
                dispatch(push('/signin'))
            })
    }
}