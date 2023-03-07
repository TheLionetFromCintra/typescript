<script setup lang="ts">
import final from '@/api/final'

import TheLoan from './TheLoan.vue'
import ProgressBar from './ProgressBar.vue'
import OffersSkeleton from '@/applications/lk/components/OffersSkeleton.vue'

import { ref, computed, reactive } from 'vue'
import type { Loan } from '@/types/common/loans'

import { useAppStore } from '@/stores/app/AppStore'

const appStore = useAppStore()

const startSteps = ref(0)
const counter = ref(0)
const maxSteps = ref(3)
const initProgressBar = ref(10)
const progressBarStep = ref(30)

let sortedArr = ref<Loan[]>([])
let notClickedArr = ref<Loan[]>([])

const popupIsActive = ref(false)

let response = reactive({
    username: '',
    targets: {},
    step4: 1,
})

const getOffers = async function () {
    let res
    try {
        appStore.load(true)
        res = await final()
        appStore.load(false)
    } catch (error) {
        appStore.loadError(true)
        return
    }

    response.username = res.username
    response.targets = res.targets
    response.step4 = res.step4
}
getOffers()

const offers = computed(() => {
    if (response.targets) {
        if (response.targets?.other && response.targets?.other.length > 0)
            return [...response.targets?.default, ...response.targets?.other]
        return response.targets?.default
    }
})

const isArrSorted = computed(() => {
    return sortedArr.value.length > 0 ? sortedArr.value : offers.value
})

//increase orders steps
const increaseInitNum = function () {
    counter.value++
    if (counter.value <= maxSteps.value) {
        startSteps.value++
        initProgressBar.value += progressBarStep.value
    }
}

//decrease orders steps
const decreaseInitNum = function () {
    counter.value--
    if (counter.value < maxSteps.value) {
        startSteps.value--
        initProgressBar.value -= progressBarStep.value
    }
}

// filtered array
const getSortedArr = function (pos: number | undefined) {
    if (!pos) return

    const copyArr = [...isArrSorted.value].filter((item, n) => n !== pos)
    const deletedItem = [...isArrSorted.value].splice(pos, 1)
    const newArr = copyArr.concat(deletedItem)
    sortedArr.value = newArr
}

//show popup
const getActivePopup = function (state: boolean) {
    popupIsActive.value = state
}

//remove active offer
const filterActiveOffer = function (id: number | undefined) {
    const copyArr = [
        ...(notClickedArr.value.length > 0
            ? notClickedArr.value
            : sortedArr.value),
    ].filter((item: Loan) => item.id !== id)

    notClickedArr.value = copyArr
}

// create clicked offers arr
const addToClickedArr = function (id: number | undefined) {
    const notActive = [...sortedArr.value].filter(
        (item: Loan) => item.id === id
    )
    const newArr = notClickedArr.value.concat(notActive)
    notClickedArr.value = newArr
}
</script>

<template>
    <base-error v-if="appStore.showError"></base-error>
    <div class="loans" v-if="!appStore.isLoad">
        <the-loan
            v-for="(loan, index) in isArrSorted"
            :key="loan.id"
            :data="loan"
            :offerPos="index"
            @increase="increaseInitNum"
            @decrease="decreaseInitNum"
            @jumpToEnd="getSortedArr"
            @checkPopup="getActivePopup"
            @filterActive="filterActiveOffer"
            @clickActive="addToClickedArr"
        ></the-loan>
    </div>
    <offers-skeleton class="lk" v-else></offers-skeleton>
    <progress-bar
        v-if="popupIsActive"
        :initSteps="startSteps"
        :finalSteps="maxSteps"
        :progressBar="initProgressBar"
        :notClicked="notClickedArr"
    ></progress-bar>
</template>

<style scoped lang="scss">
.account .loans {
    @media (max-width: 1540px) {
        grid-template-columns: repeat(2, 318px);
    }
}

.loans {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 318px);
    grid-column-gap: 24px;
    grid-row-gap: 24px;
}

.account .loans,
.loans {
    @media (max-width: $tablet) {
        grid-template-columns: repeat(2, 44.8%);
        justify-content: center;
    }
    @media (max-width: $mobile) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
</style>
