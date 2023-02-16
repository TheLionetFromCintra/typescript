import luhn from '@/helpers/card/luhn'
import filthy from '@/helpers/validation/filthy'

class Validation {
    static REQUIRED = 'required'
    static MIN = 'min'
    static MAX = 'max'
    static PHONE = 'phone'
    static MOBILE = 'mobile'
    static EMAIL = 'email'
    static NOT_EQUAL = 'not-equal'
    static EXP = 'exp'
    static DATE = 'date'
    static DATE_LESS = 'date-less'
    static DATE_MORE = 'date-more'
    static OR = 'or'
    static IF = 'if'
    static CARD = 'card'
    static NO_FILTHY = 'no-filthy'

    static REQUIRED_MSG = 'Поле обязательно'
    static MIN_MSG = 'Мин. кол-во символов - {{0}}'
    static MAX_MSG = 'Макс. кол-во символов - {{0}}'
    static PHONE_MSG = 'Номер должен содержать 11 цифр'
    static MOBILE_MSG = 'Некорректный формат номера телефона'
    static EMAIL_MSG = 'Некорректный формат почты'
    static DATE_MSG = 'Дата указана не полностью'
    static NOT_EQUAL_MSG = 'Невалидное значение'
    static DEFAULT_MSG = 'Ошибка'
    static CARD_MSG = 'Опечатка в номере карты'
    static NO_FILTHY_MSG = 'Нецензурная лексика'

    constructor(data, rules, customErrors = {}) {
        this.data = data
        this.rules = rules
        this.customErrors = customErrors

        return this
    }

    make() {
        const [errors, isValid] = makeObject.call(
            this,
            this.data,
            this.rules,
            this.customErrors
        )

        return {
            isValid,
            errors,
        }
    }

    // возвращает true/false либо число
    // число означает, что валидация не пройдена
    // у некоторых проверок может быть несколько ошибок
    // число указывает на номер ошибки
    check(rule, value, ...props) {
        switch (rule) {
            case Validation.REQUIRED: {
                return !!value
            }
            case Validation.MIN: {
                if (!value) return true

                const minVal = +props[0]
                return value.length >= minVal
            }
            case Validation.MAX: {
                const maxVal = +props[0]
                return value.length <= maxVal
            }
            case Validation.PHONE: {
                if (!value) return true

                const onlyNumbers = String(value).replace(/[^\d]/g, '')
                return onlyNumbers.length === 11
            }
            case Validation.MOBILE: {
                if (!value) return true

                const onlyNumbers = String(value).replace(/[^\d]/g, '')
                return onlyNumbers[1] === '9'
            }
            case Validation.EMAIL: {
                if (!value) return true

                const mailRegExp = new RegExp(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
                return mailRegExp.test(value)
            }
            case Validation.NOT_EQUAL: {
                const notEqual = props[0]

                switch (typeof notEqual) {
                    case 'number': {
                        if (!value) return true

                        value = +value
                    }
                    default: {
                        return value !== notEqual
                    }
                }
            }
            case Validation.EXP: {
                const regExp = props[0]
                return regExp.test(value)
            }
            case Validation.DATE: {
                try {
                    const [day, month, year] = value.split('.')
                    return !!(day && month && year && year.length === 4)
                } catch (e) {
                    console.log(e)
                    return false
                }
            }
            case Validation.DATE_LESS: {
                let [dayLess, monthLess, yearLess] = props[0]
                    .split('.')
                    .map(dateMap)
                let [day, month, year] = value.split('.').map(dateMap)

                return (
                    year < yearLess ||
                    (year === yearLess &&
                        (month < monthLess ||
                            (month === monthLess && day <= dayLess)))
                )
            }
            case Validation.DATE_MORE: {
                let [dayMore, monthMore, yearMore] = props[0]
                    .split('.')
                    .map(dateMap)
                let [day, month, year] = value.split('.').map(dateMap)

                return (
                    year > yearMore ||
                    (year === yearMore &&
                        (month > monthMore ||
                            (month === monthMore && day >= dayMore)))
                )
            }
            case Validation.CARD: {
                return luhn(value)
            }
            case Validation.NO_FILTHY: {
                return filthy(value)
            }
            default:
                throw new Error(`undefined validation type - ${rule}`)
        }
    }

    getErrorMessage(rule) {
        switch (rule) {
            case Validation.REQUIRED: {
                return Validation.REQUIRED_MSG
            }
            case Validation.MIN: {
                return Validation.MIN_MSG
            }
            case Validation.MAX: {
                return Validation.MAX_MSG
            }
            case Validation.NOT_EQUAL: {
                return Validation.NOT_EQUAL_MSG
            }
            case Validation.PHONE: {
                return Validation.PHONE_MSG
            }
            case Validation.MOBILE: {
                return Validation.MOBILE_MSG
            }
            case Validation.EMAIL: {
                return Validation.EMAIL_MSG
            }
            case Validation.DATE: {
                return Validation.DATE_MSG
            }
            case Validation.CARD: {
                return Validation.CARD_MSG
            }
            case Validation.NO_FILTHY: {
                return Validation.NO_FILTHY_MSG
            }
            default:
                return Validation.DEFAULT_MSG
        }
    }

    checkPropsString(string, props) {
        if (!(string && props.length)) return string

        return string.split('{{').reduce((acc, part) => {
            const split = part.split('}}', 2)
            if (split.length < 2) return `${acc}${part}`

            const [index, string] = split
            return acc + `${props[index]}${string}`
        }, '')
    }
}

function makeObject(data, _rules, customErrors = {}) {
    data = { ...data }
    const errors = {}
    let isValid = true

    Object.keys(data).forEach((key) => {
        if (
            typeof data[key] !== 'string' &&
            typeof data[key] !== 'undefined' &&
            _rules[key] &&
            data[key] !== null
        ) {
            const [errorsObj, isValidVal] = makeObject.call(
                this,
                data[key],
                _rules[key],
                customErrors[key] || {}
            )

            if (isValid) isValid = isValidVal
            errors[key] = errorsObj
            return
        } else if (data[key] === null) {
            data[key] = ''
        }

        errors[key] = ''

        const rules = _rules[key]

        if (!rules) return

        const rulesLength = rules.length - 1
        let i = -1
        let valid = true

        while (valid && i < rulesLength) {
            i++

            const ruleParts = Array.isArray(rules[i])
                ? [...rules[i]]
                : [rules[i]]
            const ruleName = ruleParts.shift()

            let check = false

            let errorMsg = ''

            switch (ruleName) {
                case Validation.OR: {
                    {
                        const orName = ruleParts[0]
                        const orRules = _rules[orName].reduce((acc, item) => {
                            if (
                                !Array.isArray(item) ||
                                item[0] !== Validation.OR
                            )
                                return acc.push(item)

                            if (item[1] === key && item[2]) acc.push(...item[2])

                            return acc
                        }, [])

                        const orValidation = new Validation(
                            {
                                [key]: data[orName],
                            },
                            {
                                [key]: orRules,
                            },
                            {
                                [key]: customErrors[orName],
                            }
                        ).make()

                        if (orValidation.isValid) {
                            check = true
                            break
                        }
                    }
                    {
                        const orRules = ruleParts[1]
                        const orRulesValidation = new Validation(
                            {
                                [key]: data[key],
                            },
                            {
                                [key]: orRules,
                            },
                            {
                                [key]: customErrors[key],
                            }
                        ).make()

                        check = orRulesValidation.isValid

                        if (!check) {
                            const errorKeys = Object.keys(
                                orRulesValidation.errors
                            )
                            let i = 0
                            while (!errorMsg && i < errorKeys.length) {
                                errorMsg =
                                    orRulesValidation.errors[errorKeys[i]]
                                i++
                            }
                        }
                    }

                    break
                }
                case Validation.IF: {
                    {
                        const ifName = ruleParts[0]
                        const ifValue = data[ifName]

                        if (!ifValue && !data[key]) {
                            check = true
                            break
                        }

                        const ifRules = ruleParts[1]

                        const ifRulesValidation = new Validation(
                            {
                                [key]: data[key],
                            },
                            {
                                [key]: ifRules,
                            },
                            {
                                [key]: customErrors[key],
                            }
                        ).make()

                        check = ifRulesValidation.isValid

                        if (!check) {
                            const errorKeys = Object.keys(
                                ifRulesValidation.errors
                            )
                            let i = 0
                            while (!errorMsg && i < errorKeys.length) {
                                errorMsg =
                                    ifRulesValidation.errors[errorKeys[i]]
                                i++
                            }
                        }
                    }

                    break
                }
                default: {
                    check = this.check(ruleName, data[key], ...ruleParts)
                }
            }

            if (check === true) continue

            valid = isValid = false

            if (!errorMsg) {
                errorMsg =
                    (customErrors[key] && customErrors[key][ruleName]) || ''
                if (typeof errorMsg === 'object')
                    errorMsg = customErrors[key][ruleName][i]
                else if (!errorMsg)
                    errorMsg = this.getErrorMessage(ruleName, check)
                errorMsg = this.checkPropsString(errorMsg, ruleParts)
            }

            errors[key] = errorMsg
        }
    })

    return [errors, isValid]
}

function dateMap(item, index) {
    if (index === 0) item = item.substr(0, 2)

    return +item
}

export default Validation
