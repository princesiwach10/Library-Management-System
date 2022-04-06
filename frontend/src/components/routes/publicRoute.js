import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PublicRoute = ({ Comp, isAuthenticated, isLoading, extraProps, ...rest }) => (
    <Route {...rest} render={props => {
        if (isAuthenticated) {
            return <Redirect to="" />
        }
        else {
            return <Comp {...props} {...extraProps} />
        }
    }} />
)

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated,
        isLoading: state.authReducer.loading,
    }
}

export default connect(mapStateToProps)(PublicRoute);