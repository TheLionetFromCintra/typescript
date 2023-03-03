import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/styles/main.scss'

import BaseButton from '@/components/base/BaseButton.vue'
import BaseButtonUp from '@/components/base/BaseButtonUp.vue'
import TheError from './components/common/errors/TheError.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('base-button', BaseButton)
app.component('base-button-up', BaseButtonUp)
app.component('base-error', TheError)

router.isReady().then(function () {
    app.mount('#app')
})
