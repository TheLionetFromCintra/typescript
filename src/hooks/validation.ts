import Validation from '@/ext/validation/validationWithFocus'
import { ref, reactive } from 'vue'

export default function useValidation() {
    const form = reactive({})
    const formRules = reactive({})
    let formErrors = reactive({})
    const customErrors = reactive({})

    const formIsSubmit = ref(false)
    const isValid = ref(false)

    function setFormErrors(form: any, formErrors: any) {
        Object.keys(form).forEach((key) => {
            const value =
                typeof form[key] === 'object' && [key] !== null ? {} : ''

            this.$set(formErrors, key, value)
            if (value) setFormErrors.call(this, form[key], formErrors[key])
        })
    }

    setFormErrors.call(this, form, formErrors)

    const validationData = function (data: object) {
        return data
    }

    const validate = function (
        form: any,
        formRules: any,
        customErrors: any,
        focus = true
    ) {
        formIsSubmit.value = true
        const selector = focus ? '.field_error' : null

        const validation = new Validation(
            selector,
            validationData(form),
            formRules,
            customErrors
        ).make()

        return {
            isValid: validation.isValid,
            formErrors: validation.errors,
        }
    }

    const filterErrors = function (obj: object, errors: object) {
        Object.entries(obj).forEach((entry: Array<string>) => {
            const [key, value] = entry
            errors[key] = value
        })
    }

    return { validate, filterErrors }
}
