<script setup lang="ts">
import { defineAsyncComponent, reactive, computed, watch } from 'vue'
import type { WritableComputedRef } from 'vue'

import { vAutofocus } from '@/directives/vAutofocus'

import StepWrapper from '../../layouts/StepWrapper.vue'
import SkeletonForm from '../../layouts/SkeletonForm.vue'

import TheField from '@/components/form/fields/TheField.vue'
import AddressField from '@/components/form/fields/AddressField.vue'
import RadioBtns from '@/components/form/gender/RadioBtns.vue'

import Validation from '@/ext/validation/validation'
import useValidation from '@/hooks/validation'
import useMobile from '@/hooks/mobile'

import type { PassportData, ContactData } from '@/types/app/app'
import { useAppStore } from '@/stores/app/AppStore'
import setMask from '@/helpers/string/setMask'

const appStore = useAppStore()

const FormWrapper = defineAsyncComponent(
    () => import('../../layouts/FormWrapper.vue')
)

const { validate, filterErrors } = useValidation()
const { isCpa } = useMobile()

//FORM DATA
interface Form {
    contactData: ContactData
    passportData: PassportData
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
    contactData: {
        addrcity: '',
        birthday: '',
        firstname: '',
        gender: '',
        lastname: '',
        patronymic: '',
    },
    passportData: {
        passportcode: '',
        passportnumber: '',
        passportseries: '',
        passportdate: '',
    },
})
form.contactData.firstname = appStore.data.contactData.firstname
form.contactData.lastname = appStore.data.contactData.lastname
form.contactData.patronymic = appStore.data.contactData.patronymic
form.contactData.birthday = appStore.data.contactData.birthday
form.contactData.gender = String(appStore.data.contactData.gender) || '0'

form.contactData.addrcity = appStore.data.contactData.addrcity
form.passportData.passportcode = setMask(
    appStore.data.passportData.passportcode,
    '###-###'
)
form.passportData.passportnumber = setMask(
    appStore.data.passportData.passportnumber,
    '### ###'
)
form.passportData.passportseries = setMask(
    appStore.data.passportData.passportseries,
    '## ##'
)
form.passportData.passportdate = appStore.data.passportData.passportdate

const fullname: WritableComputedRef<string> = computed({
    get(): string {
        return [
            form.contactData.lastname,
            form.contactData.firstname,
            form.contactData.patronymic,
        ]
            .filter((item) => item)
            .join(' ')
    },
    set(v: string): void {
        const array = v.replace(/^ +| +$|( ) +/g, '$1').split(' ')

        form.contactData.lastname = array.shift() || ''
        form.contactData.firstname = array.shift() || ''
        form.contactData.patronymic = array.join(' ')
    },
})
//--FORM DATA

//FORM ERRORS
let errors = reactive<Form>({
    contactData: {
        addrcity: '',
        birthday: '',
        firstname: '',
        gender: '',
        lastname: '',
        patronymic: '',
    },
    passportData: {
        passportcode: '',
        passportnumber: '',
        passportseries: '',
        passportdate: '',
    },
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
    [Validation.REQUIRED]: 'Укажите полное ФИО',
    [Validation.EXP]: 'Допустимы только русские буквы, дефис и апостроф',
}

const MAX_BORROWER_OLD = 90
const MIN_BORROWER_OLD = 18

const MAX_BORROWER_YEAR = `${day}.${month}.${year - MAX_BORROWER_OLD}`
const MIN_BORROWER_YEAR = `${day}.${month}.${year - MIN_BORROWER_OLD}`

const formRules = reactive({
    contactData: {
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
    },
    passportData: {
        passportcode: [
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
        passportdate: ISSUE_DATE_VALIDATE,
    },
})
const customErrors = reactive({
    contactData: {
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
    },
    passportData: {
        passportdate: {
            [Validation.DATE_LESS]: 'Дата не может быть больше текущей',
        },
    },
})
//--FORM ERRORS

//VALIDATION AND SUBMITTING FORM
const submit = async function () {
    console.log('sumbit')
}

const formatedData = function (data: Form) {
    return {
        ...data,
        passportData: {
            passportnumber: data.passportData.passportnumber.replace(
                /[^\d]/g,
                ''
            ),
            passportcode: data.passportData.passportcode.replace(/[^\d]/g, ''),
            passportseries: data.passportData.passportseries.replace(
                /[^\d]/g,
                ''
            ),
            passportdate: data.passportData.passportdate,
        },
    }
}

const validateForm = function () {
    validateFields = validate(formatedData(form), formRules, customErrors)

    filterErrors(validateFields.formErrors, errors)
    console.log(errors)

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
</script>

<template>
    <step-wrapper :step-current="2" :step-max="3" step-title="Заполните анкету">
        <template #form>
            <suspense>
                <form-wrapper @submit="validateForm" class="contact-form">
                    <template #inputs>
                        <h4>Персональные данные</h4>
                        <fieldset>
                            <the-field
                                v-model="fullname"
                                type="text"
                                placeholder="Иванов Иван Иванович"
                                label="ФИО (отчество можно не указывать если нет)"
                                :icon="false"
                                v-autofocus
                                :error="
                                    errors.contactData.lastname ||
                                    errors.contactData.firstname ||
                                    errors.contactData.patronymic
                                "
                            ></the-field>
                        </fieldset>
                        <fieldset class="d-flex small">
                            <the-field
                                v-model.trim="form.contactData.birthday"
                                type="text"
                                placeholder="дд.мм.гггг"
                                label="Дата рождения"
                                :icon="false"
                                :pattern="true"
                                mask="##.##.####"
                                max-length="10"
                                :date-type="true"
                                :error="errors.contactData.birthday"
                            ></the-field>

                            <radio-btns
                                class="radio-wrapper"
                                v-model="form.contactData.gender"
                                :active-gender="form.contactData.gender"
                                :options="options"
                                title="Пол"
                            ></radio-btns>
                        </fieldset>
                        <h4 class="last">Паспортные данные</h4>
                        <div class="d-flex group">
                            <fieldset class="d-flex small">
                                <the-field
                                    v-model.trim="
                                        form.passportData.passportseries
                                    "
                                    type="text"
                                    placeholder="22 20"
                                    label="Серия паспорта"
                                    :icon="false"
                                    :pattern="true"
                                    :valueWithoutMask="true"
                                    mask="## ##"
                                    max-length="5"
                                    auto-tab="passportNumber"
                                    :error="errors.passportData.passportseries"
                                ></the-field>
                                <the-field
                                    v-model.trim="
                                        form.passportData.passportnumber
                                    "
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
                                    :error="errors.passportData.passportnumber"
                                ></the-field>
                            </fieldset>
                            <fieldset class="d-flex small">
                                <the-field
                                    v-model.trim="
                                        form.passportData.passportcode
                                    "
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
                                    :error="errors.passportData.passportcode"
                                ></the-field>
                                <the-field
                                    v-model.trim="
                                        form.passportData.passportdate
                                    "
                                    type="text"
                                    placeholder="дд.мм.гггг"
                                    label="Дата выдачи"
                                    :icon="false"
                                    :pattern="true"
                                    mask="##.##.####"
                                    max-length="10"
                                    :date-type="true"
                                    name="passportDate"
                                    :error="errors.passportData.passportdate"
                                ></the-field>
                            </fieldset>
                        </div>
                        <fieldset>
                            <address-field
                                v-model.trim="form.contactData.addrcity"
                                :active-value="form.contactData.addrcity"
                                :error="errors.contactData.addrcity"
                            ></address-field>
                        </fieldset>
                    </template>
                    <template #btn-label>Продолжить</template>
                </form-wrapper>
                <template #fallback>
                    <skeleton-form class="contact-skeleton">
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
                </template>
            </suspense>
        </template>
    </step-wrapper>
</template>

<style scoped lang="scss">
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
h4 {
    margin-bottom: 24px;
    font-weight: 600;
    font-size: 24px;
    line-height: 33px;
    color: $primary-grey-dark;

    &.last {
        margin-top: 24px;
    }

    @media (max-width: $mobile) {
        margin-bottom: 36px;
        font-size: 22px;
        line-height: 27px;
        text-align: center;

        &.last {
            margin-top: 48px;
        }
    }
}

fieldset + fieldset {
    margin-top: 24px;
}
.radio-wrapper {
    margin-left: 24px;
}
.small {
    max-width: 300px;
    .field {
        min-width: 138px;
    }

    .field + .field {
        margin-left: 24px;
    }
}

.group {
    margin-bottom: 24px;
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
        margin-bottom: 16px;
        flex-direction: column;

        fieldset + fieldset {
            margin: 16px 0 0 0;
        }
    }
}
</style>
