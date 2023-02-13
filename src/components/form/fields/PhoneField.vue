<script setup lang="ts">
import TheField from '@/components/form/fields/TheField.vue'
import { vAutofocus } from '@/directives/vAutofocus'
import { ref } from 'vue'

const phone = ref('')
</script>

<template>
    <the-field
        v-model="phone"
        type="tel"
        placeholder="+7 911 111 11 11"
        label="Номер телефона"
        :icon="true"
        :pattern="true"
        v-autofocus
    ></the-field>
</template>
