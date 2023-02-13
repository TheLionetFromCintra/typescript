<script setup scoped>
import PhoneField from '@/components/form/fields/PhoneField.vue'
import TheField from '@/components/form/fields/TheField.vue'
import { reactive, ref, onMounted } from 'vue'

import { useAppStore } from '@/stores/app/AppStore'

const appStore = useAppStore()

const form = reactive({
    phone: '',
    email: '',
})

const formRules = reactive({
    // phone: [Validation.REQUIRED, Validation.PHONE, Validation.MOBILE],
    // email: [Validation.EMAIL],
})

const emailFocused = ref(false)
const phoneFocused = ref(false)

const emailFocus = function () {
    if (emailFocused.value) return

    emailFocused.value = true
    // stat('email')
}

onMounted(() => {
    const { phone, email } = appStore.data.contactData

    form.phone = phone
    form.email = email

    // if (form.phone || appStore.data.contactData.id) return
})
</script>

<template>
    <phone-field></phone-field>
    <the-field
        v-model.trim="form.email"
        type="email"
        placeholder="user@mail.ru"
        label="E-mail"
        :icon="true"
        @focus="emailFocus"
    ></the-field>
</template>
