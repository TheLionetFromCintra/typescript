<script setup lang="ts">
import { ref } from 'vue'
import type { Steps } from '@/types/views/landing/steps/steps'

const steps = ref<Steps[]>([
    {
        id: 'd96ff25f-93e5-49fc-890d-aa57b808f8d7',
        description: 'Заполните короткую анкету',
    },
    {
        id: '97eb0cca-b6f0-4151-be35-0e3a9c699c87',
        description: 'Выберите компанию из списка',
    },
    {
        id: '45f18217-c6e6-4388-80fd-a16e4d4597e5',
        description: 'Получите предложения',
    },
])
</script>

<template>
    <ul class="list d-flex justify-content-between">
        <li class="step" v-for="(step, index) in steps" :key="step.id">
            <div class="num d-flex align-items-center justify-content-center">
                <div class="d-flex align-items-center justify-content-center">
                    <span>{{ index + 1 }}</span>
                </div>
            </div>
            <p class="description">
                {{ step.description }}
            </p>
        </li>
    </ul>
</template>

<style scoped lang="scss">
.step {
    width: 100%;
    max-width: 294px;

    &:nth-child(2) {
        .num {
            div {
                transform: rotate(45deg);
                span {
                    transform: rotate(-45deg);
                    margin-top: -2px;
                }
            }
        }
    }

    .num {
        width: 99px;
        height: 87px;
        margin: 0 auto;

        div {
            width: 62px;
            height: 62px;
            background-color: $main_brand_1;
            box-shadow: 0px 232px 93px rgba(205, 207, 210, 0.01),
                0px 131px 78px rgba(205, 207, 210, 0.05),
                0px 58px 58px rgba(205, 207, 210, 0.09),
                0px 12px 30px rgba(180, 185, 204, 0.26),
                0px 0px 0px rgba(135, 135, 135, 0.42);
            span {
                display: inline-block;
                font-weight: 700;
                font-size: 36px;
                line-height: 44px;
                color: #fefeff;
            }
        }
    }

    .description,
    div span {
        text-align: center;
        letter-spacing: 0.07em;
    }

    .description {
        font-size: 24px;
        line-height: 140.5%;
        margin: 8px auto 0 auto;
        max-width: 264px;
    }
}
.step + .step {
    margin-left: 12px;
}
@media (max-width: $mobile) {
    .list {
        flex-direction: column;
        max-width: 290px;
        margin: 0 auto;
    }

    .step {
        .description {
            font-size: 16px;
            line-height: 24px;
            max-width: 230px;
        }
        .num {
            div {
                span {
                    margin: 0 0 0 2px;
                }
            }
        }
    }
    .step + .step {
        margin: 38px 0 0 0;
    }
}
</style>
