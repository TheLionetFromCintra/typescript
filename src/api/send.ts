import axios from './axios'

export default async (data: any) =>
    await axios('contact', {
        data,
        method: 'post',
    })
