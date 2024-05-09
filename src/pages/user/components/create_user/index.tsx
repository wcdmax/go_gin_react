import { post, put } from '@/http'
import { Space, App } from 'antd'
import { regexMatch } from '@/util/RegexMatch'
import React, { useRef, useState } from 'react'
import { UserDataItem } from '@/pages/user/data'
import { PlusCircleOutlined, EditOutlined } from '@ant-design/icons'
import { ProFormInstance, ProFormText, ProFormSelect, ModalForm } from '@ant-design/pro-components'

export const CreateUserModal: React.FC<{
    ModalOpen: boolean
    Record?: UserDataItem
    IsCreateUser: boolean
    ReloadTable: () => void
    HandleSetModalOpen: (state: boolean) => void
    UserGroupData: { label: string, value: number }[]
}> = props => {
    const { message } = App.useApp()
    const formRef = useRef<ProFormInstance>()
    const modalTitle = props.IsCreateUser ? '新增用户' : '编辑用户'
    const [ requirePassword, setRequirePassword ] = useState<boolean>(false)
    
    const handleFinish = (record: UserDataItem) => new Promise<boolean>((resolve, reject) => {
        if (props.IsCreateUser) {
            post('/api/v1/user/create', record).then(res => {
                message.success(res.data.msg).then(_ => resolve(true))
            }).catch(_ => reject(false))
        } else {
            put('/api/v1/user/update', { ...record, id: props.Record?.id, avatar: props.Record?.avatar }).then(res => {
                message.success(res?.data?.msg).then(_ => resolve(true))
            }).catch(_ => reject(false))
        }
    })
    
    return (
        <ModalForm
            width={500}
            formRef={formRef}
            autoFocusFirstInput
            submitTimeout={2000}
            open={props.ModalOpen}
            validateTrigger={[ 'onBlur' ]}
            initialValues={{ ...props.Record }}
            onOpenChange={props.HandleSetModalOpen}
            modalProps={{
                centered: true,
                maskClosable: false,
                destroyOnClose: true,
                afterClose: () => {
                    props.ReloadTable()
                    setRequirePassword(false)
                },
            }}
            submitter={{
                searchConfig: {
                    resetText: '重置',
                },
                submitButtonProps: {
                    shape: 'round',
                },
                resetButtonProps: {
                    shape: 'round',
                    type: 'default',
                    onClick: () => formRef.current?.resetFields(),
                },
            }}
            onFinish={formData => handleFinish(formData).then(res => res).catch(err => err)}
            title={props.IsCreateUser
                ? <Space align="center" style={{ marginBottom: '1rem' }}><PlusCircleOutlined />{modalTitle}</Space>
                : <Space align="center" style={{ marginBottom: '1rem' }}><EditOutlined />{modalTitle}</Space>}
        >
            <ProFormText
                hasFeedback
                name="name"
                label="用户名"
                tooltip="你的登录账号"
                placeholder="请输入用户名"
                fieldProps={{ maxLength: 12, showCount: true }}
                rules={[
                    { required: true, message: '请输入用户名' },
                    { type: 'string', pattern: regexMatch.alphaDash, message: '用户名只能是英文或数字与下横线组合' },
                ]}
            />
            <ProFormText
                hasFeedback
                name="cname"
                label="中文名"
                tooltip="你的真实姓名"
                placeholder="请输入用户姓名"
                fieldProps={{ maxLength: 8, showCount: true }}
                rules={[
                    { required: true, message: '请输入用户姓名' },
                    { type: 'string', pattern: regexMatch.chs, message: '用户姓名只能是中文' },
                ]}
            />
            <ProFormSelect
                name="gid"
                hasFeedback
                label="用户组"
                debounceTime={1000}
                tooltip="所属的用户组"
                fieldProps={{ allowClear: false, options: props.UserGroupData }}
                rules={[ { required: true, message: '请选择当前用户所属的用户组' } ]}
            />
            <ProFormText
                hasFeedback
                name="mobile"
                label="手机号"
                tooltip="你的手机号"
                placeholder="请输入手机号码"
                fieldProps={{
                    maxLength: 11,
                    showCount: true,
                }}
                rules={[
                    { required: true, message: '请输入手机号码' },
                    { type: 'string', pattern: regexMatch.mobileNum, message: '请输入正确的手机号码' },
                ]}
            />
            <ProFormText
                hasFeedback
                name="email"
                label="用户邮箱"
                tooltip="你的邮箱"
                placeholder="请输入邮箱地址"
                fieldProps={{ maxLength: 32, showCount: true }}
                rules={[
                    { required: true, message: '请输入用户邮箱地址' },
                    { type: 'email', message: '请输入正确的邮箱地址' },
                ]}
            />
            <ProFormText.Password
                hasFeedback
                name="password"
                label="用户密码"
                tooltip="6~18位的密码"
                fieldProps={{
                    minLength: 6,
                    maxLength: 18,
                    readOnly: true,
                    showCount: true,
                    onFocus: e => e.target.removeAttribute('readonly'),
                    onBlur: e => e.target.setAttribute('readonly', 'true'),
                    onChange: e => (e.target.value ? setRequirePassword(true) : setRequirePassword(false)),
                }}
                rules={[
                    { required: props.IsCreateUser, message: '请为用户设置密码' },
                    {
                        type: 'string',
                        pattern: /^[^\u4e00-\u9fa5\s]{6,18}$/,
                        message: '密码应为6~18位英文、数字及特殊符号且不含制表符的组合',
                    },
                ]}
            />
            <ProFormText.Password
                hasFeedback
                label="确认密码"
                tooltip="再次输入密码"
                name="confirmPassword"
                dependencies={[ 'password' ]}
                fieldProps={{
                    minLength: 6,
                    maxLength: 18,
                    readOnly: true,
                    showCount: true,
                    onFocus: e => e.target.removeAttribute('readonly'),
                    onBlur: e => e.target.setAttribute('readonly', 'true'),
                }}
                rules={[
                    { required: requirePassword, message: '请再次输入以确认用户密码' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || value === getFieldValue('password')) {
                                return Promise.resolve(true)
                            }
                            return Promise.reject(new Error('验证失败，两次输入的密码不一致'))
                        },
                    }),
                ]}
            />
        </ModalForm>
    )
}
