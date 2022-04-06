import * as types from '../actionTypes'
import { handleResponseError, getHeader, request, setToken, removeToken } from '../utils'

export const loginUser = (data, callBack = null) => dispatch => {
    dispatch({
        type: types.AUTH_START
    })
    removeToken()
    request.post("/user/login/", data).then(response => {
        dispatch({
            type: types.AUTH_SUCCESS,
            payload: response.data
        })
        setToken(response.data.token)
        if (callBack !== null) {
            callBack()
        }
    }).catch(error => {
        dispatch({
            type: types.AUTH_FAILED,
        })
        handleResponseError(error)
    })
}

export const autoLogin = (callBack = null) => dispatch => {
    dispatch({
        type: types.AUTH_START,
    })
    let header = getHeader()
    request.post("/user/get_user/", null, header).then(response => {
        dispatch({
            type: types.AUTH_SUCCESS,
            payload: response.data
        })
        if (callBack !== null) {
            callBack()
        }
    }).catch(error => {
        removeToken()
        dispatch({
            type: types.AUTH_FAILED
        })
        // handleResponseError(error)
    })
}


export const logoutUser = (callBack = null) => dispatch => {
    let header = getHeader()
    removeToken()
    request.post("/user/logout/", null, header)
    dispatch({
        type: types.AUTH_FAILED,
    })
}