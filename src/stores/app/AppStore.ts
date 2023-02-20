import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

import getUser from '@/api/getUser'
import send from '@/api/send'
import sendPassport from '@/api/savepass'
import lite from '@/api/lite'

import Storage from '@/ext/storage/storage'

import price from '@/helpers/string/price'
import term from '@/helpers/string/term'

import type { App, Calc, Questionnaire } from '@/types/app/app'

async function update(): Promise<any> {
    if (!Cookies.get('sbg-identity')) {
        await new Promise((resolve) => {
            setTimeout(() => {
                update().then(resolve)
            }, 200)
        })

        return
    }

    Cookies.set('sbg-tz', Intl.DateTimeFormat().resolvedOptions().timeZone)
    const application = await getUser()

    return application
}

export const useAppStore = defineStore('AppStore', {
    state: (): App => ({
        csrf: '',
        code_value: '',
        createdAt: '',
        data: {
            contactData: {
                addrcity: '',
                birthday: '',
                email: '',
                firstname: '',
                gender: '0',
                lastname: '',
                patronymic: '',
                phone: '111',
            },
            passportData: {
                passportcode: '',
                passportnumber: '123456',
                passportseries: '1111',
                passportdate: '',
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

        async updateData(data) {
            // let application = await update()
            let application = data ? data : await update()

            // if(data)
            // const application: Questionnaire = await update()

            if (application.code_value)
                Storage.set('code_value', application.code_value)

            if (application.questionnaire.contactData?.code_hash)
                delete application.questionnaire.contactData.code_hash
            if (application.questionnaire.contactData?.code)
                delete application.questionnaire.contactData.code

            this.createdAt = application.questionnaire.createdAt
            this.csrf = application.csrf || this.csrf
            this.code_value = Storage.get('code_value') || this.code_value

            this.data.contactData = {
                ...this.data.contactData,
                ...application.questionnaire.contactData,
            }
            this.data.passportData = {
                ...this.data.passportData,
                ...application.questionnaire.passportData,
            }

            this.data.isSigned = application.questionnaire.isSigned
            this.data.isSubscribed = application.questionnaire.isSubscribed
        },
        async send(type = 'info', aData) {
            const contactData = {
                ...this.data.contactData,
                ...aData.contactData,
            }

            const passportData = {
                ...this.data.passportData,
                ...aData.passportData,
            }

            const data = {
                csrf: this.csrf,
                loanSum: this.calculator.amount,
                loanTerm: this.calculator.term,
                contactData,
                passportData,
            }

            const application = await (type === 'passport'
                ? sendPassport(data)
                : send(data))

            // this.updateData({
            //     ...application,
            //     questionnaire: {
            //         contactData,
            //         passportData,
            //     },
            // })

            return application
        },
        // async lite({ state, commit }, aData = {}) {
        //     const contactData = {
        //         ...state.data.contactData,
        //         ...aData.contactData,
        //     }

        //     const passportData = {
        //         ...state.data.passportData,
        //         ...aData.passportData,
        //     }

        //     const data = {
        //         csrf: state.csrf,
        //         loanSum: state.amount,
        //         loanTerm: state.term,
        //         contactData,
        //         passportData,
        //     }

        //     const application = await lite(data)

        //     commit('update', {
        //         ...application,
        //         questionnaire: {
        //             contactData,
        //             passportData,
        //         },
        //     })

        //     return application
        // },
    },
})
