/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2024. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

import App from './App'
import React from 'react'
import store from './store'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import { ConfigProvider, App as Antd } from 'antd'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <ConfigProvider>
        <Antd message={{ maxCount: 1 }} notification={{ placement: 'topRight' }}>
            <Provider store={store}>
                <App />
            </Provider>
        </Antd>
    </ConfigProvider>,
)
