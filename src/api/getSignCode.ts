import axios from './axios'

export default async (data: any) =>
    await axios('before', {
        method: 'post',
        data,
    })
