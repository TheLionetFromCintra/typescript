<script setup lang="ts">
import { ref } from 'vue'
import type { Offers } from '@/types/views/landing/offers/offers'

const offers = ref<Offers[]>([
    {
        id: '01ca29fe-979d-4235-9033-5bea5c7eb0cf',
        title: 'Начинающий',
        price: 'до 30 000',
        days: 'от 3 до 21 дня',
        icon: 'beginner',
    },
    {
        id: 'd4b1f3f3-261d-4df6-a74a-e5768d341ac8',
        title: 'Pro',
        price: 'до 60 000',
        days: 'от 3 до 60 дней',
        icon: 'pro',
    },
    {
        id: 'c9db8168-1eba-47d2-9e09-9f97f480240b',
        title: 'VIP',
        price: 'до 100 000',
        days: 'от 3 до 365 дней',
        icon: 'vip',
    },
])
</script>

<template>
    <ul class="items">
        <li
            class="item d-flex flex-column align-items-center justify-content-between"
            v-for="offer in offers"
            :key="offer.id"
        >
            <div class="icon d-flex align-items-center justify-content-center">
                <div
                    class="img img-wrapper d-flex align-items-center justify-content-center"
                >
                    <img
                        :src="`assets/images/offers/${offer.icon}.svg`"
                        alt="offer logo"
                    />
                </div>
            </div>
            <div class="title">
                <span>{{ offer.title }}</span>
            </div>
            <div class="description">
                <span>{{ offer.price }}</span>
                <span>{{ offer.days }}</span>
            </div>
            <base-button :link="true" mode="yellow" class="link" to="/primary"
                >Выбрать</base-button
            >
        </li>
    </ul>
</template>

<style scoped lang="scss">
.items {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 31.6%);
    grid-column-gap: 24px;
}
.item {
    padding: 20px;
    background: #fefefe;
    width: 100%;
    max-width: 100%;
    min-height: 320px;
    &:nth-child(1) {
        .img {
            margin-top: -6px;
        }
    }
    &:nth-child(2) {
        img {
            margin-top: -15px;
        }
    }
    &:nth-child(3) {
        img {
            margin-top: -25px;
        }
    }
}
.icon {
    background: $sub-background;
    width: 100%;
    max-width: 215px;
    height: 100px;
    .img {
        max-width: 172px;
        height: 118px;
        img {
            height: auto;
            max-width: 100%;
        }
    }
}
.title {
    margin-top: 12px;
    span {
        display: inline-block;
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
        letter-spacing: 0.07em;
    }
}
.description {
    span {
        display: block;
        text-align: center;
        margin-top: 6px;
        font-size: 16px;
        line-height: 20px;
        letter-spacing: 0.07em;
    }
}
.link {
    margin-top: 12px;
    min-width: 87%;
}
@media (max-width: $mobile) {
    .items {
        grid-template-columns: repeat(1, 100%);
        grid-column-gap: 0;
        grid-row-gap: 68px;
        padding: 0 23px;
    }
    .item {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px 34px;
        min-height: 290px;
    }
    .icon {
        height: 100px;
        max-width: 100%;
        .img {
            height: 100px;
            overflow: initial;
        }
    }
    .title {
        margin-top: 12px;
        span {
            font-size: 16px;
            line-height: 19px;
        }
    }
    .description {
        span {
            font-size: 12px;
            line-height: 18px;
        }
    }
    .link {
        margin-top: 12px;
        min-width: 212px;
    }
}
@media (max-width: 374px) {
    .item {
        padding: 20px;
    }
    .link {
        min-width: 174px;
    }
}
</style>
