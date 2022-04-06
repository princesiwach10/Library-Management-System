import * as types from '../actionTypes'
import { getHeader, manageResponse, handleResponseError, request } from '../utils'

export const getBooks = (callBack = null) => dispatch => {
    let header = getHeader()
    request.get("/library/books/", header).then(res => {
        if (manageResponse(200, res, null, "Couldn't fetch books.")) {
            dispatch({
                type: types.GET_BOOKS,
                payload: res.data
            })
            if (callBack !== null) { 
                callBack() 
            }
        }
    }).catch(error => {
        handleResponseError(error)
    })
}

export const addBook = (data, callBack = null) => dispatch => {
    let header = getHeader()
    request.post("/library/books/", data, header).then(res => {
        if (manageResponse(201, res, "Book Added Successfully.", "Couldn't Add Book.")) {
            dispatch({
                type: types.ADD_BOOK,
                payload: res.data
            })
            if (callBack !== null) {
                callBack()
            }
        }
    }).catch(error => {
        handleResponseError(error)
    })
}

export const updateBook = (id, data, callback = null) => dispatch => {
    let header = getHeader()
    request.put(`/library/books/${id}/`, data, header).then(res => {
        if (manageResponse(200, res, "Successfully updated Book", "Couldn't update book")) {
            dispatch({
                type: types.UPDATE_BOOK,
                payload: res.data,
            })
            if (callback !== null) {
                callback()
            }
        }
    }).catch(error => {
        handleResponseError(error)
    })
}

export const deleteBook = (id, callback = null) => dispatch => {
    let header = getHeader()
    request.delete(`/library/books/${id}/`, header).then(res => {
        if (manageResponse(204, res, "Successfully Deleted", "Couldn't Delete")) {
            dispatch({
                type: types.DELETE_BOOK,
            })
            if (callback !== null) {
                callback()
            }
        }
    }).catch(error => {
        handleResponseError(error)
    })
}