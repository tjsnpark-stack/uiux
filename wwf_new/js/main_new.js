$(document).ready(function(){
    let visual_wrap = $('.visual')
    let visual_wrap_h
    let visual_item = $('.visual .area')
    let visual_item_leng = visual_item.length
    let scrolling
    let win_h
    let visual_start// 시작점
    let visual_end //종료점
    let visual_one_step //햐나의 애니메이션 길이
    let visual_step //현재 몇번째 이미지가 슬라이드 되고 있는지
    let visual_percent

    function visual_scroll(){
        scrolling = $(window).scrollTop()
        win_h = $(window).height()
        visual_wrap_h = visual_wrap.outerHeight()
        visual_start = visual_wrap.offset().top
        visual_end = visual_start + visual_wrap_h - win_h

        // 전체 구간을 (아이템 개수 - 1)로 나눔
        visual_one_step = (visual_end - visual_start) / (visual_item_leng - 1)

        if(scrolling < visual_start){
            // 시작 전
            visual_item.height(0)
            visual_item.eq(0).height('100%')

        }else if(scrolling > visual_end){
            // 끝난 후
            visual_item.height('100%')

        }else{
            // 진행 중
            let current = scrolling - visual_start

            // 현재 스텝 (0부터 시작)
            let step = Math.floor(current / visual_one_step) + 1

            // 현재 스텝 내 진행률 (0 ~ 1)
            let progress = (current % visual_one_step) / visual_one_step

            for(let i = 0; i < visual_item_leng; i++){
                if(i < step){
                    visual_item.eq(i).height('100%')
                }else if(i === step){
                    visual_item.eq(i).height((progress * 100) + '%')
                }else{
                    visual_item.eq(i).height(0)
                }
            }
        }
    }

    visual_scroll()
    $(window).scroll(function(){
        visual_scroll()
    })
    $(window).resize(function(){
        visual_scroll()
    })

    
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


    let obj_area = $('.goal')
    let obj_wrap = $('.goal .photo_wrap')  // 움직일 요소를 감싸는 요소
    let obj_name = $('.goal .photo_wrap .photo_move')  // 실제 움직일 요소
    let end_class = 'scroll'  // 애니메이션 종료 요소에 애니메이션 종료 시 추가될 class명
    let brd_radius = 30
    let ani_percent = 1.5

    
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
    let rgb_start = 29
    let rgb_end = 255
    let rgb_now
    let rgb_now2
    let rgb_start2 = 61
    let rgb_obj = $('.goal .txt h2')
    let rgb_obj2 = $('.goal')
    let rgb_obj3 = $('.goal .txt .more a')

    function scale_img() {
        scrolling = $(window).scrollTop()
        win_w = $(window).width()
        win_h = $(window).height()
        ani_start = obj_area.offset().top
        ani_end = ani_start + obj_area.innerHeight() - win_h
        obj_start_x = obj_wrap.offset().left
        obj_start_y = obj_wrap.offset().top
        obj_start_w = obj_wrap.width()
        obj_start_h = obj_wrap.height()
        //console.log(obj_start_w, obj_start_h)
        //console.log(obj_area.height(), ani_start, ani_end , scrolling)
        if (scrolling < ani_start) {
            //console.log('시작전')
            obj_name.removeAttr('style')
            obj_area.removeClass(end_class)
        } else if (scrolling > ani_end) {
            //console.log('종료')
            obj_x = -obj_start_x
            obj_y = ani_end - obj_start_y
            obj_name.css({
                position: 'absolute',
                left: 0,
                top: 0,
                transform: `translate(${obj_x}px, ${obj_y}px)`,
                width: win_w + 'px',
                height: win_h + 'px',
                borderRadius: 0
            })
            obj_area.removeClass(end_class)
        } else {
            if (scrolling < ani_start + (obj_area.innerHeight() / ani_percent) - win_h) {
                //console.log('진행중')
                ani_ratio = (scrolling - ani_start) / ((ani_start + (obj_area.innerHeight() / ani_percent) - win_h) - ani_start)
                ani_ratio = Math.max(0, Math.min(1, ani_ratio))
                console.log(ani_ratio)
                obj_w = obj_start_w + (win_w - obj_start_w) * ani_ratio
                obj_h = obj_start_h + (win_h - obj_start_h) * ani_ratio
                obj_x = - obj_start_x * ani_ratio
                obj_y = - obj_start_y * ani_ratio + (scrolling - ani_start * (1 - ani_ratio))
                obj_name.css({
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    transform: `translate(${obj_x}px, ${obj_y}px)`,
                    width: obj_w + 'px',
                    height: obj_h + 'px',
                    borderRadius: brd_radius - (brd_radius * ani_ratio)
                })
                rgb_now = rgb_start + (rgb_end - rgb_start) * ani_ratio
                rgb_now2 = rgb_start2 + (rgb_end - rgb_start2) * ani_ratio
                rgb_obj.css('color', 'rgb(' + rgb_now + ', ' + rgb_now + ', ' + rgb_now + ')')
                rgb_obj2.css('color', 'rgb(' + rgb_now2 + ', ' + rgb_now2 + ', ' + rgb_now2 + ')')
                rgb_obj3.css('border-color', 'rgb(' + rgb_now2 + ', ' + rgb_now2 + ', ' + rgb_now2 + ')')
                obj_area.removeClass(end_class)
            } else {
                //console.log('고정')
                obj_name.css({
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    transform: 'translate(0, 0)',
                    width: win_w + 'px',
                    height: win_h + 'px',
                    borderRadius: 0
                })
                obj_area.addClass(end_class)
            }

        }
    }
    scale_img()
    $(window).scroll(function () {
        scale_img()
    })
    $(window).resize(function () {
        scale_img()
    })

    const news_swiper = new Swiper('.news .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 1, /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: {

            376: {    /* 640px 이상일때 적용 */
                slidesPerView: 2,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 16,
            },
            880: {    /* 640px 이상일때 적용 */
                slidesPerView: 3,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 16,
            },
            1025: {    /* 640px 이상일때 적용 */
                slidesPerView: 4,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 16,
            },
        },
    });

})//document.ready(맨끝)