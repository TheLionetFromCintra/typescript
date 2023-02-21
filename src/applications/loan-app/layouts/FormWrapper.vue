<script setup lang="ts">
const emit = defineEmits<{
    (e: 'submit'): void
}>()

const submit = function () {
    emit('submit')
}
</script>

<template>
    <form
        @submit.prevent="submit"
        novalidate
        class="form d-flex flex-column align-items-center"
    >
        <div class="top">
            <slot name="inputs"></slot>
        </div>
        <slot name="default"></slot>
        <div class="btn d-flex justify-content-center">
            <base-button class="button" type="submit" mode="yellow"
                ><slot name="btn-label"></slot
            ></base-button>
        </div>
    </form>
</template>

<style scoped lang="scss">
.form {
    width: 100%;
    max-width: 624px;
    margin: 0 auto;
}
.top {
    width: 100%;
}
.btn {
    width: 100%;
    margin-top: 60px;

    button {
        padding: 12px;
        min-height: 46px;
        max-width: 231px;
        width: 100%;
    }
}

.contact-form {
    .btn {
        justify-content: flex-start;
        margin-top: 24px;
    }
}

.card-form {
    max-width: 100%;
    .btn {
        margin-top: 36px;
    }
}

.edit {
    .form {
        margin: 0;
        max-width: 640px;
    }
}

.unsub-form {
    margin: 0;
    max-width: 300px;

    .btn {
        margin-top: 40px;
        justify-content: flex-start;
        button {
            max-width: 179px;
        }
    }
}

.info-form {
    margin: 0;
    max-width: 540px;

    .btn {
        margin-top: 24px;
        justify-content: flex-start;
    }
}

@media (max-width: $mobile) {
    .btn,
    .contact-form .btn {
        margin-top: 36px;
    }

    .contact-form {
        .btn {
            justify-content: center;
        }
    }

    .edit {
        .form {
            margin: 0 auto;
        }
    }

    .unsub-form,
    .info-form {
        margin: 0 auto;
        max-width: 576px;

        .btn {
            justify-content: center;
            button {
                max-width: 231px;
            }
        }
    }
}
</style>
