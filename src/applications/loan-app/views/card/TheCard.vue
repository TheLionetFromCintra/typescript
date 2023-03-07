<script setup lang="ts">
import sendCard from '@/api/sendCard'
import checkCard from '@/api/checkCard'

import { vAutofocus } from '@/directives/vAutofocus'
// @ts-ignore
import { CardInfo } from 'card-info'

import {
    defineAsyncComponent,
    reactive,
    ref,
    computed,
    watch,
    onMounted,
} from 'vue'
import type { WritableComputedRef } from 'vue'

import { useDictionaryStore } from '@/stores/common/DictionaryStore'
import { useAppStore } from '@/stores/app/AppStore'

import Validation from '@/ext/validation/validation'
import useValidation from '@/hooks/validation'

import { useRoute, useRouter } from 'vue-router'

import TheField from '@/components/form/fields/TheField.vue'
import StepWrapper from '../../layouts/StepWrapper.vue'
import SkeletonForm from '../../layouts/SkeletonForm.vue'

const FormWrapper = defineAsyncComponent(
    () => import('../../layouts/FormWrapper.vue')
)

const route = useRoute()
const router = useRouter()

const dictionaryStore = useDictionaryStore()
const appStore = useAppStore()

const { validate, filterErrors } = useValidation()

const dictionary = new Map()
dictionary.set('1054', 'Истек срок действия карты')
dictionary.set('1082', 'Неверный CVV')
dictionary.set(
    '101',
    'Проверьте введенные данные или воспользуйтесь другой картой'
)
dictionary.set('1051', 'Недостаточно средств на карте')

const DEFAULT_MASK = '#### #### #### #### ##'

const showNoCardBlock = ref(false)
const cardMask = ref(DEFAULT_MASK)
let cardInfo = reactive({})
const error = ref('')
const cardLength = ref(0)

//FORM FIELDS
interface Form {
    number: string
    holder_name: string
    date: string
    cvv: string
}

const form = reactive<Form>({
    number: '',
    holder_name: '',
    date: '',
    cvv: '',
})

const cardName: WritableComputedRef<string> = computed({
    get(): string {
        return form.holder_name.replace(/^ +| +$|( ) +/g, '$1')
    },
    set(v: string): void {
        form.holder_name = v
    },
})

const cardDate: WritableComputedRef<string> = computed({
    get(): string {
        return form.date
    },
    set(v: string): void {
        let [month, year = ''] = v.split('/')

        let yearStart = +String(currentYear).substr(0, 2)
        const yearEnd = +String(currentYear).substr(2)
        if (yearEnd < yearStart && yearEnd - ALLOW_CARD_YEARS <= 0) ++yearStart

        if (+month > 12 || (month.length === 2 && +month === 0)) {
            month = '12'
        }
        year = `${yearStart}${year}`
        v = `01.${month}.${year}`

        form.date = v
    },
})

const getCardMask = function () {
    const { number } = form

    if (number.length > 6 && cardInfo.numberBlocks) return

    if (number.length < 6) {
        cardInfo = {}
        cardMask.value = DEFAULT_MASK
    } else if (!cardInfo.numberBlocks) {
        cardInfo = new CardInfo(number)

        cardMask.value = cardInfo.numberBlocks
            .map((num: number) => {
                return '#'.repeat(num)
            })
            .join(' ')
    }

    cardLength.value = cardMask.value.split('').length
}
getCardMask()

//--FORM FIELDS

//FORM ERRORS
let errors = reactive<Form>({
    number: '',
    holder_name: '',
    date: '',
    cvv: '',
})

let validateFields = reactive({
    formErrors: {},
    isValid: {},
})

const ALLOW_CARD_YEARS = 8

const { REQUIRED, MIN, MAX, EXP, DATE, DATE_MORE, DATE_LESS, CARD } = Validation

const MIN_VAL = 2
const MAX_VAL = 255

const date = new Date()

const currentYear = date.getFullYear()
const currentMonth = date.getMonth() + 1

const CARD_OWNER_EXP = /^[a-zA-Z ]*$/

const TODAY = `01.${currentMonth}.${currentYear}`
const MAX_CARD_DATE = `01.${currentMonth}.${currentYear + ALLOW_CARD_YEARS}`

const formRules = reactive({
    number: [REQUIRED, [MIN, 13], [MAX, 18], CARD],
    date: [REQUIRED, DATE, [DATE_MORE, TODAY], [DATE_LESS, MAX_CARD_DATE]],
    holder_name: [
        REQUIRED,
        [MIN, MIN_VAL],
        [MAX, MAX_VAL],
        [EXP, CARD_OWNER_EXP],
    ],
    cvv: [REQUIRED, [MIN, 3], [MAX, 3]],
})

const customErrors = reactive({
    number: {
        [MIN]: 'Номер карты сожержит не менее {{0}} цифр',
        [MAX]: 'Номер карты сожержит не более {{0}} цифр',
    },
    holder_name: {
        [EXP]: 'Только символы латинского алфавита',
    },
    date: {
        [DATE]: 'Срок указан не полностью',
        [DATE_MORE]: 'Карта просрочена',
        [DATE_LESS]: `Мы принимаем карты сроком до ${ALLOW_CARD_YEARS} лет`,
    },
})

const errorsDisplay = computed((): string[] => {
    const { number, holder_name, date, cvv } = errors

    return [error.value, number, holder_name, date, cvv].reduce((acc, item) => {
        if (item && !acc.includes(item)) {
            acc.push(item)
        }

        return acc
    }, [])
})
//--FORM ERRORS

//VALIDATION AND SUBMITTING FORM
const submit = async function () {
    try {
        appStore.submitForm(true)
        await checkCard(form.number)
        appStore.submitForm(false)
    } catch (e) {
        errors.number = 'Невалидная карта'
        return
    }

    const card = {
        card: form.number,
        date: `${form.date.split('.')[1]}/${form.date
            .split('.')[2]
            .substr(-2)}`,
        cvv: form.cvv,
        name: form.holder_name,
    }

    let data
    try {
        appStore.submitForm(true)
        data = await sendCard(card)
        appStore.submitForm(false)
    } catch (error) {
        appStore.loadError(true)
        return
    }

    router.push({
        name: 'LoanCardSecure',
        state: {
            data: JSON.stringify(data),
            card: JSON.stringify(card),
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
        if (newVal.number) {
            getCardMask()
        }

        validateFields = validate(newVal, formRules, customErrors, false)
        filterErrors(validateFields.formErrors, errors)
    },
    { deep: true }
)
//--VALIDATION AND SUBMITTING FORM

onMounted(async () => {
    if (route.query.code) {
        alert(dictionary.get(route.query.code) || 'Используйте другую карту')
    }

    setTimeout(() => {
        showNoCardBlock.value = true
    }, 25000)

    appStore.load(true)
    await appStore.updateData()
    appStore.load(false)

    const {
        passportData: { passportnumber },
        isSubscribed,
        isSigned,
    } = appStore.data

    if (isSubscribed) {
        router.push({ name: 'PersonalAccount' })
    }
    if (isSigned || passportnumber) {
        return
    } else {
        router.push({ name: 'LoanContact' })
    }
})
</script>

<template>
    <base-error v-if="appStore.showError"></base-error>
    <step-wrapper
        :step-current="3"
        :step-max="3"
        step-title="Введите данные вашей карты"
        :show-cacl="true"
    >
        <template #form>
            <form-wrapper
                v-if="!appStore.isLoad"
                @submit="validateForm"
                class="card-form"
                :class="{ loader: appStore.isSubmit }"
            >
                <template #inputs>
                    <h3>Данные банковской карты</h3>
                    <h4>на которую хотите получить займ</h4>

                    <div class="card">
                        <div class="card__front">
                            <div class="card__first-line">
                                <the-field
                                    v-model="form.number"
                                    class="card__field"
                                    type="text"
                                    label="Номер карты"
                                    placeholder="0000 0000 0000 0000"
                                    :mask="cardMask"
                                    :dontShowErrorMsg="true"
                                    :valueWithoutMask="true"
                                    :icon="false"
                                    :pattern="true"
                                    :max-length="cardLength"
                                    v-autofocus
                                    :error="errors.number"
                                ></the-field>
                            </div>
                            <div class="card__second-line">
                                <the-field
                                    v-model.trim="cardName"
                                    class="card__field card__field-second"
                                    type="text"
                                    label="Владелец"
                                    placeholder="VLADIMIR KIROV"
                                    :dontShowErrorMsg="true"
                                    :error="errors.holder_name"
                                ></the-field>
                                <the-field
                                    v-model="cardDate"
                                    class="card__field card__field-last"
                                    type="text"
                                    label="Срок"
                                    placeholder="09/25"
                                    :dontShowErrorMsg="true"
                                    auto-tab="cvv"
                                    mask="##/##"
                                    :pattern="true"
                                    :card-type="true"
                                    max-length="5"
                                    :error="errors.date"
                                ></the-field>
                            </div>
                        </div>
                        <div class="card__back">
                            <the-field
                                v-model="form.cvv"
                                class="card__field card__field-back"
                                type="password"
                                label="CVV"
                                placeholder="000"
                                :dontShowErrorMsg="true"
                                name="cvv"
                                mask="###"
                                :pattern="true"
                                max-length="3"
                                :error="errors.cvv"
                            ></the-field>
                        </div>
                    </div>

                    <div v-if="errorsDisplay.length" class="card__errors">
                        <p v-for="error in errorsDisplay" :key="error">
                            {{ error }}
                        </p>
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
                        <router-link to="/final">У меня нет карты</router-link>
                    </div>
                </template>
                <template #btn-label>Продолжить</template>
            </form-wrapper>

            <skeleton-form class="card-skeleton" v-else>
                <template #inputs>
                    <div class="bg-animate title-sk"></div>
                    <div class="bg-animate title-sk"></div>
                    <div class="bg-animate card-sk"></div>
                    <div class="bg-animate desc-sk"></div>
                </template>
            </skeleton-form>
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

    &__errors {
        max-width: 554px;
        margin: 16px auto 0 auto;
        padding-left: 30px;
        position: relative;

        &::before {
            content: '!';
            position: absolute;
            left: 0;
            top: -4px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: $invalid;
            color: #fff;

            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: 600;
        }

        font-size: 14px;
        line-height: 18px;
        color: $invalid;

        p + p {
            margin-top: 5px;
        }

        @media (max-width: $mobile) {
            font-size: 12px;
            line-height: 16px;
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
