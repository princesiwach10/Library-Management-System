import React, { useEffect } from 'react'
import { message } from 'antd'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logoutUser } from '../../requests/actions/auth'

function Logout(props) {
    debugger
    useEffect(() => {
        props.logoutUser()
        message.success('Logout Successully')
    })
    return (
        <><Redirect to="/login" /></>
    )
}

export default connect(null, { logoutUser })(Logout)