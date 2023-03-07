<script setup lang="ts">
import sendUnsubscribe from '@/api/sendUnsubscribe'

import FormWrapper from '@/applications/loan-app/layouts/FormWrapper.vue'
import TheField from '@/components/form/fields/TheField.vue'

import { vAutofocus } from '@/directives/vAutofocus'
import { reactive, watch } from 'vue'

import Validation from '@/ext/validation/validation'
import useValidation from '@/hooks/validation'

import { useAppStore } from '@/stores/app/AppStore'

import { useRouter } from 'vue-router'
import setMask from '@/helpers/string/setMask'

const router = useRouter()
const appStore = useAppStore()

const { validate, filterErrors } = useValidation()

//FORM INPUTS
interface Form {
    phone: string
}

const form = reactive<Form>({
    phone: '',
})

let errors = reactive<Form>({
    phone: '',
})

let validateFields = reactive({
    formErrors: {},
    isValid: {},
})

const formRules = reactive({
    phone: [Validation.REQUIRED, Validation.PHONE, Validation.MOBILE],
})

const customErrors = reactive({})
//--FORM INPUTS

//VALIDATION AND SUBMITTING FORM
const submit = async function () {
    let info
    try {
        appStore.load(true)
        info = await sendUnsubscribe({
            ...form,
            phone: setMask(form.phone, '+7(###)###-##-##'),
        })
        appStore.load(false)
    } catch (error) {
        appStore.loadError(true)
        return
    }

    let routeName =
        info.status === 'phoneNotFound'
            ? 'UnsubscribeInfo'
            : 'UnsubscribeMessage'
    routeName = info.status === 'sendSMS' ? 'UnsubscribeSms' : routeName

    router.push({
        name: routeName,
        state: {
            status: info.status,
        },
        query: {
            phone: form.phone,
        },
    })
}

const validateForm = function () {
    validateFields = validate(form, formRules, customErrors)

    filterErrors(validateFields.formErrors, errors)

    validateFields.isValid && submit()
}

watch(
    () => form,
    (newVal) => {
        validateFields = validate(newVal, formRules, customErrors, false)
        filterErrors(validateFields.formErrors, errors)
    },
    { deep: true }
)
//--VALIDATION AND SUBMITTING FORM
</script>

<template>
    <base-error v-if="appStore.showError"></base-error>
    <div class="desc">
        <p>Укажите номер телефона, который Вы использовали при регистрации.</p>
    </div>
    <form-wrapper
        @submit="validateForm"
        class="unsub-form"
        :class="{ loader: appStore.isLoad }"
    >
        <template #inputs>
            <fieldset class="inputs d-flex">
                <the-field
                    v-model.trim="form.phone"
                    type="tel"
                    placeholder="+7 911 111 11 11"
                    label="Номер телефона"
                    :icon="true"
                    :pattern="true"
                    v-autofocus
                    :error="errors.phone"
                ></the-field>
            </fieldset>
        </template>
        <template #btn-label>Продолжить</template>
    </form-wrapper>
</template>

<style scoped lang="scss">
.desc {
    font-size: 16px;
    line-height: 24px;
    color: $primary-grey-dark;
    margin-bottom: 40px;
}

@media (max-width: $mobile) {
    .desc {
        margin-bottom: 24px;
    }
}
</style>
