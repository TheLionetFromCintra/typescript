import Validation from '@/ext/validation/validationWithFocus'
import { ref, reactive } from 'vue'

export default function useValidation() {
    const form = reactive({})
    const formRules = reactive({})
    let formErrors = reactive({})
    const customErrors = reactive({})

    const formIsSubmit = ref(false)
    const isValid = ref(false)

    // const setFormErrors = function (form, formErrors) {
    //     Object.keys(form).forEach((key) => {
    //         const value =
    //             typeof form[key] === 'object' && [key] !== null ? {} : ''
    //         this.$set(formErrors, key, value)
    //         if (value) setFormErrors.call(this, form[key], formErrors[key])
    //     })
    // }

    // setFormErrors.call(this, this.form, this.formErrors)

    const validate = function (focus = true) {
        formIsSubmit.value = true
        const selector = focus ? '.field_error input' : null

        const validation = new Validation(
            selector,
            validationData(form),
            formRules,
            customErrors
        ).make()

        // isValid.value = validation.isValid
        formErrors = validation.errors
    }

    const validationData = function (data: object) {
        return data
    }

    // watch: {
    //     formIsSubmit() {
    //         this.$watch('form', () => this.validate(false), { deep: true })
    //     },
    // },

    return { validate, validationData }
}
