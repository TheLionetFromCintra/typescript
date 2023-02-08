export default (currentCount: number | string) => {
    let term = 'дней'

    currentCount = currentCount.toString()

    if (
        currentCount.substr(currentCount.length - 1) === '1' &&
        currentCount.substr(currentCount.length - 2) !== '11'
    ) {
        term = 'день'
    } else if (
        ['2', '3', '4'].includes(
            currentCount.substr(currentCount.length - 1)
        ) &&
        !['12', '13', '14'].includes(
            currentCount.substr(currentCount.length - 2)
        )
    ) {
        term = 'дня'
    }

    return term
}
