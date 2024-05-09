/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2024. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

import { SortOrder } from 'antd/es/table/interface'
import { ParamsType } from '@ant-design/pro-components'

declare namespace API {
    interface LoginResponse {
        uid: number
        usename: string
        access_token: string
        refresh_token: string
    }

    interface JwtPayloadProp {
        ip: string
        iss: string
        sub: string
        uid: number
        exp: number
        nbf: number
        iat: number
        jti: string
        aud: string[]
        username: string
        tokenType: string
        userAgent: string
    }

    interface BasicResponseSchema {
        msg: string
        code: number
        path: string
        method: string
        total?: number
        success: boolean
        info?: Record<string, any>
        list?: Record<string, any>
    }

    export type ProTableSort = Record<string, SortOrder>

    export type ProTableParams = ParamsType & { pageSize?: number | undefined; current?: number | undefined; keyword?: string | undefined; }
}
