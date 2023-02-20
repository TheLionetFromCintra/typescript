import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'
import anticharge from '@/api/anticharge'

import { useAppStore } from '@/stores/app/AppStore'

import TheLanding from '@/applications/landing/TheLanding.vue'
import ThePrimary from '@/applications/loan-app/views/primary/ThePrimary.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'landing',
            component: TheLanding,
            beforeEnter: () => {
                if (!Cookies.get('sbg-cpa')) {
                    return { name: 'LoanPrimary' }
                } else {
                    return
                }
            },
        },
        {
            path: '/primary',
            name: 'LoanPrimary',
            component: ThePrimary,
        },
        {
            path: '/anticharge',
            name: 'Anticharge',
            component: ThePrimary,
        },
        {
            path: '/contact',
            name: 'LoanContact',
            component: () =>
                import('@/applications/loan-app/views/contact/TheContact.vue'),
        },
        {
            path: '/card',
            name: 'LoanCard',
            component: () =>
                import('@/applications/loan-app/views/card/TheCard.vue'),
        },
        {
            path: '/auth',
            name: 'LoanAuth',
            component: () =>
                import('@/applications/loan-app/views/auth/LoanAuth.vue'),
        },
        {
            path: '/lk',
            component: () => import('@/applications/lk/TheAccount.vue'),
            redirect: '/lk/profile',
            name: 'PersonalAccount',
            children: [
                {
                    path: 'profile',
                    component: () =>
                        import('@/applications/lk/views/TheProfile.vue'),
                },
                {
                    path: 'edit',
                    component: () =>
                        import('@/applications/lk/views/TheEdit.vue'),
                },
                {
                    path: 'save-changes',
                    component: () =>
                        import('@/applications/lk/views/SaveChanges.vue'),
                },
                {
                    path: 'documents',
                    component: () =>
                        import('@/applications/lk/views/TheDocuments.vue'),
                },
                {
                    path: 'offers',
                    component: () =>
                        import('@/applications/lk/views/TheOffers.vue'),
                },
            ],
        },
        {
            path: '/final',
            name: 'LoanFinal',
            component: () => import('@/applications/final/TheFinal.vue'),
            beforeEnter: () => {
                if (Cookies.get('sbg-cpa') && Cookies.get('sbg-in')) {
                    return
                } else {
                    return { name: 'PersonalAccount' }
                }
            },
        },
        {
            path: '/unsubscribe',
            redirect: '/unsubscribe',
            component: () =>
                import('@/applications/unsubscribe/TheUnsubscribe.vue'),
            children: [
                {
                    path: '/unsubscribe',
                    name: 'Unsubscribe',
                    component: () =>
                        import(
                            '@/applications/unsubscribe/views/UnsubMain.vue'
                        ),
                },
                {
                    path: '/unsubscribe/success',
                    name: 'UnsubSuccess',
                    component: () =>
                        import(
                            '@/applications/unsubscribe/views/UnsubSuccess.vue'
                        ),
                },
            ],
        },
        {
            path: '/:notFound(.*)',
            name: '404',
            component: () => import('@/applications/404/NotFound.vue'),
        },
    ],
    scrollBehavior() {
        return { top: 0, behavior: 'smooth' }
    },
})

router.beforeEach(async (to) => {
    const appStore = useAppStore()

    if (to.name === 'Anticharge') {
        await anticharge(to.query)
        await appStore.updateData()
    }

    if (to.name === 'LoanContact') {
        if (!appStore.data.contactData.phone) {
            return { name: 'LoanPrimary' }
        }
    }

    if (to.name === 'LoanCard') {
        const { allow } = to.params

        const {
            passportData: { passportnumber },
            isSubscribed,
            isSigned,
        } = appStore.data

        if (isSubscribed) {
            return { name: 'PersonalAccount' }
        }

        if ((isSigned && allow) || passportnumber) {
            return
        } else {
            return { name: 'LoanContact' }
        }
    }

    if (to.path.includes('lk')) {
        if (!Cookies.get('sbg-in')) {
            return { name: 'landing' }
        } else {
            // await Store.dispatch('personal/getInfo')
            // await Store.dispatch('application/update')
            return
        }
    }
})

export default router
