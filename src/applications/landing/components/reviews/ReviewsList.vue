<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, EffectCards } from 'swiper'
import { vLazyload } from '@/directives/vLazyload'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-cards'

import { ref } from 'vue'
import type { Reviews } from '@/types/views/landing/reviews/reviews'

const modules = [Navigation, Pagination, EffectCards]

const reviews = ref<Reviews[]>([
    {
        id: '3282031e-03c4-42a7-913d-8aab4de66a6b',
        name: 'Алексей',
        rate: 5,
        description:
            'Мне нравится, что деньги получаешь быстро, никакой волокиты, никаких справок о доходах. Просто паспорт и снилс, а остальное делает за тебя система. Деньги приходят на привязанную карту, с нее же и погашаю потом.',
        photo: 'Alex',
    },
    {
        id: '47950bd9-1a3b-45c3-9373-27b1fc8e8e6c',
        name: 'Ирина',
        rate: 5,
        description:
            'Решила обратиться в сервис онлайн займов "Kviza", так как не хватало денег на новый телефон, а брать абы что не хотелось, так как понимала, что в последствии смогу отдать с будущей зп. Заявку вообще ночью оформила у них на официальном сайте и не ожидала, что ответ придёт через несколько минут. Потом меня никто не тревожил, а когда вернула займ, дали скидки на следующие займы. Теперь я счастливая обладательница нового телефона)',
        photo: 'Irina',
    },
    {
        id: '66e793b0-ada0-4e26-b727-854d26609d76',
        name: 'Анна',
        rate: 5,
        description:
            'Часто обращаюсь в разные МФО когда нужны деньги, к сожалению кредит или карту получить не могу, а в займах еще дают деньги. В общем есть с чем сравнивать, поэтому была приятно удивлена работой Квиза когда платеж не прошел. Позвонили, уточнили и подсказали как сделать все правильно в этой ситуации, так что историю свою еще хуже не попортила. Спасибо за такое отношение!',
        photo: 'Anna',
    },
    {
        id: 'd640dace-a4c6-4852-acff-9c5a6351b6dc',
        name: 'Сергей',
        rate: 5,
        description:
            'Иногда складываются такие ситауции, что деньги взять негде, поэтому приходится обращаться за заемными средствами. Я приходил несколько раз и мне всегда одобряли нужню сумму. Ваша компания помогла мне выйти из сложной финансовой ситуации. Спасибо!',
        photo: 'Sergey',
    },
    {
        id: '40de02ff-cf60-4fc3-b69a-ce76ca41dcb0',
        name: 'Ольга',
        rate: 5,
        description:
            'Большое спасибо за существование вашей компании. Квиза - настоящая палочка-выручалочка в моей жизни в плане финансов. Все у вас хорошо и замечательно! Мне все в вас нравится! Процветания вам и побольше хороших клиентов. Так держать!',
        photo: 'Olga',
    },
])
</script>

<template>
    <div class="list">
        <swiper
            class="mySwiper"
            :speed="500"
            :modules="modules"
            :grabCursor="true"
            :effect="'cards'"
            :navigation="true"
            :pagination="{
                clickable: true,
                dynamicBullets: true,
            }"
        >
            <swiper-slide v-for="review in reviews" :key="review.id">
                <div class="slide d-flex">
                    <div
                        class="img img-wrapper d-flex align-items-center justify-content-center lazy-img"
                    >
                        <img
                            v-lazyload
                            :data-src="`assets/images/reviews/${review.photo}.png`"
                            alt="user photo"
                        />
                    </div>
                    <div class="wrapper">
                        <span class="name">{{ review.name }}</span>
                        <div class="rate d-flex align-items-center">
                            <div
                                class="icon img-wrapper d-flex align-items-center justify-content-center"
                                v-for="(_, index) in review.rate"
                                :key="index"
                            >
                                <img
                                    src="/assets/images/reviews/star.svg"
                                    alt="star icon"
                                />
                            </div>
                        </div>
                        <p
                            class="description text-overflow"
                            :title="review.description"
                        >
                            {{ review.description }}
                        </p>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<style scoped lang="scss">
.swiper {
    width: 592px;
    height: 320px;
}
.swiper-wrapper {
    display: flex;
    height: 100%;
}
.swiper-slide {
    max-height: 274px;
}
.list {
    position: relative;
    width: 100%;
    height: 380px;
    margin: 0 auto;
}
.slide {
    background-color: #fefefe;
    padding: 20px 24px;
    height: 234px;
}

.img {
    max-width: 201px;
    height: 201px;
    border-radius: 10px;
    margin-right: 27px;
    flex-shrink: 0;
}
.name,
.description {
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 0.07em;
}
.name {
    display: inline-block;
    font-weight: 600;
    margin-bottom: 12px;
}
.description {
    line-height: 24px;
    max-width: 294px;
    -webkit-line-clamp: 7;
}
.rate {
    margin-bottom: 12px;
    .icon {
        max-width: 18px;
        height: 18px;
    }
    .icon + .icon {
        margin-left: 6px;
    }
}

@media (max-width: $tablet) {
    .swiper {
        width: 500px;
    }
}
@media (max-width: $mobile) {
    .swiper {
        width: 320px;
        height: 180px;
        @media (max-width: 374px) {
            width: 290px;
        }
    }
    .swiper-slide {
        max-height: 180px;
    }
    .list {
        height: 225px;
    }
    .slide {
        padding: 20px 14px 20px 20px;
        height: 140px;
    }
    .img {
        max-width: 100px;
        height: 100px;
        margin-right: 22px;
    }
    .name {
        margin-bottom: 8px;
    }
    .description {
        font-size: 12px;
        line-height: 18px;
        max-width: 100%;
        -webkit-line-clamp: 5;
    }
    .rate {
        margin-bottom: 8px;
        .icon {
            max-width: 12px;
            height: 12px;
        }
    }
}
</style>
