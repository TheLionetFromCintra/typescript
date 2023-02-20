export interface App {
    csrf: string
    code_value: string
    createdAt: string
    data: {
        contactData: ContactData
        passportData: PassportData
        isSigned: boolean
        isSubscribed: boolean
    }
    calculator: Calc
}

export interface Calc {
    term: Term
    amount: number
}

export interface ContactData {
    addrcity?: string
    birthday: string
    email?: string
    firstname: string
    gender: string
    lastname: string
    patronymic: string
    phone?: string
    id?: number
    code?: string | number
    code_hash?: string | number
}

export interface PassportData {
    passportcode: string
    passportnumber: string
    passportseries: string
    passportdate: string
    id?: number
}

export interface CardData {
    cardnumber: string
    cardname: string
    carddate: string
}

export interface Term {
    type: string
    count: number
}

export interface Questionnaire {
    csrf: string
    code_value?: string
    ip: string
    questionnaire: {
        contactData: ContactData
        createdAt: string
        isSubscribed: boolean
        loanSum: number
        loanTerm: number
        passportData: PassportData
        questionnaireId: number
        reSubscribe: boolean
        isSigned: boolean
    }
}
