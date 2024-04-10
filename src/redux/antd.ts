/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2024. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

import { createSlice } from '@reduxjs/toolkit'
import type { NotificationArgsProps, MessageArgsProps } from 'antd'

interface AntdStateProps {
    message?: MessageArgsProps
    notification?: NotificationArgsProps
}

const AntdInitialState: AntdStateProps = {
    message: undefined,
    notification: undefined,
}

const AntdSlice = createSlice({
    name: 'antd',
    initialState: AntdInitialState,
    reducers: {
        setMessage: (state: Pick<AntdStateProps, 'message'>, action: { payload: AntdStateProps['message'] }) => {
            state.message = action.payload
        },
    },
})

export default AntdSlice.reducer
export const { setMessage } = AntdSlice.actions
