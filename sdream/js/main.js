$(document).ready(function(){
    const visual_swiper = new Swiper('.visual  .swiper', { /* 팝업을 감싼는 요소의 class명 */
        autoplay: {  /* 팝업 자동 실행 */
            delay: 5000,
            disableOnInteraction: true,
        },
        //effect: "fade", /* fade 효과 */
        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
    });//visual_swiper


    /*******************************
     * header에 마우스를 올리면(오버하면)  over 클래스 추가  
                마우스를 내리면(아웃하면) over 클래스 삭제
        브라우저의 스크롤을 내리면 header에 fixed 클래스 추가
        브라우저를 다시 맨 위로 스크롤하면 fixed 클래스 삭제
     ************************************ */
    $('.header').on('mouseenter', function(){
        // console.log('마우스 올림')
        $(this).addClass('over')
    })
    $('.header').on('mouseleave', function(){
        // console.log('마우스 올렸다 내림')
        $(this).removeClass('over')
    })

    let scrolling //브라우저가 스크롤 된 값

    function header_fixed(){
        scrolling = $(window).scrollTop()
        console.log(scrolling)
        if(scrolling > 0){
            // console.log('0보다 큼')
            $('header').addClass('fixed')
        }else{
            // console.log('0이거나 0보다 작다') 
            $('header').removeClass('fixed')
        }
    }
    //맨처음 html이 로딩된 이후 단 한번실행
    header_fixed() 
    $(window).scroll(function(){ //브라우저가 실행될때마다 실행
        header_fixed()
    })

    /************************************************************
     웹진 swiper
     **********************************************************/
     const webzine_swiper = new Swiper('.webzine .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 'auto', /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            // 541: {    /* 768-540 사이 */
            //     slidesPerView: 2,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
            //     spaceBetween: 16,
            // },
            769: {    /* 769px 이상일때 적용 */
                slidesPerView: 3,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 24,
            },
        },
        //centeredSlides: true, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
        loop: false,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        
        navigation: {
            nextEl: '.webzine .ctrl_wrap .next',
            prevEl: '.webzine .ctrl_wrap .prev',
        },
    });


})//$(document).ready