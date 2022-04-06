import Base from '../base'
import Logout from '../user/logout'
import LibraryRoutes from '../library/routes'
import PrivateRoute from './privateRoute'
import { Route, Redirect } from 'react-router-dom'

const Default = () => (
    <Redirect to="" />
)

const AuthRoutes = props => {
    return (
        <Base>
            <PrivateRoute path Comp={Default} />
            <PrivateRoute exact path="/logout" Comp={Logout} />
            <Route path="/library"><LibraryRoutes /></Route>
        </Base>
    )
}

export default AuthRoutes