<script setup lang="ts">
import { ref } from 'vue'
import type { AboutList } from '@/types/views/landing/about/about'

const aboutList = ref<AboutList[]>([
    {
        title: 'Данные под защитой',
        description: 'Шифруем данные и не передаем третьим лицам',
        icon: 'shield',
    },
    {
        title: 'Без проверки кредитной истории',
        description: 'Мы не проверяем ваш рейтинг',
        icon: 'thumbs',
    },
    {
        title: 'Без звонков и справок с работы',
        description: 'Нужно только заполнить анкету',
        icon: 'phone',
    },
    {
        title: 'Без скрытых комиссий',
        description: 'Подбор займа бесплатно',
        icon: 'wallet',
    },
])
</script>

<template>
    <ul class="items">
        <li class="item" v-for="item in aboutList" :key="item.title">
            <div class="top d-flex align-items-center">
                <div
                    class="icon d-flex align-items-center justify-content-center"
                >
                    <div
                        class="img-wrapper d-flex align-items-center justify-content-center"
                    >
                        <img
                            :src="`assets/images/about/${item.icon}.svg`"
                            :alt="item.title"
                        />
                    </div>
                </div>
                <span class="title">{{ item.title }}</span>
            </div>
            <p class="description">{{ item.description }}</p>
        </li>
    </ul>
</template>

<style scoped lang="scss">
.items {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 48.6%);
    grid-column-gap: 24px;
    grid-row-gap: 24px;
}
.item {
    width: 100%;
    max-width: 100%;
    min-height: 200px;
    background: #fefefe;
    box-shadow: 0px 232px 93px rgba(205, 207, 210, 0.01),
        0px 131px 78px rgba(205, 207, 210, 0.05),
        0px 58px 58px rgba(205, 207, 210, 0.09),
        0px 15px 30px rgba(180, 185, 204, 0.08),
        0px 0px 0px rgba(135, 135, 135, 0.42);
    padding: 20px 18px 18px 24px;

    .top {
        min-height: 82px;
    }

    .icon {
        width: 72px;
        height: 72px;
        background-color: $main_brand_2;
        margin-right: 16px;
        flex-shrink: 0;
        .img-wrapper {
            max-width: 34px;
            height: 34px;
            img {
                height: auto;
                max-width: 100%;
            }
        }
    }

    .title {
        font-weight: 600;
        line-height: 27px;
        display: inline-block;
    }

    .title,
    .description {
        font-size: 22px;
        letter-spacing: 0.07em;
    }

    .description {
        margin-top: 12px;
        line-height: 130%;
    }
}
@media (max-width: $mobile) {
    .items {
        grid-template-columns: repeat(1, 100%);
        grid-column-gap: 0;
        grid-row-gap: 18px;
        padding: 0 23px;
    }
    .item {
        min-height: 145px;
        padding: 20px;
        max-width: 400px;
        margin: 0 auto;

        .top {
            min-height: 55px;
            align-items: flex-start !important;
        }

        .icon {
            width: 55px;
            height: 55px;
            .img-wrapper {
                max-width: 32px;
                height: 32px;
            }
        }

        .title {
            font-size: 16px;
            line-height: 19px;
        }

        .description {
            margin-top: 15px;
            font-size: 12px;
            line-height: 18px;
        }
    }
}
</style>
