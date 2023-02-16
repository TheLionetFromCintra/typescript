<script setup lang="ts">
import axios from 'axios'

import SelectField from '../select/SelectField.vue'
import { VUE_APP_DADATA_URL, VUE_APP_DADATA_TOKEN } from '@/const/common'
import { ref, onMounted } from 'vue'

const DADATA_URL = VUE_APP_DADATA_URL + 'address'
const TOKEN = VUE_APP_DADATA_TOKEN

const props = defineProps({
    activeValue: {
        type: String,
    },
    error: {
        type: String,
        default: '',
    },
})

const emit = defineEmits<{
    (e: 'update:modelValue', val: string): void
    (e: 'change', val: string): void
}>()

const list = ref([])
const warning = ref('')
const timeoutID = ref(0)
const showLoading = ref(0)
const isMounted = ref(false)

onMounted(() => {
    isMounted.value = true
})

const clearList = function () {
    list.value = []
}

const focus = function (v: string) {
    //later change
    if (list.value.length === 0) return

    getList(v)
}

const change = function (v: string) {
    emit('update:modelValue', v)
}

const getListTimeout = function (e: Event) {
    let v = (e.target as HTMLInputElement).value

    warning.value = ''
    list.value = []
    showLoading.value = 5
    clearTimeout(timeoutID.value)
    timeoutID.value = setTimeout(() => getList(v), 600)

    emit('update:modelValue', v)
}

const getList = function (v: string) {
    if (!v) {
        list.value = []
        showLoading.value = 0
        return
    }

    const data = {
        count: 5,
        restrict_value: true,
        query: v,
    }

    axios
        .post(DADATA_URL, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${TOKEN}`,
            },
        })
        .finally(() => {
            showLoading.value = 0
        })
        .then((response: any) => {
            if (
                response.data &&
                response.data.suggestions &&
                response.data.suggestions.length > 0
            ) {
                list.value = response.data.suggestions
            } else {
                list.value = []
            }

            if (list.value.length === 0)
                warning.value = 'Нет вариантов удовлетворяющих запросу'
        })
}
</script>

<template>
    <select-field
        label="Адрес регистрации"
        placeholder="Респ Крым, пгт Массандра, г Ялта, ул Стахановская, д 15 к 2 кв 24"
        itemsLabel="value"
        itemsKey="value"
        @focus="focus"
        @input="getListTimeout"
        @listClick="clearList"
        :beforeList="warning"
        :showLoading="showLoading"
        :list="list"
        @change="change"
        :active-value="props.activeValue"
        :error-message="props.error"
    >
    </select-field>
</template>
