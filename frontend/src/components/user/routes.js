import UserRegistration from './registration'
import { useRouteMatch, Route } from 'react-router-dom'

const Routes = props => {
    const { path } = useRouteMatch()
    return (
        <>
            <Route path={`${path}/registration`} component={UserRegistration} />
        </>
    )
}

export default Routes