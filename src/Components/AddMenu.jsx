import React, { useEffect, useState } from 'react'
import { Alert, Button, Form, Input, Select } from 'antd';
import userServices from '../services/userServices';
import openNotification from '../hooks/openNotification';
import TextArea from 'antd/lib/input/TextArea';
import { useSelector } from 'react-redux';
import { CloseCircleTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
import docServices from '../services/docServices';

const { Option } = Select

const layout = {
    labelCol: {
        span: 2,
    },
    wrapperCol: {
        span: 10,
    },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
};

export default function AddMenu(props) {
    const token = useSelector(state => state.auth.token)
    const onFinish = (values) => {
        docServices.addNewMenu(token, values.menu)
            .then(
                (res) => {
                    console.log(res)
                    if (res.success) {
                        openNotification(<CheckCircleTwoTone twoToneColor={'green'} />, 'Notifications!', res.message)
                    } else {
                        console.log(res)
                        openNotification(<CloseCircleTwoTone twoToneColor={'red'} />, 'Notifications!', res.message)
                    }
                }
            )
            .catch(err => {
                openNotification(<CloseCircleTwoTone twoToneColor={'red'} />, 'Notifications!', err.response.data.message)
            }
            )
    }


    return (
        <div>
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} >
                <Form.Item
                    name={['menu', 'code']}
                    label="Menu Code"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={['menu', 'name']}
                    label="T??n menu"
                    rules={[
                        {
                            required: true
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={['menu', 'note']}
                    label='Ghi ch??'
                >
                    <TextArea />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
                    <Button type='ghost' htmlType="submit">
                        Th??m Menu
                    </Button>
                </Form.Item>
            </Form> 
        </div>
    )
}
