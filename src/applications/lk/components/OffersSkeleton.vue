<template>
    <div class="skeleton">
        <div class="bg-animate item"></div>
        <div class="bg-animate item"></div>
        <div class="bg-animate item"></div>
        <div class="bg-animate item"></div>
        <div class="bg-animate item"></div>
        <div class="bg-animate item"></div>
    </div>
</template>

<style scoped lang="scss">
.skeleton {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 318px);
    grid-column-gap: 24px;
    grid-row-gap: 24px;
}
.bg-animate {
    width: 100%;
    min-height: 264px;
    border-radius: 10px;
}

@media (max-width: 1540px) {
    .skeleton.lk {
        grid-template-columns: repeat(2, 318px);
    }
}
@media (max-width: $tablet) {
    .skeleton {
        grid-template-columns: repeat(2, 44.8%);
        justify-content: center;
    }
}
@media (max-width: $mobile) {
    .skeleton {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .bg-animate {
        min-width: 318px;
        max-width: 70%;
        min-height: 254px;
    }
}
@media (max-width: 374px) {
    .bg-animate {
        max-width: 100%;
        min-width: initial;
    }
}
</style>
