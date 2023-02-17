<script setup lang="ts">
import Cookies from 'js-cookie'
import MobMenu from '../menu/MobMenu.vue'
import { ref } from 'vue'

import { useDictionaryStore } from '@/stores/common/DictionaryStore'
import useMobile from '@/hooks/mobile'

const { isMenu } = useMobile()

const dictionaryStore = useDictionaryStore()

const activeMenu = ref(false)

const toggleMenu = function () {
    activeMenu.value = !activeMenu.value

    if (activeMenu.value) {
        document.querySelector('html')?.classList.add('hidden')
    } else {
        document.querySelector('html')?.classList.remove('hidden')
    }
}

const closeMenu = function () {
    activeMenu.value = false
}
</script>

<template>
    <header class="header">
        <div class="wrapper d-flex align-items-center justify-content-between">
            <div>
                <a v-if="$route.name === 'landing'" href="/" class="logo"></a>
                <router-link
                    v-else
                    :to="{ name: 'landing' }"
                    class="logo sub"
                ></router-link>
            </div>
            <div class="phone" v-if="!isMenu && $route.name === 'landing'">
                <a
                    class="link-hover"
                    :href="`tel:${dictionaryStore.phoneLink}`"
                    >{{ dictionaryStore.phoneMask }}</a
                >
            </div>
            <base-button
                class="link"
                :link="true"
                :to="`${Cookies.get('sbg-in') ? '/lk' : '/primary'}`"
                mode="black"
                v-if="!isMenu && $route.name === 'landing'"
                >{{
                    Cookies.get('sbg-in') ? 'Личный кабинет' : 'Получить займ'
                }}</base-button
            >
            <div class="header__mobile" v-if="isMenu" @click="toggleMenu">
                <div class="burger" :class="{ active: activeMenu }">
                    <span class="line line1"></span>
                    <span class="line line2"></span>
                    <span class="line line3"></span>
                </div>
            </div>
        </div>
    </header>

    <mob-menu :is-active="activeMenu" :close-menu="closeMenu"></mob-menu>
</template>

<style scoped lang="scss">
.header {
    color: $primary-black;
    width: 100%;
    position: relative;
    z-index: 1001;

    @media (max-width: $mobile) {
        padding: 0;
    }

    .phone {
        margin-left: 76px;
        a {
            font-size: 24px;
            line-height: 33px;
            color: inherit;
        }
    }

    .link {
        min-width: 168px;
        padding: 15px;
    }

    &__content {
        margin: 0 auto;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__mobile {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .burger {
        .line {
            display: block;
            height: 2px;
            width: 24px;
            background-color: $primary-black;
        }

        .line1 {
            transform-origin: 0% 0%;
            transition: transform 0.4s ease-in-out;
        }

        .line2 {
            transition: transform 0.2s ease-in-out;
        }

        .line3 {
            transform-origin: 0% 100%;
            transition: transform 0.4s ease-in-out;
        }
        .line + .line {
            margin-top: 6px;
        }
        &.active .line1 {
            transform: rotate(45deg);
        }
        &.active .line2 {
            transform: scaleY(0);
        }
        &.active .line3 {
            transform: rotate(-45deg);
        }
    }
}
</style>
