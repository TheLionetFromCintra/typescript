<script setup lang="ts">
import TheFooter from '@/components/common/footer/TheFooter.vue'
import TheHeader from '@/components/common/headers/TheHeader.vue'

import SideBar from './components/SideBar.vue'

import useMobile from '@/hooks/mobile'

const { isMenu } = useMobile()
</script>

<template>
    <div class="account d-flex">
        <side-bar v-if="!isMenu"></side-bar>
        <div class="account__wrapper">
            <div class="account__content">
                <div class="account__header" v-if="isMenu">
                    <the-header></the-header>
                </div>
                <!-- <router-view v-slot="{ Component }">
                    <template v-if="Component.name !== 'save-changes'">
                        <keep-alive>
                            <component :is="Component" />
                        </keep-alive>
                    </template>
                    <template v-else>
                        <component :is="Component" />
                    </template>
                </router-view> -->
                <router-view></router-view>
            </div>
            <the-footer class="account__footer"></the-footer>
        </div>
    </div>
</template>

<style scoped lang="scss">
.account {
    &__wrapper {
        width: 100%;
    }
    &__content {
        padding: 115px 85px;
        min-height: calc(100vh - 150px);
    }

    @media (max-width: $tablet) {
        &__content {
            padding: 0 40px 128px 40px;
            min-height: initial;
        }
        &__header {
            padding-top: 45px;
            margin-bottom: 48px;
        }
    }

    @media (max-width: $mobile) {
        &__content {
            padding: 0 24px 128px 24px;
        }
        &__header {
            padding-top: 35px;
            margin-bottom: 36px;
        }
    }
}
</style>
