/**
 * Created by admin on 2019/6/25.
 */
$(document).ready(() => {
    var pageH,pageW;
    page= {
        init () {
            $('body').on("touchmove", (e) => {
                e.preventDefault();
            });
            
            $(window).resize(() => {
                page.resize();
            });
            page.resize();
            page.set.init();
            page.swiper.init();
        },
 
        resize() {
            pageH = $(window).height();
            pageW = $(window).width();
            $(".page").width(pageW).height(pageH);
            $('canvas').attr('width', pageW).attr('height', pageH)
        },
        set: {
            init() {
                page.set.setTime()
                setInterval(() => {
                    page.set.setTime()
                },1000)
            },
            setTime() {
                var nowTime = new Date().getTime()
                var firstTime = new Date('03/24/2019 19:58:00').getTime()
                var timeLength = nowTime - firstTime;
                var day = Math.floor(timeLength / (1000 * 60 * 60 * 24));
                var h = Math.floor((timeLength % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var min = Math.floor(((timeLength % (1000 * 60 * 60 * 24)) % (1000 * 60 * 60)) / (1000 * 60))
                var s = Math.floor((((timeLength % (1000 * 60 * 60 * 24)) % (1000 * 60 * 60)) % (1000 * 60)) / 1000);
                if (h <= 9) {
                    h = '0' + h;
                };
                if (min <= 9) {
                    min = '0' + min;
                };
                if (s <= 9) {
                    s = '0' + s;
                };
                var str = day + '天' + h + '时' + min + '分' + s + '秒'
                $("#anLi").text(str);
            }  
            
        },
        swiper: {
            init() {
                page.swiper.swiperSet()
            },
            swiperSet() {
                if (mySwiper == undefined) {
                    var mySwiper = new Swiper('#swiper-container', {
                        direction: 'vertical',
                        // speed: 1000,
                        // autoplayDisableOnInteraction: false,
                        loop: true,
                        autoplay: 2000,
                    });

                }
            }
        }
    };

    page.init();
});