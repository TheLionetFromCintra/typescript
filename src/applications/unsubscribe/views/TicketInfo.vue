<script setup lang="ts">
// import getTicket from '@/api/ticket'

import { reactive, computed, onMounted } from 'vue'
import { useDictionaryStore } from '@/stores/common/DictionaryStore'

import { useRoute } from 'vue-router'

const route = useRoute()

const dictionaryStore = useDictionaryStore()

const ticketProps = reactive({
    status: '',
    ticket: '',
})

const message = computed(() => {
    switch (ticketProps.status) {
        case 'success':
            return 'Подписка отменена'
        case 'attention':
            return 'Требует уточнений'
        case 'notFound':
            return 'Не найдено'
        default:
            return 'В работе'
    }
})

onMounted(async () => {
    console.log(route.params.uid)
    // const data = await getTicket(route.params.uid)

    // ticketProps.ticket = data.ticket
    // ticketProps.status = data.status
})
</script>

<template>
    <div class="icon d-flex align-items-center justify-content-center">
        <span>!</span>
    </div>
    <h3>Статус по заявке {{ ticketProps.ticket }}</h3>
    <div class="status">{{ message }}</div>
    <div class="phone" v-if="ticketProps.status === 'attention'">
        Свяжитесь с нами по телефону
        <a :href="`tel:${dictionaryStore.phoneLink}`">
            {{ dictionaryStore.phoneMask }}
        </a>
    </div>
    <div class="btn">
        <base-button :link="true" to="/unsubscribe" mode="black"
            >Вернуться</base-button
        >
    </div>
</template>

<style scoped lang="scss">
.icon {
    margin-bottom: 24px;
    width: 44px;
    height: 44px;
    background-color: $main_brand_1;
    border-radius: 50%;
    color: #fefeff;
    span {
        display: block;
        font-size: 24px;
        font-weight: 700;
    }

    img {
        width: 28px;
        height: 16px;
    }
}
h3 {
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    margin-bottom: 24px;
}

.phone {
    margin-top: 24px;
    font-size: 16px;
    line-height: 22px;
    color: $primary-grey-dark;
    a {
        color: $main_brand_1;
        font-weight: 600;
    }
    @media (max-width: $mobile) {
        max-width: 220px;
        margin: 24px auto 0 auto;
    }
}

.status {
    padding: 6px 16px;
    background-color: $main_brand_1;
    border-radius: 20px;
    color: #fefeff;
    width: fit-content;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
}
.btn {
    margin-top: 24px;
    a {
        width: 100%;
        max-width: 212px;
    }
}

@media (max-width: $mobile) {
    .icon {
        margin: 0 auto 24px auto;
    }
    h3 {
        font-size: 22px;
        line-height: 27px;
        margin: 0 auto 24px auto;
        text-align: center;
    }
    .desc {
        font-size: 14px;
        margin: 0 auto;
        text-align: center;
    }
    .btn {
        display: flex;
        justify-content: center;
    }
    .phone {
        max-width: 220px;
        margin: 24px auto 0 auto;
        text-align: center;
    }
    .status {
        margin: 0 auto;
    }
}
</style>
