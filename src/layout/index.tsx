/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2024. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { DashboardOutlined, UserOutlined } from '@ant-design/icons'
import type { ProLayoutProps, ProSettings } from '@ant-design/pro-components'
import { PageContainer, DefaultFooter, GridContent, ProLayout } from '@ant-design/pro-components'

export const Layout: React.FC<ProLayoutProps> = ({ children }) => {
    const settings: Partial<ProSettings> | undefined = {
        layout: 'mix',
        fixSiderbar: true,
        contentWidth: 'Fluid',
    }
    const currentYear = new Date().getFullYear()
    const [ pathname, setPathname ] = useState<string>('/dashboard/analysis')

    return (
        <ProLayout
            {...settings}
            siderWidth={255}
            menu={{ type: 'sub' }}
            location={{ pathname }}
            waterMarkProps={{ content: 'Tiger System' }}
            token={{
                sider: {
                    colorTextMenu: '#595959',
                    colorTextMenuActive: '#242424',
                    colorMenuItemDivider: '#dfdfdf',
                    colorBgMenuItemHover: '#f6f6f6',
                    colorTextMenuSelected: 'rgba(42,122,251,1)',
                    colorBgMenuItemSelected: 'rgba(230,243,254,1)',
                },
            }}
            breadcrumbRender={routers => {
                return [ { breadcrumbName: '首页', path: '/' } ].concat(routers as any)
            }}
            menuItemRender={(item, dom) => {
                return (
                    <Link to={item.path!} onClick={() => setPathname(item.path || '/')}>
                        {dom}
                    </Link>
                )
            }}
            route={{
                path: '/',
                children: [
                    {
                        name: '仪表盘',
                        path: '/dashboard',
                        icon: <DashboardOutlined />,
                        children: [
                            {
                                name: '分析页',
                                path: '/dashboard/analysis',
                            },
                            {
                                name: '监控页',
                                path: '/dashboard/monitor',
                            },
                            {
                                name: '工作台',
                                path: '/dashboard/workplace',
                            },
                        ],
                    },
                    {
                        path: '/user',
                        name: '用户管理',
                        icon: <UserOutlined />,
                        children: [
                            {
                                name: '用户列表',
                                path: '/user/list',
                            },
                            {
                                name: '用户菜单',
                                path: '/user/menu',
                            },
                            {
                                name: '用户组列表',
                                path: '/user/group',
                            },
                        ],
                    },
                ],
            }}
            avatarProps={{
                src: 'https://static.brandsz.cn/avatar/2022-10-21/9713cd741666341786.jpg',
                size: 'small',
                title: 'Kevin',
            }}
            bgLayoutImgList={[
                {
                    src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                    left: 85,
                    bottom: 100,
                    height: '303px',
                },
                {
                    src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                    bottom: -68,
                    right: -45,
                    height: '303px',
                },
                {
                    src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
                    bottom: 0,
                    left: 0,
                    width: '331px',
                },
            ]}
            footerRender={() => {
                return (
                    <DefaultFooter
                        copyright={`2018 - ${currentYear} 深圳市如虎科技有限公司  All Rights Reserved`}
                        links={[
                            {
                                key: '立讯检测官网',
                                title: '立讯检测',
                                href: 'https://sz.lcs-cert.com',
                                blankTarget: true,
                            },
                            {
                                key: '|',
                                title: '|',
                                href: 'javascrip:',
                            },
                            {
                                key: '如虎科技官网',
                                title: '如虎科技',
                                href: 'https://www.tigervs.com',
                                blankTarget: true,
                            },
                        ]}
                    />
                )
            }}
            menuFooterRender={props => {
                if (props?.collapsed) return undefined
                return (
                    <div
                        style={{
                            textAlign: 'center',
                            paddingBlockStart: 12,
                        }}
                    >
                        <div>© Shenzhen Tiger Technology Co., Ltd.</div>
                    </div>
                )
            }}
        >
            <PageContainer
                header={{
                    subTitle: 'This is a subtitle',
                }}
                token={{
                    paddingInlinePageContainerContent: 16,
                }}
            >
                <GridContent>{children}</GridContent>
            </PageContainer>
        </ProLayout>
    )
}
