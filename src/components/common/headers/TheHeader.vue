<script setup lang="ts">
import { useDictionaryStore } from '@/stores/common/DictionaryStore'
import useMobile from '@/hooks/mobile'

const { isMenu } = useMobile()

const dictionaryStore = useDictionaryStore()
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
                to="/primary"
                mode="black"
                v-if="!isMenu && $route.name === 'landing'"
                >Получить займ</base-button
            >
            <div class="header__mobile" v-if="isMenu">
                <div class="burger">
                    <span class="line line1"></span>
                    <span class="line line2"></span>
                    <span class="line line3"></span>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped lang="scss">
.header {
    color: $primary-black;
    width: 100%;

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

    &__burger {
        width: 24px;
        height: 18px;
        cursor: pointer;
        display: block;
        position: relative;

        &::before,
        &::after,
        & > span {
            background-color: $primary-black;
            height: 2px;
            border-radius: 2px;
            width: 100%;
            content: '';
            display: block;
            position: absolute;
            left: 0;
        }

        &::before {
            top: 0;
        }
        &::after {
            bottom: 0;
        }
        & > span {
            top: calc(50% - 1px);
        }
    }
}
</style>
