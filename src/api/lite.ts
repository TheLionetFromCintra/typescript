import axios from '@/api/axios'

export default async (data: any) =>
    await axios('lite', {
        data,
        method: 'post',
    })
