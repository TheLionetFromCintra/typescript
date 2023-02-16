<script setup lang="ts">
import { vAutofocus } from '@/directives/vAutofocus'

import {
    defineAsyncComponent,
    reactive,
    ref,
    computed,
    watch,
    onMounted,
} from 'vue'
// import type { WritableComputedRef } from 'vue'
import { useDictionaryStore } from '@/stores/common/DictionaryStore'

import { useRoute } from 'vue-router'

import TheField from '@/components/form/fields/TheField.vue'
import StepWrapper from '../../layouts/StepWrapper.vue'
import SkeletonForm from '../../layouts/SkeletonForm.vue'

const FormWrapper = defineAsyncComponent(
    () => import('../../layouts/FormWrapper.vue')
)

const route = useRoute()

const dictionaryStore = useDictionaryStore()

const dictionary = new Map()
dictionary.set('1054', 'Истек срок действия карты')
dictionary.set('1082', 'Неверный CVV')
dictionary.set(
    '101',
    'Проверьте введенные данные или воспользуйтесь другой картой'
)
dictionary.set('1051', 'Недостаточно средств на карте')

const showNoCardBlock = ref(false)

//FORM FIELDS
//--FORM FIELDS

//FORM ERRORS
//--FORM ERRORS

//VALIDATION AND SUBMITTING FORM
const submit = async function () {
    console.log('sumbit')
}

const validateForm = function () {
    // validateFields = validate(form, formRules, customErrors)

    // filterErrors(validateFields.formErrors, errors)

    // validateFields.isValid &&
    submit()
}

// watch(
//     () => form,
//     (newVal) => {
//         validateFields = validate(newVal, formRules, customErrors, false)
//         filterErrors(validateFields.formErrors, errors)
//     },
//     { deep: true }
// )
//--VALIDATION AND SUBMITTING FORM

onMounted(() => {
    if (route.query.code) {
        alert(dictionary.get(route.query.code) || 'Используйте другую карту')
    }

    setTimeout(() => {
        showNoCardBlock.value = true
    }, 25000)
})
</script>

<template>
    <step-wrapper
        :step-current="3"
        :step-max="3"
        step-title="Введите данные вашей карты"
    >
        <template #form>
            <suspense>
                <form-wrapper @submit="validateForm" class="card-form">
                    <template #inputs>
                        <h3>Данные банковской карты</h3>
                        <h4>на которую хотите получить займ</h4>

                        <div class="card">
                            <div class="card__front">
                                <div class="card__first-line">
                                    <the-field
                                        class="card__field"
                                        type="text"
                                        label="Номер карты"
                                        placeholder="0000 0000 0000 0000"
                                        :dontShowErrorMsg="true"
                                        :valueWithoutMask="true"
                                        :icon="false"
                                        :pattern="true"
                                        v-autofocus
                                    ></the-field>
                                </div>
                                <div class="card__second-line">
                                    <the-field
                                        class="card__field card__field-second"
                                        type="text"
                                        label="Владелец"
                                        placeholder="VLADIMIR KIROV"
                                        :dontShowErrorMsg="true"
                                    ></the-field>
                                    <the-field
                                        class="card__field card__field-last"
                                        type="text"
                                        label="Срок"
                                        placeholder="09/25"
                                        :dontShowErrorMsg="true"
                                        auto-tab="cvv"
                                        mask="##/##"
                                        :pattern="true"
                                        max-length="5"
                                    ></the-field>
                                </div>
                            </div>
                            <div class="card__back">
                                <the-field
                                    class="card__field card__field-back"
                                    type="password"
                                    label="CVV"
                                    placeholder="000"
                                    :dontShowErrorMsg="true"
                                    name="cvv"
                                    mask="###"
                                    :pattern="true"
                                    max-length="3"
                                ></the-field>
                            </div>
                        </div>

                        <div
                            class="desc"
                            v-if="
                                dictionaryStore.dictionary.get('dictionary')
                                    ?.cardTitle
                            "
                            v-html="
                                dictionaryStore.dictionary.get('dictionary')
                                    ?.cardTitle
                            "
                        ></div>
                        <div class="no-card" v-if="showNoCardBlock">
                            <router-link to="/final"
                                >У меня нет карты</router-link
                            >
                        </div>
                    </template>
                </form-wrapper>
                <template #fallback>
                    <skeleton-form class="card-skeleton">
                        <template #inputs>
                            <div class="bg-animate title-sk"></div>
                            <div class="bg-animate title-sk"></div>
                            <div class="bg-animate card-sk"></div>
                            <div class="bg-animate desc-sk"></div>
                        </template>
                    </skeleton-form>
                </template>
            </suspense>
        </template>
    </step-wrapper>
</template>

<style scoped lang="scss">
//DESC
h3,
h4 {
    font-weight: 600;
    text-align: center;
    color: $primary-grey-dark;
}
h3 {
    font-size: 24px;
    line-height: 33px;
}
h4 {
    margin-top: 12px;
    font-size: 16px;
    line-height: 22px;
}
.desc {
    margin: 36px auto 0 auto;
    max-width: 554px;

    @media (max-width: $mobile) {
        margin-top: 24px;
    }

    &::v-deep {
        a {
            color: inherit;
            font-weight: 600;
        }
    }
}

.desc,
.no-card {
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    color: $primary-grey-dark;

    @media (max-width: $mobile) {
        font-size: 12px;
        line-height: 16px;
    }
}

.no-card {
    margin-top: 36px;
    a {
        color: $primary-grey-dark;
        padding-bottom: 2px;
        border-bottom: 1px solid $primary-grey-dark;
        transition: border-color 0.3s linear;
        &:hover {
            border-color: transparent;
        }
    }

    @media (max-width: $mobile) {
        margin-top: 24px;
    }
}
//--DESC

//CARD
.card {
    max-width: 554px;
    width: 100%;
    margin: 36px auto 0 auto;

    @media (max-width: $mobile) {
        max-width: 454px;
        margin-top: 24px;
    }

    &__front {
        background: $sub-background;
        box-sizing: border-box;
        border-radius: 10px;
        padding: 26px 32px;
        width: calc(100% - 138px);
        min-height: 221px;
        position: relative;
        z-index: 1;

        @media (max-width: $mobile) {
            width: 75%;
            min-height: 170px;
            padding: 18px;
        }
    }

    &__back {
        border-radius: 10px;
        padding: 0 16px 53px 0;
        width: calc(100% - 138px);
        margin-left: auto;
        margin-top: -194px;
        background-color: $primary-grey-dark;
        min-height: 221px;

        display: flex;
        align-items: flex-end;

        @media (max-width: $mobile) {
            width: 75%;
            min-height: 170px;
            margin-top: -156px;
            padding: 0 10px 32px 0;
        }
    }

    &__front,
    &__back {
        @media (max-width: 374px) {
            width: 71%;
        }
    }

    &__second-line {
        margin-top: 17px;
        display: flex;

        @media (max-width: $mobile) {
            margin-top: 8px;
        }

        & > * {
            flex-grow: 1;

            &:not(:last-child) {
                margin-right: 16px;
            }
        }
    }
}
//--CARD

//SKELETON
.bg-animate {
    width: 100%;
    max-width: 554px;
    margin: 0 auto;
}
.title-sk {
    height: 30px;
}
.title-sk + .title-sk {
    margin-top: 16px;
}
.card-sk {
    height: 160px;
    margin: 24px auto;
}
.desc-sk {
    height: 70px;
}
//--SKELETON
</style>
