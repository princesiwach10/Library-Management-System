import { CREATE_USER } from '../actionTypes'
import { handleResponseError, getHeader, request } from '../utils'

export const createUser = (data, callBack = null) => dispatch => {
    let header = getHeader()
    console.log(data);
    request.post("/user/user/", data, header).then(res => {
        dispatch({
            type: CREATE_USER,
            payload: res.data
        })
        if (callBack !== null) { callBack() }
    }).catch(error => {
        handleResponseError(error)
    })
}