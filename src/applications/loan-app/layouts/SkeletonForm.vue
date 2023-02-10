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
</style>
