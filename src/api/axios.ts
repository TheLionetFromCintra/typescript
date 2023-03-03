import axios from 'axios'
import getUser from './getUser'

import { useAppStore } from '@/stores/app/AppStore'

interface Options {
    data?: any
    params?: object
    method?: string
}

const api = axios.create({
    withCredentials: true,
})

function apiCaller(path: string, options: Options, index = 0) {
    const { data = {}, params = {}, method = 'get' } = options

    if (method === 'post') {
        api.interceptors.request.use((config) => {
            const appStore = useAppStore()
            data.csrf = appStore.csrf
            return config
        })
    }

    return new Promise((resolve, reject) => {
        api({
            url: `/api/${path}`,
            method,
            data,
            params,
        })
            .then(async ({ data }) => {
                const { csrf, code_value } = data

                api.interceptors.request.use((config) => {
                    const appStore = useAppStore()
                    appStore.updateData({ ...data, csrf, code_value })
                    return config
                })

                resolve(data)
            })
            .catch(async (e) => {
                if (e.response?.status === 412 && index < 3) {
                    try {
                        await getUser()
                        const result = await apiCaller(path, options, ++index)
                        resolve(result)
                    } catch (e) {
                        reject(e)
                    }
                } else {
                    reject(e)
                }
            })
    })
}

export default apiCaller

export { api, error }
