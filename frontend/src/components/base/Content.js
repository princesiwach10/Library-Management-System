import { Layout } from 'antd'

export default function Content(props) {
    return (
        <Layout.Content style={{ marginTop: '10vh', padding: '2vh 5vw 0 5vw', backgroundColor: '#fff' }}>
            <div>
                {props.children}
            </div>
        </Layout.Content>
    )
}
