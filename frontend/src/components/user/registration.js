import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createUser } from '../../requests/actions/user'
import { Form, Input, Row, Col, Button, message } from 'antd'


const { Item } = Form
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 }
}
  
const UserRegistration = props => {
    const [userRegistrationForm] = Form.useForm()
    const history = useHistory();

    const formSubmit = (data) => {
        delete data.confirm
        props.createUser({ ...data }, () => {
            userRegistrationForm.resetFields()
            message.success("Registration Successful")
            history.push("/login");
        })
    }

    return (
        <div style={{ paddingTop: '5vh' }}>
            <Form form={userRegistrationForm} {...layout} style={{ padding: '4vh 5vw 0 5vw' }} onFinish={formSubmit}>
                <Item label="Name" style={{ marginBottom: 0 }} required={true}>
                    <Input.Group>
                        <Row gutter={10}>
                            <Col span={12}>
                                <Item name="first_name" rules={
                                    [{
                                        required: true,
                                        message: 'First Name is required.'
                                    }, {
                                        pattern: /(^$)|(^([^\-!#$%&()*,./:;?@[\\\]_{|}¨ˇ“”€+<=>§°\d\s¤®™©]| )+$)/,
                                        message: 'Enter a valid first name.'
                                    }]
                                }>
                                    <Input placeholder="First Name" maxLength={25} />
                                </Item>
                            </Col>
                            <Col span={12}>
                                <Item name="last_name" rules={
                                    [{
                                        required: true,
                                        message: 'Last Name is required.'
                                    }, {
                                        pattern: /(^$)|(^([^\-!#$%&()*,./:;?@[\\\]_{|}¨ˇ“”€+<=>§°\d\s¤®™©]| )+$)/,
                                        message: 'Enter a valid last name.'
                                    }]
                                }>
                                    <Input placeholder="Last Name" maxLength={25} />
                                </Item>
                            </Col>
                        </Row>
                    </Input.Group>
                </Item>
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
                <Item name="password" label="Password" tooltip="Password should have minimum 8 in length, Atleast One Uppercase, Atleast One Lowercase, Atleast One digit, Atleast One Special Character." hasFeedback rules={
                    [{
                        required: true,
                        message: 'Password is required.'
                    }, {
                        pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                        message: 'Enter a valid password'
                    }]
                }>
                    <Input.Password />
                </Item>
                <Item name="confirm" label="Confirm Password" dependencies={['password']} hasFeedback rules={
                    [{
                        required: true,
                        message: 'Please confirm your password!'
                    }, ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Entered password do not match!'));
                        }
                    })
                    ]
                }>
                    <Input.Password />
                </Item>
                <Item style={{ justifyContent: 'center' }}>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </Item>
            </Form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated,
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps, { createUser })(UserRegistration)
