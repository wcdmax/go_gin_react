/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2024. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

declare namespace API {
    interface LoginResponse {
        uid: number
        usename: string
        accessToken: string
        refreshToken: string
        accessTokenExpAt: string
        refreshTokenExpAt: string
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
}
