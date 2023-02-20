import axios from '@/api/axios'

export default async () =>
    await axios('final', {
        method: 'get',
    })
