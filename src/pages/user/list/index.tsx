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
import { API } from '@/typings'
import { useRequest } from 'ahooks'
import React, { useState, useRef } from 'react'
import { RecordSwitch } from '@/components/switch'
import { Button, Space, Table, App, Avatar } from 'antd'
import { UserGroupDataItem, UserDataItem } from '@/pages/user/data'
import { CreateUserModal } from '@/pages/user/components/create_user'
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'

export const UserList: React.FC = () => {
    const { message } = App.useApp()
    type ExtendUserDataItem = UserDataItem & { userGroup: { role: string } }
    // ActionType
    const ref: React.MutableRefObject<ActionType | undefined> = useRef<ActionType>()
    const [ createUser, setCreateUser ] = useState<boolean>(false)
    const [ modalOpen, setModalOpen ] = React.useState<boolean>(false)
    const [ userData, setUserData ] = useState<ExtendUserDataItem>()
    const [ userGroupData, setUserGroupData ] = useState<{label: string; value: number}[]>(
        [ { label: '只读用户组', value: 4 } ]
    )
    
    useRequest(() => get('/api/v1/user_group/list').then(ret => {
        setUserGroupData(() => ret.data?.list?.map((item: UserGroupDataItem) => ({
            label: item.role,
            value: item.id,
        })))
    }))

    const handleCreate = () => {
        setModalOpen(true)
        setCreateUser(true)
        setUserData(undefined)
    }

    const handleEdit = (record: ExtendUserDataItem) => {
        setUserData(record)
        setModalOpen(true)
        setCreateUser(false)
    }

    const handleDelete = (record: ExtendUserDataItem | ExtendUserDataItem[]) => {
        console.log('handleDelete', record)
        // remove('/api/v1/user/delete', record).then(res => {
        //     message.success(res.data.msg).then()
        // })
    }

    const tableData = async (params: API.ProTableParams, sort: API.ProTableSort, filter: Record<string, any>) => {
        console.log('Filter', filter)
        console.log('Params', params)
        return await get('/api/v1/user/list', { ...params, ...sort, ...filter }).then(res => ({
            success: true,
            total: res.data.total,
            data: res.data.list as ExtendUserDataItem[]
        })).catch(_ => [])
    }

    const columns: ProColumns<ExtendUserDataItem>[] = [
        {
            width: 80,
            title: 'ID',
            dataIndex: 'id',
        },
        {
            width: 150,
            title: '用户名',
            dataIndex: 'name',
            render: (_, record) => (
                <Space>
                    <Avatar size="small" src={record.avatar} style={{ verticalAlign: 'middle' }} >{record.name}</Avatar>
                    <span>{record.name}</span>
                </Space>
            )
        },
        {
            width: 150,
            title: '中文名',
            dataIndex: 'cname',
        },
        {
            width: 150,
            title: '用户组',
            hideInSearch: true,
            render: (_, record: ExtendUserDataItem) => {
                return userGroupData.map(item => {
                    if (item.value == record.gid) {
                        return item.label
                    }
                })
            }
        },
        {
            title: '用户组',
            dataIndex: 'gid',
            hideInTable: true,
            valueType: 'select',
            fieldProps: {
                mode: 'multiple',
                options: userGroupData,
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
            hideInSearch: true,
            dataIndex: 'email',
        },
        {
            width: 150,
            title: 'ip地址',
            hideInSearch: true,
            dataIndex: 'ipaddress',
        },
        {
            width: 200,
            sorter: true,
            title: '最近登录',
            hideInSearch: true,
            render: (_, record) => record?.lastLogin ?? '未曾登录'
        },
        {
            title: '日期范围',
            hideInTable: true,
            dataIndex: 'lastLogin',
            valueType: 'dateTimeRange',
            fieldProps: {
                format: 'YYYY-MM-DD HH:mm:ss',
            },
        },
        {
            width: 150,
            title: '用户状态',
            dataIndex: 'state',
            valueType: 'select',
            valueEnum: {
                1: '启用',
                0: '禁用',
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

    return (
        <>
            <ProTable<ExtendUserDataItem>
                rowKey="id"
                actionRef={ref}
                columns={columns}
                request={tableData}
                search={{
                    filterType: 'light',
                }}
                rowSelection={{
                    selections: [ Table.SELECTION_ALL, Table.SELECTION_INVERT ],
                }}
                tableAlertRender={({ selectedRowKeys, onCleanSelected }) => (
                    <Space size={24}>
                            <span>
                                已选 {selectedRowKeys.length} 项
                                <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
                                    取消选择
                                </a>
                            </span>
                    </Space>
                )}
                pagination={{ pageSize: 15, showQuickJumper: true, hideOnSinglePage: true }}
                headerTitle={
                    <Button shape="round" type="primary" key="createUser" icon={<PlusOutlined />} onClick={handleCreate}>
                        新增用户
                    </Button>
                }
                tableAlertOptionRender={({ selectedRows }) => {
                    return (
                        <Space size={16}>
                            <a onClick={() => handleDelete(selectedRows)}>批量删除</a>
                        </Space>
                    )
                }}
            />
            <CreateUserModal
                ModalOpen={modalOpen}
                Record={userData}
                IsCreateUser={createUser}
                UserGroupData={userGroupData}
                ReloadTable={() => ref.current?.reload()}
                HandleSetModalOpen={state => setModalOpen(state)}/>
        </>
    )
}
