<script setup lang="ts">
// import finalStat from '@/api/finalStat'

import type { PropType } from 'vue'
import type { Loan } from '@/types/common/loans'

import { ref, computed } from 'vue'
import { vLazyload } from '@/directives/vLazyload'

const props = defineProps({
    data: {
        type: Object as PropType<Loan>,
    },
    offerPos: {
        type: Number,
    },
})

const emit = defineEmits<{
    (e: 'increase'): void
    (e: 'decrease'): void
    (e: 'jumpToEnd', val: number | undefined): void
    (e: 'checkPopup', val: boolean): void
    (e: 'filterActive', val: number | undefined): void
    (e: 'clickActive', val: number | undefined): void
}>()

const isActive = ref(false)

const buttonCaption = computed(() => {
    return isActive.value ? 'Отменить' : 'Получить'
})

const clickEvents = function (e: Event, id: number) {
    // sendInfo(id)
    toggleActive(e)
}

const sendInfo = function (id: number) {
    try {
        // finalStat({
        //     id,
        // })
    } catch (e) {
        console.log('cant sent stat')
    }
}

const toggleActive = function (e: Event) {
    if (!isActive.value) {
        isActive.value = true

        getToEnd()
        showPopup()
        filterActive()
        increaseNum()
    } else {
        e.preventDefault()
        isActive.value = false

        decreaseNum()
        clickActiveOffer()
    }
}

const increaseNum = function () {
    emit('increase')
}
const decreaseNum = function () {
    emit('decrease')
}
const getToEnd = function () {
    emit('jumpToEnd', props.offerPos)
}
const showPopup = function () {
    emit('checkPopup', true)
}
const filterActive = function () {
    emit('filterActive', props.data?.id)
}
const clickActiveOffer = function () {
    emit('clickActive', props.data?.id)
}
</script>

<template>
    <div class="loan" :class="{ active: isActive }">
        <div
            class="img img-wrapper d-flex align-items-center justify-content-center lazy-img"
        >
            <img :data-src="data?.logo" :alt="data?.title" v-lazyload />
        </div>
        <div class="price">{{ data?.header }} <span>₽</span></div>
        <div class="percent">0% /день</div>
        <div class="desc">
            {{ data?.subHeader }}
        </div>
        <div class="btn-wrapper d-flex justify-content-center">
            <base-button
                class="link"
                :link="true"
                :href="true"
                :to="data?.link"
                mode="yellow"
                target="_blank"
                @click="clickEvents"
                >{{ buttonCaption }}</base-button
            >
        </div>
    </div>
</template>

<style scoped lang="scss">
.loan {
    background-color: #fefefe;
    box-shadow: 0px 232px 93px rgba(205, 207, 210, 0.01),
        0px 131px 78px rgba(205, 207, 210, 0.05),
        0px 58px 58px rgba(205, 207, 210, 0.09),
        0px 15px 30px rgba(180, 185, 204, 0.08),
        0px 0px 0px rgba(135, 135, 135, 0.42);
    border-radius: 10px;
    width: 100%;
    padding: 14px 32px;
    min-height: 264px;

    @media (max-width: $mobile) {
        min-width: 318px;
        max-width: 70%;
        min-height: 254px;
    }
    @media (max-width: 374px) {
        min-width: 272px;
    }

    &.active {
        border: 2px solid $main_brand_1;
        color: $main_brand_1;
    }

    &.active .link {
        background-color: #fefeff;
        border: 1px solid $main_brand_1;
        color: $main_brand_1;
    }
}

.img {
    max-width: 136px;
    height: 32px;
    margin: 0 auto 24px auto;
}
.price {
    font-weight: 600;
    font-size: 24px;
    line-height: 33px;
    text-align: center;
    color: $primary-grey-dark;

    span {
        font-weight: inherit;
    }

    @media (max-width: $mobile) {
        font-size: 20px;
        line-height: 25px;
    }
}
.desc,
.percent {
    margin-top: 12px;
    font-size: 16px;
    line-height: 22px;
    text-align: center;
    color: $primary-grey-dark;

    @media (max-width: $mobile) {
        font-size: 14px;
        line-height: 20px;
    }
}

.percent {
    position: relative;
    font-weight: 500;
    z-index: 1;
    width: fit-content;
    margin: 12px auto 0 auto;

    &::before {
        content: '';
        width: 100%;
        height: 4px;
        background-color: $main_brand_2;
        position: absolute;
        bottom: 2px;
        left: 0;
        z-index: -1;
    }
}
.btn-wrapper {
    margin-top: 30px;
}
.link {
    min-width: 0;
    width: 100%;
    max-width: 231px;
    max-height: 46px;
}
</style>
