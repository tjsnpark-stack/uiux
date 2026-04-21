$(document).ready(function () {
    // GSAP 플러그인 등록
    gsap.registerPlugin(ScrollTrigger);

    // 1. [Visual 섹션] 슬라이드가 위로 덮으며 올라오는 효과
    const visualSections = gsap.utils.toArray(".visual > div[class]:not(.scroll_down)");

    if (visualSections.length > 0) {
        const visualTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".visual",
                start: "top top",
                end: "+=400%", // 섹션 수에 맞춰 조절
                pin: true,
                scrub: true,
                invalidateOnRefresh: true
            }
        });

        visualSections.forEach((section, i) => {
            if (i > 0) {
                visualTl.to(section, {
                    clipPath: "inset(0% 0% 0% 0%)",
                    ease: "none"
                });
            }
        });
    }


    const swiper_paging = new Swiper('.activity .txt .swiper_paging', {
        effect: "fade",
        allowTouchMove: false,
        slidesPerView: 1,
    });

    const activity_swiper = new Swiper('.activity .list .swiper', {
        slidesPerView: 'auto',
        spaceBetween: 0,
        centeredSlides: true,
        loop: true,
        // breakpoints: {
        //     640: {
        //         slidesPerView: 2,
        //         spaceBetween: 20,
        //     },
        // },
    });

    activity_swiper.on('slideChange', () => {
        swiper_paging.slideToLoop(activity_swiper.realIndex);
    });

    

    
});