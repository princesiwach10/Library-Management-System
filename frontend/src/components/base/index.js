import Content from './Content'
import { useEffect } from 'react'
import { Layout, Menu } from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { autoLogin } from '../../requests/actions/auth'


const { Header } = Layout
const { Item } = Menu

function Index(props) {
    const { user, autoLogin} = props

    useEffect(() => {
        if (!user) {
            autoLogin()
        }
    })

    return (
        <>
            {
                props.isAuthenticated ?
                    <Layout>
                        <Header style={{ position: 'fixed', zIndex: 1, width: '100%', height: '10vh', lineHeight: '10vh', padding: '0 5vw' }}>
                            <Menu theme='dark' mode="horizontal" defaultSelectedKeys={['1']}>
                                <Item key="1"><Link to="/">Home</Link></Item>
                                <Item key="2"><Link to="/library/book">Library</Link></Item>
                                <Item key="3"><Link to="/logout">Logout</Link></Item>
                            </Menu>
                        </Header>
                        <Content >
                            {props.children}
                        </Content>
                    </Layout> : null
            }
        </>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated,
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps, { autoLogin })(Index)
