<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import type { WritableComputedRef } from 'vue'

const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    placeholder: {
        type: String,
        required: false,
    },
    errorMessage: {
        type: String,
        required: false,
    },
    itemsKey: {
        type: String,
        default: 'id',
    },
    itemsLabel: {
        type: String,
        default: 'title',
    },
    list: {
        type: Array,
        default: () => [],
    },
    beforeList: {
        type: String,
        default: '',
    },
    showLoading: {
        type: Number,
        default: 0,
    },
    activeValue: {
        type: String,
        required: false,
    },
})

const emit = defineEmits<{
    (e: 'focus', val: string): void
    (e: 'change', val: string): void
    (e: 'listClick'): void
}>()

const isFocus = ref(false)
const fieldValue = ref('')
const activeIndex = ref(0)

const fieldRef = ref(null)

const showList = computed(() => {
    return (
        isFocus.value &&
        (props.beforeList || props.showLoading || props.list.length > 0)
    )
})

const field = computed(() => {
    return fieldRef.value
})

const fieldModel: WritableComputedRef<string> = computed({
    get(): string {
        return fieldValue.value
    },
    set(v: string): void {
        fieldValue.value = v
        if (!isFocus.value) return
    },
})

const focusEvent = function () {
    isFocus.value = true
    emit('focus', fieldValue.value)
}

const setItem = function (item: any) {
    emit('listClick')
    fieldValue.value = item.value

    emit('change', fieldValue.value)
}

const getPathItem = function (item: any, type: any): any {
    if (!item) return null

    if (Array.isArray(type))
        return type
            .map((i) => getPathItem(item, i))
            .filter((i) => i)
            .join(', ')

    const path = type.split('.')
    let key = item

    path.forEach((nextKey: string) => (key = key[nextKey]))
    return key || null
}

const globalEventCheck = function () {
    if (document.activeElement === field.value) return

    isFocus.value = false
}

const keyUp = function (e: KeyboardEvent) {
    e.preventDefault()
    activeIndex.value--

    if (activeIndex.value < 0) activeIndex.value = props.list.length - 1
}
const keyDown = function (e: KeyboardEvent) {
    e.preventDefault()
    activeIndex.value++

    if (activeIndex.value >= props.list.length) activeIndex.value = 0
}
const keyEnter = function (e: KeyboardEvent) {
    e.preventDefault()
    if (!(props.list.length && props.list[activeIndex.value])) return

    setItem(props.list[activeIndex.value])
}

onMounted(() => {
    document.addEventListener('click', globalEventCheck)
    document.addEventListener('focusin', globalEventCheck)
    fieldValue.value = props.activeValue ? props.activeValue : ''
})

onBeforeUnmount(() => {
    document.removeEventListener('focusin', globalEventCheck)
    document.removeEventListener('click', globalEventCheck)
})
</script>

<template>
    <div class="box">
        <label>
            <span class="title">{{ label }}</span>
            <div class="wrapper">
                <input
                    ref="fieldRef"
                    v-model="fieldModel"
                    :placeholder="placeholder"
                    @focus="focusEvent"
                    @keydown.up="keyUp"
                    @keydown.down="keyDown"
                    @keydown.enter="keyEnter"
                    :class="{ error: errorMessage, field_error: errorMessage }"
                />
                <div class="select-list" v-if="showList">
                    <ul
                        class="loading"
                        :class="{ active: isFocus }"
                        v-if="showLoading"
                    >
                        <li
                            v-for="i in showLoading"
                            class="item-loading"
                            :key="i"
                        >
                            <div class="d-flex">
                                <span></span> <span></span>
                            </div>
                        </li>
                    </ul>
                    <ul :class="{ active: isFocus }" v-else>
                        <li class="before-item" v-if="beforeList">
                            <span>
                                {{ beforeList }}
                            </span>
                        </li>
                        <li
                            v-for="(item, index) in list"
                            class="l-select__item"
                            @click="setItem(item)"
                            @mouseover="activeIndex = index"
                            :class="{
                                hovered: activeIndex === index,
                            }"
                            :key="getPathItem(item, itemsKey)"
                        >
                            {{ getPathItem(item, itemsLabel) }}
                        </li>
                    </ul>
                </div>
            </div>
            <small class="error-msg" v-if="errorMessage">{{
                errorMessage
            }}</small>
        </label>
    </div>
</template>

<style lang="scss" scoped>
.title {
    display: inline-block;
    font-size: 14px;
    line-height: 16px;
    margin-bottom: 4px;
    color: #181818;
    font-weight: 600;

    @media (max-width: $mobile) {
        font-size: 12px;
    }
}
input {
    appearance: none;
    margin: 0;
    padding: 8px 0;
    width: 100%;

    border: none;
    border-bottom: 1px solid #000;

    font-family: inherit;
    font-size: 16px;
    line-height: 22px;

    outline: none;
    background: transparent;
    resize: none;
    font-weight: 600;
    color: $primary-grey-dark;

    &.success {
        padding-right: 32px;
    }
    &.error {
        border-color: $invalid;
        border-width: 2px;
    }

    &::placeholder {
        color: #8f8f8f;
        font-weight: 500;
    }

    @media (max-width: $mobile) {
        font-size: 14px;
        line-height: 18px;
    }
}

.wrapper {
    position: relative;
}
.select-list {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    transform: translateY(-100%);
    width: 100%;
    overflow: hidden;
    box-shadow: 0px 232px 93px rgb(205 207 210 / 1%),
        0px 131px 78px rgb(205 207 210 / 5%),
        0px 58px 58px rgb(205 207 210 / 9%),
        0px 12px 30px rgb(180 185 204 / 26%), 0px 0px 0px rgb(135 135 135 / 42%);
    ul {
        background-color: #fefeff;
        border: 1px solid transparent;
        transition: border-color 0.3s linear;

        &.active {
            border-bottom-color: transparent;
        }
    }
    ul,
    li:last-child {
        border: none;
    }
    li {
        cursor: pointer;
        padding: 10px 16px;
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
        letter-spacing: 0.07em;
        color: $primary-grey;
        border-bottom: 1px solid $primary-black;
        transition: background-color 0.3s linear;

        @media (max-width: $mobile) {
            font-size: 14px;
            line-height: 18px;
        }

        &.selected {
            color: $primary-black;
        }
        &:hover,
        &.hovered {
            background-color: rgba($main_brand_2, 0.4);
        }
    }
    .item-loading {
        span {
            width: 70px;
            height: 15px;
            background-color: rgba($main_brand_2, 0.6);
            margin-bottom: 0;
            position: relative;
            overflow-x: hidden;
            min-height: initial;
            &::before {
                content: '';
                position: absolute;
                top: 0;
                height: 100%;
                width: 20px;
                transform: skewX(-45deg);
                animation: flareAnimation;
                left: -150%;
                background: linear-gradient(
                    90deg,
                    rgba(255, 255, 255, 0.1),
                    rgba(255, 255, 255, 0.4)
                );
                animation: flareAnimation 0.8s infinite linear;
            }
        }
        span + span {
            margin-left: 6px;
        }
    }
    .before-item {
        pointer-events: none;
        span {
            margin-bottom: 0;
        }
    }
}

@keyframes flareAnimation {
    0% {
        left: -150%;
    }
    100% {
        left: 150%;
    }
}
</style>
