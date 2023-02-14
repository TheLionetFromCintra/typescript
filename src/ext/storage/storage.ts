class Storage {
    constructor() {}

    get(name: string) {
        if (!localStorage) throw new Error('localStorage is not exist')

        let val = localStorage.getItem(name)
        if (!val) return ''

        try {
            val = JSON.parse(val)
        } catch (e) {
            console.log('can not parse value by JSON')
        }

        return val
    }
    async set(name: string, val = '') {
        if (!localStorage) throw new Error('localStorage is not exist')

        val = JSON.stringify(val)
        localStorage.setItem(name, val)
    }

    delete(name: string) {
        if (!localStorage) throw new Error('localStorage is not exist')

        localStorage.removeItem(name)
    }
}

export default new Storage()
