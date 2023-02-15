<script setup lang="ts">
import { defineAsyncComponent, reactive } from 'vue'

import { vAutofocus } from '@/directives/vAutofocus'

import StepWrapper from '../../layouts/StepWrapper.vue'
import SkeletonForm from '../../layouts/SkeletonForm.vue'

import TheField from '@/components/form/fields/TheField.vue'
import RadioBtns from '@/components/form/gender/RadioBtns.vue'

import Validation from '@/ext/validation/validation'
import useValidation from '@/hooks/validation'

import Storage from '@/ext/storage/storage'

import type { PassportData, ContactData } from '@/types/app/app'
import { useAppStore } from '@/stores/app/AppStore'

const appStore = useAppStore()

const FormWrapper = defineAsyncComponent(
    () => import('../../layouts/FormWrapper.vue')
)

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
        passportaddress: '',
    },
})

form.contactData.gender = String(appStore.data.contactData.gender) || '0'

//--FORM DATA

const validateForm = function () {
    console.log(form)
}
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
                                type="text"
                                placeholder="Иванов Иван Иванович"
                                label="ФИО (отчество можно не указывать если нет)"
                                :icon="false"
                                v-autofocus
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
                                    mask="## ##"
                                    max-length="5"
                                    auto-tab="passportNumber"
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
                                    mask="### ###"
                                    max-length="7"
                                    name="passportNumber"
                                    auto-tab="passportCode"
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
                                    mask="###-###"
                                    max-length="7"
                                    name="passportCode"
                                    auto-tab="passportDate"
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
                                ></the-field>
                            </fieldset>
                        </div>
                        <fieldset>address</fieldset>
                    </template>
                </form-wrapper>
                <template #fallback>
                    <skeleton-form>
                        <template #inputs>
                            <div class="input-skeleton d-flex">
                                <div class="bg-animate input-sk"></div>
                                <div class="bg-animate input-sk"></div>
                            </div>
                            <div class="checkbox-skeleton">
                                <div class="bg-animate checkbox-sk"></div>
                                <div class="bg-animate checkbox-sk"></div>
                            </div>
                        </template>
                    </skeleton-form>
                </template>
            </suspense>
        </template>
    </step-wrapper>
</template>

<style scoped lang="scss">
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
