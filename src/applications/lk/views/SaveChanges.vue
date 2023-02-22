<script setup lang="ts">
import AccountWrapper from '../layouts/AccountWrapper.vue'
import FormWrapper from '@/applications/loan-app/layouts/FormWrapper.vue'
import TheField from '@/components/form/fields/TheField.vue'
import TheCode from '@/components/common/code/TheCode.vue'

import { vAutofocus } from '@/directives/vAutofocus'

import { useRoute, useRouter } from 'vue-router'
import { computed, reactive, watch } from 'vue'

import Validation from '@/ext/validation/validation'
import useValidation from '@/hooks/validation'

const { validate, filterErrors } = useValidation()

const route = useRoute()
const router = useRouter()

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
    console.log('done')
    // await changeData(route.query.phone)
}

const submit = async function () {
    console.log('done 123')

    // const { status } = await changeData({
    //     data: route.query.phone,
    //     code: form.code,
    //     code_hash: this.code_hash,
    // })

    // if (status !== 'verifyErrorSms') {
    //     await this.$store.dispatch('application/update')
    //     this.$store.commit('application/clearCode')
    //     this.$refs.code.resetTimer()
    //     router.push({ name: 'PersonalAccount' })
    // } else {
    //     errors.code = 'Неверный код'
    //     return
    // }
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
            <form-wrapper @submit="validateForm" class="unsub-form">
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