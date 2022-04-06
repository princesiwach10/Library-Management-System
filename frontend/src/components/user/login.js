import { connect } from 'react-redux'
import { Button, Form, Input } from 'antd'
import { Redirect } from 'react-router-dom';
import { loginUser } from "../../requests/actions/auth";

const { Item } = Form
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 }
}

const LoginForm = props => {
    const submitForm = data => {
        props.loginUser(data)
    }

    return (
        <>
            {
                props.isAuthenticated ? <Redirect to="" /> :
                <Form {...layout} onFinish={submitForm} style={{ paddingTop: '12vh' }} >
                    <Item name="email" label="Email" rules={
                        [{
                            required: true,
                            message: 'Email is required.',
                        }, {
                            type: 'email',
                            message: 'Enter a valid email address.'
                        }]
                    }>
                        <Input />
                    </Item>
                    <Item name="password" label="Password" rules={
                        [{
                            required: true,
                            message: 'Password is required.'
                        }]
                    }>
                        <Input.Password />
                    </Item>
                    <Item style={{ justifyContent: 'center' }}>
                        <Button htmlType="submit" type="primary" >Submit</Button>
                    </Item>
                </Form>
            }
        </>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated
    }
}

export default connect(mapStateToProps, { loginUser })(LoginForm)