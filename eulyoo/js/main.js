$(document).ready(function(){
    let visual_bar_w
    const visual_swiper = new Swiper('.visual  .swiper', { /* 팝업을 감싼는 요소의 class명 */

        autoplay: {  /* 팝업 자동 실행 */
            delay: 5000,
            disableOnInteraction: false,
        },

        effect: "fade", /* fade 효과 */
        loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        pagination: {  /* 몇개의 팝업이 있는지 보여주는 동그라미 */
            el: '.swiper-pagination', /* 해당 요소의 class명 */
            clickable: true,  /* 클릭하면 해당 팝업으로 이동할 것인지 값 */
            type: 'fraction',  /* type fraction을 주면 paging이 숫자로 표시됨 */
            renderBullet: function (index, className) {   /* paging에 특정 코드 넣기 */
                return '<span class="' + className + '">' + (index + 1) + "</span>";
            },
        },
        navigation: {  /* 이전, 다음 버튼 */
            nextEl: '.visual  .ctrl_right  .next',  /* 다음 버튼의 클래스명 */
            prevEl: '.visual  .ctrl_right  .prev',  
        },
        on: {
            autoplayTimeLeft(s, time, progress) {
                /*  1 -> 0   
                   0% ~ 100%  */
                visual_bar_w = 100 - (100 * progress)
                $('.visual .ctrl_left .bar span').width(visual_bar_w + '%')
            }
        }
    });
    
    $('.visual  .ctrl_left  .stop').on('click', function(){
        //console.log('정지!!!!')
        visual_swiper.autoplay.stop();  /* 일시정지 기능 */
        $(this).hide()
        $('.visual  .ctrl_left  .play').show()
    })
    $('.visual  .ctrl_left  .play').on('click', function(){
        //console.log('재생!!!!')
        visual_swiper.autoplay.start();  /* 재생 기능 */
        $(this).hide()
        $('.visual  .ctrl_left  .stop').show()
    })


    /************************************************************************************** 
     * 1차 지금 현재 넓이가 pc버전인지 mobile 버전인지 구분 (메뉴만 1025px이상은 pc 1024px이하는 mobile)
     *     ==> 브라우저의 넓이값을 구해서 1024보다 큰지 작은지 구분
     *     ==> 첫번째 로딩됐을때 계산, 그리고 브라우저가 리사이즈 될때마다 브라우저 넓이 체크
     *         동일한 계산을 두번해야 하는 경우는 함수로 정의한 다음에 호출해서 사용하는 방식을 씀
     * 
     * 
     * 모바일 메뉴의 규칙 
     * 1. 닫힌 메뉴를 클릭하면 열림
     * 2. 오직 하나의 메뉴만 열림
     * 3. 열린 메뉴를 클릭하면 닫힘
     * pc에서는 1차메뉴를 클릭하면 첫번째 하위메뉴로 이동 (href에 링크 주소가 있음)
     * 근데 모바일에서는 1차메뉴를 클릭하면 하위메뉴를 열어줘야 합니다. (링크 X)
     * ==> 그럼 href에 입력된 값은???????
     * 반드시 1차메뉴의 a를 선택자로 해서 href 이벤트를 정지시켜야함
     * ====> 이것때문에 귀찮아서 1차메뉴 링크를 pc부터 아예 안하기도 하고 pc/mobile 메뉴를 
     *       나눠서 코딩하거나 pc도 클릭하면 하위메뉴가 나오게 함...
    *************************************************************************************** */
    let win_w //브라우저 넓이
    let mobile_size = 1024 //모바일 사이즈 시작?(경계?)
    let device_status //pc, mobile 두개의 값 저장

    function device_chk(){ //함수의 정의
        win_w = $(window).width()
        if(win_w > mobile_size){
            device_status = 'pc'
        }else{
            device_status = 'mo'
        }
        console.log(device_status)
    }
    device_chk()//함수의 실행 -- 문서가 로딩되고 1번만
    $(window).resize(function(){
        device_chk()//함수의 실행 -- 브라우저가 리사이즈 될때마다 1번씩
    })

    
    $('.header .gnb .gnb_wrap ul.depth1 > li').on('mouseenter   focusin', function(){
        if(device_status == 'pc'){
            $(this).addClass('over')
            $('.header').addClass('menu_over')
        }
    })
    $('.header .gnb .gnb_wrap ul.depth1 > li').on('mouseleave  focusout', function(){
        if(device_status == 'pc'){
            $(this).removeClass('over')
        }
    })
    $('.header .gnb .gnb_bg').on('mouseenter', function(){
        if(device_status == 'pc'){
            $('.header').removeClass('menu_over')
        }
    })
    $('.header').on('mouseleave', function(){
        if(device_status == 'pc'){
            $('.header').removeClass('menu_over')
        }
    })
    $('.header .util .search .search_open').on('focusin', function(){
        if(device_status == 'pc'){
            $('.header').removeClass('menu_over')
        }
    })
    $('.header .gnb .gnb_wrap ul.depth1 > li > a').on('click', function(e){
        if(device_status == 'mo'){
            e.preventDefault() //href 링크 이동을 막는 명령
            //내가 클릭한 a를 감싸는 li에 open 클래스가 있는지 확인
            let gnb_open = $(this).parents('li').hasClass('open')
            //console.log(gnb_open)
            if(gnb_open == true){//열려있는 경우
                $(this).parents('li').removeClass('open')
                $(this).next().slideUp(300, function(){
                    //slideUp 끝나고 나서 그 다음에 실행 
                    // --- 이 함수 안에서는 효과를 주는 $(this).next() -> $(this)가 됨
                    // slideup으로 메뉴를 접으면 html에 style="display:none"이 쓰여서
                    // 다른 스타일이 적용되지 않음 그래서 아예 지워버림
                    $(this).removeAttr('style')
                })
            }else{//닫힌 경우
                $('.header .gnb .gnb_wrap ul.depth1 > li').removeClass('open')
                $('.header .gnb .gnb_wrap ul.depth1 > li > ul.depth2').slideUp(300, function(){
                    //slideUp 끝나고 나서 그 다음에 실행
                    $(this).removeAttr('style')
                })
                $(this).parents('li').addClass('open')
                $(this).next().slideDown()
            }
        }
    })
    
    $('.header .gnb .gnb_open').on('click', function(){
        $('.header').addClass('menu_open')
    })
    $('.header .gnb .gnb_wrap .gnb_close').on('click', function(){
        $('.header').removeClass('menu_open')
    })


    /************************************
     * 브라우저가 스크롤 되면 header에 fixed 클래스를 추가
     * 단, 다시 맨 위로 올라가면 fixed 클래스를 삭제
     * 처음에 로딩되었을때와 브라우저가 스크롤 될때마다 체크 
    *********************************************/
    let scrolling //현재 스크롤값 

    function scroll_chk(){ //함수의 정의
        scrolling = $(window).scrollTop()
        //console.log(scrolling)
        if(scrolling > 0){
            $('.header').addClass('fixed')
        }else{
            $('.header').removeClass('fixed')
        }
    }

    scroll_chk() //함수의 호출 - 문서가 로딩되고 단1번만 실행
    $(window).scroll(function(){
        scroll_chk() //함수의 호출 - 브라우저가 스크롤 될때마다
    })

    //book swiper 팝업
    const book_swiper = new Swiper('.book .swiper', { /* 팝업을 감싼는 요소의 class명 */
        slidesPerView: 'auto', /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
        spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
        breakpoints: {
            769: {    /* 640px 이상일때 적용 */
                slidesPerView: 'auto',    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
                spaceBetween: 24,
            },
        },
        //centeredSlides: true, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
        // loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
        navigation: {
            nextEl: '.book .next',
            prevEl: '.book .prev',
        },
    });

})//document.ready