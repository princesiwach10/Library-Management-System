import * as types from '../actionTypes'

const initialState = {
    books: [],
}

export default function categories(state = initialState, action) {
    switch (action.type) {
        case types.GET_BOOKS:
            return {
                ...state,
                books: action.payload
            }
        case types.UPDATE_BOOK:
            return {
                ...state,
                books: [action.payload, ...state.books.filter(book => book.id !== action.payload.id)]
            }
        default:
            return state
    }
}