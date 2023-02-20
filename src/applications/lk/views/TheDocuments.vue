<script setup lang="ts">
import AccountWrapper from '../layouts/AccountWrapper.vue'

import { useDictionaryStore } from '@/stores/common/DictionaryStore'
import { vLazyload } from '@/directives/vLazyload'

const dictionaryStore = useDictionaryStore()
</script>

<template>
    <account-wrapper title="Документы">
        <template #content>
            <ul class="list">
                <li
                    class="item"
                    v-for="(doc, index) in dictionaryStore.dictionary.get(
                        'dictionary'
                    )?.profileDocuments"
                    :key="index"
                >
                    <a
                        :href="doc.link"
                        target="_blank"
                        download
                        class="d-flex align-items-center"
                    >
                        <div
                            class="icon img-wrapper d-flex align-items-center justify-content-center lazy-img"
                        >
                            <img
                                v-lazyload
                                :data-src="'/assets/images/account/icon-pdf.svg'"
                                alt="document icon"
                            />
                        </div>
                        <span>{{ doc.title }}</span>
                    </a>
                </li>
            </ul>
        </template>
    </account-wrapper>
</template>

<style scoped lang="scss">
ul {
    li {
        width: fit-content;
        a {
            font-size: 16px;
            line-height: 22px;
            color: $primary-grey-dark;
            span {
                font-weight: 600;
            }

            @media (max-width: $mobile) {
                font-size: 12px;
                line-height: 16px;
            }
        }
    }
    li + li {
        margin-top: 24px;
        @media (max-width: $mobile) {
            margin-top: 12px;
        }
    }
}
.icon {
    max-width: 24px;
    height: 24px;
    margin-right: 24px;
    @media (max-width: $mobile) {
        margin-right: 12px;
    }
}
</style>
