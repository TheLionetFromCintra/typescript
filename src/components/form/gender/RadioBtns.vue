<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
    modelValue: {
        type: [String, Number],
    },
    title: {
        type: String,
    },
    options: {
        type: Object,
    },
    activeGender: {
        type: String,
    },
})

const emit = defineEmits<{
    (e: 'update:modelValue', val: string): void
}>()

const gender = computed(() => {
    return props.activeGender ? props.activeGender : '0'
})

const change = function (e: Event) {
    emit('update:modelValue', (e.target as HTMLInputElement).value)
}
</script>

<template>
    <label class="radio-btns">
        <span class="title">{{ title }}</span>
        <div class="wrapper d-flex align-items-center justify-content-between">
            <div class="item" v-for="option in options" :key="option.key">
                <label>
                    <input
                        type="radio"
                        name="gender"
                        class="radio"
                        :value="option.key"
                        :checked="option.key === gender ? true : false"
                        @change="change"
                    />
                    <span class="label">{{ option.value }}</span>
                </label>
            </div>
        </div>
    </label>
</template>

<style scoped lang="scss">
.radio-btns {
    max-width: 138px;

    @media (max-width: $mobile) {
        max-width: 48%;
    }
}

.title {
    display: inline-block;
    font-size: 14px;
    line-height: 16px;

    margin-bottom: 4px;
    color: $primary-black;
    font-weight: 600;

    @media (max-width: $mobile) {
        font-size: 12px;
    }
}

.wrapper {
    width: 100%;

    &::before {
        border: 1px solid $primary-grey-dark;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 10px;
        display: block;
        content: '';
        box-sizing: border-box;
        min-height: 44px;
    }

    font-size: 12px;
    font-weight: 500;
    margin: 0;
    padding: 0;
    list-style: none;
    display: inline-flex;
    flex-wrap: wrap;
    align-items: center;
    position: relative;
}

.item {
    margin: 4px 0 0 0;
    display: inline-flex;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    z-index: 1;
    user-select: none;
    flex-grow: 1;
    &:nth-child(1) {
        margin-left: 6px;
    }
    &:nth-child(2) {
        margin-right: 6px;
    }

    @media (max-width: 374px) {
        flex-grow: 0;
        width: 44%;
    }
}

input[type='radio'] {
    appearance: none;
    padding: 0;
    margin: 0;
    width: 0;
    height: 0;
    position: absolute;
}
label {
    width: 100%;
}

.label {
    width: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 8px 20px;
    min-height: 34px;
    font-size: 16px;
    line-height: 19px;

    box-sizing: border-box;
    flex-grow: 1;
    justify-content: center;
    margin-bottom: 0;
    min-width: 60px;
    color: #8f8f8f;
    font-weight: 500;

    @media (max-width: $mobile) {
        font-size: 14px;
        line-height: 18px;
        min-width: initial;
    }
}

input:checked ~ span {
    background: $primary-grey-dark;
    box-shadow: 0px 232px 93px rgba(205, 207, 210, 0.01),
        0px 131px 78px rgba(205, 207, 210, 0.05),
        0px 58px 58px rgba(205, 207, 210, 0.09),
        0px 12px 30px rgba(180, 185, 204, 0.26),
        0px 0px 0px rgba(135, 135, 135, 0.42);

    color: #fefeff;
}
</style>
