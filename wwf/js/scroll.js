$(document).ready(function () {

    
    let obj_area = $('.support') 
    let obj_wrap = $('.support .photo_wrap')
    let obj_name = $('.support .photo_wrap .photo_move')
    let end_class = 'scroll'
    let brd_radius = 30
    let ani_percent = 1.5

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
    let rgb_start = 29
    let rgb_end = 255
    let rgb_now
    let rgb_now2
    let rgb_start2 = 61
    let rgb_obj = $('.support .txt .tit h2')
    let rgb_obj2 = $('.support')
    let rgb_obj3 = $('.support .txt .now a')

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
        if(scrolling < ani_start){
            console.log('시작전')
            obj_name.removeAttr('style')
        }else if(scrolling > ani_end){
            console.log('종료')
            obj_x = -obj_start_x
            obj_y = ani_end - obj_start_y
            obj_name.css({
                position: 'absolute',
                left: 0,
                top: 0,
                transform: `translate(${obj_x}px, ${obj_y}px)`,
                width: win_w + 'px',
                height: win_h + 'px',
                borderRadius : 0
            })
        }else{
            if(scrolling < ani_start + (obj_area.innerHeight() / ani_percent) - win_h){
                console.log('진행중')
                ani_ratio = (scrolling - ani_start) / ((ani_start + (obj_area.innerHeight() / ani_percent) - win_h) - ani_start)
                ani_ratio = Math.max(0, Math.min(1, ani_ratio))
                console.log(ani_ratio)
                obj_w = obj_start_w + (win_w - obj_start_w) * ani_ratio
                obj_h = obj_start_h + (win_h - obj_start_h) * ani_ratio
                obj_x = - obj_start_x * ani_ratio
                obj_y = - obj_start_y * ani_ratio + (scrolling - ani_start*(1-ani_ratio))
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
                console.log('고정')
                obj_name.css({
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    transform: 'translate(0, 0)',
                    width: win_w + 'px',
                    height: win_h + 'px',
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

});