/*
 * +----------------------------------------------------------------------------------
 * | https://www.tigervs.com
 * +----------------------------------------------------------------------------------
 * | Email: Kevin@tigervs.com
 * +----------------------------------------------------------------------------------
 * | Copyright (c) Shenzhen Tiger Technology Co., Ltd. 2018~2024. All rights reserved.
 * +----------------------------------------------------------------------------------
 */

import { post } from '@/http'
import { Switch, App } from 'antd'
import React, { useState } from 'react'

export const RecordSwitch: React.FC<{
    url: string
    fieldKey?: string
    disabled?: boolean
    echoChecked?: string
    echoUnChecked?: string
    statusField?: number | boolean
    record: { id?: number | string; state?: number | string }
}> = props => {
    const { message } = App.useApp()
    const fieldKey: string = props?.fieldKey ?? 'state'
    /* 开关状态 */
    const isDisabled: boolean = props?.disabled ?? false
    /* echoChecked */
    const echoChecked: string = props?.echoChecked ?? '显示'
    /* echoUnChecked */
    const echoUnChecked: string = props?.echoUnChecked ?? '隐藏'
    /* statusField */
    const statusField: number | string | boolean | undefined = props?.statusField ?? props.record.state
    /* loading... */
    const [ loadings, setLoadings ] = useState<boolean>(false)

    /**
     * 设置栏目状态
     * @param e 事件
     * @param checked 状态
     * @param record 当前记录
     */
    const handleChange = (checked: boolean, e: React.MouseEvent<HTMLButtonElement, MouseEvent>, record: Record<string, any>) => {
        /* 阻止事件冒泡 */
        e.stopPropagation()
        setLoadings(true)
        post(props.url, { id: record.id, [fieldKey]: checked ? 1 : 0 }).then(res => {
            message.success(res.data.msg).then(() => setLoadings(false))
        })
    }
    return (
        <Switch
            loading={loadings}
            key={props.record.id}
            disabled={isDisabled}
            checkedChildren={echoChecked}
            defaultChecked={!!statusField}
            unCheckedChildren={echoUnChecked}
            onChange={(checked, event) => handleChange(checked, event, props.record)}
        />
    )
}
