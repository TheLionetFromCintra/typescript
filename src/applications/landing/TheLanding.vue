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
import ReviewsSkeleton from './components/reviews/ReviewsSkeleton.vue'

import { onMounted } from 'vue'
import useMobile from '@/hooks/mobile'
import useComebacker from '@/hooks/comebacker'

useComebacker()

const ReviewsList = defineAsyncComponent(
    () => import('./components/reviews/ReviewsList.vue')
)

const { isMobile } = useMobile()

const title = `Для получения займа под <span class="underline">0%</span>`

const desc = ` Получи деньги <span class="underline">быстро</span> и <span class="underline">просто</span> независимо от вашей кредитной истории`

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
    <main-header
        class="main-header"
        :title="title"
        :desc="desc"
        :show-auto="true"
    ></main-header>

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
            <suspense>
                <reviews-list></reviews-list>
                <template #fallback
                    ><reviews-skeleton></reviews-skeleton
                ></template>
            </suspense>
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

@media (max-width: $mobile) {
    .observed--hidden {
        opacity: 0;
        transform: translateY(6rem);
    }
}
</style>
