<template>
    <div class="skeleton">
        <slot name="inputs"></slot>
        <div class="btn-wrapper d-flex justify-content-center">
            <div class="btn bg-animate"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.skeleton {
    width: 100%;
    max-width: 624px;
    margin: 0 auto;
}
.btn-wrapper {
    margin-top: 60px;
    .btn {
        width: 231px;
        height: 46px;
    }
}

.edit .skeleton {
    margin: 0;
    max-width: 640px;
}

.contact-skeleton {
    .btn-wrapper {
        margin-top: 24px;
        justify-content: flex-start;

        @media (max-width: $mobile) {
            margin-top: 36px;
            justify-content: center;
        }
    }
}
.card-skeleton {
    .btn-wrapper {
        margin-top: 36px;
    }
}
</style>
