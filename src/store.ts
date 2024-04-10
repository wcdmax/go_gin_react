/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2024. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

import FooSlice from '@/redux/foo'
import AntdSlice from '@/redux/antd'
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
    reducer: {
        FooSlice,
        AntdSlice,
    },
})
