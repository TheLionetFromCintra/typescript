import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
// import setMask from '@/helpers/string/setMask'
import price from '@/helpers/string/price'
import term from '@/helpers/string/term'

import type { App, Calc } from '@/types/app/app'

export const useAppStore = defineStore('AppStore', {
    state: (): App => ({
        createdAt: 'test',
        data: {
            contactData: {
                addrcity: '',
                birthday: '',
                email: '',
                firstname: '',
                gender: '',
                lastname: '',
                patronymic: '',
                phone: '',
            },
            passportData: {
                passportissuecode: '',
                passportnumber: '',
                passportseries: '',
                passportdate: '',
                passportaddress: '',
            },
            cardData: {
                cardnumber: '',
                cardname: '',
                carddate: '',
            },
            isSigned: false,
            isSubscribed: false,
        },
        calculator: {
            term: {
                type: 'days',
                count: 10,
            },
            amount: 10000,
        },
    }),
    getters: {
        loanDaysString: (state) => {
            if (state.calculator.term.type === 'days')
                return term(state.calculator.term.count)
            return 'недель'
        },
        loanPriceString: (state) => {
            return price(state.calculator.amount)
        },
    },
    actions: {
        initCalculator() {
            const amount = Cookies.get('amount')
                ? Number(Cookies.get('amount'))
                : this.calculator.amount

            const termCookie = Cookies.get('term')
            const term = termCookie
                ? JSON.parse(termCookie)
                : this.calculator.term

            this.updateCalculator({ term, amount })
        },
        updateCalculator({ term, amount }: Calc) {
            this.calculator.term = term || this.calculator.term
            this.calculator.amount = amount || this.calculator.amount

            amount && Cookies.set('amount', String(amount))
            term && Cookies.set('term', JSON.stringify(term))
        },
    },
})
