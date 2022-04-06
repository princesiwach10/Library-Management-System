import { CREATE_USER } from '../actionTypes'

const initialState = {
    users: [],
}

export default function customer(state = initialState, action) {
    switch (action.type) {
        case CREATE_USER:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}