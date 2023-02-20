import axios from './axios'

export default async (params: object) =>
    await axios('stat_vitrina', {
        method: 'get',
        params,
    })
