import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ Comp, isAuthenticated, isLoading, extraProps, ...rest }) => (
    <Route {...rest} render={props => {
        if (isAuthenticated) {
            return <Comp {...props} {...extraProps} />
        }
        else {
            return <Redirect to="/login" />
        }
    }}/>
)

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated,
        isLoading: state.authReducer.loading,
    }
}

export default connect(mapStateToProps)(PrivateRoute);