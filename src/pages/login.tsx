/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2024. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

import { post } from '@/http'
import type { TabsProps } from 'antd'
import React, { useState } from 'react'
import { message, theme, Tabs } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { LockOutlined, MobileOutlined, UserOutlined } from '@ant-design/icons'
import { ProConfigProvider, ProFormCaptcha, ProFormCheckbox, ProFormText, LoginForm } from '@ant-design/pro-components'

type LoginType = 'phone' | 'account'

export const Login: React.FC = () => {
    const items: TabsProps['items'] = [
        { key: 'account', label: '账号登录' },
        { key: 'phone', label: '手机登录' },
    ]
    const navigate = useNavigate()
    const { token } = theme.useToken()
    const { redirect } = useParams()
    const [ messageApi, contextHolder ] = message.useMessage()
    const [ loginType, setLoginType ] = useState<LoginType>('account')

    const handleLogin = async (values: Record<string, any>) => {
        await post('/api/v1/home/login', values).then(ret => {
                localStorage.setItem('uid', ret.data.info?.uid)
                localStorage.setItem('username', ret.data.info?.username)
                localStorage.setItem('access_token', ret.data.info?.access_token)
                localStorage.setItem('refresh_token', ret.data.info?.refresh_token)
                messageApi.success(ret.data.msg).then(() => navigate(redirect || '/dashboard/analysis'))
            }).catch(e => console.log(e.response.data.msg))
    }

    return (
        <ProConfigProvider hashed={false}>
            {contextHolder}
            <div
                style={{
                    backgroundColor: token.colorBgContainer,
                    backgroundImage: 'url(https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr)',
                }}
            >
                <LoginForm
                    logo="/logo.png"
                    title="Tiger System"
                    subTitle="Power By ShenZhen Tigervs Technology Co., Ltd"
                    onFinish={values => handleLogin(values)}
                >
                    <Tabs items={items} activeKey={loginType} onChange={activeKey => setLoginType(activeKey as LoginType)} />
                    {loginType === 'account' && (
                        <>
                            <ProFormText
                                name="username"
                                placeholder={'account'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入用户名',
                                    },
                                ]}
                                fieldProps={{
                                    size: 'large',
                                    prefix: <UserOutlined className={'prefixIcon'} />,
                                }}
                            />
                            <ProFormText.Password
                                name="password"
                                placeholder={'password'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入用户密码',
                                    },
                                ]}
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined className={'prefixIcon'} />,
                                }}
                            />
                        </>
                    )}
                    {loginType === 'phone' && (
                        <>
                            <ProFormText
                                fieldProps={{
                                    size: 'large',
                                    prefix: <MobileOutlined className={'prefixIcon'} />,
                                }}
                                name="mobile"
                                placeholder={'手机号'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入手机号！',
                                    },
                                    {
                                        pattern: /^1\d{10}$/,
                                        message: '手机号格式错误！',
                                    },
                                ]}
                            />
                            <ProFormCaptcha
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined className={'prefixIcon'} />,
                                }}
                                captchaProps={{
                                    size: 'large',
                                }}
                                placeholder={'请输入验证码'}
                                captchaTextRender={(timing, count) => {
                                    if (timing) {
                                        return `${count} 获取验证码`
                                    }
                                    return '获取验证码'
                                }}
                                name="captcha"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入验证码！',
                                    },
                                ]}
                                onGetCaptcha={async () => {
                                    message.success('获取验证码成功！验证码为：1234')
                                }}
                            />
                        </>
                    )}
                    <div
                        style={{
                            marginBlockEnd: 24,
                        }}
                    >
                        <ProFormCheckbox noStyle name="autoLogin">
                            自动登录
                        </ProFormCheckbox>
                        <a href="/" style={{ float: 'right' }}>
                            忘记密码
                        </a>
                    </div>
                </LoginForm>
            </div>
        </ProConfigProvider>
    )
}
