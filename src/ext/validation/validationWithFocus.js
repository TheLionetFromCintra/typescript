import Validation from './validation'

class ValidationWithFocus extends Validation {
    constructor(selector, ...props) {
        const result = super(...props)
        this.selector = selector
        return result
    }

    make() {
        const result = super.make()

        this.selector &&
            setTimeout(() => {
                const element = document.querySelector(this.selector)

                if (!element) return

                element.focus()
                element.scrollIntoView &&
                    element.scrollIntoView({
                        block: 'center',
                        behavior: 'smooth',
                    })

                const shakeClassName = 'shakeAnimation'
                if (element.classList.contains(shakeClassName)) return

                element.classList.add(shakeClassName)
                setTimeout(() => {
                    element.classList.remove(shakeClassName)
                }, 1000)
            })

        return result
    }
}

export default ValidationWithFocus
