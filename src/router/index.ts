import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'

import TheLanding from '@/applications/landing/TheLanding.vue'
import ThePrimary from '@/applications/loan-app/views/primary/ThePrimary.vue'
import NotFound from '@/applications/404/NotFound.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'landing',
            component: TheLanding,
            beforeEnter: (to, _) => {
                if (!Cookies.get('sbg-cpa') && to.name === 'landing')
                    return { name: 'LoanPrimary' }

                if (Cookies.get('sbg-cpa') && to.name !== 'landing')
                    return false
            },
        },
        {
            path: '/primary',
            name: 'LoanPrimary',
            component: ThePrimary,
        },
        { path: '/:notFound(.*)', name: '404', component: NotFound },
    ],
    scrollBehavior() {
        return { top: 0, behavior: 'smooth' }
    },
})

export default router
