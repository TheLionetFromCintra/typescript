<script setup lang="ts">
import Cookies from 'js-cookie'

import StepWrapper from '../../layouts/StepWrapper.vue'
import SkeletonForm from '../../layouts/SkeletonForm.vue'
import TheCheckbox from '@/components/form/checkbox/TheCheckbox.vue'
import ContactInfo from '../../components/ContactInfo.vue'

import { computed, ref, onMounted, defineAsyncComponent } from 'vue'
import { useDictionaryStore } from '@/stores/common/DictionaryStore'
import useMobile from '@/hooks/mobile'
import useComebacker from '@/hooks/comebacker'

const FormWrapper = defineAsyncComponent(
    () => import('../../layouts/FormWrapper.vue')
)

useComebacker()

const dictionaryStore = useDictionaryStore()
const { isCpa } = useMobile()

const agreement = ref(false)
const autoPayment = ref(false)

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

const submit = function () {
    console.log('submit')
}

onMounted(() => {
    if (isCpa) agreement.value = true
})
</script>

<template>
    <step-wrapper
        :step-current="1"
        :step-max="3"
        step-title="Заполните форму"
        mob-title="Контактные данные"
    >
        <template #form>
            <suspense>
                <form-wrapper @submit="submit">
                    <template #inputs>
                        <fieldset class="inputs d-flex">
                            <contact-info></contact-info>
                        </fieldset>
                        <div class="checkbox-wrapper">
                            <the-checkbox
                                v-if="acceptanceText"
                                :desc="acceptanceText"
                                v-model="agreement"
                            ></the-checkbox>
                            <the-checkbox
                                v-if="!isCpa && autoPaymentText"
                                :desc="autoPaymentText"
                                v-model="autoPayment"
                            ></the-checkbox>
                        </div>
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
