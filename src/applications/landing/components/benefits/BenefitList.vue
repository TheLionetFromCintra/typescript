<script setup lang="ts">
import { ref } from 'vue'
import type { Benefits } from '@/types/common/benefits'

const benefits = ref<Benefits[]>([
    {
        id: '1b2565c5-bb8f-40e7-b509-3c79c54e2382',
        title: 'Быстро',
        description: '5 минут от заявки до денег',
    },
    {
        id: '892cb45f-0a02-42a1-9f6b-c404532074ec',
        title: 'Надежно',
        description: 'Шифруем и защищаем данные',
    },
    {
        id: 'e170faa7-7c7f-4bd6-80f5-30ce6ad30903',
        title: 'Удобно',
        description: 'Займы без отказов и проверок',
    },
])
</script>

<template>
    <ul class="benefits d-flex justify-content-center">
        <li
            class="benefit d-flex align-items-start"
            v-for="benefit in benefits"
            :key="benefit.id"
        >
            <div class="icon d-flex align-items-center justify-content-center">
                <div
                    class="img img-wrapper d-flex align-items-center justify-content-center"
                >
                    <img
                        src="/assets/images/main-header/benefit-icon.svg"
                        alt="benefit icon"
                    />
                </div>
            </div>
            <div class="helper">
                <span class="underline">{{ benefit.title }}</span>
                <p>{{ benefit.description }}</p>
            </div>
        </li>
    </ul>
</template>

<style scoped lang="scss">
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
.benefit .helper .underline {
    &::before {
        width: 80px;
        bottom: 3px;
    }
}

@media (max-width: $mobile) {
    .benefits {
        margin-top: 0;
        padding-left: 0;
        max-width: 87%;
        width: 100%;
    }
    .benefit {
        .icon {
            width: 20px;
            margin-top: 4px;
            .img {
                max-width: 20px;
                height: 12px;
            }
        }
        .helper {
            span,
            p {
                font-size: 12px;
                line-height: 16px;
            }
            span {
                margin-bottom: 8px;
            }
        }
    }
    .benefit + .benefit {
        margin: 24px 0 0 0;
    }

    .benefit .helper .underline {
        &::before {
            height: 3px;
        }
    }
    .benefit .helper .underline {
        &::before {
            width: 60px;
        }
    }
}
</style>
