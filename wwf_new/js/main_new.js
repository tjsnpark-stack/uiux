$(document).ready(function(){

    let device_status
    let window_w
    let mobile_size = 1024
    function device_chk(){
        window_w = $(window).width()
        if(window_w > mobile_size){
            device_status = 'pc'
        }else{
            device_status = 'mo'
        }
        console.log(device_status)
    }
    device_chk()
    $(window).resize(function(){
        device_chk()
    })
    $('.header .gnb .gnb_wrap ul.depth1 > li').on('mouseenter', function(){
        $('.header').addClass('menu_over')
        $('.header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
        $(this).addClass('over')
    })
    $('.header .gnb .gnb_wrap').on('mouseleave', function(){
        $('.header').removeClass('menu_over')
        $('.header .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
    })


    $('.header .gnb .gnb_wrap ul.depth1 > li > a').on('click', function(e){
		e.preventDefault();		/* a 태그의 href를 작동 시키지 않음 */
        if($(this).parent().hasClass('open') == true){
            $(this).parent().removeClass('open')
        }else{  
            $('.header .gnb .gnb_wrap ul.depth1 > li').removeClass('open')
            $(this).parent().addClass('open')
        }
	});
    $('.header .gnb .gnb_open').on('click', function(){
        $('.header').addClass('menu_open')
    })
    $('.header .gnb .gnb_wrap .gnb_close').on('click', function(){
        $('.header').removeClass('menu_open')
    })


    let visual_wrap = $('.visual')
    let visual_wrap_h
    let visual_item = $('.visual .area')
    let visual_item_leng = visual_item.length
    let scrolling
    let win_h = $(window).height()
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
            visual_wrap.attr('data-staus', 'before')
            visual_item.height(0)
            visual_item.eq(0).height('100%')

        }else if(scrolling > visual_end){
            // 끝난 후
            visual_wrap.attr('data-staus', 'after')
            visual_item.height('100%')

        }else{
            // 진행 중
            visual_wrap.attr('data-staus', 'ing')
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


    let obj_area = $('.goal_pc')
    let obj_wrap = $('.goal_pc .photo_wrap')  // 움직일 요소를 감싸는 요소
    let obj_name = $('.goal_pc .photo_wrap .photo_move')  // 실제 움직일 요소
    let end_class = 'scroll'  // 애니메이션 종료 요소에 애니메이션 종료 시 추가될 class명
    let brd_radius = 30
    let ani_percent = 1.5

    
    let supprt_scrolling
    let window_h 
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
    let rgb_obj = $('.goal_pc .txt .tit h2')
    let rgb_obj2 = $('.goal_pc')
    let rgb_obj3 = $('.goal_pc .txt .now a')

    function scale_img() {
            supprt_scrolling = $(window).scrollTop()
            win_w = $(window).width()
            window_h = $(window).height()
            ani_start = obj_area.offset().top
            ani_end = ani_start + obj_area.innerHeight() - window_h
            obj_start_x = obj_wrap.offset().left
            obj_start_y = obj_wrap.offset().top
            obj_start_w = obj_wrap.width()
            obj_start_h = obj_wrap.height()
            //console.log(obj_start_w, obj_start_h)
            //console.log(obj_area.height(), ani_start, ani_end , supprt_scrolling)
            if(supprt_scrolling < ani_start){
                //console.log('시작전')
                obj_area.removeClass(end_class)
                obj_name.removeAttr('style')
            }else if(supprt_scrolling > ani_end){
                //console.log('종료')
                obj_area.addClass(end_class)
                obj_x = -obj_start_x
                obj_y = ani_end - obj_start_y
                obj_name.css({
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    transform: `translate(${obj_x}px, ${obj_y}px)`,
                    width: win_w + 'px',
                    height: window_h + 'px',
                    borderRadius : 0
                })
            }else{
                if(supprt_scrolling < ani_start + (obj_area.innerHeight() / ani_percent) - window_h){
                    //console.log('진행중')
                    ani_ratio = (supprt_scrolling - ani_start) / ((ani_start + (obj_area.innerHeight() / ani_percent) - window_h) - ani_start)
                    ani_ratio = Math.max(0, Math.min(1, ani_ratio))
                    //console.log(ani_ratio)
                    obj_w = obj_start_w + (win_w - obj_start_w) * ani_ratio
                    obj_h = obj_start_h + (window_h - obj_start_h) * ani_ratio
                    obj_x = - obj_start_x * ani_ratio
                    obj_y = - obj_start_y * ani_ratio + (supprt_scrolling - ani_start*(1-ani_ratio))
                    obj_name.css({
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        transform: `translate(${obj_x}px, ${obj_y}px)`,
                        width: obj_w + 'px',
                        height: obj_h + 'px',
                        borderRadius : brd_radius - (brd_radius * ani_ratio)
                    })
                    rgb_now = rgb_start + (rgb_end - rgb_start) * ani_ratio
                    rgb_now2 = rgb_start2 + (rgb_end - rgb_start2) * ani_ratio
                    rgb_obj.css('color', 'rgb('+ rgb_now +', '+ rgb_now +', '+ rgb_now +')')
                    rgb_obj2.css('color', 'rgb('+ rgb_now2 +', '+ rgb_now2 +', '+ rgb_now2 +')')
                    rgb_obj3.css('border-color', 'rgb('+ rgb_now2 +', '+ rgb_now2 +', '+ rgb_now2 +')')
                    obj_area.removeClass(end_class)
                }else{
                    //console.log('고정')
                    obj_area.addClass(end_class)
                    obj_name.css({
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        transform: 'translate(0, 0)',
                        width: win_w + 'px',
                        height: window_h + 'px',
                        borderRadius : 0
                    })
                }

            }
    }
    scale_img()
    $(window).scroll(function(){
        scale_img()
    })
    $(window).resize(function(){
        scale_img()
    })

    const news_swiper = new Swiper('.news .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 1, /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: {

            499: {    /* 640px 이상일때 적용 */
                slidesPerView: 2,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 16,
            },
            768: {    /* 640px 이상일때 적용 */
                slidesPerView: 3,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 16,
            },
            1100: {    /* 640px 이상일때 적용 */
                slidesPerView: 4,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 16,
            },
        },
    });

    $('.newsletter .subscript .regist .email .email_domain .domain_open').on('click', function(){
        //console.log('체크')
        if($('.newsletter .subscript .regist .email .email_domain').hasClass('open') == false){
            $('.newsletter .subscript .regist .email .email_domain').addClass('open')
        }else{
            $('.newsletter .subscript .regist .email .email_domain').removeClass('open')
        }
    })
    $('.newsletter .subscript .regist .email .email_domain .domain_wrap ul li').on('click', function(){
        $('.newsletter .subscript .regist .email .email_domain .domain_open').text($(this).attr('data-value'))
        $('.newsletter .subscript .regist .email .email_domain').removeClass('open')
    })

})//document.ready(맨끝)