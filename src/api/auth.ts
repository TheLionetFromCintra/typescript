import axios from './axios'

export default async (data: any) =>
    await axios('kabinet', {
        method: 'post',
        data,
    })
