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
            lego.pinBtn();
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
            console.log($('#lego g'));
            $('#lego g').on('click', function () {
                $(this).addClass('change').siblings().removeClass('change');
            });
            colorPicker.on(['color:init', 'color:change'], function (color) {
                if ($('#head').hasClass('change')) {
                    $('.cls-1').css({ 'fill': color.hexString });
                } else if ($('#upperbody').hasClass('change')) {
                    $('.cls-4').css({ 'fill': color.hexString });
                    $('.cls-3').css({ 'fill': color.hexString });
                } else if ($('#lowerbody').hasClass('change')) {
                    $('.cls-5').css({ 'fill': color.hexString });

                };
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
            const scrollPosition = Math.abs($('#wrap').css('top').split('px')[0]);
            $('#wrap').removeAttr('style').attr('style', 'display: block;');
            $(window).scrollTop(scrollPosition);
            $('body').removeAttr('style');
        },
        pinBtn: function () {
            $('.pin_zone button').on('click', function () {
                const thisIndex = $(this).index(),
                    topArr = [703, 550, 714, 588, 510, 556, 538, 674, 729],
                    rightArr = [507, 480, 463, 307, 950, 920, 970, 403, 393];
                console.log(thisIndex);

                $('.hero').fadeOut();
                if (thisIndex == 3 || thisIndex == 7) {
                    $('.ship').fadeIn().animate({ 'top': topArr[thisIndex] + 'px', 'right': rightArr[thisIndex] + 'px' }, 2000);
                } else {
                    $('.plane').fadeIn().animate({ 'top': topArr[thisIndex] + 'px', 'right': rightArr[thisIndex] + 'px' }, 2000);
                };
                setTimeout(() => {
                    $('.info_zone div').eq(thisIndex).addClass('show').siblings().removeClass('show');
                }, 2000);
            });
            $('.info_zone div button').on('click', function () {
                $('.ship').fadeOut();
                $('.plane').fadeOut();
                $('.info_zone div').removeClass('show');
            });
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
                scrollEv.map();
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
                        $('.cloth_color_wrap .click').css({ 'opacity': '1', 'transform': 'translateY(0px)' });
                    }, 300)
                    setTimeout(() => {
                        $('.cloth_color_wrap > .color_zone').css({ 'opacity': '1', 'transform': 'translateY(0px)' });
                    }, 800)
                }
            },
            map: function () {
                // console.log($('.pick_country').offset().top); //8401.5625
                if (this.wT > $('.pick_country').offset().top - 100) {
                    $('.pick_country .map img').css({ 'transform': 'translateZ(-20px) translate(0px, 60px)' });
                    setTimeout(() => {
                        $('.hero').fadeIn();
                        $('.pin_zone').fadeIn();
                    }, 4500)
                };
            },
        };
        scrollEv.init();

    });

});