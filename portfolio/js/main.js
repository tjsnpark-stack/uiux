$(document).ready(function(){

const myFullpage = new fullpage('#fullpage', {  /* html에서 페이지 전체를 감싸는 요소 */

		// navigation: true, /* 오른쪽에 각 페이지의 paging */
		// showActiveTooltip: true, /* 현재 활성화된 페이지의 툴팁에 특정 클래스 주기 */
		
		lockAnchors: false,
		anchors: ['link1', 'link2', 'link3', 'link4', 'link5', 'link6'], /* href="#link1" 이렇게 코딩하면 해당 링크명으로 이동 */

		autoScrolling:true, /* 한페이지씩 스크롤 */
		scrollHorizontally: true,

		verticalCentered: true, /* 컨텐츠 요소 위아래 가운데 */
		
		scrollOverflow: false, /* 컨텐츠가 넘쳐도 스크롤 금지 */

		afterLoad: function(origin, destination, direction, trigger){
			if(destination.index == 0){ /* index가 2면 슬라이드는 세번째 슬라이드입니다. index 수는 0/1/2/3 */
				console.log('1번째 슬라이드가 로딩 되었을때');
                $('.header').addClass('active')
			}
            if(destination.index == 1){ /* index가 2면 슬라이드는 세번째 슬라이드입니다. index 수는 0/1/2/3 */
				console.log('2번째 슬라이드가 로딩 되었을때');
                $('.header').removeClass('active')
                $('.header .gnb_menu a').removeClass('active')
                $('.header .gnb_menu .about01').addClass('active')
			}
            if(destination.index == 2){ /* index가 2면 슬라이드는 세번째 슬라이드입니다. index 수는 0/1/2/3 */
				console.log('3번째 슬라이드가 로딩 되었을때');
                $('.header').removeClass('active')
                $('.header .gnb_menu a').removeClass('active')
                $('.header .gnb_menu .resort01').addClass('active')
			}
            if(destination.index == 3){ /* index가 2면 슬라이드는 세번째 슬라이드입니다. index 수는 0/1/2/3 */
				console.log('4번째 슬라이드가 로딩 되었을때');
                $('.header').removeClass('active')
                $('.header .gnb_menu a').removeClass('active')
                $('.header .gnb_menu .camera01').addClass('active')
			}
            if(destination.index == 4){ /* index가 2면 슬라이드는 세번째 슬라이드입니다. index 수는 0/1/2/3 */
				console.log('5번째 슬라이드가 로딩 되었을때');
                $('.header').removeClass('active')
                $('.header .gnb_menu a').removeClass('active')
                $('.header .gnb_menu .wwf01').addClass('active')
			}
            if(destination.index == 5){ /* index가 2면 슬라이드는 세번째 슬라이드입니다. index 수는 0/1/2/3 */
				console.log('6번째 슬라이드가 로딩 되었을때');
                $('.header').removeClass('active')
                $('.header .gnb_menu a').removeClass('active')
                $('.header .gnb_menu .contact01').addClass('active')
			}
		},

		responsiveWidth: 640 /* fullpage를 적용시키지 않을 모바일 사이즈 */
	});

    
    
});