<script setup lang="ts">
import { useDictionaryStore } from '@/stores/common/DictionaryStore'
import { ref } from 'vue'

import type { Contacts } from '@/types/views/landing/contacts/contacts'

const dictionaryStore = useDictionaryStore()

const contacts = ref<Contacts[]>([
    {
        title: 'Телефон',
        tag: 'phone',
    },
    {
        title: 'Эл. почта',
        tag: 'email',
    },
    {
        title: 'Адрес',
        tag: 'address',
    },
])
</script>

<template>
    <ul class="items justify-content-between">
        <li
            class="item d-flex flex-column align-items-center"
            v-for="contact in contacts"
            :key="contact.title"
        >
            <div class="icon d-flex align-items-center justify-content-center">
                <div
                    class="img img-wrapper d-flex align-items-center justify-content-center"
                >
                    <img
                        :src="`assets/images/contacts/${contact.tag}.svg`"
                        :alt="contact.title"
                    />
                </div>
            </div>
            <span>{{ contact.title }}</span>
            <a
                class="link-hover"
                v-if="contact.tag === 'phone'"
                :href="`tel:${dictionaryStore.phoneLink}`"
                >{{ dictionaryStore.phoneMask }}</a
            >
            <a
                class="link-hover"
                v-else-if="contact.tag === 'email'"
                :href="`mailto:${dictionaryStore.emailLink}`"
                >{{ dictionaryStore.emailLink }}</a
            >
            <span v-else>{{ dictionaryStore.address }}</span>
        </li>
    </ul>
</template>

<style scoped lang="scss">
.items {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 31.8%);
}
.item {
    width: 100%;
    min-height: 220px;
    a,
    span {
        font-size: 24px;
        line-height: 29px;
        text-align: center;
        color: #232323;
        display: inline-block;
        max-width: 294px;
    }
    span + span,
    span + a {
        padding-top: 4px;
    }
}
.icon {
    background: $sub-background;
    margin-bottom: 38px;
    width: 112px;
    height: 112px;
    .img {
        max-width: 60px;
        height: 60px;
        img {
            height: auto;
            max-width: 100%;
        }
    }
}
@media (max-width: $tablet) {
    .item {
        a,
        span {
            font-size: 21px;
            line-height: 26px;
        }
    }
}
</style>
