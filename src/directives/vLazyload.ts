export const vLazyload = {
    mounted: (el: any) => {
        const loadImg = (entries: any, observer: any) => {
            entries.forEach((entry: any) => {
                if (entry.isIntersecting) {
                    entry.target.src = entry.target.dataset.src

                    entry.target.addEventListener('load', function () {
                        el.closest('.lazy-img').classList.remove('lazy-img')
                    })

                    observer.unobserve(entry.target)
                }
            })
        }
        const imgObserver = new IntersectionObserver(loadImg, {
            root: null,
            threshold: 0,
            rootMargin: '0px 0px -200px 0px',
        })
        imgObserver.observe(el)
    },
}
