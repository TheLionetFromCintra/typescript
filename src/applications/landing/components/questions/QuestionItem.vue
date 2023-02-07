<script setup lang="ts">
import type { Questions } from '@/types/views/landing/questions/questions'
import type { PropType } from 'vue'

const props = defineProps({
    question: {
        type: Object as PropType<Questions>,
    },
    index: {
        type: Number,
    },
})

const emit = defineEmits<{
    (e: 'toggle-open', index: number | undefined): void
}>()

const showContent = function (index: number | undefined) {
    emit('toggle-open', index)
}
</script>

<template>
    <li class="item" :class="{ active: props.question?.active }">
        <div
            class="top d-flex align-items-center justify-content-between"
            @click="showContent(props.index)"
        >
            <div class="title">
                {{ props.question?.title }}
                <span></span>
            </div>
        </div>
        <div class="content" v-html="props.question?.description"></div>
    </li>
</template>

<style scoped lang="scss">
.item {
    border-bottom: 2px solid $primary-grey-dark;
    .top {
        cursor: pointer;
        padding: 24px 0;
    }

    .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;

        font-weight: 600;
        font-size: 32px;
        line-height: 38px;
        letter-spacing: 0.07em;
        color: $primary-dark;

        & > span {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 16px;
            flex-shrink: 0;

            width: 72px;
            height: 72px;
            background-color: $main_brand_2;
            border: 2px solid transparent;
            position: relative;
            transition: border-color 0.2s linear, background-color 0.2s linear;

            &::before,
            &::after {
                content: '';
                position: absolute;
                left: 50%;
                top: 50%;
                height: 3px;
                width: 21px;
                background-color: $primary-grey-dark;
                transform: translate(-50%, -50%);
                transition: opacity 0.2s linear, transform 0.2s linear;
            }
            &::after {
                transform: translate(-50%, -50%) rotate(-90deg);
            }
        }
    }

    .content {
        padding: 0 52px;
        margin-left: 24px;
        font-size: 22px;
        line-height: 32px;
        letter-spacing: 0.07em;

        max-height: 0;
        overflow-y: hidden;
        transition: all 0.5s ease-out;

        h2 {
            font-size: inherit;
        }

        color: $primary-dark;
        max-width: 1010px;

        &::v-deep ol {
            margin: 36px 0 0 0;
            padding: 0;
            counter-reset: num;
            list-style-type: none;

            li {
                position: relative;

                &::before {
                    content: counter(num);
                    counter-increment: num;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: absolute;
                    top: 3px;
                    left: -52px;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background-color: $main_brand_1;
                    color: #fefeff;
                    font-size: 14px;
                    line-height: 16px;
                    padding-left: 2px;
                }
            }

            li + li {
                margin-top: 36px;
            }
        }
    }
}
.item.active {
    .title {
        & > span {
            border-color: $primary-grey-dark;
            background-color: transparent;

            &::before {
                opacity: 0;
            }
            &::after {
                transform: translate(-50%, -50%) rotate(0deg);
            }
        }
    }
    .content {
        padding: 24px 0 40px 52px;
        max-height: 100vh;
    }
}

@media (max-width: $tablet) {
    .item {
        .title {
            font-size: 28px;
            line-height: 34px;
            & > span {
                width: 62px;
                height: 62px;
            }
        }
        .content {
            font-size: 20px;
            line-height: 24px;
        }
    }
}

@media (max-width: $mobile) {
    .item {
        margin: 0 8px;

        .top {
            padding: 12px 0;
        }
        .title {
            font-size: 14px;
            line-height: 18px;
            & > span {
                margin-left: 16px;
                width: 40px;
                height: 40px;
                border: none;
                background-color: transparent;

                &::before,
                &::after {
                    height: 4px;
                    width: 16px;
                }
            }
        }
        .content {
            margin-left: 14px;
            font-size: 12px;
            line-height: 18px;
            padding: 0 42px;

            &::v-deep ol {
                margin: 16px 0 0 0;
                li {
                    position: relative;
                    &::before {
                        top: 2px;
                        left: -32px;
                        width: 14px;
                        height: 14px;
                        font-size: 12px;
                    }
                }
                li + li {
                    margin-top: 16px;
                }
            }
        }
    }
    .item.active {
        .content {
            padding: 12px 0 24px 32px;
        }
    }
}
</style>
