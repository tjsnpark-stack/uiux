$(document).ready(function(){
    const myFullpage = new fullpage('#fullpage', {  /* html에서 페이지 전체를 감싸는 요소 */

		navigation: false, /* 오른쪽에 각 페이지의 paging */
		navigationPosition: 'left', /* 위치 */
		navigationTooltips: ['Main', '나무심기', '숲 활동', '숲이야기'], /* 툴팁 */
		showActiveTooltip: true, /* 현재 활성화된 페이지의 툴팁에 특정 클래스 주기 */
		
		lockAnchors: false,
		anchors: ['main', 'tree', 'biz', 'story', 'footer'], /* href="#link1" 이렇게 코딩하면 해당 링크명으로 이동 */

		autoScrolling:true, /* 한페이지씩 스크롤 */
		scrollHorizontally: true,

		verticalCentered: true, /* 컨텐츠 요소 위아래 가운데 */
		
		scrollOverflow: false, /* 컨텐츠가 넘쳐도 스크롤 금지 */

		afterLoad: function(origin, destination, direction, trigger){
			if(destination.index == 0){ /* index가 2면 슬라이드는 세번째 슬라이드입니다. index 수는 0/1/2/3 */
				//console.log('1번째 슬라이드가 로딩 되었을때');
				$('.sec_nav').attr('data-bg', '')
				$('.header').attr('data-bg', '')
			}else if(destination.index == 1){
				//console.log('2번째 슬라이드가 로딩 되었을때');
				$('.sec_nav').attr('data-bg', 'white')
				$('.header').attr('data-bg', 'white')
				$('.tree .counter').counterUp();
			}else if(destination.index == 2){
				//console.log('3번째 슬라이드가 로딩 되었을때');
				$('.sec_nav').attr('data-bg', 'blue')
				$('.header').attr('data-bg', 'mo')
			}else if(destination.index == 3){
				//console.log('4번째 슬라이드가 로딩 되었을때');
				$('.sec_nav').attr('data-bg', 'white')
				$('.header').attr('data-bg', 'white')
			}else if(destination.index == 4){
				//console.log('5번째 슬라이드가 로딩 되었을때');
				$('.sec_nav').attr('data-bg', 'none')
				$('.header').attr('data-bg', 'none')
			}
		},

		responsiveWidth: 769, /* fullpage를 적용시키지 않을 모바일 사이즈 */
        responsiveHeight: 500 /* 브라우저 높이가 500보다 낮으면 fullpage 안함 */
	});

	/* 퀵메뉴 열고 닫기 */
	$('.quick .open').on('click', function(){
		$(this).hide()
		$('.quick .close').show()
		$('.quick .quick_wrap').slideDown()
	})
	$('.quick .close').on('click', function(){
		$(this).hide()
		$('.quick .open').show()
		$('.quick .quick_wrap').slideUp()
	})

	/* visual의 swiper 시작 */
	const visual_swiper = new Swiper('.visual .swiper', { /* 팝업을 감싼는 요소의 class명 */
		autoplay: {  /* 팝업 자동 실행 */
			delay: 2500,
			disableOnInteraction: true,
		},
		effect: "fade", /* fade 효과 */
		loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
	});
	/* visual의 swiper 끝 */

	
	const story_swiper = new Swiper('.story .swiper', { /* 팝업을 감싼는 요소의 class명 */
		slidesPerView: 'auto', /* 한번에 보일 팝업의 수 - 모바일 제일 작은 사이즈일때 */
		spaceBetween: 16, /* 팝업과 팝업 사이 여백 */
		breakpoints: {
			450: {    /* 640px 이상일때 적용 */
				slidesPerView: 2,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
				spaceBetween: 16,
			},
			768: {    /* 640px 이상일때 적용 */
				slidesPerView: 3,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
				spaceBetween: 24,
			},
			1280: {    /* 640px 이상일때 적용 */
				slidesPerView: 4,    /*    'auto'   라고 쓰면 css에서 적용한 넓이값이 적용됨 */
				spaceBetween: 24,
			},
		},
		//centeredSlides: true, /* 팝업을 화면에 가운데 정렬(가운데 1번이 옴) */
		loop: true,  /* 마지막 팝업에서 첫번째 팝업으로 자연스럽게 넘기기 */
	});
	

})//$(document).ready