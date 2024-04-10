/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2024. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

import { get } from '@/http'
import { Button, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { ProColumns } from '@ant-design/pro-components'
import { RecordSwitch } from '@/components/RecordSwitch'
import { groupDataItem, UserDataItem } from '@/pages/user/data'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

export const UserList: React.FC = () => {
    const [ userGroup, setUserGroup ] = useState<{label: string; value: number}[]>([])
    
    useEffect(() => {
        get('/user_group/list', {}).then(ret => {
            setUserGroup(() => {
                return ret.data?.list?.map((item: groupDataItem) => ({
                    label: item.name,
                    value: item.id,
                }))
            })
        }).catch(err => console.log(err))
    })

    const handleEdit = (record: UserDataItem) => {
        console.log('handleEdit', record)
    }

    const handleDelete = (record: UserDataItem) => {
        console.log('handleDelete', record)
    }

    const columns: ProColumns<UserDataItem>[] = [
        {
            width: 80,
            title: 'ID',
            dataIndex: 'id',
        },
        {
            width: 150,
            title: '用户名',
            dataIndex: 'name',
        },
        {
            width: 150,
            title: '中文名',
            dataIndex: 'cname',
        },
        {
            width: 150,
            title: '用户组',
            dataIndex: [ 'group', 'name' ],
        },
        {
            title: '用户组',
            dataIndex: 'gid',
            hideInTable: true,
            valueType: 'select',
            fieldProps: {
                mode: 'multiple',
                options: userGroup,
            },
        },
        {
            width: 150,
            title: '手机号',
            dataIndex: 'mobile',
        },
        {
            width: 150,
            title: 'Email',
            dataIndex: 'email',
        },
        {
            width: 150,
            title: 'ip地址',
            dataIndex: 'ipaddress',
        },
        {
            width: 200,
            sorter: true,
            title: '最近登录',
            dataIndex: 'update_time',
        },
        {
            title: '日期范围',
            hideInTable: true,
            dataIndex: 'dateRange',
            valueType: 'dateRange',
            fieldProps: {
                showNow: true,
                showTime: true,
                format: 'YYYY-MM-DD HH:mm:ss',
            },
        },
        {
            width: 150,
            filters: true,
            search: false,
            onFilter: true,
            title: '用户状态',
            filterMode: 'tree',
            dataIndex: 'status',
            valueType: 'select',
            valueEnum: {
                1: {
                    text: '启用',
                    status: 'Show',
                },
                0: {
                    text: '禁用',
                    status: 'Hide',
                },
            },
            render: (_, record) => <RecordSwitch record={record} url={'/user/status'} echoChecked={'启用'} echoUnChecked={'禁用'} />,
        },
        {
            width: 200,
            title: '操作',
            search: false,
            fixed: 'right',
            render: (_, record) => [
                <Space size={4} key="operation">
                    <Button size="small" shape="round" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                        编辑
                    </Button>
                    <Button danger size="small" type="primary" shape="round" icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>
                        删除
                    </Button>
                </Space>,
            ],
        },
    ]

    return <p>UserList</p>
}
