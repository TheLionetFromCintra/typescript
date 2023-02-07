export default function (val: string, mask: string) {
    const newVal = []
    const maskChars = mask.split('')
    const valChars = val.split('')
    let maskLength = maskChars.length
    let i = 0
    let offset = 0

    while (i < maskLength) {
        const maskChar = maskChars[i]
        const valChar = valChars[i + offset]

        if (valChar === undefined) break

        if (maskChar !== '#') {
            newVal.push(maskChar)
            i++

            if (maskChar !== valChar) offset--
        } else {
            if (valChar !== ' ' && !isNaN(+valChar)) {
                newVal.push(valChar)
                i++
            } else offset++
        }
    }

    return newVal.join('')
}
