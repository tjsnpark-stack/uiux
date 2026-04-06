$(document).ready(function(){

/********************.header.menu_over****************** */

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
    $('.header .header_sub .gnb .gnb_wrap ul.depth1 > li').on('mouseenter', function(){
        $('.header').addClass('menu_over')
        $('.header .header_sub .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
        $(this).addClass('over')
    })
    $('.header .header_sub .gnb .gnb_wrap').on('mouseleave', function(){
        $('.header').removeClass('menu_over')
        $('.header .header_sub .gnb .gnb_wrap ul.depth1 > li').removeClass('over')
    })


    $('.header .header_sub .gnb .gnb_wrap ul.depth1 > li > a').on('click', function(e){
		e.preventDefault();		/* a 태그의 href를 작동 시키지 않음 */
        if($(this).parent().hasClass('open') == true){
            $(this).parent().removeClass('open')
        }else{  
            $('.header .header_sub .gnb .gnb_wrap ul.depth1 > li').removeClass('open')
            $(this).parent().addClass('open')
        }
	});
    $('.header .header_sub .gnb .gnb_open').on('click', function(){
        $('.header').addClass('menu_open')
    })
    $('.header .header_sub .gnb .gnb_wrap .gnb_close').on('click', function(){
        $('.header').removeClass('menu_open')
    })




/****************lang 오버했을때*************** */

    $('.header .header_top .lang .language_open').on('click', function(){
        $('.lang').toggleClass('open')
    })

/******************************visual 팝업*************************************** */

	const visual_swiper = new Swiper('.visual .swiper', { /* 팝업을 감싼는 요소의 class명 */

        autoplay: {  /* 팝업 자동 실행 */
            delay: 5000,
            disableOnInteraction: true,
        },

        effect: "fade", /* fade 효과 */

        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
    });


    /*********************** experience 하나씩 넘기는 팝업********************** */

    const place_swiper = new Swiper('.experience .swiper', { /* 팝업을 감싼는 요소의 class명 */

        slidesPerView: 1, /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            499: {    /* 640px 이상일때 적용 */
                slidesPerView: 2,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 16,
                loop: true,
                centeredSlides: true, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
            },
            769: {    /* 640px 이상일때 적용 */
                slidesPerView: 3,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 24,
            }
        }

    });



    const swiper = new Swiper('.offer .swiper', { /* 팝업을 감싼는 요소의 class명 */

        slidesPerView: 1, /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            499: {    /* 640px 이상일때 적용 */
                slidesPerView: 2,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 16,
            },
            769: {    /* 640px 이상일때 적용 */
                slidesPerView: 3,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 24,
            },
        },

    });


    var stay_swiper = new Swiper(".stay .swiper_paging", {
      spaceBetween: 24,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });
    var stay_swiper_paging = new Swiper(".stay .swiper", {
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: stay_swiper,
      },
    });

    let dining_select
    $('.dining .tab_list ul li').on('click', function(){
        dining_select = $(this).attr('data-name')
		// console.log(dining_select)
        $('.dining .tab_list ul li').removeClass('active')
        $(this).addClass('active')
        $('.dining .tab_conts .tab_item').removeClass('active')
        $('.dining .tab_conts .tab_item.' + dining_select).addClass('active')
	});
    
    
    const snbScroll = function() {
                    const $menu_wrap = $(".dining .tab_list ul");  /* 선택자를 잘 입력해야함 */
                    const $menu_li = $(".dining .tab_list ul li");  
                    function scrollToElement($element) {
                        const containerWidth = $menu_wrap.width();
                        const itemWidth = $element.outerWidth(true);
                        const totalItemsWidth = $menu_wrap[0].scrollWidth;
                        const newScrollPosition = ($element.index() === 0) ? 0 :
                            ($element.index() === $menu_li.length - 1) ? totalItemsWidth - containerWidth :
                            $element.position().left + $menu_wrap.scrollLeft() - (containerWidth - itemWidth) / 2;
                        $menu_wrap.animate({
                            scrollLeft: newScrollPosition
                        }, 500);
                    }
                    const $activeItem = $menu_wrap.find(".active");
                    if ($activeItem.length) {
                        scrollToElement($activeItem);
                    }
                } 
                snbScroll();   /* 함수의 실행 */

    
    
});