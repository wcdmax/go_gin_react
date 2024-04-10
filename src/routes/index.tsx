/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2024. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

import { UserList } from '@/pages/user/list'
import { UserMenu } from '@/pages/user/menu'
import { UserGroup } from '@/pages/user/group'
import { Monitor } from '@/pages/dashboard/monitor'
import { Analysis } from '@/pages/dashboard/analysis'
import { Workplace } from '@/pages/dashboard/workplace'
import { Navigate, RouteObject } from 'react-router-dom'

export const routers: RouteObject[] = [
    {
        path: '/user',
        element: <Navigate replace to="/user/list" />,
        children: [
            {
                path: 'list',
                element: <UserList />,
            },
            {
                path: 'menu',
                element: <UserMenu />,
            },
            {
                path: 'group',
                element: <UserGroup />,
            },
        ],
    },
    {
        path: '/dashboard',
        element: <Navigate replace to="/dashboard/analysis" />,
        children: [
            {
                path: 'monitor',
                element: <Monitor />,
            },
            {
                path: 'analysis',
                element: <Analysis />,
            },
            {
                path: 'workplace',
                element: <Workplace />,
            },
        ],
    },
]
