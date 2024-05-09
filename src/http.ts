/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2024. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

import dayjs from 'dayjs'
import { message } from 'antd'
import { API } from '@/typings'
import { history } from '@/components/history'
import { decodeJwtPayload } from '@/util/JwtParse'
import axios, { AxiosResponse, AxiosError } from 'axios'

axios.defaults.timeout = 10000
let isRefreshing = false
// axios.defaults.baseURL = 'https://test.brandsz.cn/api/v1'

type BasicResponse = Omit<AxiosResponse, 'data'> & { data: API.BasicResponseSchema }
type BasicError = Omit<AxiosError['response'], 'data'> & { response: { data: API.BasicResponseSchema } }

axios.interceptors.request.use(
    async config => {
        let expTime = 0
        // 存储请求队列
        let requestQueue: any[] = []
        const now = dayjs()
        const ignoreUrl: string[] = [
            '/api/v1/home/login',
            '/api/v1/home/refresh_token'
        ]
        const { url } = config

        // 如果是登录或刷新令牌则直接返回
        if (ignoreUrl.includes(url as string)) return config

        const access_token = localStorage.getItem('access_token')

        if (!access_token) {
            history.push('/login')
            return Promise.reject(new Error('Access token not found.'))
        }

        await decodeJwtPayload(access_token).then(jwtPayload => {
            expTime = jwtPayload.exp
        }).catch(errer => {
            return Promise.reject(errer)
        })

        if (dayjs.unix(expTime).isBefore(now)) {
            if (!isRefreshing) {
                isRefreshing = true
                try {
                    const res = await axios.post('/api/v1/home/refresh_token', {
                        refresh_token: localStorage.getItem('refresh_token')
                    })

                    const new_access_token = res.data.info.access_token

                    config.headers.Authorization = new_access_token
                    localStorage.setItem('access_token', new_access_token)

                    requestQueue.forEach(cb => cb(new_access_token))
                } catch (error) {
                    localStorage.clear()
                    history.push('/login')
                    return Promise.reject(new Error('Failed to refresh token.'))
                } finally {
                    requestQueue = []
                    isRefreshing = false
                }
            } else {
                return new Promise(resolve => {
                    requestQueue.push((new_access_token: string) => {
                        config.headers.Authorization = new_access_token
                        resolve(config)
                    })
                })
            }
        }

        config.headers.Authorization = localStorage.getItem('access_token')
        return config
    },
    error => {
        return Promise.reject(error)
    },
)

axios.interceptors.response.use(
    response => {
        return response
    },
    error => {
        const { response } = error
        if (402 === response?.status) { // 严重错误
            message.error(response?.data?.msg).then(_ => {
                localStorage.clear()
                history.push('/login')
            })
        }
        
        if (axios.isAxiosError(error)) { // 一般错误
            const axiosError = error as BasicError
            axiosError?.response && message.error(axiosError?.response?.data?.msg)
        }

        return Promise.reject(error)
    },
)

/**
 * put 请求
 * @param url string
 * @param data Record<string, any>
 */
export const put = (url: string, data: Record<string, any>) => {
    return new Promise<BasicResponse>((resolve, reject) => {
        axios.put(url, data).then((response: BasicResponse) => resolve(response)).catch(error => reject(error))
    })
}

/**
 * post 请求
 * @param url string
 * @param data Record<string, any>
 */
export const post = (url: string, data: Record<string, any>) => {
    return new Promise<BasicResponse>((resolve, reject) => {
        axios.post(url, data).then((response: BasicResponse) => resolve(response)).catch(error => reject(error))
    })
}

/**
 * delete 方法
 * @param url string
 * @param data Record<string, any>
 */
export const remove = (url: string, data: Record<string, any>) => {
    return new Promise<BasicResponse>((resolve, reject) => {
        axios.delete(url, data).then((response: BasicResponse) => resolve(response)).then(error => reject(error))
    })
}

/**
 * get 请求
 * @param url string
 * @param params Record<string, any>
 */
export const get = (url: string, params?: Record<string, any>) => {
    return new Promise<BasicResponse>((resolve, reject) => {
        axios(url, { params: params }).then((response: BasicResponse) => resolve(response)).catch(error => reject(error))
    })
}
