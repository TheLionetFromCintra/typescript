const padTo2Digits = function (num: number) {
    return String(num).padStart(2, '0')
}
const formatDate = function (date: any) {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        +date.getFullYear().toString().slice(-2),
    ].join('.')
}

export default (count: number, type: string) => {
    let num = type === 'days' ? count : count * 7
    let date = new Date(Date.now() + num * 86400000)
    return formatDate(date)
}
