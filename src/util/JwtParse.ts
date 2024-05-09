import { API } from '@/typings'

export const decodeBase64Url = (jwt: string) => {
    const output = jwt.replace(/-/g, '+').replace(/_/g, '/')
    return window.atob(output)
}

export const decodeJwtPayload = (jwt: string) => {
    return new Promise<API.JwtPayloadProp>((resolve, reject) => {
        const parts = jwt.split('.')
        if (parts.length !== 3) {
            reject(new Error(`Invalid JWT payload: ${jwt}.`))
        }

        const encodedPayload = parts[1] // 解析payload部分
        const decodedPayload = decodeBase64Url(encodedPayload)

        try {
            const jsonPayload = JSON.parse(decodedPayload)
            resolve(jsonPayload)
        } catch (error) {
            reject(new Error('Invalid JWT payload: failed to parse json.'))
        }
    })
}
