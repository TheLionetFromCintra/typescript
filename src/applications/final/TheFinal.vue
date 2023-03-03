<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

import TheHeader from '@/components/common/headers/TheHeader.vue'
import TheFooter from '@/components/common/footer/TheFooter.vue'
import OffersSkeleton from '@/applications/lk/components/OffersSkeleton.vue'

const TheLoans = defineAsyncComponent(() => import('./components/TheLoans.vue'))
</script>

<template>
    <div class="final">
        <div class="container">
            <div class="final-header">
                <the-header></the-header>
            </div>
            <section>
                <h1 class="subtitle">Мы подобрали Вам займы.</h1>
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

                <suspense>
                    <the-loans></the-loans>
                    <template #fallback>
                        <offers-skeleton></offers-skeleton>
                    </template>
                </suspense>
            </section>
        </div>
    </div>
    <the-footer></the-footer>
</template>

<style scoped lang="scss">
.final {
    .container {
        max-width: 1084px;
    }
    .final-header {
        padding-top: 45px;
        margin-bottom: 24px;
    }
    h1 {
        margin-bottom: 42px;
        text-align: left;
    }
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

    @media (max-width: $mobile) {
        .final-header {
            padding-top: 35px;
        }
        h1 {
            margin-bottom: 24px;
        }
    }
}
</style>
