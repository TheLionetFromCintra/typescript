<script setup lang="ts">
import useMobile from '@/hooks/mobile'
import { ref } from 'vue'

import type { Stats } from '@/types/views/landing/stat/stat'

const stats = ref<Stats[]>([
    {
        id: '29cd0167-284a-4991-8854-86794b2110d0',
        title: '19 542',
        description: 'одобренных займов',
    },
    {
        id: '2e5892db-fcdf-4f28-a180-b5c99212decd',
        title: '683,97 М',
        description: 'рублей выдано',
    },
    {
        id: 'a56cf8c3-952a-4840-a419-1dbe934bb665',
        title: '98%',
        description: 'вероятность одобрения',
    },
])

const { isMobile } = useMobile()
</script>

<template>
    <ul class="items justify-content-between" v-if="!isMobile">
        <li
            class="item d-flex flex-column align-items-center justify-content-between"
            v-for="stat in stats"
            :key="stat.id"
        >
            <h4>{{ stat.title }}</h4>
            <span>{{ stat.description }}</span>
        </li>
    </ul>
    <div
        class="wrapper d-flex align-items-center justify-content-end"
        v-if="!isMobile"
    >
        <h5 class="label">Поможем вам получить деньги в течение 10 минут</h5>
        <base-button :link="true" mode="yellow" to="/primary" class="link"
            >Оформить заявку</base-button
        >
    </div>
    <div class="mobile" v-if="isMobile">
        <div class="helper">
            <h4>Отправьте заявку</h4>
            <p>И получите список компаний за 15 минут</p>
            <div class="link-wrapper d-flex justify-content-center">
                <base-button link class="link" mode="yellow" to="/primary"
                    >Отправить</base-button
                >
            </div>
        </div>
        <div class="safe">
            <div
                class="shield d-flex align-items-center justify-content-center"
            >
                <div
                    class="icon img-wrapper d-flex align-items-center justify-content-center"
                >
                    <img
                        src="assets/images/stat/shield.svg"
                        alt="shield icon"
                    />
                </div>
            </div>
            <p>Все данные надежно защищены и зашифрованы</p>
        </div>
    </div>
</template>

<style scoped lang="scss">
h5 {
    margin: 0;
}
.items {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 31%);
}
.item {
    background: #fafafa;
    width: 100%;
    min-height: 152px;
    padding: 30px 8px 14px 8px;
    h4 {
        font-weight: 600;
        font-size: 48px;
        line-height: 52px;
        position: relative;
        z-index: 2;

        &::before {
            content: '';
            background-color: $main-brand_2;
            height: 9px;
            width: 103%;
            position: absolute;
            bottom: 4px;
            left: -2px;
            z-index: -1;
        }
    }
    span {
        display: inline-block;
        margin-top: 16px;
        font-size: 24px;
        line-height: 28px;
    }
}
.wrapper {
    background: #fafafa;
    padding: 36px 66px;
    margin: 72px 0 0 0;
}
.label {
    font-weight: 600;
    font-size: 32px;
    line-height: 39px;
    color: #2c2c2c;
    max-width: 458px;
}
.link {
    padding: 16px;
    min-width: 216px;
    margin-left: 74px;
}
@media (max-width: $tablet) {
    .item {
        min-height: 130px;
        h4 {
            font-size: 38px;
            line-height: 46px;
        }
        span {
            font-size: 20px;
            line-height: 24px;
        }
    }
    .wrapper {
        justify-content: space-between !important;
        padding: 36px 44px 44px 36px;
    }
    .label {
        font-size: 30px;
        line-height: 37px;
        max-width: 428px;
    }
    .link {
        margin-left: 24px;
    }
}
@media (max-width: $mobile) {
    .mobile {
        width: 100%;
        max-width: 400px;
        margin: 0 auto;
        padding: 0 24px;
        .helper {
            padding: 20px;
            background: #fefefe;
        }
        h4,
        p {
            text-align: center;
            letter-spacing: 0.07em;
        }
        h4 {
            font-weight: 600;
            font-size: 24px;
            line-height: 29px;
            margin-bottom: 12px;
        }
        p {
            font-size: 16px;
            line-height: 24px;
            max-width: 198px;
            margin: 0 auto;
        }
        .link-wrapper {
            margin-top: 24px;
        }
        .link {
            margin: 0;
            padding: 12px;
            min-width: initial;
            width: 100%;
            max-width: 230px;
        }
        .safe {
            margin-top: 50px;
            .shield {
                width: 60px;
                height: 60px;
                background-color: $sub-background;
                margin: 0 auto 12px auto;
            }
            .icon {
                max-width: 32px;
                height: 32px;
            }
            p {
                font-size: 12px;
                line-height: 18px;
                max-width: 210px;
            }
        }
    }
}
</style>
