/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2024. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

import axios from 'axios'
import { message } from 'antd'
import type { AxiosResponse } from 'axios'

axios.defaults.timeout = 10000
// axios.defaults.baseURL = 'https://test.brandsz.cn/api/v1'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use(
    options => {
        const url = options.url
        if (url == '/api/v1/home/login' || url == '/api/v1/home/refresh_token') {
            return options
        }
        return options
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
        message.error?.(error.response.data.msg)
        return Promise.reject(error)
    },
)

/**
 * put 请求
 * @param url string
 * @param data Record<string, any>
 */
export const put = (url: string, data: Record<string, any>) => {
    return new Promise<Omit<AxiosResponse, 'data'> & { data: API.BasicResponseSchema }>((resolve, reject) => {
        axios.put(url, data).then((response: Omit<AxiosResponse, 'data'> & { data: API.BasicResponseSchema }) => resolve(response)).catch(error => reject(error))
    })
}

/**
 * post 请求
 * @param url string
 * @param data Record<string, any>
 */
export const post = (url: string, data: Record<string, any>) => {
    return new Promise<Omit<AxiosResponse, 'data'> & { data: API.BasicResponseSchema }>((resolve, reject) => {
        axios.post(url, data).then((response: Omit<AxiosResponse, 'data'> & { data: API.BasicResponseSchema }) => resolve(response)).catch(error => reject(error))
    })
}

/**
 * path 请求
 * @param url string
 * @param data Record<string, any>
 */
export const path = (url: string, data: Record<string, any>) => {
    return new Promise<Omit<AxiosResponse, 'data'> & { data: API.BasicResponseSchema }>((resolve, reject) => {
        axios.patch(url, data).then((response: Omit<AxiosResponse, 'data'> & { data: API.BasicResponseSchema }) => resolve(response)).catch(error => reject(error))
    })
}

/**
 * delete 方法
 * @param url string
 * @param data Record<string, any>
 */
export const remove = (url: string, data: Record<string, any>) => {
    return new Promise<Omit<AxiosResponse, 'data'> & { data: API.BasicResponseSchema }>((resolve, reject) => {
        axios.delete(url, data).then((response: Omit<AxiosResponse, 'data'> & { data: API.BasicResponseSchema }) => resolve(response)).then(error => reject(error))
    })
}

/**
 * get 请求
 * @param url string
 * @param params Record<string, any>
 */
export const get = (url: string, params: Record<string, any>) => {
    return new Promise<Omit<AxiosResponse, 'data'> & { data: API.BasicResponseSchema }>((resolve, reject) => {
        axios.get(url, { params: params }).then((response: Omit<AxiosResponse, 'data'> & { data: API.BasicResponseSchema }) => resolve(response)).catch(error => reject(error))
    })
}
