<script setup lang="ts">
import { useDictionaryStore } from '@/stores/common/DictionaryStore'
import { ref } from 'vue'
import { vLazyload } from '@/directives/vLazyload'

import type { Contacts } from '@/types/views/landing/contacts/contacts'

const dictionaryStore = useDictionaryStore()

const contacts = ref<Contacts[]>([
    {
        id: '1d71bcc9-76a8-4a72-a5f6-ec065894cd0d',
        title: 'Телефон',
        tag: 'phone',
    },
    {
        id: '782375c9-4eac-4550-a3dd-efe26f833096',
        title: 'Эл. почта',
        tag: 'email',
    },
    {
        id: '50b50a2c-aeb7-484c-b622-1952b77d98b0',
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
            :key="contact.id"
        >
            <div
                class="icon d-flex align-items-center justify-content-center lazy-img"
            >
                <div
                    class="img img-wrapper d-flex align-items-center justify-content-center"
                >
                    <img
                        v-lazyload
                        :data-src="`assets/images/contacts/${contact.tag}.svg`"
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
