import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
// import setMask from '@/helpers/string/setMask'
import price from '@/helpers/string/price'
import term from '@/helpers/string/term'

import type { App } from '@/types/app/app'

export const useAppStore = defineStore('AppStore', {
    state: (): App => ({
        term: {
            type: 'days',
            count: 10,
        },
        amount: 10000,
    }),
    getters: {
        loanDaysString: (state) => {
            if (state.term.type === 'days') return term(state.term.count)
            return 'недель'
        },
        loanPriceString: (state) => {
            return price(state.amount)
        },
    },
    actions: {
        initCalculator() {
            const amount = Cookies.get('amount')
                ? Number(Cookies.get('amount'))
                : this.amount

            const termCookie = Cookies.get('term')
            const term = termCookie ? JSON.parse(termCookie) : this.term

            this.updateCalculator({ term, amount })
        },
        updateCalculator({ term, amount }: App) {
            this.term = term || this.term
            this.amount = amount || this.amount

            amount && Cookies.set('amount', String(amount))
            term && Cookies.set('term', JSON.stringify(term))
        },
    },
})
