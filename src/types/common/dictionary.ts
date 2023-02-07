export interface Dictionary {
    acceptanceText: string
    applicationHeader: string
    applicationProgressGet: string
    calculatorTitle: string
    cardTitle: string
    footerText: string
    phone: string
    email?: string
    address?: string
    profileDocuments: Documents[]
    servicesDocuments: Documents[]
    acceptanceAutoPayment?: string
    acceptanceTextFirst?: string
    footerTextFirst?: string
    footerTextIndex?: string
    partnerRedirect?: string
}

interface Documents {
    link: string
    title: string
}
