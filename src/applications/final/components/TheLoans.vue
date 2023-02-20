<script setup lang="ts">
// import final from '@/api/final'

import TheLoan from './TheLoan.vue'
import ProgressBar from './ProgressBar.vue'

import { ref, computed } from 'vue'
import type { Loan } from '@/types/common/loans'

const startSteps = ref(0)
const counter = ref(0)
const maxSteps = ref(3)
const initProgressBar = ref(10)
const progressBarStep = ref(30)

let sortedArr = ref<Loan[]>([])
let notClickedArr = ref<Loan[]>([])

const popupIsActive = ref(false)

const response = ref<Loan[]>([
    {
        logo: 'zaymigo.png',
        subHeader: 'От 18 лет на срок до 30 дней',
        link: 'https://t.leads.tech/click/141/36/?sub1=vb&sub2=0&sub3=beeline&sub4=1&sub5=vb',
        id: 1,
        title: 'webbankir',
        header: 'до 30 000',
        chance: 90,
    },
    {
        logo: 'zaymigo.png',
        subHeader: 'От 18 лет на срок до 30 дней',
        link: 'https://t.leads.tech/click/141/36/?sub1=vb&sub2=0&sub3=beeline&sub4=1&sub5=vb',
        id: 2,
        title: 'webbankir',
        header: 'до 80 000',
        chance: 98,
    },
    {
        logo: 'zaymigo.png',
        subHeader: 'От 18 лет на срок до 30 дней',
        link: 'https://t.leads.tech/click/141/36/?sub1=vb&sub2=0&sub3=beeline&sub4=1&sub5=vb',
        id: 3,
        title: 'webbankir',
        header: 'до 20 000',
        chance: 96,
    },
    {
        logo: 'zaymigo.png',
        subHeader: 'От 18 лет на срок до 30 дней',
        link: 'https://t.leads.tech/click/141/36/?sub1=vb&sub2=0&sub3=beeline&sub4=1&sub5=vb',
        id: 4,
        title: 'webbankir',
        header: 'до 50 000',
        chance: 90,
    },
    {
        logo: 'zaymigo.png',
        subHeader: 'От 18 лет на срок до 30 дней',
        link: 'https://t.leads.tech/click/141/36/?sub1=vb&sub2=0&sub3=beeline&sub4=1&sub5=vb',
        id: 5,
        title: 'webbankir',
        header: 'до 40 000',
        chance: 90,
    },
    {
        logo: 'zaymigo.png',
        subHeader: 'От 18 лет на срок до 30 дней',
        link: 'https://t.leads.tech/click/141/36/?sub1=vb&sub2=0&sub3=beeline&sub4=1&sub5=vb',
        id: 6,
        title: 'webbankir',
        header: 'до 90 000',
        chance: 90,
    },
])

const offers = computed(() => {
    // if (response.targets?.other.length > 0)  // return [...response.targets?.default, ...response.targets?.other]

    // return response.targets?.default

    return response.value
})

const isArrSorted = computed(() => {
    return sortedArr.value.length > 0 ? sortedArr.value : offers.value
})

const getOffers = async function () {
    // const response = await final()
    // response.value = response
}
// getOffers()

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
    <div class="loans">
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
