import axios from 'axios'
import { message } from 'antd'

const constants = {
    tokenString: "authToken"
}

export const request = axios.create({
    baseURL: "http://127.0.0.1:8000" // For development
})

export const notifyConst = {
    info: "info",
    success: "success",
    warning: "warning",
    error: "error"
}

export const getToken = () => {
    return localStorage.getItem(constants.tokenString)
}

export const setToken = (token) => {
    return localStorage.setItem(constants.tokenString, token)
}

export const removeToken = () => {
    localStorage.removeItem(constants.tokenString)
}

export const getHeader = (extra = null) => {
    let token = getToken()
    if (token) {
        return {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            },
            ...extra
        }
    }
    else {
        return null
    }
}

export const notify = (type, text) => {
    switch (type) {
        case notifyConst.info:
            message.info(text)
            break;
        case notifyConst.success:
            message.success(text)
            break;
        case notifyConst.warning:
            message.warning(text)
            break;
        case notifyConst.error:
            message.error(text)
            break;
        default:
            return null
    }
}

export const handleResponseError = (error, msg) => {
    if (error.response) {
        message.config({ maxCount: 1 })
        if (typeof error.response.data === 'object' && error.response.data !== null) {
            Object.keys(error.response.data).map(key => {
                if (typeof error.response.data[key] === 'object') {
                    Object.keys(error.response.data[key]).map(key2 => {
                        notify(notifyConst.error, `${key} : ${error.response.data[key][key2]}`)
                        return null
                    })
                }
                else if (Array.isArray(error.response.data[key])) {
                    error.response.data[key].map(msg => {
                        notify(notifyConst.error, msg)
                        return null
                    })
                }
                else {
                    notify(notifyConst.error, error.response.data[key])
                }
                return null
            })
        }
        else {
            notify(notifyConst.error, error.response.data)
        }
        if (error.response.status === 500) {
            notify(notifyConst.error, "Server Error.")
        }
        if (error.response.status === 404) {
            notify(notifyConst.error, "Not Found")
        }
        if (error.response.status === 401 && error.response.data.detail === "Invalid token.") {
            notify(notifyConst.error, "Invalid login. Please try to login again.")
            // logout()
        }
    }
    else if (msg) {
        notify(notifyConst.error, msg)
    }
    else {
        notify(notifyConst.error, error.message)
    }
}

export const manageResponse = (expectedStatus, response, successMessage, errorMessage) => {
    if (response.status === expectedStatus) {
        if (successMessage) {
            notify(notifyConst.success, successMessage)
        }
        return true
    }
    else {
        notify(notifyConst.warning, errorMessage)
        return false
    }
}