/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2024. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

import React from 'react'
import { App } from 'antd'
import { Button, Space } from 'antd'
import { incrementByAmount } from '@/redux/foo'
import { useDispatch, useSelector } from 'react-redux'

export const Workplace: React.FC = () => {
    const dispatch = useDispatch()
    const { value } = useSelector((state: Record<string, any>) => state.FooSlice)
    const { notification, message, modal } = App.useApp()

    return (
        <>
            <p>count: {value}</p>
            <Space>
                <Button onClick={() => dispatch(incrementByAmount(2))}>增加</Button>
                <Button onClick={() => modal.info({ content: '我操', centered: true })}>ShowModal</Button>
                <Button onClick={() => message.open({ type: 'error', content: '妈的，出错了' })}>ShowMessage</Button>
                <Button onClick={() => notification.open({ type: 'info', message: '妈的，是我' })}>ShowNotification</Button>
            </Space>
        </>
    )
}
