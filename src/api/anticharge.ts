import axios from './axios'

export default async (params: object) =>
    await axios('cpa_anticharge', {
        method: 'get',
        params,
    })
