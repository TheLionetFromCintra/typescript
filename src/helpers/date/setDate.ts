const date = new Date()
const year = date.getFullYear()

const MIN_YEAR = String(year - 100)
const MAX_YEAR = String(year - 0)

export default function (v: string) {
    let [day = '', month = '', year = ''] = v.split('.').map((item, index) => {
        const itemLength = item.length

        switch (index) {
            case 0: {
                if ([1, 2, 3].includes(+item)) break

                if (+item === 0) {
                    if (itemLength === 2) item = '01'
                } else if (itemLength === 1) {
                    item = `0${item}`
                } else if (+item > 31) {
                    item = '31'
                }

                break
            }
            case 1: {
                if (+item === 1) break

                if (itemLength === 1 && +item !== 0) item = `0${item}`
                else if (+item > 12) item = '12'
                else if (itemLength === 2 && +item === 0) item = '01'

                break
            }
            case 2: {
                const minYear = MIN_YEAR.substr(0, itemLength)
                const maxYear = MAX_YEAR.substr(0, itemLength)

                if (+item < +minYear) item = minYear
                else if (+item > +maxYear) item = maxYear
            }
        }

        return item
    })

    const date = [day, month, year].filter((item) => item).join('.')

    return date
}
