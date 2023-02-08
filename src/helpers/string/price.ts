export default (v: number, showRemain = false) => {
    const priceArr = String(v).split('.')

    const val = +priceArr[0]

    if (!priceArr[1] && showRemain) priceArr[1] = '0'

    if (isNaN(val)) return String(v)

    const arr = String(val)
        .split('')
        .reverse()
        .reduce((acc, cur, index) => {
            if (cur !== ' ') {
                if (index !== 0 && index % 3 === 0) {
                    acc.push(' ')
                }

                acc.push(cur)
            }

            return acc
        }, [])

    let result = arr.reverse().join('')

    if (priceArr[1]) {
        let remain = String(priceArr[1])

        if (remain.length < 2) {
            remain += '0'
        } else if (remain.length > 2) {
            remain = remain.slice(0, 2)
        }

        result = `${result}.${remain}`
    }

    return result
}
