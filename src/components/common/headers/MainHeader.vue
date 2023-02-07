<script setup lang="ts">
import { ref } from 'vue'
import TheHeader from '@/components/common/headers/TheHeader.vue'

const benefits = ref([
    {
        title: 'Быстро',
        description: '5 минут от заявки до денег',
    },
    {
        title: 'Надежно',
        description: 'Шифруем и защищаем данные',
    },
    {
        title: 'Удобно',
        description: 'Займы без отказов и проверок',
    },
])
</script>

<template>
    <section>
        <div class="container">
            <the-header></the-header>

            <div class="top d-flex justify-content-between">
                <div class="desc">
                    <slot name="title"></slot>
                </div>
                <div class="calc">calc</div>
            </div>

            <ul class="benefits d-flex justify-content-center">
                <li
                    class="benefit d-flex align-items-start"
                    v-for="benefit in benefits"
                    :key="benefit.title"
                >
                    <div
                        class="icon d-flex align-items-center justify-content-center"
                    >
                        <div
                            class="img img-wrapper d-flex align-items-center justify-content-center"
                        >
                            <img
                                src="assets/images/main-header/benefit-icon.svg"
                                alt="benefit icon"
                            />
                        </div>
                    </div>
                    <div class="helper">
                        <span>{{ benefit.title }}</span>
                        <p>{{ benefit.description }}</p>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<style scoped lang="scss">
.main-header {
    .container {
        padding: 50px 40px 36px 40px;
        margin: 0 auto;
        position: relative;
        z-index: 1;

        &::before,
        &::after {
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
        &::after {
            background: url('assets/images/main-header/lady.png') no-repeat;
            background-size: contain;
            left: 52%;
            top: 120px;
            width: 408px;
            height: 547px;
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
            &::after {
                top: initial;
                bottom: 0;
                transform: translateX(0);
                right: -10%;
                left: initial;
            }
        }
    }

    .desc {
        max-width: 468px;
    }
}
.benefits {
    margin-top: 16px;

    @media (max-width: $tablet) {
        flex-direction: column;
        padding-left: 100px;
    }
}
.benefit {
    width: 100%;
    max-width: 204px;

    .icon {
        width: 22px;
        flex-shrink: 0;
        margin-right: 14px;
        .img {
            max-width: 22px;
            height: 14px;
        }
    }
    .helper {
        max-width: 164px;
        span,
        p {
            font-size: 16px;
            line-height: 22px;
            letter-spacing: 0.07em;
            color: $primary-black;
        }
        span {
            display: inline-block;
            font-weight: 600;
            margin-bottom: 12px;
        }
    }
}
.benefit + .benefit {
    margin-left: 40px;
}
@media (max-width: $tablet) {
    .benefit + .benefit {
        margin: 40px 0 0 0;
    }
}

.top {
    margin-top: 76px;
    @media (max-width: $tablet) {
        flex-direction: column;
        align-items: center;
    }
}

.desc h1 .underline,
.desc p span,
.benefit .helper span {
    position: relative;
    z-index: 1;
    &::before {
        content: '';
        position: absolute;
        bottom: 3px;
        left: 0;
        z-index: -1;
        height: 5px;
        width: 100%;
        background-color: $main_brand_2;
    }
}
.desc h1 .underline {
    &::before {
        bottom: 10px;
    }
}
.benefit .helper span {
    &::before {
        width: 80px;
        bottom: 3px;
    }
}
</style>
