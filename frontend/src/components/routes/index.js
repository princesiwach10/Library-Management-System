import AuthRoutes from "./AuthRoutes"
import UnAuthRoutes from "./unAuthRoutes"
import { connect } from "react-redux"
import { Switch } from "react-router-dom"

function Main(props) {
  return (
    <Switch>{props.isAuthenticated ? <AuthRoutes /> : <UnAuthRoutes />}</Switch>
  )
}

const mapState = (state) => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated
  }
}
 
export default connect(mapState, {})(Main);