<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

import AccountWrapper from '../layouts/AccountWrapper.vue'
import OffersSkeleton from '../components/OffersSkeleton.vue'

const TheLoans = defineAsyncComponent(
    () => import('@/applications/final/components/TheLoans.vue')
)
</script>

<template>
    <account-wrapper title="Предложения">
        <template #desc>
            <div class="desc">
                <span
                    ><b>Быстро</b> оформить заявку с любой кредитной
                    историей.</span
                >
                <span
                    >Для гарантированного получения займа подайте заявки как
                    минимум в 3 компании.</span
                >
                <span><b>Выберите свой займ в МФО:</b></span>
            </div>
        </template>
        <template #content>
            <suspense>
                <the-loans></the-loans>
                <template #fallback>
                    <offers-skeleton class="lk"></offers-skeleton
                ></template>
            </suspense>
        </template>
    </account-wrapper>
</template>

<style scoped lang="scss">
.desc {
    font-size: 16px;
    line-height: 22px;
    color: $primary-grey-dark;
    margin-bottom: 24px;

    span {
        display: block;
    }
    span + span {
        margin-top: 12px;
    }
}
</style>
