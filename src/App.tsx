/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2024. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

import './basic.less'
import { Layout } from './layout'
import { Login } from './pages/login'
import { UserList } from './pages/user/list'
import { UserMenu } from './pages/user/menu'
import { UserGroup } from './pages/user/group'
import { Monitor } from './pages/dashboard/monitor'
import { Analysis } from './pages/dashboard/analysis'
import { Workplace } from './pages/dashboard/workplace'
import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom'

// prettier-ignore
export default () => {

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route index path="/" element={<Navigate to="/login" />} />
                <Route path="/user/list" element={<Layout><UserList /></Layout>} />
                <Route path="/user/menu" element={<Layout><UserMenu /></Layout>} />
                <Route path="/user/group" element={<Layout><UserGroup /></Layout>} />
                <Route path="/dashboard/monitor" element={<Layout><Monitor /></Layout>} />
                <Route path="/dashboard/analysis" element={<Layout><Analysis /></Layout>} />
                <Route path="/dashboard/workplace" element={<Layout><Workplace /></Layout>} />
            </Routes>
        </Router>
    )
}
