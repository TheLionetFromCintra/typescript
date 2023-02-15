import axios from './axios'

export default async (f: string) =>
    await axios('stat/primary', {
        method: 'get',
        params: { f },
    })
