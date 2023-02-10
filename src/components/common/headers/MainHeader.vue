<script setup lang="ts">
import TheHeader from '@/components/common/headers/TheHeader.vue'
import BenefitList from '@/applications/landing/components/benefits/BenefitList.vue'
import CalculatorSkeleton from '@/components/common/calc/CalculatorSkeleton.vue'
import useAutotype from '@/hooks/autotype'

import { vLazyload } from '@/directives/vLazyload'
import { defineAsyncComponent } from 'vue'
const { typeValue, typeStatus } = useAutotype()

const TheCalculator = defineAsyncComponent(
    () => import('@/components/common/calc/TheCalculator.vue')
)

interface Props {
    title: string
    desc: string
    showAuto: boolean
}

const { title, desc, showAuto } = defineProps<Props>()
</script>

<template>
    <section>
        <div class="container">
            <the-header></the-header>

            <div class="lazy-img main-img">
                <img
                    v-lazyload
                    data-src="/assets/images/main-header/lady.png"
                    src="/assets/images/main-header/lazy.png"
                    alt="main lady image"
                />
            </div>

            <div class="top d-flex justify-content-between">
                <div class="desc">
                    <h1 v-html="title"></h1>
                    <span class="colored" v-if="showAuto"
                        >{{ typeValue
                        }}<span class="cursor" :class="{ typing: typeStatus }"
                            >&nbsp;</span
                        ></span
                    >
                    <p v-html="desc"></p>
                    <div class="button">
                        <router-link
                            to="/primary"
                            class="d-flex align-items-center"
                        >
                            <span>Заполнить заявку</span>
                        </router-link>
                    </div>
                </div>

                <suspense>
                    <the-calculator></the-calculator>
                    <template #fallback
                        ><calculator-skeleton></calculator-skeleton
                    ></template>
                </suspense>
            </div>

            <benefit-list></benefit-list>
        </div>
    </section>
</template>

<style scoped lang="scss">
.main-header {
    .main-img {
        position: absolute;
        left: 52%;
        bottom: 120px;
        width: 408px;
        height: 547px;
        z-index: -1;
        transform: translateX(-50%);

        background-image: none !important;
        box-shadow: none;
        img {
            opacity: 1;
        }

        @media (max-width: $tablet) {
            top: initial;
            bottom: 0;
            transform: translateX(0);
            right: -10%;
            left: initial;
        }

        @media (max-width: $mobile) {
            width: 230px;
            height: 310px;
            right: -6%;

            @media (max-width: 374px) {
                right: -25%;
            }
        }
    }
    .container {
        padding: 50px 40px 36px 40px;
        margin: 0 auto;
        position: relative;
        z-index: 1;

        &::before {
            content: '';
            position: absolute;
            z-index: -1;
            transform: translateX(-50%);
        }

        &::before {
            background: linear-gradient(
                166.78deg,
                #dee7e9 1.7%,
                rgba(222, 231, 233, 0.2) 91.48%
            );
            left: 48%;
            top: 0;
            height: 100%;
            width: 430px;
        }

        @media (max-width: $tablet) {
            background: linear-gradient(
                170.72deg,
                rgba(255, 255, 255, 0) 6.42%,
                rgba(255, 255, 255, 0) 16.11%,
                rgba(222, 231, 233, 0.83) 47.89%,
                rgba(222, 231, 233, 0.77) 65.47%,
                rgba(255, 255, 255, 0) 92.96%
            );
            overflow: hidden;

            &::before {
                content: none;
            }
        }
    }

    .desc {
        max-width: 488px;

        h1,
        .colored {
            font-weight: 600;
            font-size: 48px;
            line-height: 65px;
        }
        h1 {
            color: $primary-grey-dark;

            &::v-deep {
                span {
                    font-weight: inherit;
                }
            }
        }
        p {
            margin-top: 35px;
            max-width: 370px;
            font-size: 24px;
            line-height: 33px;
            color: $primary-black;
        }

        .colored {
            display: block;
            color: $main_brand_1;
            white-space: nowrap;

            @media (max-width: $tablet) {
                white-space: initial;
            }
        }

        .button {
            margin-top: 24px;
            padding-left: 15px;
            width: fit-content;

            @media (max-width: $tablet) {
                display: none;
            }

            a {
                width: 128px;
                height: 128px;
                padding: 0 15px;

                font-weight: 600;
                font-size: 12px;
                line-height: 16px;
                color: $primary-black;

                position: relative;
                z-index: 1;

                &::before {
                    content: url('assets/images/main-header/arrow.png');
                    position: absolute;
                    left: -15px;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: -1;
                }
            }
        }

        @media (max-width: $tablet) {
            max-width: 80%;
            text-align: center;

            p {
                max-width: 700px;
                margin: 35px auto 0 auto;
            }
        }
    }
}

.top {
    margin-top: 76px;
    @media (max-width: $tablet) {
        flex-direction: column;
        align-items: center;
    }
}
.desc h1 {
    &::v-deep {
        .underline {
            &::before {
                bottom: 10px;
            }
        }
    }
}

@media (max-width: $mobile) {
    .main-header {
        .container {
            max-width: 100%;
            padding: 35px 24px 190px 24px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .top {
            margin-top: 34px;
            width: 100%;
        }
        .desc {
            h1,
            .colored {
                font-size: 36px;
                line-height: 44px;
            }

            p {
                font-size: 16px;
                line-height: 22px;
                max-width: 500px;
            }
        }
    }

    .desc h1,
    .desc p {
        &::v-deep {
            .underline {
                &::before {
                    height: 4px;
                }
            }
        }
    }
}
</style>
