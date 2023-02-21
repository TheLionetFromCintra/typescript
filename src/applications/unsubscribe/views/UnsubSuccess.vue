<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const phone = computed(() => {
    return route.query.phone
})

const status = computed(() => {
    return route.query.status
})

const message = computed(() => {
    return route.query.message
})
</script>

<template>
    <div class="icon d-flex align-items-center justify-content-center">
        <span v-if="status === 'subscribeNotFound'">!</span>
        <img
            src="/assets/images/unsub/unsub-success.svg"
            alt="message icon"
            v-else
        />
    </div>
    <div v-if="status === 'subscribeNotFound'">
        <h3>Активных подписок не найдено</h3>
        <p class="desc">
            Для указанного Вами номера
            <b>{{ phone }}</b
            ><br />
            активных подписок в системе не найдено.
        </p>
    </div>
    <div v-else>
        <p class="desc" v-html="message"></p>
    </div>

    <div class="btn">
        <base-button :link="true" to="/unsubscribe" mode="black"
            >Вернуться</base-button
        >
    </div>
</template>

<style scoped lang="scss">
.icon {
    margin-bottom: 24px;
    width: 44px;
    height: 44px;
    background-color: $main_brand_1;
    border-radius: 50%;
    color: #fefeff;
    span {
        display: block;
        font-size: 24px;
        font-weight: 700;
    }

    img {
        width: 28px;
        height: 16px;
    }
}
h3 {
    font-weight: 600;
    font-size: 24px;
    line-height: 29px;
    margin-bottom: 24px;
}
.desc {
    font-size: 16px;
    line-height: 22px;
    color: $primary-grey-dark;
    opacity: 0.75;
    &:deep(a) {
        color: $main_brand_1;
        font-weight: 700;
        opacity: 1;
    }
}
.btn {
    margin-top: 24px;
    a {
        width: 100%;
        max-width: 212px;
    }
}

@media (max-width: $mobile) {
    .icon {
        margin: 0 auto 24px auto;
    }
    h3 {
        font-size: 22px;
        line-height: 27px;
        margin: 0 auto 24px auto;
        text-align: center;
    }
    .desc {
        font-size: 14px;
        margin: 0 auto;
        text-align: center;
    }
    .btn {
        display: flex;
        justify-content: center;
    }
}
</style>
