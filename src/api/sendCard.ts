import axios from './axios'
// import Store from '@/store'

const sendCard = (data: any) => {
    return new Promise((resolve, reject) => {
        axios('payment/create_packet', {
            data,
            method: 'post',
        })
            .then(resolve)
            .catch((error) => {
                if (error.response.status === 302) {
                    // Store.commit('error/closeError')
                    sendCard(data).then(resolve)
                } else {
                    reject(error)
                }
            })
    })
}

export default sendCard
