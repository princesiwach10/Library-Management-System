import UserRoutes from '../user/routes'
import Login from '../user/login'
import Public from './publicRoute'
import Base from '../base/unAuthBase'
import { Route, Redirect } from 'react-router-dom'

const Default = () => (
    <Redirect to="/login" />
)

const UnauthRoutes = () => {
    return (
        <Base>
            <Route path="/user" ><UserRoutes /></Route>
            <Public path Comp={Default} />
            <Public exact path="/login" Comp={Login} />
        </Base>
    )
}

export default UnauthRoutes