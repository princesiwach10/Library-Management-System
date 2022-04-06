import { Tabs } from 'antd';
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import { Table, Button, Form, Input, message, Row } from 'antd'
import { getBooks, addBook, updateBook, deleteBook } from '../../requests/actions/library'


const { TabPane } = Tabs
const { Item } = Form
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 }
}

const Book = (props) => {
    const { getBooks, addBook, updateBook, deleteBook } = props

    useEffect(() => {
        getBooks()
    }, [getBooks])

    const [state, setState] = useState({
        activeTab: '1',
        latestBookId: null,
        currentBookId: null,
        currentBook: null,
    })

    const [bookForm] = Form.useForm()

    const tableColumns = [
        {
            title: "Id",
            dataIndex: "id",
            sorter: (a, b) => a.id - b.id,
            render: (text, record) => props.user.is_superuser ? <Button type="link" onClick={() => { setBookId(record.id) }}>{text}</Button> : <p>{text}</p>
            
        },
        {
            title: "Name",
            dataIndex: "name",
            sorter: (current, other) => {
                current = current.name || ''
                other = other.name || ''
                return current.localeCompare(other)
            },
        },
        {
            title: "Section",
            dataIndex: "section",
            sorter: (current, other) => {
                current = current.parent_name || ''
                other = other.parent_name || ''
                return current.localeCompare(other)
            },
        },
        {
            title: "Action",
            render: (text, record) => props.user.is_superuser ? <Button type="link" onClick={() => { removeBook(record.id) }}>Delete</Button> : <p>No Action</p>,
        },
    ]

    const setBookId = id => {
        var current = props.books.find(item => item.id === parseInt(id))
        if (current) {
            setState({
                currentBookId: current.id,
                currentBook: current,
                activeTab: "2"
            })
            bookForm.setFieldsValue(current)
        } else {
            message.warn('No Book is present with this Book Id')
        }
    }

    const removeBook = id => {
        deleteBook(id, submitCallback)
    }

    const submitForm = (data) => {
        bookForm.validateFields().then((onfulfilled) => {
            if (state.currentBook) {
                var book = props.books.find(item => item.id === state.currentBook.id)
                var book_data = bookForm.getFieldsValue()
                updateBook(book.id, book_data, submitCallback)
            }
            else {
                addBook(data, submitCallback)
            }
        })
    }

    const submitCallback = () => {
        bookForm.resetFields()
        getBooks()
        setState({
            activeTab: '1'
        })
    }

    const resetBookFormFields = () => {
        bookForm.resetFields()
        setState({
            bookCategory: null,
            currentbookId: null,
            activeTab: "2"
        })
    }
    
    const changeTab = key => {
        setState({
            activeTab: key
        })
    }

    const { activeTab } = state

    return (
        <Tabs centered defaultActiveKey="1" activeKey={activeTab} onChange={changeTab}>
            <TabPane tab="Books" key="1">
                <Table style={{ display: 'flex', justifyContent: 'center', paddingBottom: '10vh' }} columns={tableColumns} dataSource={props.books} pagination={false} />
            </TabPane>
            {props.user.is_superuser ?
            <TabPane tab="Manage" key="2">
            <Form form={bookForm} {...layout} style={{ padding: '5vh 5vw 0 5vw' }} onFinish={submitForm}>
                {state.currentBookId ?
                <Item label='Book id.' name='id'>
                    <Input disabled />
                </Item> :  null }
                <Item name="name" label="Book Name" >
                    <Input />
                </Item>
                <Item name="section" label="Book Section" >
                    <Input />
                </Item>
                <Item style={{ justifyContent: 'center' }}>
                    <Row gutter={10}>
                    {state.currentBook ?
                            <Button type="primary" htmlType="submit" style={{ background: "#4A9D45", borderColor: "#4A9D45" }} >Update Book</Button>
                            : <Button type="primary" htmlType="submit" >Add Book</Button>}
                        <Button type="dashed" danger onClick={resetBookFormFields}>Reset</Button>
                    </Row>
                </Item>
            </Form>
        </TabPane> : null}
        </Tabs>
    )
}

const mapStateToProps = state => {
    return {
        books: state.libraryReducer.books,
        user: state.authReducer.user
    }
}

export default connect(mapStateToProps, { getBooks, addBook, updateBook, deleteBook })(Book)