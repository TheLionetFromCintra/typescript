<script setup lang="ts">
interface Props {
    title: string
}

const { title } = defineProps<Props>()
</script>

<template>
    <section>
        <div class="container">
            <div class="wrapper">
                <h2 class="subtitle">{{ title }}</h2>
                <slot name="description"></slot>
                <slot name="content"></slot>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
h2 {
    margin-bottom: 72px;
}
.wrapper {
    width: 100%;
    margin: 0 auto;
}

.steps {
    margin-top: 96px;
    .wrapper {
        max-width: 908px;
    }
}
.pays {
    margin-top: 100px;
    .wrapper {
        background-color: #fefefe;
        padding: 40px 64px 74px 64px;
    }
}
.info {
    margin-top: 80px;
    padding: 42px 0 50px 0;
    background-color: $sub-background;
    position: relative;
    z-index: 1;
    overflow: hidden;
    @media (max-width: $mobile) {
        overflow: visible;
        background-color: transparent;
    }
    &::before,
    &::after {
        position: absolute;
        top: 0;
        height: 100%;
        z-index: -1;
    }
    &::before {
        content: url('assets/images/about/bg-1.png');
        left: 0;
        filter: blur(15px);
        @media (max-width: $tablet) {
            content: none;
        }
    }
    &::after {
        content: url('assets/images/about/bg-2.png');
        right: 0;
        @media (max-width: $mobile) {
            filter: blur(40px);
        }
    }
    .wrapper {
        max-width: 824px;
    }
}
.offers {
    margin-top: 84px;
    .wrapper {
        max-width: 898px;
    }
}
.reviews {
    margin-top: 138px;
    padding-bottom: 60px;
}

.questions {
    margin-top: 106px;
    .wrapper {
        max-width: 1084px;
    }
}

.stat {
    margin-top: 94px;
    padding: 74px 0 90px 0;
    background: linear-gradient(
            0deg,
            rgba(224, 232, 234, 0.74),
            rgba(224, 232, 234, 0.74)
        ),
        url('assets/images/stat/stat-bg.png');
    overflow: hidden;

    .wrapper {
        max-width: 1066px;
        position: relative;

        &::before {
            content: url('assets/images/stat/Lady.png');
            left: -265px;
            bottom: -102px;
            position: absolute;
            z-index: 100;
            @media (max-width: $tablet) {
                content: none;
            }
        }
    }
}

.contacts {
    margin-top: 94px;
    .wrapper {
        max-width: 1102px;
    }
}

@media (max-width: $mobile) {
    .reviews {
        //overflow-x: hidden;
        margin-top: 64px;
        padding-bottom: 0;
        .subtitle {
            margin-bottom: 24px;
        }

        .container {
            padding: 0;
        }
        .wrapper {
            overflow-x: hidden;
            padding: 0 15px;
        }
    }
    .steps {
        margin-top: 64px;
        .subtitle {
            display: none;
        }
    }
    .pays {
        margin-top: 64px;
        .wrapper {
            padding: 20px 26px 34px 26px;
            max-width: 400px;
        }
        .subtitle {
            margin-bottom: 36px;
        }
    }
    .info {
        margin-top: 64px;
        padding: 0;
        .subtitle {
            margin-bottom: 24px;
        }
    }
    .questions,
    .offers {
        .subtitle {
            margin-bottom: 40px;
        }
    }
    .questions {
        margin-top: 64px;
    }
    .stat {
        margin-top: 64px;
        padding: 0;
        background: #f3f3f3;
        .subtitle {
            display: none;
        }
    }
}
</style>
