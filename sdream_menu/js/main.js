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

        
   /****************************
   pc버전 메뉴     
   .header .gnb .gnb_wrap ul.depth1 > li 한테 마우스를 올리면 over클래스 추가
   --> 마우스를 오버한 단 1개의 li에만 over클래스가 추가됨

   .header에 menu_over가 추가됨 -> 메뉴에 마우스 올렸을때
    *********************************** */
   let Win_w //브라우저의 넓이
   let device_status // 지금 pc인지 mobile 저장
   let mobile_size =1024 // 1024부터 모바일

    function device_chk(){
        Win_w = $(window).width()
        // console.log(Win_w)
        if(Win_w > mobile_size){
            device_status = 'pc'
        }else{
            device_status = 'mobile'
        }
        console.log(device_status)
    }
    device_chk() //문서가 로딩되었을때 단 41번 실행
    $(window).resize(function(){//브라우저가 resize될때마다 1번씩 실행
        device_chk()
    })

    $('.header .gnb .gnb_wrap ul.depth1 > li').on('mouseenter', function(){
        if(device_status == 'pc'){
            $(this).addClass('over')
            $('.header').addClass('menu_over')
        }
    })
    $('.header .gnb .gnb_wrap ul.depth1 > li').on('mouseleave', function(){
        if(device_status == 'pc'){
            $(this).removeClass('over')
        }
    })
    $('.header .gnb_bg').on('mouseenter',function(){
        $('.header').removeClass('menu_over')
    })
    $('.header .gnb .gnb_wrap ul.depth1 > li').on('click',function(){
        if(device_status == 'mobile'){
            $('.header .gnb .gnb_wrap ul.depth1 > li').removeClass('open')
            $(this).addClass('open')
        }
    })
    $('.header .gnb .gnb_open').on('click',function(){
        if(device_status == 'mobile'){
            $('.header').addClass('menu_open')
        }
    })
    $('.header .gnb .gnb_wrap .gnb_close ').on('click',function(){
        if(device_status == 'mobile'){
            $('.header').removeClass('menu_open')
        }
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

    /************************************************
     * top버튼을 클릭하면 상단으로(맨위로) 스크롤
     * **********************************************/
    $('.footer .top').on('click', function(){
        console.log('클릭')
        // $(Window).scrollTop(0)
        $('html,body').animate({
            scrollTop : 0
        },500)
    })

})//$(document).ready