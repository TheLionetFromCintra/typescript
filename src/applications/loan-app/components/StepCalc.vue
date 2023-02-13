<script setup lang="ts">
import price from '@/helpers/string/price'
import term from '@/helpers/string/term'
import date from '@/helpers/string/date'

import { ref, onMounted, computed } from 'vue'
import { useAppStore } from '@/stores/app/AppStore'
import { vLazyload } from '@/directives/vLazyload'

const appStore = useAppStore()

const calcSum = ref('')
const calcDays = ref('')
const calcType = ref('')
const calcDate = ref('')

const activeInput = ref(false)

const sum = ref(null)
const days = ref(null)

const loanDaysString = computed(() => {
    if (calcType.value === 'days') {
        return term(calcDays.value)
    }
    return 'недель'
})

const setInputWidth = function (input: any) {
    let length = 0
    if (input.value.length !== 0) {
        length = input.value.length
    }
    if (input.value.length === 1 || input.value.length === 0) {
        length = 1.5
    }
    input.setAttribute('size', String(length - 0.5))
}

const filterNumInput = function (e: KeyboardEvent) {
    setInputWidth(e.target)
}

const initInput = function (type: string) {
    if (type === 'sum')
        calcSum.value = calcSum.value.replace(/[A-Za-zА-Яа-яЁё]/g, '')
    if (type === 'days')
        calcDays.value = calcDays.value.replace(/[A-Za-zА-Яа-яЁё]/g, '')
}

const unlockInputs = function () {
    activeInput.value = true
    if (sum.value) sum.value.focus()
}

const calcNewDays = function () {
    if (+calcDays.value < 32) {
        calcType.value = 'days'
    } else {
        let count = 0

        const week = +calcDays.value - 32

        if (week !== 0) {
            count = Math.floor((week / 8) * 2)
        }
        calcDays.value = '1' + count
        calcType.value = 'weeks'
    }

    calcDate.value = date(+calcDays.value, calcType.value)
}

const saveResult = function () {
    activeInput.value = false
    setInputWidth(sum.value)
    setInputWidth(days.value)

    if (+calcSum.value === 0)
        calcSum.value = price(appStore.calculator.amount).split(' ')[0]

    if (+calcDays.value === 0)
        calcDays.value = String(appStore.calculator.term.count)

    //new days
    if (+calcDays.value !== +appStore.calculator.term.count) calcNewDays()

    //new store days
    appStore.updateCalculator({
        amount: +calcSum.value * 1000,
        term: {
            count: +calcDays.value,
            type: calcType.value,
        },
    })
}

onMounted(() => {
    setInputWidth(sum.value)
    setInputWidth(days.value)

    appStore.initCalculator()

    calcSum.value = price(appStore.calculator.amount).split(' ')[0]
    calcDays.value = String(appStore.calculator.term.count)
    calcType.value = appStore.calculator.term.type
    calcDate.value = date(
        appStore.calculator.term.count,
        appStore.calculator.term.type
    )
})
</script>

<template>
    <div class="result">
        <div class="helper">
            <div class="wrapper d-flex align-items-center">
                <div class="item d-flex align-items-center">
                    <div
                        class="icon d-flex align-items-center justify-content-center lazy-img"
                    >
                        <div
                            class="img img-wrapper d-flex align-items-center justify-content-center"
                        >
                            <img
                                v-lazyload
                                data-src="/assets/images/primary/card.svg"
                                alt="card icon"
                            />
                        </div>
                    </div>
                    <div class="content">
                        <span>Сумма:</span>
                        <input
                            :class="{ active: activeInput }"
                            v-model.trim="calcSum"
                            type="text"
                            ref="sum"
                            autocomplete="off"
                            autocapitalize="off"
                            autocorrect="off"
                            pattern="[0-9]*"
                            inputmode="numeric"
                            @keyup="filterNumInput"
                            @input="initInput('sum')"
                        />
                        <span class="sign">000 ₽</span>
                    </div>
                </div>
                <div class="item d-flex align-items-center">
                    <div
                        class="icon d-flex align-items-center justify-content-center lazy-img"
                    >
                        <div
                            class="img img-wrapper d-flex align-items-center justify-content-center"
                        >
                            <img
                                v-lazyload
                                data-src="/assets/images/primary/calendar.svg"
                                alt="calendar icon"
                            />
                        </div>
                    </div>
                    <div class="content">
                        <span>Срок:</span>
                        <input
                            :class="{ active: activeInput }"
                            v-model.trim="calcDays"
                            type="text"
                            ref="days"
                            autocomplete="off"
                            autocapitalize="off"
                            autocorrect="off"
                            pattern="[0-9]*"
                            inputmode="numeric"
                            @keyup="filterNumInput"
                            @input="initInput('days')"
                        />
                        {{ loanDaysString }}
                    </div>
                </div>
                <div class="item d-flex align-items-center">
                    <div
                        class="icon d-flex align-items-center justify-content-center lazy-img"
                    >
                        <div
                            class="img img-wrapper d-flex align-items-center justify-content-center"
                        >
                            <img
                                v-lazyload
                                data-src="/assets/images/primary/flag.svg"
                                alt="flag icon"
                            />
                        </div>
                    </div>
                    <div class="content">
                        <span>До:</span>
                        <input
                            type="text"
                            v-model.trim="calcDate"
                            readonly
                            ref="date"
                        />
                    </div>
                </div>
            </div>
            <button class="button" @click="unlockInputs" v-if="!activeInput">
                Изменить
            </button>
            <button class="button" @click="saveResult" v-else>Сохранить</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.result {
    margin-bottom: 42px;
}
.item + .item {
    margin-left: 44px;
}
.icon {
    background: $sub-background;
    width: 62px;
    height: 62px;
    margin-right: 24px;
    .img {
        max-width: 32px;
        height: 32px;
    }
}
input,
button {
    outline: none;
}
.content {
    span {
        display: block;
    }
    input {
        border: none;
        background: transparent;
        width: initial;
        padding: 0 0 2px 0;
        max-width: 90px;
        border-bottom: 1px solid transparent;
        pointer-events: none;
        transition: border-color 0.3s linear;
        &.active {
            pointer-events: initial;
            border-color: $primary-black;
        }
    }
    .sign {
        display: inline;
        padding-left: 4px;
    }
}
.content span,
.content input,
.button {
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.07em;
}
.button {
    cursor: pointer;
    margin-top: 12px;
    background: none;
    border: none;
    padding: 0;
    border-bottom: 1px solid $primary-black;
    transition: border-color 0.3s linear;
    &:hover {
        border-color: transparent;
    }
}
@media (max-width: $tablet) {
    .icon {
        width: 52px;
        height: 52px;
        .img {
            max-width: 28px;
            height: 28px;
        }
    }
}
@media (max-width: $mobile) {
    .result {
        padding: 0 24px;
        margin-bottom: 42px;
        display: flex;
        align-items: flex-start;
        justify-content: center;
    }
    .helper {
        width: 100%;
        max-width: 552px;
    }
    .wrapper {
        justify-content: space-between;
    }
    .item {
        flex-direction: column;
        width: 80px;
    }
    .item + .item {
        margin-left: 0px;
    }
    .icon {
        margin: 0 0 5px 0;
    }
    .content {
        span,
        input {
            text-align: center;
            font-size: 13px;
            line-height: 18px;
        }
        input {
            max-width: 80px;
        }
    }
    .button {
        margin-top: 18px;
        font-size: 12px;
        line-height: 18px;
    }
}
@media (max-width: 374px) {
    .item + .item {
        margin-left: 22px;
    }
}
</style>
