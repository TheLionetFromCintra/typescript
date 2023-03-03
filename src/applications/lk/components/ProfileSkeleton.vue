<template>
    <div class="skeleton">
        <div class="bg-animate title"></div>
        <div class="first">
            <div class="bg-animate item"></div>
            <div class="bg-animate item"></div>
            <div class="bg-animate item"></div>
            <div class="bg-animate item"></div>
            <div class="bg-animate item"></div>
        </div>
        <div class="bg-animate title second"></div>
        <div class="second">
            <div class="bg-animate item"></div>
            <div class="bg-animate item"></div>
            <div class="bg-animate item"></div>
            <div class="bg-animate item"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.skeleton {
    width: 100%;
    max-width: 450px;
}
.bg-animate {
    width: 100%;
    height: 40px;
}
.item {
    height: 20px;
    max-width: 300px;
}
.item + .item {
    margin-top: 20px;
}
.title {
    margin-bottom: 36px;
    &.second {
        margin-top: 40px;
    }
}
@media (max-width: $mobile) {
    .item {
        max-width: 450px;
    }
    .skeleton {
        max-width: 100%;
    }
}
</style>
