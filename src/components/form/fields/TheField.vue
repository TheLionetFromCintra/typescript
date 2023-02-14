<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { PropType } from 'vue'

import setMask from '@/helpers/string/setMask'

type InputMode =
    | 'text'
    | 'numeric'
    | 'none'
    | 'tel'
    | 'url'
    | 'email'
    | 'decimal'
    | 'search'
    | undefined

const props = defineProps({
    modelValue: {
        type: String,
    },
    placeholder: {
        type: String,
        default: '',
    },
    label: {
        type: String,
        default: '',
    },
    type: {
        type: String as PropType<InputMode>,
        default: 'text',
    },
    mask: {
        type: String,
        default: '',
    },
    name: {
        type: String,
        default: '',
    },
    icon: {
        type: Boolean,
        default: false,
    },
    error: {
        type: String,
        default: '',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    autocomplete: {
        type: String,
        default: 'off',
    },
    autocapitalize: {
        type: String,
        default: 'off',
    },
    autocorrect: {
        type: String,
        default: 'off',
    },
    pattern: {
        type: [String, Boolean],
        default: false,
    },
    dontShowErrorMsg: {
        type: Boolean,
        default: false,
    },
    autoTab: {
        type: String,
        default: '',
    },
    valueWithoutMask: {
        type: Boolean,
        default: false,
    },
    maxLength: {
        type: [String, Number],
        default: '',
    },
    checkMaskPosition: {
        type: Function,
        default: function (oldVal: string, newVal: string, pos: number) {
            if (pos === undefined) return newVal.length

            if (oldVal === newVal) return pos

            const previousCharPos = pos - 1
            let offset = 0
            let i = pos

            while (
                oldVal[previousCharPos] !== newVal[previousCharPos + offset] &&
                i < newVal.length
            ) {
                offset++
                i++
            }

            return pos + offset
        },
    },
})

const emit = defineEmits<{
    (e: 'update:modelValue', val: string): void
    (e: 'focus'): void
    (e: 'blur'): void
}>()

const computedPattern = computed((): string | undefined => {
    return props.pattern ? '[0-9]*' : ''
})

const inputMode = computed((): InputMode => {
    if (props.mask) {
        return 'numeric'
    }

    return props.type
})

const field = ref('')
const isTabbed = ref(false)
const showIcon = ref(false)

const input = ref(null)

onMounted(() => {
    field.value = props.modelValue ?? ''
})

//VALIDATION
const SEVEN = '+# ### ### ## ##'
const EIGHT = '# ### ### ## ##'

const maxlength = ref(16)
const phoneMask = ref('+# ### ### ## ##')

const checkEmail = function (value: string) {
    if (!value) return true

    const mailRegExp = new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    return mailRegExp.test(value)
}

const checkPhone = function (value: string) {
    if (!value) return true

    const onlyNumbers = String(value).replace(/[^\d]/g, '')

    return onlyNumbers.length >= 11 && onlyNumbers[1] === '9'
}

const setPhoneMask = function (v: string) {
    switch (v[0]) {
        case undefined:
        case '7': {
            phoneMask.value = SEVEN
            maxlength.value = 16
            break
        }
        case '8': {
            phoneMask.value = EIGHT
            maxlength.value = 15
            break
        }
        case '+': {
            if (v[1] === undefined || v[1] === '7') {
                break
            } else if (v[1] === '8') {
                phoneMask.value = EIGHT
                maxlength.value = 15
                break
            } else v = '+7' + v.substr(1)
            break
        }
        default: {
            v = '+7' + v.substr(1)
            phoneMask.value = SEVEN
            maxlength.value = 16
        }
    }

    return (v = setMask(v, phoneMask.value))
}
//--VALIDATION

const inputEvent = function (e: Event) {
    let v = (e.target as HTMLInputElement).value

    if (
        (props.type === 'email' && checkEmail(v) && v !== '') ||
        (props.type === 'tel' && checkPhone(v) && v !== '')
    ) {
        showIcon.value = true
    } else {
        showIcon.value = false
    }

    if (props.type === 'tel') {
        v = v.replace(/[A-Za-zА-Яа-яЁё]/g, '')
        const newVal = setPhoneMask(v)

        field.value = newVal ?? ''
    } else {
        field.value = v
    }

    let caretPos = 0

    if (props.mask) {
        const beforeMask = v
        v = setMask(v, props.mask)
        caretPos = props.checkMaskPosition(beforeMask, v, caretPos)
    } else {
        caretPos = v.length
    }

    if (
        props.autoTab &&
        props.mask &&
        !isTabbed.value &&
        props.mask.length === v.length
    ) {
        const nextField = document.querySelector(
            `input[name="${props.autoTab}"]`
        )
        nextField && nextField.focus()
        isTabbed.value = true
    }

    if (props.mask && props.valueWithoutMask)
        v = String(v).replace(/[^\d]/g, '')

    props.modelValue !== v && emit('update:modelValue', v)
}

const focusEvent = function () {
    emit('focus')
}

const blurEvent = function (e: Event) {
    emit('blur')
}
</script>

<template>
    <div class="field">
        <label>
            <span class="title">{{ props.label }}</span>
            <div class="wrapper">
                <input
                    :class="{
                        success: icon && showIcon,
                        error: error,
                        field_error: error,
                    }"
                    :type="props.type"
                    ref="input"
                    :name="props.name"
                    :placeholder="props.placeholder"
                    :disabled="props.disabled"
                    :autocomplete="props.autocomplete"
                    :autocapitalize="props.autocapitalize"
                    :autocorrect="props.autocorrect"
                    :pattern="computedPattern"
                    :inputmode="inputMode"
                    :maxlength="maxlength"
                    @input="inputEvent"
                    @focus="focusEvent"
                    @blur="blurEvent"
                    v-model="field"
                />
                <div
                    class="icon img-wrapper d-flex align-items-center justify-content-center"
                    v-if="icon && showIcon"
                >
                    <img
                        src="/assets/images/common/input-success.svg"
                        alt="success icon"
                    />
                </div>
            </div>
        </label>
        <small class="error-msg" v-if="error && !dontShowErrorMsg">{{
            error
        }}</small>
    </div>
</template>

<style scoped lang="scss">
.field {
    width: 100%;
}
.title {
    display: inline-block;
    font-size: 14px;
    line-height: 16px;
    margin-bottom: 4px;
    color: #181818;
    font-weight: 600;

    @media (max-width: $mobile) {
        font-size: 12px;
    }
}
input {
    appearance: none;
    margin: 0;
    padding: 8px 0;
    width: 100%;

    border: none;
    border-bottom: 1px solid #000;

    font-family: inherit;
    font-size: 16px;
    line-height: 22px;

    outline: none;
    background: transparent;
    resize: none;
    font-weight: 600;
    color: $primary-grey-dark;

    &.success {
        padding-right: 32px;
    }
    &.error {
        border-color: $invalid;
        border-width: 2px;
    }

    &::placeholder {
        color: #8f8f8f;
        font-weight: 500;
    }

    @media (max-width: $mobile) {
        font-size: 14px;
        line-height: 18px;
    }
}

.error-msg {
    display: block;
    margin-top: 8px;
    font-size: 12px;
    line-height: 14px;
    color: $invalid;

    @media (max-width: $mobile) {
        margin-top: 4px;
    }
}

.icon {
    max-width: 16px;
    height: 16px;
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
}

.disabled {
    pointer-events: none;
    opacity: 0.6;
}
</style>
