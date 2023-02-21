<script setup lang="ts">
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
const getCode = function () {
    console.log('done')
    // auth(route.query.phone)
}

const submit = async function () {
    console.log('done 123')
    // const { wrongCode, result } = await auth({
    //     data: route.query.phone,
    //     code: form.code,
    //     code_hash: this.code_hash,
    // })

    // if (wrongCode) {
    //     errors.code = 'Неверный код'
    //     return
    // }

    // if (result) {
    //     router.push({
    //         name: 'PersonalAccount',
    //     })
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
    <div class="desc">
        <p>
            Мы отправили код подтверждения на номер <strong>{{ phone }}</strong>
        </p>
    </div>
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

<style scoped lang="scss">
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
