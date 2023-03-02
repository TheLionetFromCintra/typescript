<script setup lang="ts">
import sendUnsubscribe from '@/api/sendUnsubscribe'

import FormWrapper from '@/applications/loan-app/layouts/FormWrapper.vue'
import TheField from '@/components/form/fields/TheField.vue'

import { vAutofocus } from '@/directives/vAutofocus'
import { reactive, watch, computed } from 'vue'

import { useRoute, useRouter } from 'vue-router'

import Validation from '@/ext/validation/validation'
import useValidation from '@/hooks/validation'
import setMask from '@/helpers/string/setMask'

import { useAppStore } from '@/stores/app/AppStore'

const { validate, filterErrors } = useValidation()

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()

const phone = computed(() => {
    return route.query.phone
})

const message = computed(() => {
    return route.query.message
})

//FORM DATA
interface Form {
    firstname: string
    lastname: string
    patronymic: string
    phone_fio: string
    pan_first: string
    pan_last: string
}

const form = reactive<Form>({
    firstname: '',
    lastname: '',
    patronymic: '',
    phone_fio: '',
    pan_first: '',
    pan_last: '',
})
//--FORM DATA

//FORM ERRORS
let errors = reactive<Form>({
    firstname: '',
    lastname: '',
    patronymic: '',
    phone_fio: '',
    pan_first: '',
    pan_last: '',
})

let validateFields = reactive({
    formErrors: {},
    isValid: {},
})

//personal
const MIN = 2
const MAX = 255
const NAME_EXP = /(^['’а-яА-ЯёЁ-]*$)|(^$)/

const NAME_RULES = [
    Validation.NO_FILTHY,
    [Validation.EXP, NAME_EXP],
    [Validation.MIN, MIN],
    [Validation.MAX, MAX],
]
const NAME_ERROR_MSG = {
    [Validation.EXP]: 'Допустимы только русские буквы, дефис и апостроф',
}

const formRules = reactive({
    lastname: [Validation.REQUIRED, ...NAME_RULES],
    firstname: [Validation.REQUIRED, ...NAME_RULES],
    patronymic: NAME_RULES,
    phone_fio: [Validation.REQUIRED, Validation.PHONE, Validation.MOBILE],
    pan_first: [Validation.REQUIRED, [Validation.MIN, 6]],
    pan_last: [Validation.REQUIRED, [Validation.MIN, 4]],
})

const customErrors = reactive({
    firstname: NAME_ERROR_MSG,
    lastname: NAME_ERROR_MSG,
    patronymic: NAME_ERROR_MSG,
})
//--FORM ERRORS

//VALIDATION AND SUBMITTING FORM
const submit = async function () {
    appStore.load(true)
    const info = await sendUnsubscribe({
        ...form,
        phone_not_found: setMask(route.query.phone, '+7(###)###-##-##'),
    })
    appStore.load(false)

    router.push({
        name: 'UnsubscribeMessage',
        state: {
            status: info.status,
            message: info.messages.msg,
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
    <div class="info">
        <form-wrapper
            @submit="validateForm"
            class="info-form"
            :class="{ loader: appStore.isLoad }"
        >
            <template #inputs>
                <div class="desc">
                    <p v-if="!message">
                        К сожалению мы не нашли указанный Вами номер
                        <strong>{{ phone }}</strong>
                    </p>
                    <p v-else>{{ message }}</p>

                    <p>Пожайлуста, заполните форму ниже:</p>
                </div>
                <fieldset class="small d-flex">
                    <the-field
                        v-model="form.lastname"
                        type="text"
                        placeholder="Иванов"
                        label="Фамилия"
                        :icon="false"
                        v-autofocus
                        :error="errors.lastname"
                    ></the-field>
                    <the-field
                        v-model="form.firstname"
                        type="text"
                        placeholder="Иван"
                        label="Имя"
                        :icon="false"
                        :error="errors.firstname"
                    ></the-field>
                </fieldset>
                <fieldset>
                    <the-field
                        v-model="form.patronymic"
                        type="text"
                        placeholder="Иванович"
                        label="Отчетство (если есть)"
                        :icon="false"
                        :error="errors.patronymic"
                    ></the-field>
                </fieldset>
                <fieldset>
                    <fieldset class="inputs d-flex">
                        <the-field
                            v-model.trim="form.phone_fio"
                            type="tel"
                            placeholder="+7 911 111 11 11"
                            label="Телефон (для связи)"
                            :icon="false"
                            :pattern="true"
                            :error="errors.phone_fio"
                        ></the-field>
                    </fieldset>
                </fieldset>
                <fieldset class="small d-flex">
                    <the-field
                        v-model.trim="form.pan_first"
                        type="text"
                        placeholder="1234 56"
                        label="Первые 6 цифр карты"
                        :icon="false"
                        :pattern="true"
                        :valueWithoutMask="true"
                        mask="#### ##"
                        max-length="7"
                        auto-tab="pan_last"
                        :error="errors.pan_first"
                    ></the-field>
                    <the-field
                        v-model.trim="form.pan_last"
                        type="text"
                        placeholder="1234"
                        label="Последние 4 цифры"
                        :icon="false"
                        :pattern="true"
                        :valueWithoutMask="true"
                        max-length="4"
                        name="pan_last"
                        :error="errors.pan_last"
                    ></the-field>
                </fieldset>
            </template>
            <template #btn-label>Отписаться</template>
        </form-wrapper>
    </div>
</template>

<style scoped lang="scss">
.info {
    background-color: #fefeff;
    padding: 42px 36px;
    @media (max-width: $mobile) {
        margin: 0 -24px;
        padding: 42px 36px 48px 36px;
    }
    @media (max-width: 374) {
        padding: 42px 24px 48px 24px;
    }
}

.desc {
    color: $primary-grey-dark;
    line-height: 1.5;
    font-size: 16px;
    margin-bottom: 40px;
}

fieldset + fieldset {
    margin-top: 24px;
}
.small {
    max-width: 400px;
    .field {
        min-width: 138px;
        max-width: 188px;
    }

    .field + .field {
        margin-left: 24px;
    }
}

@media (max-width: $mobile) {
    fieldset + fieldset {
        margin-top: 16px;
    }

    .small {
        max-width: 100%;
        justify-content: space-between;
        .field {
            min-width: initial;
            max-width: 48%;
        }
    }

    .desc {
        margin-bottom: 24px;
    }
}
</style>
