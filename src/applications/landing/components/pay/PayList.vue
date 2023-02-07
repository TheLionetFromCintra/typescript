<script setup lang="ts">
import { ref } from 'vue'

const pays = ref<string[]>(['visa', 'mir', 'master', 'qiwi'])
</script>

<template>
    <div class="desc">
        <p>
            Моментальный подбор подходящих займов: просто укажите, какая сумма
            вам необходима. Мы подберем предложения с моментальным переводом
            денег на карту.
        </p>
    </div>
    <ul class="list d-flex align-items-center justify-content-between">
        <li v-for="pay in pays" :key="pay">
            <div
                class="img img-wrapper d-flex align-items-center justify-content-center"
            >
                <img :src="`assets/images/pay/pay-${pay}.svg`" :alt="pay" />
            </div>
        </li>
    </ul>
</template>

<style scoped lang="scss">
.desc {
    text-align: center;
    font-size: 24px;
    line-height: 33px;
    color: $primary-dark;
    max-width: 1038px;
    margin: 0 auto 48px auto;
}
.list {
    max-width: 896px;
    margin: 0 auto;
    li + li {
        margin-left: 24px;
    }
}
.img {
    max-width: 230px;
    height: 74px;
    img {
        height: auto;
        max-width: 100%;
    }
}
@media (max-width: $mobile) {
    .desc {
        display: none;
    }
    .list {
        justify-content: center !important;
        li:last-child {
            display: none;
        }
        .li + li {
            margin-left: 20px;
        }
        li:nth-child(3) {
            img {
                height: 100%;
                max-width: none;
            }
        }
    }
    .img {
        max-width: 58px;
        height: 22px;
    }
}
</style>
