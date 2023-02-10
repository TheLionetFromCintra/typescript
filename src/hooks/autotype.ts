import { ref } from 'vue'

export default function useAutotype() {
    const typeValue = ref('')
    const typeStatus = ref(false)

    const typeArray = [
        'заполните анкету',
        'выберите компанию',
        'получите предложение',
    ]
    const typeArrayIndex = ref(0)
    const charIndex = ref(0)

    const typingSpeed = 80
    const erasingSpeed = 50
    const newTextDelay = 1000

    const typeText = function () {
        if (charIndex.value < typeArray[typeArrayIndex.value].length) {
            if (!typeStatus.value) typeStatus.value = true

            typeValue.value += typeArray[typeArrayIndex.value].charAt(
                charIndex.value
            )
            charIndex.value += 1

            setTimeout(typeText, typingSpeed)
        } else {
            typeStatus.value = false
            setTimeout(eraseText, newTextDelay)
        }
    }

    const eraseText = function () {
        if (charIndex.value > 0) {
            if (!typeStatus.value) typeStatus.value = true

            typeValue.value = typeArray[typeArrayIndex.value].substring(
                0,
                charIndex.value - 1
            )
            charIndex.value -= 1
            setTimeout(eraseText, erasingSpeed)
        } else {
            typeStatus.value = false
            typeArrayIndex.value += 1
            if (typeArrayIndex.value >= typeArray.length)
                typeArrayIndex.value = 0

            setTimeout(typeText, typingSpeed + 1000)
        }
    }

    setTimeout(typeText, newTextDelay + 200)

    return { typeValue, typeStatus }
}
