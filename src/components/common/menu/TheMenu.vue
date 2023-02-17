<script setup lang="ts">
import Cookies from 'js-cookie'

const emit = defineEmits<{
    (e: 'close'): void
}>()

const closeMenu = function () {
    emit('close')
}

const logout = function () {
    Cookies.remove('sbg-identity')
    Cookies.remove('sbg-in')
    Cookies.remove('PHPSESSID')
    window.location.reload()
    closeMenu()
}
</script>

<template>
    <div class="menu">
        <nav class="links">
            <div class="home">
                <router-link to="/" class="d-flex align-items-center">
                    <div
                        class="icon img-wrapper d-flex align-items-center justify-content-center"
                    >
                        <img
                            src="/assets/images/menu/home.svg"
                            alt="link icon"
                        />
                    </div>
                    <span>Главная</span>
                </router-link>
            </div>
            <div
                class="btn d-flex justify-content-center"
                v-if="!Cookies.get('sbg-in')"
            >
                <base-button :link="true" mode="yellow" to="/login"
                    >Войти</base-button
                >
            </div>
            <ul v-else>
                <li>
                    <router-link
                        to="/lk/offers"
                        class="d-flex align-items-center"
                        @click="closeMenu"
                    >
                        <div
                            class="icon img-wrapper d-flex align-items-center justify-content-center"
                        >
                            <img
                                src="/assets/images/menu/offers.svg"
                                alt="link icon"
                            />
                        </div>
                        <span>Предложения</span>
                    </router-link>
                </li>
                <li>
                    <router-link
                        to="/lk/profile"
                        class="d-flex align-items-center"
                        @click="closeMenu"
                    >
                        <div
                            class="icon img-wrapper d-flex align-items-center justify-content-center"
                        >
                            <img
                                src="/assets/images/menu/profile.svg"
                                alt="link icon"
                            />
                        </div>
                        <span>Профиль</span>
                    </router-link>
                </li>
                <li>
                    <router-link
                        to="/lk/documents"
                        class="d-flex align-items-center"
                        @click="closeMenu"
                    >
                        <div
                            class="icon img-wrapper d-flex align-items-center justify-content-center"
                        >
                            <img
                                src="/assets/images/menu/documents.svg"
                                alt="link icon"
                            />
                        </div>
                        <span>Документы</span>
                    </router-link>
                </li>
                <li>
                    <div class="exit d-flex align-items-center" @click="logout">
                        <div
                            class="icon img-wrapper d-flex align-items-center justify-content-center"
                        >
                            <img
                                src="/assets/images/menu/exit.svg"
                                alt="link icon"
                            />
                        </div>
                        <span>Выйти</span>
                    </div>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style scoped lang="scss">
.btn {
    a {
        width: 100%;
        max-width: 211px;
    }
}
.menu {
    margin-top: 42px;
}
.menu.mobile {
    margin-top: 0;
}
.links {
    li {
        &:last-child {
            width: 100%;
            padding-bottom: 24px;
            border-bottom: 1px solid #8f8f8f;
        }
        a {
            &:hover {
                .icon::before {
                    opacity: 1;
                }
            }
        }
    }

    .exit,
    .home a,
    li a {
        font-size: 16px;
        line-height: 24px;
        cursor: pointer;
        font-weight: 500;
        color: $primary-grey-dark !important;
        font-family: inherit;
    }
    li + li {
        margin-top: 12px;
    }
    a.router-link-active {
        pointer-events: none;
        span {
            font-weight: 600;
        }
        .icon::before {
            opacity: 1;
        }
    }
    .home {
        width: 100%;
        border-bottom: 1px solid #8f8f8f;
        margin-bottom: 24px;
        padding-bottom: 24px;
    }

    li,
    .exit,
    .home a {
        width: fit-content;
    }
}
.icon {
    max-width: 23px;
    height: 23px;
    margin-right: 20px;
    position: relative;
    overflow: visible;

    &::before {
        content: '';
        display: block;
        width: 32px;
        height: 32px;
        background: linear-gradient(
                180deg,
                rgba(0, 0, 0, 0) 0%,
                rgba(0, 0, 0, 0.2) 100%
            ),
            $main_brand_2;
        border-radius: 50%;
        background-blend-mode: overlay, normal;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: 0.3s;
        opacity: 0;

        transition: opacity 0.2s linear;
    }
}
</style>
