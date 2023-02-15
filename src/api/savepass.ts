import axios from './axios'

export default async (data: any) =>
    await axios('savepas', {
        data,
        method: 'post',
    })
