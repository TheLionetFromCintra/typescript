<script setup lang="ts">
import FormWrapper from '@/applications/loan-app/layouts/FormWrapper.vue'
import TheField from '@/components/form/fields/TheField.vue'
import TheCode from '@/components/common/code/TheCode.vue'

import Storage from '@/ext/storage/storage'

import { vAutofocus } from '@/directives/vAutofocus'

import { useRoute, useRouter } from 'vue-router'
import { computed, reactive, watch, ref } from 'vue'

import Validation from '@/ext/validation/validation'
import useValidation from '@/hooks/validation'
import { useAppStore } from '@/stores/app/AppStore'

const { validate, filterErrors } = useValidation()

const route = useRoute()
const router = useRouter()

const appStore = useAppStore()

const phone = computed(() => {
    return route.query.phone
})

//FORM INPUTS
interface Form {
    code: string
}

const form = reactive<Form>({
    code: '',
})

let errors = reactive<Form>({
    code: '',
})

let validateFields = reactive({
    formErrors: {},
    isValid: {},
})

const formRules = reactive({
    code: [Validation.REQUIRED, [Validation.MIN, 5]],
})

const customErrors = reactive({})
//--FORM INPUTS

//VALIDATION AND SUBMITTING FORM
const getCode = async function () {
    try {
        await appStore.send('info', {
            contactData: {
                ...appStore.data.contactData,
            },
        })
    } catch (error) {
        appStore.loadError(true)
        return
    }
}

const submit = async function () {
    let response
    try {
        appStore.load(true)
        response = await appStore.send('info', {
            contactData: {
                ...appStore.data.contactData,
                code_hash: appStore.code,
                code: form.code,
                phone:
                    appStore.data.contactData.phone ||
                    Storage.get('user_phone'),
            },
        })
        appStore.load(false)
    } catch (error) {
        appStore.loadError(true)
        return
    }

    if (!response.wrongCode) {
        await appStore.updateData()

        appStore.clearCode()
        appStore.resetTimer()

        router.push({ name: 'LoanContact' })
        Storage.delete('user_phone')
    } else {
        errors.code = 'Неверный код'
        return
    }
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
        validateFields.isValid && submit()
    },
    { deep: true }
)
//--VALIDATION AND SUBMITTING FORM
</script>

<template>
    <base-error v-if="appStore.showError"></base-error>
    <div class="desc">
        <p>
            Номер телефона уже используется. Для продолжения введите код из СМС
            или используйте другой номер телефона для регистрации.
        </p>
    </div>
    <form-wrapper
        @submit="validateForm"
        class="unsub-form"
        :class="{ loader: appStore.isLoad }"
    >
        <template #inputs>
            <fieldset class="inputs d-flex align-items-center">
                <the-field
                    class="input"
                    v-model.trim="form.code"
                    type="text"
                    placeholder="12345"
                    label="Код из смс"
                    :icon="false"
                    :pattern="true"
                    max-length="5"
                    v-autofocus
                    :error="errors.code"
                ></the-field>
                <div class="code">
                    <the-code
                        :not-init-send="true"
                        :get-code="getCode"
                    ></the-code>
                </div>
            </fieldset>
        </template>
        <template #btn-label>Подтвердить</template>
    </form-wrapper>
</template>

<style scoped lang="scss">
.send {
    width: 100%;
    margin-top: 24px;
    .text {
        width: fit-content;
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        color: #8f8f8f;

        cursor: pointer;
        padding-bottom: 2px;
        border-bottom: 1px solid #8f8f8f;
        transition: border-color 0.3s linear;

        &:hover {
            border-color: transparent;
        }
    }
}

.code {
    margin-left: 40px;
}
.input {
    max-width: 100px;
}
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
    .inputs {
        justify-content: center;
    }
}
</style>
