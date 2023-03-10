<script setup lang="ts">
import Cookies from 'js-cookie'

import { vAutofocus } from '@/directives/vAutofocus'

import StepWrapper from '../../layouts/StepWrapper.vue'
import SkeletonForm from '../../layouts/SkeletonForm.vue'
import TheCheckbox from '@/components/form/checkbox/TheCheckbox.vue'
import TheField from '@/components/form/fields/TheField.vue'

import Validation from '@/ext/validation/validation'
import useValidation from '@/hooks/validation'

import stat from '@/api/stat'
import Storage from '@/ext/storage/storage'

import {
    computed,
    ref,
    reactive,
    onMounted,
    defineAsyncComponent,
    watch,
} from 'vue'
import { useDictionaryStore } from '@/stores/common/DictionaryStore'
import setMask from '@/helpers/string/setMask'

import { useAppStore } from '@/stores/app/AppStore'
import useMobile from '@/hooks/mobile'
import useComebacker from '@/hooks/comebacker'

import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const FormWrapper = defineAsyncComponent(
    () => import('../../layouts/FormWrapper.vue')
)

useComebacker()

const { validate, filterErrors } = useValidation()

//CHECKBOXES
const dictionaryStore = useDictionaryStore()
const appStore = useAppStore()

const { isCpa } = useMobile()

const agreement = ref(false)
const autoPayment = ref(false)
const isSubmit = ref(false)

const acceptanceText = computed((): string | undefined => {
    if (!Cookies.get('sbg-in'))
        return (
            dictionaryStore.dictionary.get('dictionary')?.acceptanceTextFirst ||
            dictionaryStore.dictionary.get('dictionary')?.acceptanceText
        )

    return dictionaryStore.dictionary.get('dictionary')?.acceptanceText
})

const autoPaymentText = computed((): string | undefined => {
    return dictionaryStore.dictionary.get('dictionary')?.acceptanceAutoPayment
})
//--CHECKBOXES

//FORM INPUTS
interface Form {
    phone: string
    email: string
}

const form = reactive<Form>({
    phone: '',
    email: '',
})

let errors = reactive<Form>({
    phone: '',
    email: '',
})

let validateFields = reactive({
    formErrors: {},
    isValid: {},
})

const formRules = reactive({
    phone: [Validation.REQUIRED, Validation.PHONE, Validation.MOBILE],
    email: [Validation.EMAIL],
})

const customErrors = reactive({})

const emailFocused = ref(false)
const phoneFocused = ref(false)

const emailFocus = function () {
    if (emailFocused.value) return

    emailFocused.value = true
    stat('email')
}
const phoneFocus = function () {
    if (phoneFocused.value) return

    phoneFocused.value = true
    stat('phone')
}

//--FORM INPUTS

//VALIDATION AND SUBMITTING FORM
const submit = async function () {
    let res
    try {
        appStore.submitForm(true)
        res = await appStore.send('info', {
            contactData: {
                ...form,
                phone: setMask(form.phone, '+7(###)###-##-##'),
            },
        })
        appStore.submitForm(false)
    } catch (error) {
        appStore.loadError(true)
        return
    }

    if (res.noValid && Object.keys(res.noValid)) {
        errors.phone =
            (res.noValid.phone === false && '???????????????????? ????????????????') || ''
        errors.email =
            (res.noValid.email === false && '???????????????????? ????????????????') || ''

        return
    }

    if (!res.checkPhoneByCode) {
        router.push({ name: 'LoanContact' })
    } else {
        Storage.set('user_phone', form.phone)
        router.push({
            name: 'LoanAuth',
            query: {
                phone: form.phone,
            },
        })
    }
}

const validateForm = function () {
    isSubmit.value = true
    validateFields = validate(form, formRules, customErrors)

    filterErrors(validateFields.formErrors, errors)
    ;((autoPaymentText.value && autoPayment.value) || !autoPaymentText.value) &&
        validateFields.isValid &&
        agreement.value &&
        submit()
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

//HOOKS
onMounted(async () => {
    if (isCpa.value) agreement.value = true

    try {
        if (Cookies.get('sbg-identity')) appStore.load(true)
        await appStore.updateData()
        if (Cookies.get('sbg-identity')) appStore.load(false)
    } catch (error) {
        appStore.loadError(true)
        return
    }

    form.phone =
        setMask(appStore.data.contactData.phone, '+7 ### ### ## ##') ?? ''
    form.email = appStore.data.contactData.email ?? ''
})
//--HOOKS

//ANTICHARGE
const isAnticharge = computed((): boolean => {
    return route.name === 'Anticharge'
})

if (isAnticharge.value) {
    alert(`???????? ????????????????: ${appStore.createdAt}`)
}
//--ANTICHARGE
</script>

<template>
    <div class="preloader-wrapper" v-if="dictionaryStore.isLoad">
        <div class="preloader">
            <div class="block orange"></div>
            <div class="block blue"></div>
        </div>
    </div>

    <base-error v-if="appStore.showError"></base-error>
    <step-wrapper
        :step-current="1"
        :step-max="3"
        step-title="?????????????????? ??????????"
        mob-title="???????????????????? ????????????"
        :show-cacl="true"
    >
        <template #form>
            <form-wrapper
                v-if="!appStore.isLoad"
                @submit="validateForm"
                :class="{ loader: appStore.isSubmit }"
            >
                <template #inputs>
                    <fieldset class="inputs d-flex">
                        <the-field
                            v-model="form.phone"
                            type="tel"
                            placeholder="+7 911 111 11 11"
                            label="?????????? ????????????????"
                            :icon="true"
                            :pattern="true"
                            v-autofocus
                            @focus="phoneFocus"
                            :error="errors.phone"
                            :disabled="!!appStore.data.contactData.id"
                        ></the-field>

                        <the-field
                            v-model.trim="form.email"
                            type="email"
                            placeholder="user@mail.ru"
                            label="E-mail"
                            :icon="true"
                            @focus="emailFocus"
                            :error="errors.email"
                        ></the-field>
                    </fieldset>

                    <div class="checkbox-wrapper">
                        <the-checkbox
                            v-if="acceptanceText"
                            :desc="acceptanceText"
                            v-model="agreement"
                            :error="isSubmit && !agreement"
                        ></the-checkbox>
                        <the-checkbox
                            v-if="!isCpa && autoPaymentText"
                            :desc="autoPaymentText"
                            v-model="autoPayment"
                            :error="isSubmit && !autoPayment"
                        ></the-checkbox>
                    </div>
                </template>
                <template #btn-label> ???????????????????? </template>
            </form-wrapper>

            <skeleton-form v-else>
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
    </step-wrapper>
</template>

<style scoped lang="scss">
.inputs {
    gap: 0 24px;
}
.bg-animate {
    width: 100%;
}
.checkbox-wrapper,
.checkbox-skeleton {
    margin-top: 60px;
}

.checkbox-skeleton {
    padding: 0 24px;
}
.input-skeleton {
    gap: 0 24px;
}
.checkbox-sk,
.input-sk {
    height: 50px;
}
.checkbox-sk + .checkbox-sk {
    margin-top: 24px;
}

@media (max-width: $mobile) {
    .inputs {
        gap: 24px 0;
        flex-direction: column;
    }

    .checkbox-wrapper,
    .checkbox-skeleton {
        margin-top: 36px;
    }

    .checkbox-skeleton {
        padding: 0;
    }
    .input-skeleton {
        gap: 24px 0;
        flex-direction: column;
    }
    .checkbox-sk {
        height: 80px;
    }
}
</style>
