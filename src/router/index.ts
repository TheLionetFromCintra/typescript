import { createRouter, createWebHistory } from 'vue-router'
import TheLanding from '@/applications/landing/TheLanding.vue'
import NotFound from '@/applications/404/NotFound.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'landing',
            component: TheLanding,
        },
        { path: '/:notFound(.*)', name: '404', component: NotFound },
    ],
    scrollBehavior() {
        return { top: 0, behavior: 'smooth' }
    },
})

export default router
