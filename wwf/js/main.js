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

    
    let ani_start_ratio = 0.3  // 움직일 요소가 브라우저 하단에서 몇%정도 올라왔을때 애니메이션을 시작할지 정하는 비율
    let ani_end_ratio = 0.6  // 종료 요소가 브라우저 하단에서 몇%정도 올라왔을때 애니메이션을 시작할지 정하는 비율
    let obj_area = $('.goal')
    let obj_wrap = $('.goal .photo_wrap')  // 움직일 요소를 감싸는 요소
    let obj_name = $('.goal .photo_wrap .photo_move')  // 실제 움직일 요소
    let obj_bg = $('.goal .photo_wrap .photo_move .photo_bg')  // 움직일 요소를 덮을 요소 (before/after로 대체 불가)
    let end_obj = $('.sub_cont')   // 애니메이션 종료 요소
    let end_class = 'scroll'  // 애니메이션 종료 요소에 애니메이션 종료 시 추가될 class명
    let brd_radius = 30

    let scrolling
    let win_h 
    let win_w
    let ani_start
    let ani_end
    let ani_ratio
    let obj_start_w
    let obj_start_h
    let obj_start_x
    let obj_start_y
    let obj_w
    let obj_h
    let obj_x
    let obj_y

    function scale_img() {
        scrolling = $(window).scrollTop()
        win_h = $(window).height()
        win_w = $(window).width()
        obj_start_w = obj_wrap.width()
        obj_start_h = obj_wrap.height()
        obj_start_x = obj_wrap.offset().left
        obj_start_y = obj_wrap.offset().top

        // 스크롤 구간 정의
        ani_start = obj_area.offset().top;
        // ani_start = obj_wrap.offset().top - win_h * (1 - ani_start_ratio)
        // ani_end = end_obj.offset().top - win_h * (1 - ani_end_ratio)
        // ani_end = end_obj.offset().top - win_h
        ani_end = ani_start + obj_area.height() - win_h;
        // console.log(ani_end_ratio)

        // 스크롤 비율 계산
        if (scrolling < ani_start) ani_ratio = 0
        else if (scrolling > ani_end) ani_ratio = 1
        else ani_ratio = (scrolling - ani_start) / ((ani_end  - (win_h * ani_end_ratio)) - ani_start)

        // 비율 제한
        ani_ratio = Math.max(0, Math.min(1, ani_ratio))

        let text_opacity;
        if (ani_ratio <= 0) {
            text_opacity = 1; // 시작 전에는 보임
        } else if (ani_ratio > 0 && ani_ratio < 0.9) {
            text_opacity = 1 - (ani_ratio * 1.5); // 확대되는 동안 빠르게 사라짐
        } else {
            text_opacity = (ani_ratio - 0.9) * 10; // 확대 완료 시(0.9~1.0) 다시 나타남
        }

        $(".goal .tit, .goal .more, .goal .list").css({
            'opacity': Math.max(0, Math.min(1, text_opacity)),
            // 완전히 사라졌을 때 클릭되지 않도록 처리
            'pointer-events': text_opacity < 0.1 ? 'none' : 'auto'
        });

        // 화면 끝 크기 계산
        let end_w = win_w
        let end_h = win_h

        // 화면 중앙으로 이동할 오프셋 계산 (요소 중심 기준)
        let end_x = (win_w - end_w) / 2 - obj_start_x
        let end_y = (win_h - end_h) / 2 - obj_start_y
        
        if(ani_start > scrolling){
            console.log('시작전')
            obj_w = obj_start_w
            obj_h = obj_start_h
            obj_x = 0
            obj_y = 0
            obj_area.removeClass(end_class)
        }else if(ani_end < scrolling){
            console.log('종료')
            obj_w = win_w
            obj_h = win_h
            obj_x = end_x
            obj_y = end_y * ani_ratio + ani_end
            obj_area.addClass(end_class)
        }else{
            console.log('진행중')
            // console.log(ani_ratio)
            if(ani_end - (win_h * ani_end_ratio) < scrolling){
                // console.log('완료')
                obj_area.addClass(end_class)
            }else{
                obj_area.removeClass(end_class)
            }
            obj_w = obj_start_w + (end_w - obj_start_w) * ani_ratio
            obj_h = obj_start_h + (end_h - obj_start_h) * ani_ratio
            obj_x = end_x * ani_ratio
            obj_y = end_y * ani_ratio + (scrolling - ani_start*(1-ani_ratio))
            obj_name.css('border-radius', brd_radius - (brd_radius * ani_ratio))
        }
        
        obj_name.css({
            transform: `translate(${obj_x}px, ${obj_y}px)`,
            width: obj_w + 'px',
            height: obj_h + 'px'
        })
        obj_bg.css('opacity', ani_ratio)
    }
    scale_img()
    $(window).scroll(function(){
        scale_img()
    })
    $(window).resize(function(){
        scale_img()
    })

    
    
});