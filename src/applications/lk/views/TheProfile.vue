<script setup lang="ts">
import AccountWrapper from '../layouts/AccountWrapper.vue'

import { useAppStore } from '@/stores/app/AppStore'

const appStore = useAppStore()
</script>

<template>
    <account-wrapper title="Профиль">
        <template #content>
            <div class="item personal">
                <div
                    class="title d-flex align-items-center justify-content-between"
                >
                    <span>Личные данные</span>
                    <router-link to="/lk/edit">
                        <img
                            src="/assets/images/account/icon-edit.svg"
                            alt="edit data icon"
                        />
                    </router-link>
                </div>

                <div class="content">
                    <div class="prop d-flex align-items-center">
                        <span class="label">Телефон</span>
                        <div class="value">
                            {{
                                appStore.data.contactData.phone
                                    ? appStore.data.contactData.phone
                                    : '-'
                            }}
                        </div>
                    </div>
                    <div class="prop d-flex align-items-center">
                        <span class="label">Email</span>
                        <div class="value">
                            {{
                                appStore.data.contactData.email
                                    ? appStore.data.contactData.email
                                    : '-'
                            }}
                        </div>
                    </div>
                    <div class="prop d-flex align-items-center">
                        <span class="label">Фамилия</span>
                        <div class="value">
                            {{
                                appStore.data.contactData.lastname
                                    ? appStore.data.contactData.lastname
                                    : '-'
                            }}
                        </div>
                    </div>
                    <div class="prop d-flex align-items-center">
                        <span class="label">Имя</span>
                        <div class="value">
                            {{
                                appStore.data.contactData.firstname
                                    ? appStore.data.contactData.firstname
                                    : '-'
                            }}
                        </div>
                    </div>
                    <div class="prop d-flex align-items-center">
                        <span class="label">Отчество</span>
                        <div class="value">
                            {{
                                appStore.data.contactData.patronymic
                                    ? appStore.data.contactData.patronymic
                                    : '-'
                            }}
                        </div>
                    </div>
                    <div class="prop d-flex align-items-center">
                        <span class="label">Дата рождения</span>
                        <div class="value">
                            {{
                                appStore.data.contactData.birthday
                                    ? appStore.data.contactData.birthday
                                    : '-'
                            }}
                        </div>
                    </div>
                    <div class="prop d-flex align-items-center">
                        <span class="label">Пол</span>
                        <div class="value">
                            {{
                                +appStore.data.contactData.gender
                                    ? 'Женский'
                                    : 'Мужской'
                            }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="item passport">
                <div
                    class="title d-flex align-items-center justify-content-between"
                >
                    <span>Паспортные данные</span>
                    <router-link to="/lk/edit">
                        <img
                            src="/assets/images/account/icon-edit.svg"
                            alt="edit data icon"
                        />
                    </router-link>
                </div>

                <div class="content">
                    <div class="prop d-flex align-items-center">
                        <span class="label">Серия</span>
                        <div class="value">
                            {{
                                appStore.data.passportData.passportseries
                                    ? appStore.data.passportData.passportseries
                                    : '-'
                            }}
                        </div>
                    </div>
                    <div class="prop d-flex align-items-center">
                        <span class="label">Номер</span>
                        <div class="value">
                            {{
                                appStore.data.passportData.passportnumber
                                    ? appStore.data.passportData.passportnumber
                                    : '-'
                            }}
                        </div>
                    </div>
                    <div class="prop d-flex align-items-center">
                        <span class="label">Код подраздел.</span>
                        <div class="value">
                            {{
                                appStore.data.passportData.passportcode
                                    ? appStore.data.passportData.passportcode
                                    : '-'
                            }}
                        </div>
                    </div>
                    <div class="prop d-flex align-items-center">
                        <span class="label">Адрес регистр.</span>
                        <div class="value">
                            {{
                                appStore.data.contactData.addrcity
                                    ? appStore.data.contactData.addrcity
                                    : '-'
                            }}
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </account-wrapper>
</template>

<style scoped lang="scss">
.item {
    width: 100%;
    max-width: 450px;
}
.item + .item {
    margin-top: 40px;
}
.title {
    margin-bottom: 36px;
    width: 100%;
    span {
        display: block;
        margin-right: 24px;
        font-weight: 600;
        font-size: 20px;
        line-height: 24px;
        letter-spacing: 0.07em;
        color: $primary-grey-dark;
    }
}
.label,
.value {
    display: block;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 0.07em;
    color: $primary-grey-dark;
}
.label {
    min-width: 180px;
}
.value {
    font-weight: 600;
    margin-left: 20px;
}
.prop + .prop {
    margin-top: 12px;
}
.personal {
    .prop:nth-child(3),
    .prop:nth-child(6) {
        margin-top: 24px;
    }
}
.passport {
    .prop:last-child {
        margin-top: 24px;
    }
}
@media (max-width: $mobile) {
    .item {
        max-width: 100%;
    }

    .label,
    .value {
        font-size: 14px;
        line-height: 18px;
    }
    .prop {
        align-items: flex-start;
    }
}
</style>
