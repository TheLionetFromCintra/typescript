<script setup lang="ts">
interface Props {
    mode?: string
    link?: Boolean
    href?: Boolean
    to?: string
    type?: 'button' | 'reset' | 'submit' | undefined
}

const { mode, link, href, to = '/', type = 'button' } = defineProps<Props>()
</script>

<template>
    <button v-if="!link" :class="mode" :type="type">
        <slot></slot>
    </button>
    <a :href="to" v-else-if="link && href" :class="mode">
        <slot></slot>
    </a>
    <router-link v-else :to="to" :class="mode">
        <slot></slot>
    </router-link>
</template>

<style lang="scss" scoped>
a,
button {
    padding: 15px 14px;
    border: 1px solid #000;
    cursor: pointer;
    display: inline-block;

    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 17px;
    text-align: center;
    letter-spacing: 0.07em;
    outline: none;

    transition: color 0.3s linear, background-color 0.3s linear,
        border-color 0.3s linear, box-shadow 0.2s linear;
}
a.black,
button.black {
    color: $primary-black;
    border-color: #000;

    &:hover {
        color: #fefefe;
        background-color: $primary-black;
    }
    &:focus,
    &:active,
    &:focus-within {
        box-shadow: 0px 4px 20px rgba(25, 25, 25, 0.42);
    }
}

a.yellow,
button.yellow {
    color: $main_brand_2;
    background-color: $main_brand_2;
    border-color: $main_brand_2;
    color: $primary-grey-dark;

    &:hover {
        box-shadow: 0px 0px 5px rgba(251, 232, 78, 0.67),
            0px 4px 15px rgba(171, 156, 31, 0.3);
    }
    &:focus,
    &:active,
    &:focus-within {
        background-color: $primary-grey-dark;
        border-color: $primary-grey-dark;
        color: #fefeff;
        box-shadow: none;
    }
}
a.grey,
button.grey {
    color: $primary-grey;
    border-color: $primary-grey;
    &:hover {
        color: $primary-black;
        border-color: $primary-black;
    }
    &:focus,
    &:active,
    &:focus-within {
        filter: drop-shadow(0px 0px 12px rgba(25, 25, 25, 0.69));
    }
}
a.disabled,
button.disabled {
    pointer-events: none;
    border: 1px solid #8f8f8f;
    background-color: transparent;
    color: #8f8f8f;
}
</style>
