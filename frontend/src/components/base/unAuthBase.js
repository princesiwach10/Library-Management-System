import React from 'react'
import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'

const { Content, Header } = Layout
const { Item } = Menu

function UnAuthBase(props) {
    return (
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%', height: '10vh', lineHeight: '10vh', padding: 0 }}>
                <Menu style={{display: 'flex', position: 'relative', justifyContent: 'center'}} mode="horizontal" defaultSelectedKeys={['1']}>
                    <Item key="1" ><Link to="/login" >Login</Link></Item>
                    <Item key="2" ><Link to="/user/registration" >Registration</Link></Item>
                </Menu>
            </Header>
            <Content style={{ height: 'auto', marginTop: '10vh', padding: '0 5vw', backgroundColor: 'white' }}>
                {props.children}
            </Content>
        </Layout>
    )
}

export default UnAuthBase