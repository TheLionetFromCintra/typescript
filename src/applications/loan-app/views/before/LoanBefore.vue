<script setup lang="ts">
import getSignCode from '@/api/getSignCode'
import sendSignCode from '@/api/sendSignCode'
// import sendCard from '@/api/sendCard'

import FormWrapper from '@/applications/loan-app/layouts/FormWrapper.vue'
import TheField from '@/components/form/fields/TheField.vue'
import TheCode from '@/components/common/code/TheCode.vue'

import { vAutofocus } from '@/directives/vAutofocus'

import { useRouter } from 'vue-router'
import { reactive, watch } from 'vue'

import Validation from '@/ext/validation/validation'
import useValidation from '@/hooks/validation'

import TheHeader from '@/components/common/headers/TheHeader.vue'
import TheFooter from '@/components/common/footer/TheFooter.vue'

import { useDictionaryStore } from '@/stores/common/DictionaryStore'
import { useAppStore } from '@/stores/app/AppStore'

const dictionaryStore = useDictionaryStore()
const appStore = useAppStore()

const { validate, filterErrors } = useValidation()

const router = useRouter()

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
    getSignCode({
        contactData: appStore.data.contactData,
        csrf: appStore.csrf_value,
    })
}

const submit = async function () {
    let res
    try {
        appStore.load(true)
        res = await sendSignCode({
            contactData: {
                ...appStore.data.contactData,
                code: form.code,
                code_hash: appStore.code,
            },
            csrf: appStore.csrf_value,
        })
        appStore.load(false)
    } catch (error) {
        appStore.loadError(true)
        return
    }

    if (res.wrongCode) {
        errors.code = 'Неверный код'
        return
    }

    appStore.clearCode()
    appStore.resetTimer()

    if (res.next_step === 'card') {
        router.push({
            name: 'LoanCard',
        })
    }

    //to-do
    // if (!route.params.cardInfo) {
    //     const card = {
    //         card: this.$route.params.cardInfo.number,
    //         date: this.$route.params.cardInfo.date,
    //         cvv: this.$route.params.cardInfo.cvv,
    //         name: this.$route.params.cardInfo.holder_name,
    //     }
    //     // @TODO наверняка можно улучшить и вынести сохранение карты в lite
    //     const data = await sendCard(card)
    //     router.push({
    //         name: 'LoanCardSecure',
    //         params: {
    //             data,
    //             card,
    //         },
    //     })
    //     router.push({
    //         name: 'LoanCardSecure',
    //         state: {
    //             data: JSON.stringify(data),
    //             card: JSON.stringify(card),
    //         },
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
    <base-error v-if="appStore.showError"></base-error>
    <div class="unsub">
        <div class="container">
            <div class="unsub-header">
                <the-header></the-header>
            </div>
            <section>
                <h1 class="subtitle">
                    {{
                        dictionaryStore.dictionary.get('dictionary')
                            ?.applicationHeader
                    }}
                </h1>
                <div class="desc">
                    <p>
                        Скачайте и ознакомьтесь с договором и заявлением на
                        включение в список застрахованных лиц. Затем нажмите
                        кнопку "Подписать" и введите в появившееся окно код из
                        СМС, отправленный на Ваш номер.
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
                                    :not-init-send="false"
                                    :get-code="getCode"
                                ></the-code>
                            </div>
                        </fieldset>
                    </template>
                    <template #btn-label>Подписать</template>
                </form-wrapper>
                <div class="before-link">
                    <a
                        href="/api/get-doc/offer_statement"
                        download
                        target="_blank"
                    >
                        Договор публичной оферты и заявление на включение в
                        список застрахованных лиц.
                    </a>
                </div>
            </section>
        </div>
    </div>
    <the-footer></the-footer>
</template>

<style scoped lang="scss">
.unsub {
    min-height: calc(100vh - 250px);
    .container {
        max-width: 1084px;
    }
    .unsub-header {
        padding-top: 45px;
        margin-bottom: 24px;
    }

    h1 {
        margin-bottom: 42px;
        text-align: left;
    }

    @media (max-width: $mobile) {
        .unsub-header {
            padding-top: 35px;
        }
        h1 {
            margin-bottom: 24px;
        }

        min-height: initial;
        padding-bottom: 64px;
    }
}

.code {
    margin-left: 40px;
}
.input {
    max-width: 100px;
}
.desc,
.before-link {
    font-size: 16px;
    line-height: 24px;
    color: $primary-grey-dark;
    margin-bottom: 40px;
}

.before-link {
    margin: 36px 0 0 0;
    a {
        color: #27ae60;
    }
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
