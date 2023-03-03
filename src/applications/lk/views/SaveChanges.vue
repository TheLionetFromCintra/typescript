<script setup lang="ts">
import changeData from '@/api/changeData'

import AccountWrapper from '../layouts/AccountWrapper.vue'
import FormWrapper from '@/applications/loan-app/layouts/FormWrapper.vue'
import TheField from '@/components/form/fields/TheField.vue'
import TheCode from '@/components/common/code/TheCode.vue'

import { vAutofocus } from '@/directives/vAutofocus'

import { useRoute, useRouter } from 'vue-router'
import { reactive, watch } from 'vue'
import { useAppStore } from '@/stores/app/AppStore'

import Validation from '@/ext/validation/validation'
import useValidation from '@/hooks/validation'
import setMask from '@/helpers/string/setMask'

const { validate, filterErrors } = useValidation()

const route = useRoute()
const router = useRouter()

const appStore = useAppStore()

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
    await changeData(JSON.parse(history.state.data))
}

const submit = async function () {
    let res
    try {
        appStore.load(true)
        res = await changeData({
            ...JSON.parse(history.state.data),
            code: form.code,
            code_hash: appStore.code,
        })
        appStore.load(false)
    } catch (error) {
        appStore.loadError(true)
        return
    }

    if (res.status !== 'verifyErrorSms') {
        await appStore.updateData()

        appStore.clearCode()
        appStore.resetTimer()

        router.push({ name: 'PersonalAccount' })
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
    <account-wrapper title="Сохранить изменения">
        <template #desc>
            <div class="desc">
                <span>Для сохранения изменений введите код из СМС</span>
            </div>
        </template>
        <template #content>
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
    </account-wrapper>
</template>

<style scoped lang="scss">
.desc {
    font-size: 16px;
    line-height: 22px;
    color: $primary-grey-dark;
    margin-bottom: 24px;

    span {
        display: block;
    }
    span + span {
        margin-top: 12px;
    }
}

.code {
    margin-left: 40px;
}
.input {
    max-width: 100px;
}

@media (max-width: $mobile) {
    .inputs {
        justify-content: center;
    }
}
</style>
