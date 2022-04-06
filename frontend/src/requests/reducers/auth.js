import * as types from "../actionTypes";

const initialState = {
    isAuthenticated: true,
    loading: false,
    user: null
}

export default function auth(state = initialState, action) {
    switch (action.type) {
        case types.AUTH_START:
            return {
                ...state,
                loading: true
            }
        case types.AUTH_SUCCESS: {
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload.user
            }
        }
        case types.AUTH_FAILED:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null
            }
        default:
            return state
    }
}