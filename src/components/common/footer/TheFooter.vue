<script setup lang="ts">
import Cookies from 'js-cookie'

import { computed } from 'vue'
import { useDictionaryStore } from '@/stores/common/DictionaryStore'

const dictionaryStore = useDictionaryStore()

const footerDesc = computed(() => {
    if (dictionaryStore.dictionary.get('dictionary')?.footerTextIndex)
        return dictionaryStore.dictionary.get('dictionary')?.footerTextIndex

    if (!Cookies.get('sbg-in'))
        return (
            dictionaryStore.dictionary.get('dictionary')?.footerTextFirst ||
            dictionaryStore.dictionary.get('dictionary')?.footerText
        )

    return dictionaryStore.dictionary.get('dictionary')?.footerText
})
</script>

<template>
    <footer class="footer">
        <div class="description">
            <div class="container" v-html="footerDesc"></div>
        </div>
        <div class="bottom">
            <div class="container">
                <div
                    class="parent d-flex align-items-center justify-content-between"
                >
                    <a
                        v-if="$route.name === 'landing'"
                        href="/"
                        class="logo"
                    ></a>
                    <router-link
                        v-else
                        :to="{ name: 'landing' }"
                        class="logo"
                    ></router-link>
                    <div class="wrapper d-flex flex-column align-items-center">
                        <a
                            class="link-hover"
                            :href="`tel:${dictionaryStore.phoneLink}`"
                        >
                            {{ dictionaryStore.phoneMask }}
                        </a>
                        <a
                            class="link-hover"
                            :href="`mailto:${dictionaryStore.emailLink}`"
                        >
                            {{ dictionaryStore.emailLink }}
                        </a>
                        <span>Все права защищены</span>
                    </div>
                    <base-button
                        class="link"
                        :link="true"
                        :href="true"
                        mode="grey"
                        to="/unsubscribe"
                        >Отписаться</base-button
                    >
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped lang="scss">
.footer {
    margin-top: 128px;
}
.description {
    padding: 58px 0;
    background-color: $sub-background;
    font-size: 16px;
    line-height: 26px;
    letter-spacing: 0.07em;

    &::v-deep {
        a {
            color: #2a3555;
            font-weight: 600;
        }
        p + p {
            margin-top: 32px;
        }
    }
}
.bottom {
    padding: 84px 0;
}
.wrapper {
    margin-left: 76px;
    a,
    span {
        display: block;
        font-size: 16px;
        line-height: 19px;
        letter-spacing: 0.07em;
        color: inherit;
    }
    a + a,
    a + span {
        margin-top: 12px;
    }
}
.link {
    padding: 12px;
    min-width: 198px;
}

.account__footer {
    margin-top: 0;
    .container {
        max-width: 100%;
    }
    .description {
        background-color: #f3f3f3;
        padding: 0 95px;
        .container {
            padding: 58px 0 0 0;
            border-top: 1px solid #8f8f8f;
        }
    }

    .bottom {
        .container {
            padding: 0 95px;
        }
    }

    @media (max-width: $tablet) {
        .description {
            background-color: $sub-background;
            padding: 58px 0;
            .container {
                padding: 0 40px;
                border-top: none;
            }
        }
        .bottom {
            .container {
                padding: 0 40px;
            }
        }
    }

    @media (max-width: $mobile) {
        .description {
            padding: 40px 0;
            .container {
                padding: 0 24px;
            }
        }
        .bottom {
            .container {
                padding: 0 24px;
            }
        }
    }
}

@media (max-width: $tablet) {
    .bottom {
        padding: 64px 0;
    }
}
@media (max-width: $mobile) {
    .footer {
        margin-top: 64px;
        .container {
            padding: 0 24px;
        }
    }
    .account__footer {
        margin-top: 0;
    }
    .description {
        padding: 28px 0 46px 0;
        font-size: 12px;
        line-height: 18px;
        &::v-deep p + p {
            margin-top: 18px;
        }
    }
    .bottom {
        padding: 64px 0;
    }
    .logo {
        order: 1;
    }
    .parent {
        flex-direction: column;
    }
    .wrapper {
        margin: 0;
        order: 3;
        a:not(.link),
        span {
            font-size: 12px;
            line-height: 18px;
        }
    }
    .link {
        margin: 32px 0;
        order: 2;
    }
}
</style>
