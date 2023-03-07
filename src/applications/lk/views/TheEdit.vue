<script setup lang="ts">
import changeData from '@/api/changeData'

import AccountWrapper from '../layouts/AccountWrapper.vue'
import SkeletonForm from '@/applications/loan-app/layouts/SkeletonForm.vue'

import TheField from '@/components/form/fields/TheField.vue'
import AddressField from '@/components/form/fields/AddressField.vue'
import RadioBtns from '@/components/form/gender/RadioBtns.vue'

import { defineAsyncComponent, reactive, watch, onMounted } from 'vue'

import Validation from '@/ext/validation/validation'
import useValidation from '@/hooks/validation'
import useMobile from '@/hooks/mobile'

import { useAppStore } from '@/stores/app/AppStore'
import setMask from '@/helpers/string/setMask'

import { useRouter } from 'vue-router'

const router = useRouter()

const FormWrapper = defineAsyncComponent(
    () => import('@/applications/loan-app/layouts/FormWrapper.vue')
)

const appStore = useAppStore()
const { validate, filterErrors } = useValidation()
const { isCpa } = useMobile()

//FORM DATA
interface Form {
    firstname: string
    lastname: string
    patronymic: string
    email: string
    birthday: string
    gender: string
    addrcity: string
    passportseries: string
    passportnumber: string
    passportissuecode: string
    passportissuedate: string
}

interface Options {
    key: '0' | '1'
    value: 'М' | 'Ж'
}

const options = reactive<Options[]>([
    {
        key: '0',
        value: 'М',
    },
    {
        key: '1',
        value: 'Ж',
    },
])

const form = reactive<Form>({
    firstname: '',
    lastname: '',
    patronymic: '',
    email: '',
    birthday: '',
    gender: '',
    addrcity: '',
    passportseries: '',
    passportnumber: '',
    passportissuecode: '',
    passportissuedate: '',
})

//--FORM DATA

//FORM ERRORS
let errors = reactive<Form>({
    addrcity: '',
    birthday: '',
    firstname: '',
    gender: '',
    lastname: '',
    patronymic: '',
    email: '',
    passportissuecode: '',
    passportnumber: '',
    passportseries: '',
    passportissuedate: '',
})

let validateFields = reactive({
    formErrors: {},
    isValid: {},
})

const date = new Date()

const year = date.getFullYear()
const month = date.getMonth() + 1
const day = date.getDate()

//passport
const TODAY = `${day}.${month}.${year}`
const ISSUE_DATE_VALIDATE = [Validation.DATE, [Validation.DATE_LESS, TODAY]]

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

const MAX_BORROWER_OLD = 90
const MIN_BORROWER_OLD = 18

const MAX_BORROWER_YEAR = `${day}.${month}.${year - MAX_BORROWER_OLD}`
const MIN_BORROWER_YEAR = `${day}.${month}.${year - MIN_BORROWER_OLD}`

const formRules = reactive({
    addrcity: [Validation.REQUIRED],
    birthday: [
        Validation.REQUIRED,
        Validation.DATE,
        [Validation.DATE_LESS, MIN_BORROWER_YEAR],
        [Validation.DATE_MORE, MAX_BORROWER_YEAR],
    ],
    firstname: [Validation.REQUIRED, ...NAME_RULES],
    lastname: [Validation.REQUIRED, ...NAME_RULES],
    patronymic: NAME_RULES,
    email: [Validation.EMAIL],
    passportissuecode: [
        Validation.REQUIRED,
        [Validation.MIN, 6],
        [Validation.MAX, 6],
    ],
    passportnumber: [
        Validation.REQUIRED,
        [Validation.MIN, 6],
        [Validation.MAX, 6],
    ],
    passportseries: [
        Validation.REQUIRED,
        [Validation.MIN, 4],
        [Validation.MAX, 4],
    ],
    passportissuedate: ISSUE_DATE_VALIDATE,
})
const customErrors = reactive({
    firstname: NAME_ERROR_MSG,
    lastname: NAME_ERROR_MSG,
    patronymic: NAME_ERROR_MSG,
    birthday: {
        [Validation.DATE_LESS]: isCpa
            ? `Мы не выдаем займ лицам не достигшим ${MIN_BORROWER_OLD} лет`
            : `Минимальный возраст застрахованного лица - ${MIN_BORROWER_OLD} лет`,
        [Validation.DATE_MORE]: isCpa
            ? `Возраст заемщика не должен превышать ${MAX_BORROWER_OLD} лет`
            : `Мы не страхуем лица страше ${MAX_BORROWER_OLD} лет`,
    },
    passportissuedate: {
        [Validation.DATE_LESS]: 'Дата не может быть больше текущей',
    },
})
//--FORM ERRORS

//VALIDATION AND SUBMITTING FORM
const submit = async function () {
    const data = {
        ...formatedData(form),
        passportissuecode: setMask(form.passportissuecode, '###-###'),
        phone: setMask(appStore.data.contactData.phone, '+7(###)###-##-##'),
    }

    try {
        appStore.submitForm(true)
        await changeData(data)
        appStore.submitForm(false)
    } catch (error) {
        appStore.loadError(true)
        return
    }

    router.push({
        name: 'SaveChanges',
        state: {
            data: JSON.stringify(data),
        },
        query: {
            phone: data.phone,
        },
    })
}

const formatedData = function (data: Form) {
    return {
        ...data,
        passportnumber: data.passportnumber.replace(/[^\d]/g, ''),
        passportissuecode: data.passportissuecode.replace(/[^\d]/g, ''),
        passportseries: data.passportseries.replace(/[^\d]/g, ''),
        passsportissuedate: data.passportissuedate,
    }
}

const validateForm = function () {
    validateFields = validate(formatedData(form), formRules, customErrors)

    filterErrors(validateFields.formErrors, errors)
    validateFields.isValid && submit()
}

watch(
    () => form,
    (newVal) => {
        validateFields = validate(
            formatedData(newVal),
            formRules,
            customErrors,
            false
        )
        filterErrors(validateFields.formErrors, errors)
    },
    { deep: true }
)
//--VALIDATION AND SUBMITTING FORM

onMounted(async () => {
    try {
        appStore.load(true)
        await appStore.updateData()
        appStore.load(false)
    } catch (error) {
        appStore.loadError(true)
        return
    }

    form.firstname = appStore.data.contactData.firstname ?? ''
    form.lastname = appStore.data.contactData.lastname ?? ''
    form.patronymic = appStore.data.contactData.patronymic ?? ''
    form.birthday = appStore.data.contactData.birthday ?? ''
    form.gender = String(appStore.data.contactData.gender) || '0'

    form.addrcity = appStore.data.contactData.addrcity ?? ''
    form.passportissuecode = appStore.data.passportData.passportissuecode ?? ''

    form.passportnumber =
        setMask(appStore.data.passportData.passportnumber, '### ###') ?? ''
    form.passportseries =
        setMask(appStore.data.passportData.passportseries, '## ##') ?? ''
    form.passportissuedate = appStore.data.passportData.passportissuedate ?? ''
})
</script>

<template>
    <base-error v-if="appStore.showError"></base-error>
    <account-wrapper title="Редактировать данные">
        <template #content>
            <div class="edit">
                <form-wrapper
                    v-if="!appStore.isLoad"
                    @submit="validateForm"
                    class="contact-form"
                    :class="{ loader: appStore.isSubmit }"
                >
                    <template #inputs>
                        <fieldset class="d-flex small">
                            <the-field
                                v-model="form.lastname"
                                type="text"
                                placeholder="Иванов"
                                label="Фамилия"
                                :icon="false"
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
                        <fieldset class="d-flex small">
                            <the-field
                                v-model="form.patronymic"
                                type="text"
                                placeholder="Иванович"
                                label="Отчетство (если есть)"
                                :icon="false"
                                :error="errors.patronymic"
                            ></the-field>
                            <the-field
                                v-model="form.email"
                                type="email"
                                placeholder="user@mail.ru"
                                label="E-mail"
                                :icon="false"
                                :error="errors.email"
                            ></the-field>
                        </fieldset>
                        <fieldset class="d-flex small">
                            <the-field
                                v-model.trim="form.birthday"
                                type="text"
                                placeholder="дд.мм.гггг"
                                label="Дата рождения"
                                :icon="false"
                                :pattern="true"
                                mask="##.##.####"
                                max-length="10"
                                :date-type="true"
                                :error="errors.birthday"
                            ></the-field>

                            <radio-btns
                                class="radio-wrapper"
                                v-model="form.gender"
                                :active-gender="form.gender"
                                :options="options"
                                title="Пол"
                            ></radio-btns>
                        </fieldset>
                        <fieldset>
                            <address-field
                                v-model.trim="form.addrcity"
                                :active-value="form.addrcity"
                                :error="errors.addrcity"
                            ></address-field>
                        </fieldset>

                        <div class="d-flex group">
                            <fieldset class="d-flex small">
                                <the-field
                                    v-model.trim="form.passportseries"
                                    type="text"
                                    placeholder="22 20"
                                    label="Серия паспорта"
                                    :icon="false"
                                    :pattern="true"
                                    :valueWithoutMask="true"
                                    mask="## ##"
                                    max-length="5"
                                    auto-tab="passportNumber"
                                    :error="errors.passportseries"
                                ></the-field>
                                <the-field
                                    v-model.trim="form.passportnumber"
                                    type="text"
                                    placeholder="123 456"
                                    label="Номер"
                                    :icon="false"
                                    :pattern="true"
                                    :valueWithoutMask="true"
                                    mask="### ###"
                                    max-length="7"
                                    name="passportNumber"
                                    auto-tab="passportCode"
                                    :error="errors.passportnumber"
                                ></the-field>
                            </fieldset>
                            <fieldset class="d-flex small">
                                <the-field
                                    v-model.trim="form.passportissuecode"
                                    type="text"
                                    placeholder="123-456"
                                    label="Код подразделения"
                                    :icon="false"
                                    :pattern="true"
                                    :valueWithoutMask="true"
                                    mask="###-###"
                                    max-length="7"
                                    name="passportCode"
                                    auto-tab="passportDate"
                                    :error="errors.passportissuecode"
                                ></the-field>
                                <the-field
                                    v-model.trim="form.passportissuedate"
                                    type="text"
                                    placeholder="дд.мм.гггг"
                                    label="Дата выдачи"
                                    :icon="false"
                                    :pattern="true"
                                    mask="##.##.####"
                                    max-length="10"
                                    :date-type="true"
                                    name="passportDate"
                                    :error="errors.passportissuedate"
                                ></the-field>
                            </fieldset>
                        </div>
                    </template>
                    <template #btn-label>Обновить</template>
                </form-wrapper>

                <skeleton-form class="contact-skeleton" v-else>
                    <template #inputs>
                        <div class="bg-animate input-sk"></div>
                        <div class="skeleton-small d-flex">
                            <div class="bg-animate input-sk"></div>
                            <div class="bg-animate input-sk"></div>
                        </div>
                        <div class="skeleton-small d-flex">
                            <div class="bg-animate input-sk"></div>
                            <div class="bg-animate input-sk"></div>
                            <div class="bg-animate input-sk"></div>
                            <div class="bg-animate input-sk"></div>
                        </div>
                        <div class="bg-animate input-sk"></div>
                    </template>
                </skeleton-form>
            </div>
        </template>
    </account-wrapper>
</template>

<style scoped lang="scss">
.edit {
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
.bg-animate {
    width: 100%;
}
.input-sk {
    height: 50px;
}
.skeleton-small {
    margin: 24px 0;
    .input-sk + .input-sk {
        margin-left: 24px;
    }
}
fieldset + fieldset {
    margin-top: 24px;
}
.radio-wrapper {
    margin-left: 24px;
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

.group {
    margin-top: 24px;
    fieldset + fieldset {
        margin: 0 0 0 16px;
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

    .group {
        margin-top: 16px;
        flex-direction: column;

        fieldset + fieldset {
            margin: 16px 0 0 0;
        }
    }
}
</style>
