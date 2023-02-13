export interface App {
    data: {
        contactData: ContactData
        passportData: PassportData
        cardData: CardData
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
    addrcity: string
    birthday: string
    email: string
    firstname: string
    gender: string
    lastname: string
    patronymic: string
    phone: string
}

export interface PassportData {
    passportissuecode: string
    passportnumber: string
    passportseries: string
    passportdate: string
    passportaddress: string
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
