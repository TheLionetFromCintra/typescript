<script setup lang="ts">
const emit = defineEmits<{
    (e: 'update:modelValue', val: boolean): void
}>()

const update = function (e: Event) {
    emit('update:modelValue', (e.target as HTMLInputElement).checked)
}

interface Props {
    desc: string
    error: boolean
    modelValue: boolean
}

const { desc, modelValue } = defineProps<Props>()
</script>

<template>
    <div class="checkbox">
        <label class="d-flex align-items-start justify-content-center">
            <input
                type="checkbox"
                @change="update"
                :checked="modelValue"
                :class="{ error: error }"
            />
            <div class="description" v-html="desc"></div>
        </label>
    </div>
</template>

<style lang="scss" scoped>
.checkbox + .checkbox {
    margin-top: 24px;
}
.checkbox {
    padding: 0 24px;
}
label {
    cursor: pointer;
}
input {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    margin-right: 10px;
    appearance: none;
    cursor: pointer;

    background: #fefeff;
    box-shadow: 0px 232px 93px rgba(205, 207, 210, 0.01),
        0px 131px 78px rgba(205, 207, 210, 0.05),
        0px 58px 58px rgba(205, 207, 210, 0.09),
        0px 12px 30px rgba(180, 185, 204, 0.26),
        0px 0px 0px rgba(135, 135, 135, 0.42);
    border: 1px solid #000;

    &:checked {
        border-color: $main_brand_2;
        background-color: $main_brand_2;
        background-image: url('/assets/images/common/checkbox.svg');
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 60%;
    }
    &.error {
        border-color: $invalid;
    }
}
.description {
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0.03em;
    &::v-deep {
        a {
            color: inherit;
            font-weight: 600;
        }
    }
}

@media (max-width: $mobile) {
    .checkbox {
        padding: 0;
    }
}
</style>
