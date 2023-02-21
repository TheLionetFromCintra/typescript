<script setup lang="ts">
import TheHeader from '@/components/common/headers/TheHeader.vue'
import TheFooter from '@/components/common/footer/TheFooter.vue'

import { onMounted } from 'vue'

const createBanner = function () {
    const innerScript = document.createElement('script')
    const rtb = document.createElement('div')
    rtb.className = 'rtb'
    innerScript.innerHTML = `
                    let banner = null;
                    if(!banner) {
                     banner = document.querySelector(".rtb");
                    }

                    if(banner.parentNode.offsetWidth < 969) {
                        banner.innerHTML = '<ins class="dd15595d" data-cp-size="272" data-key="4f6a6e2450671bdf31d6bb8cab106701"></ins><ins class="dd15595d" data-cp-size="300" data-key="4f6a6e2450671bdf31d6bb8cab106701"></ins>';
                    } else {
                        banner.innerHTML = '<ins class="dd15595d" data-cp-size="970" data-key="4f6a6e2450671bdf31d6bb8cab106701"></ins><ins class="dd15595d" data-cp-size="970" data-key="4f6a6e2450671bdf31d6bb8cab106701"></ins>';
                    }
               `

    rtb.appendChild(innerScript)
    document.querySelector('.banner')?.prepend(rtb)

    const script = document.createElement('script')
    script.src = 'https://network.adsfin.pro/59918a10.js'
    script.async = true
    document.head.appendChild(script)
}

onMounted(() => {
    createBanner()
})
</script>

<template>
    <div class="unsub">
        <div class="container">
            <div class="unsub-header">
                <the-header></the-header>
            </div>
            <section>
                <div class="banner"></div>
                <h1 class="subtitle">Авторизация</h1>
                <router-view></router-view>
            </section>
        </div>
    </div>
    <the-footer></the-footer>
</template>

<style scoped lang="scss">
.unsub {
    min-height: calc(100vh - 250px);
    .container {
        max-width: 1084px;
    }
    .unsub-header {
        padding-top: 45px;
        margin-bottom: 24px;
    }
    .banner {
        min-height: 50px;
        margin-bottom: 36px;
    }

    h1 {
        margin-bottom: 42px;
        text-align: left;
    }

    @media (max-width: $mobile) {
        .unsub-header {
            padding-top: 35px;
        }
        h1 {
            margin-bottom: 24px;
        }

        min-height: initial;
        padding-bottom: 64px;

        .desc {
            margin-bottom: 24px;
        }
    }
}
</style>
