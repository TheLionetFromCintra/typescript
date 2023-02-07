<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

import SectionWrapper from './layouts/SectionWrapper.vue'
import MainHeader from '@/components/common/headers/MainHeader.vue'
import TheFooter from '@/components/common/footer/TheFooter.vue'

import ContactsList from './components/contacts/ContactsList.vue'
import StatList from './components/stat/StatList.vue'
import QuestionsList from './components/questions/QuestionsList.vue'
import OffersList from './components/offers/OffersList.vue'
import AboutUs from './components/about/AboutUs.vue'
import PayList from './components/pay/PayList.vue'
import StepList from './components/step/StepList.vue'

import { onMounted } from 'vue'
import useMobile from '@/hooks/mobile'

const ReviewsList = defineAsyncComponent(
    () => import('./components/reviews/ReviewsList.vue')
)

const { isMobile } = useMobile()

const setObserver = function () {
    const allSections = document.querySelectorAll('.observed')

    const revealSection = function (entries: any, observer: any) {
        const [entry] = entries

        if (!entry.isIntersecting) return

        entry.target.classList.remove('observed--hidden')
        observer.unobserve(entry.target)
    }

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    })

    allSections.forEach(function (section) {
        sectionObserver.observe(section)
        section.classList.add('observed--hidden')
    })
}

onMounted(() => {
    setObserver()
})
</script>

<template>
    <main-header class="main-header">
        <template #title>
            <h1>
                Для получения займа под <span class="underline">0%</span>
                <span class="colored">заполните анкету</span>
            </h1>
            <p>
                Получи деньги <span>быстро</span> и <span>просто</span>
                независимо от вашей кредитной истории
            </p>
            <div class="button">
                <router-link to="/primary" class="d-flex align-items-center">
                    <span>Заполнить заявку</span>
                </router-link>
            </div>
        </template>
    </main-header>

    <section-wrapper title="Как это работает?" class="steps observed">
        <template #content>
            <step-list></step-list>
        </template>
    </section-wrapper>

    <section-wrapper
        title="Способы получения займа в МФО"
        class="pays observed"
    >
        <template #content>
            <pay-list></pay-list>
        </template>
    </section-wrapper>

    <section-wrapper title="О нас" class="info observed">
        <template #content>
            <about-us></about-us>
        </template>
    </section-wrapper>

    <section-wrapper title="Выберите свой займ в МФО" class="offers observed">
        <template #content>
            <offers-list></offers-list>
        </template>
    </section-wrapper>

    <section-wrapper title="Отзывы наших клиентов" class="reviews observed">
        <template #content>
            <reviews-list></reviews-list>
        </template>
    </section-wrapper>

    <section-wrapper title="Часто спрашивают" class="questions observed">
        <template #content>
            <questions-list></questions-list>
        </template>
    </section-wrapper>

    <section-wrapper title="Мы помогаем получить деньги" class="stat observed">
        <template #content>
            <stat-list></stat-list>
        </template>
    </section-wrapper>

    <section-wrapper
        title="Контактная информация"
        class="contacts observed"
        v-if="!isMobile"
    >
        <template #content>
            <contacts-list></contacts-list>
        </template>
    </section-wrapper>

    <the-footer></the-footer>
</template>

<style scoped lang="scss">
.observed {
    transition: transform 1s, opacity 1s;
}
.observed--hidden {
    opacity: 0;
    transform: translateY(8rem);
}
.main-header {
    h1 {
        margin-bottom: 35px;
        font-weight: 600;
        font-size: 48px;
        line-height: 65px;
        color: $primary-grey-dark;
        span {
            font-weight: inherit;
        }
        .colored {
            display: block;
            color: $main_brand_1;
        }
    }
    p {
        max-width: 370px;
        font-size: 24px;
        line-height: 33px;
        color: $primary-black;
    }

    @media (max-width: $tablet) {
        max-width: 80%;
        text-align: center;

        p {
            max-width: 700px;
            margin: 0 auto;
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
}
@media (max-width: $mobile) {
    .observed--hidden {
        opacity: 0;
        transform: translateY(6rem);
    }
}
</style>
