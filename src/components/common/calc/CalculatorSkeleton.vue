<script setup lang="ts"></script>

<template>
    <div class="wrapper d-flex flex-column align-items-center">
        <div class="bg-animate title"></div>
        <div class="bg-animate calc"></div>
        <div class="bg-animate calc"></div>
        <div class="bg-animate btn"></div>
    </div>
</template>

<style scoped lang="scss">
.wrapper {
    background-color: #f1f1f1;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 /0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    width: 100%;
    max-width: 304px;
    height: 374px;
    margin-top: 7px;
    padding: 24px;
}
.bg-animate {
    width: 100%;
}
.title {
    height: 33px;
    margin-bottom: 64px;
}
.calc {
    height: 42px;
}
.calc + .calc {
    margin-top: 42px;
}
.btn {
    height: 43px;
    margin-top: 52px;
    max-width: 224px;
}

@media (max-width: $tablet) {
    .wrapper {
        padding: 20px;
        background-color: #fefefe;
        box-shadow: 0px 232px 93px rgb(205 207 210 / 1%),
            0px 131px 78px rgb(205 207 210 / 5%),
            0px 58px 58px rgb(205 207 210 / 9%),
            0px 15px 30px rgb(180 185 204 / 8%),
            0px 0px 0px rgb(135 135 135 / 42%);

        max-width: 500px;
        height: 366px;
        margin: 45px 0;
    }

    .calc + .calc {
        margin-top: 36px;
    }
}

@media (max-width: $mobile) {
    .wrapper {
        max-width: 87%;
        padding: 18px;
        height: 231px;
    }
    .title {
        display: none;
    }
    .calc {
        height: 36px;
    }

    .btn {
        margin-top: 36px;
    }
}
</style>
