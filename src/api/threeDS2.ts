import axios from './axios'

export default async (data: any) =>
    await axios('tinkoff_after_3ds_2', {
        method: 'post',
        data,
    })
