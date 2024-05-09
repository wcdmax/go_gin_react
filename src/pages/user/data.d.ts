/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2024. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

export type UserDataItem = {
    id: number
    gid: number
    name: string
    cname: string
    state: number
    email: string
    avatar: string
    ipaddress: string
    lastLogin: string
    create_time: string
    update_time: string
};

export type UserGroupDataItem = {
    id: number
    role: string
    state: number
    menu: string | number[]
};
