import * as Actions from './actions'
import initialState from '../store/initialState'

export const UsersReducer = (state = initialState.users, action) => {
    switch (action.type) {
        case Actions.FETCH_PRODUCTS_IN_WISH:
            return {
                ...state,
                wish: [...action.payload]
            };
        case Actions.FETCH_PRODUCTS_IN_PRODUCT:
            return {
                ...state,
                product: [...action.payload]
            };
        case Actions.SIGN_IN:
            return {
                ...state,
                ...action.payload
            }

        case Actions.SIGN_OUT:
            return {
                ...action.payload
            }
        default:
            return state
    }
}