import { ref, watch, onUnmounted, onMounted } from 'vue'

export default function useMobile() {
    const windowWidth = ref(0)
    const isMobile = ref(false)
    const isMenu = ref(false)

    const handleResize = function () {
        windowWidth.value = window.innerWidth
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    watch(windowWidth, (newVal) => {
        if (newVal <= 768) {
            isMobile.value = true
        } else {
            isMobile.value = false
        }

        if (newVal <= 1200) {
            isMenu.value = true
        } else {
            isMenu.value = false
        }
    })

    onMounted(() => {
        if (windowWidth.value <= 768) isMobile.value = true
        if (windowWidth.value <= 1200) isMenu.value = true
    })

    onUnmounted(() => {
        window.removeEventListener('resize', handleResize)
    })

    return { isMobile, isMenu }
}
