import * as Actions from './actions'
import initialState from '../store/initialState'

export const MapsReducer = (state = initialState.maps, action) => {
    switch (action.type) {
        case Actions.FETCH_MAPS:
            return {
                ...state,
                map: [...action.payload]
            };
        default:
            return state
    }
}