$(function () {

    lego = {
        $window: $(window),
        $icon: $('.home svg'),
        $colorZone: $('.color_zone button'),
        $pop_btn: $('.show_pop'),
        $dim: $('.dim_layer'),
        $close: $('.pop_up>button'),
        init: function () {
            lego.pageLoading();
            lego.textAni();
            lego.colorChange();
            lego.showPop();
        },
        pageLoading: function () {
            setTimeout(function () {
                $('#loading').fadeOut();
                $('#wrap').fadeIn();
            }, 1500);
        },
        textAni: function () {
            //메인 텍스트 애니메이션
            setTimeout(() => {
                $('.home h1').css({ 'opacity': '1', 'left': '30%' });
            }, 2000);

            //스크롤아이콘
            setTimeout(() => {
                this.$icon.css({ opacity: 1 });
            }, 3000);
        },
        colorChange: function () {
            // iro컬러픽커 플러그인
            const colorPicker = new iro.ColorPicker("#picker", {
                width: 320,
                color: "#f00",
            });
            //레고 머리,상체,하체 색상 변경
            colorPicker.on(['color:init', 'color:change'], function (color) {
                $('.cls-4').css({ 'fill': color.hexString });
                $('.cls-3').css({ 'fill': color.hexString });
            });

        },
        showPop: function () {
            this.$pop_btn.on('click', function () {
                lego.$dim.fadeIn();
                lego.scrollDisable();
            });
            this.$close.on('click', function () {
                lego.$dim.fadeOut();
                lego.scrollEnable();
            });
        },
        scrollDisable: function () {
            $('body').css({ 'overflow-y': 'scroll' });
            $('#wrap').css({ 'position': 'fixed', 'top': -$(window).scrollTop(), 'left': 0, 'width': '100%' });
        },
        scrollEnable: function () {
            var scrollPosition = Math.abs($('#wrap').css('top').split('px')[0]);
            $('#wrap').removeAttr('style').attr('style', 'display: block;');
            $(window).scrollTop(scrollPosition);
            $('body').removeAttr('style');
        },
    };
    lego.init();


    //레고 스크롤 이벤트
    $(window).scroll(function () {

        scrollEv = {
            wT: $(window).scrollTop(),
            scrollSection: $('section.scrolling').height(),
            head: $('.scrolling .head'),
            upper_body: $('.scrolling .upper_body'),
            lower_body: $('.scrolling .lower_body'),
            intro: $('section.intro').offset().top,
            conwrap: $('.intro .contents_wrap'),
            init: function () {
                scrollEv.putTogether();
                scrollEv.introduce();
                scrollEv.clothArea();
            },
            putTogether: function () {
                if (this.wT < 1500) {
                    this.head.css({ 'opacity': '0', 'left': '0' });
                    this.upper_body.css({ 'opacity': '0', 'left': '0' });
                    this.lower_body.css({ 'opacity': '0', 'left': '0' });

                } else if (this.wT < 2500) {
                    this.head.css({ 'opacity': '1', 'left': '50%' });
                    $('.scrolling p').removeClass('on');
                } else if (this.wT < 3600) {
                    this.upper_body.css({ 'opacity': '1', 'left': '50%' });
                    $('.scrolling p').removeClass('on');
                } else if (this.wT < this.scrollSection) {
                    this.lower_body.css({ 'opacity': '1', 'left': '50%' });
                    if (this.wT > 4200) {
                        $('.scrolling p').addClass('on');
                    }
                } else {
                    this.head.css({ 'opacity': '0', 'left': '0' });
                    this.upper_body.css({ 'opacity': '0', 'left': '0' });
                    this.lower_body.css({ 'opacity': '0', 'left': '0' });
                    setTimeout(() => {
                        $('.scrolling p').removeClass('on');
                    }, 500);
                }
            },
            introduce: function () {
                if (this.wT > this.intro - 500) {
                    this.conwrap.animate({ width: '100%' }, 1000);
                    setTimeout(() => {
                        scrollEv.conwrap.find('img').css({ 'opacity': '1', 'transform': 'translateX(0px)' });
                        scrollEv.conwrap.find('p').css({ 'opacity': '1', 'transform': 'translateX(0px)' });
                    }, 1000);
                };
            },
            clothArea: function () {
                // console.log($('.cloth_change').offset().top); //7174.375
                if (this.wT > $('.cloth_change').offset().top - 500) {
                    setTimeout(() => {
                        $('.cloth_color_wrap > svg').css({ 'opacity': '1', 'transform': 'translateY(0px)' });
                    }, 300)
                    setTimeout(() => {
                        $('.cloth_color_wrap > .color_zone').css({ 'opacity': '1', 'transform': 'translateY(0px)' });
                    }, 800)
                }
            },
        };
        scrollEv.init();

    });

});