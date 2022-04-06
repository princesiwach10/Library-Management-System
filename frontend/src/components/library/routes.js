import Book from './book'
import { useRouteMatch, Route } from 'react-router-dom'

const Routes = props => {
    const { path } = useRouteMatch()
    return (
        <>
            <Route path={`${path}/book`} component={Book} />
        </>
    )
}

export default Routes