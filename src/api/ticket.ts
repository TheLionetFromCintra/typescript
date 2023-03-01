import axios from './axios'

export default async (uid: string | string[]) =>
    await axios(`ticket/${uid}`, {
        method: 'get',
    })
