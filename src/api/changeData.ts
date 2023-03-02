import axios from '@/api/axios'

export default async (data: any) =>
    await axios('kabinet/changeData', {
        method: 'post',
        data,
    })
