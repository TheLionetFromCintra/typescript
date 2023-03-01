import axios from './axios'

export default async (data: any) =>
    await axios('unsubscribe', {
        method: 'post',
        data,
    })
