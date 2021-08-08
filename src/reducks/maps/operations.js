import { db } from "../../firebase"
import { fetchMapsAction } from "./actions"


export const fetchUsersData = () => {   /**map画面飛んだ時にmapコレクションにデータ入れる */
    return async (dispatch, getState) => {
        const users = getState().users
        const mapData = {
            uid: users.uid,
            locate: users.locate,
            products: users.product,
            name: users.username
        }
        if(users.product.length > 0) {
            db.collection('maps').doc(users.uid).set(mapData)
        }

    }
}

export const fetchMaps = () => {
    return async (dispatch, getState) => {
        db.collection('maps').get()
            .then(snapshots => {
                const mapList = []
                snapshots.forEach(snapshot => {
                    const map = snapshot.data()
                    mapList.push(map)
                })
                dispatch(fetchMapsAction(mapList))
            })
    }
}