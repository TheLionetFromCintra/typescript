<template>
    <div class="wrapper">
        <div class="parent d-flex">
            <div class="img bg-animate"></div>
            <div class="content">
                <div class="title item bg-animate"></div>
                <div class="rating item bg-animate"></div>
                <div class="desc item bg-animate"></div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.wrapper {
    width: 594px;
    height: 272px;
    margin: 0 auto;
    background-color: #f1f1f1;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 /0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    padding: 20px 24px;
}
.img {
    flex-shrink: 0;
    width: 201px;
    height: 201px;
}
.title,
.rating,
.desc {
    width: 100%;
}
.title {
    height: 19px;
}
.rating {
    height: 18px;
}
.desc {
    height: 140px;
}
.content {
    width: 100%;
    margin-left: 27px;
}
.item + .item {
    margin-top: 12px;
}
@media (max-width: $tablet) {
    .wrapper {
        width: 500px;
    }
}
@media (max-width: $mobile) {
    .wrapper {
        width: 320px;
        height: 180px;
        padding: 20px 14px 20px 20px;
        margin: 10px auto;
    }
    .content {
        margin-left: 22px;
    }
    .item + .item {
        margin-top: 8px;
    }
    .img {
        width: 100px;
        height: 100px;
    }

    .rating {
        height: 12px;
    }
    .desc {
        height: 53px;
    }
}
</style>
