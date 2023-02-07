import { defineStore } from 'pinia'
import { VUE_APP_EMAIL, VUE_APP_ADDRESS } from '@/const/common'
import Cookies from 'js-cookie'
import setMask from '@/helpers/string/setMask'

import type { Dictionary } from '@/types/common/dictionary'

interface StateShape {
    dictionary: Map<string, Dictionary>
}

async function getDictionary() {
    if (!Cookies.get('sbg-identity')) {
        await new Promise((resolve) => {
            setTimeout(() => {
                getDictionary().then(resolve)
            }, 200)
        })

        return
    }

    const type = Cookies.get('sbg-cpa') ? 'cpa' : 'common'

    const runtimeConfig = await fetch(`/dictionary/${type}.json`)

    const dictionary = await runtimeConfig.json()

    return dictionary
}

export const useDictionaryStore = defineStore('DictionaryStore', {
    state: (): StateShape => ({
        dictionary: new Map(),
    }),
    getters: {
        phoneMask: (state) => {
            return setMask(
                state.dictionary.get('dictionary')?.phone || '',
                '# (###) ###-##-##'
            )
        },
        phoneLink: (state) => {
            return state.dictionary.get('dictionary')?.phone
        },
        emailLink: (state) => {
            return state.dictionary.get('dictionary')?.email
        },
        address: (state) => {
            return state.dictionary.get('dictionary')?.address
        },
    },
    actions: {
        async init() {
            const response: Dictionary = await getDictionary()

            if (response) {
                response['email'] = VUE_APP_EMAIL
                response['address'] = VUE_APP_ADDRESS
                this.dictionary.set('dictionary', response)
            }
        },
    },
})
