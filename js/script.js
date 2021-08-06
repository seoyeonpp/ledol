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
            lego.drag();
            lego.colorChange();
            lego.showPop();
            lego.pinBtn();
        },
        pageLoading: function () {
            $('#wrap').css({ 'height': '100vh', 'overflow-y': 'hidden' });
            setTimeout(function () {
                $('#loading').fadeOut();
                $('#wrap').css({ 'opacity': '1', 'visibility': 'visible', 'height': 'auto', 'overflow-y': 'auto' });
            }, 1000);
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
        drag: function () {
            // 마우스로 드래그 후 좌표가 맞는곳에 넣으면 complete! 텍스트 fadeIn
            let isRevert = true;

            $('.scrolling img').draggable({
                'scroll': false,
                containment: 'parent',
                cancel: ".outline",
                snap: ".outline",
                snapMode: "inner",
                snapTolerance: 50,
                stack: ".draggable",
                opacity: 0.7,
                revert: function (event, ui) {
                    // droppable 아닌곳에 들어갔을때
                    if (event == false) {
                        isRevert = false;
                        return true;
                    } else {
                        //droppable 인곳에 들어갔을때
                        isRevert = true;
                    };
                },
            });

            $('.scrolling .outline_head').droppable({
                accept: ".head",
                drop: function (e, ui) {
                    ui.draggable.position({
                        my: "center",
                        at: "center",
                        of: $(this),
                        using: function (pos) {
                            $(this).animate(pos, 200, 'linear');
                        }
                    })
                    $('.scrolling .complete').fadeIn();
                    setTimeout(() => {
                        $('.scrolling .complete').fadeOut();
                    }, 1000);
                },
            });
            $('.scrolling .outline_upper').droppable({
                accept: ".upper_body",
                drop: function (e, ui) {
                    ui.draggable.position({
                        my: "center",
                        at: "center",
                        of: $(this),
                        using: function (pos) {
                            $(this).animate(pos, 200, 'linear');
                        }
                    })
                    $('.scrolling .complete').fadeIn();
                    setTimeout(() => {
                        $('.scrolling .complete').fadeOut();
                    }, 1000);
                },
            });
            $('.scrolling .outline_lower').droppable({
                accept: ".lower_body",
                drop: function (e, ui) {
                    ui.draggable.position({
                        my: "center",
                        at: "center",
                        of: $(this),
                        using: function (pos) {
                            $(this).animate(pos, 200, 'linear');
                        }
                    })
                    $('.scrolling .complete').fadeIn();
                    setTimeout(() => {
                        $('.scrolling .complete').fadeOut();
                    }, 1000);
                },
            });

        },
        colorChange: function () {
            // iro컬러픽커 플러그인
            const colorPicker = new iro.ColorPicker("#picker", {
                width: 320,
                color: "#f00",
            });
            //레고 머리,상체,하체 색상 변경
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
            $('#wrap').removeAttr('style').attr('style', 'opacity: 1; visibility: visible; height: auto; overflow-y: auto;');
            $(window).scrollTop(scrollPosition);
            $('body').removeAttr('style');
        },
        pinBtn: function () {
            let oldOffset = $('.hero').offset().left + $('.hero').outerWidth(),
                oldCountry = 'hero';

            // 핀 클릭 시 실행
            $('.pin_zone button').on('click', function () {
                const thisIndex = $(this).index(),
                    slideBox = $('.info_zone .country').eq(thisIndex).find('.slider'),
                    topArr = [41.7917, 29.7778, 41.2083, 34.4167, 29.6944, 33, 31.6389, 39, 42.5],
                    rightArr = [23.7361, 23.5556, 21.8194, 12.8472, 48.9722, 47.8889, 50.3611, 18, 17.5],
                    shipArr = ['hero', 'japan', 'taiwan', 'philippine', 'vietnam'];
                let currentOffset = $(this).offset().left + $(this).outerWidth(),
                    country = $(this).attr('data-country');

                //클릭한 위치에 따라 이미지 반전
                if (oldOffset > currentOffset) {
                    $('.hero').css({ 'transform': 'rotateY(180deg)' });
                } else if (oldOffset < currentOffset) {
                    $('.hero').css({ 'transform': 'rotateY(0deg)' });
                };
                oldOffset = currentOffset;
                currentOffset = $(this).offset().left + $(this).outerWidth();

                //배로 이동인지 비행기로 이동인지 확인
                if ($.inArray(oldCountry, shipArr) != -1 && $.inArray(country, shipArr) != -1) {//배열에 있는값일때 index순서 반환, 없을때 -1 반환
                    $('.hero').attr('src', 'image/ship.png');
                } else {
                    $('.hero').attr('src', 'image/plane.png');
                };
                $('.hero').animate({ 'top': topArr[thisIndex] + 'vw', 'right': rightArr[thisIndex] + 'vw' }, 1000);

                oldCountry = country;
                country = $(this).attr('data-country');

                // 클릭 후 핀 사라지고 레돌이 출현
                setTimeout(() => {
                    $(this).fadeOut();
                    $('.hero').attr('src', 'image/map_move.png');
                }, 1000);

                //1초후 팝업 실행
                setTimeout(() => {
                    $('.info_zone .country').eq(thisIndex).fadeIn().siblings().fadeOut();
                    $('.pin_zone button').eq(thisIndex).siblings().css({ 'pointer-events': 'none' });
                    if ($('.info_zone .country').hasClass(country) == true) {
                        lego.slider(slideBox);
                    };
                }, 1000);
            });

            //닫기버튼 클릭 시 실행
            $('.info_zone .country button.close').on('click', function () {
                $('.info_zone .country').fadeOut();
                setTimeout(() => {
                    $('.pin_zone button').attr('style', "display: block;").css({ 'pointer-events': 'auto' });
                }, 200);
            });
        },
        slider: function (current) {
            $(current).not('.slick-initialized').slick({
                dots: false,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
            });
        },
    };
    lego.init();


    //레고 스크롤 이벤트
    $(window).scroll(function () {

        scrollEv = {
            wT: $(window).scrollTop(),
            init: function () {
                this.onScroll();
            },
            onScroll: function () {
                if (this.wT < $('.intro').offset().top - 200) {
                    this.putTogether();
                } else if (this.wT < $('.cloth_change').offset().top - 200) {
                    this.introduce();
                } else if (this.wT < $('.pick_country').offset().top - 200) {
                    this.clothArea();
                } else if (this.wT < $('footer').offset().top - 600) {
                    this.map();
                } else {
                    this.footer();
                };
            },
            putTogether: function () {
                if (this.wT < $('.scrolling').offset().top - 501) {
                    $('.scrolling p:not(:last-child)').css({ 'opacity': '0', 'transform': 'translateX(-200px)' });
                    $('.scrolling h2').css({ 'opacity': '0', 'transform': 'translateY(-100px)' });
                } else if (this.wT > $('.scrolling').offset().top - 500) {
                    $('.scrolling h2').css({ 'opacity': '1', 'transform': 'translateY(0px)' });
                    setTimeout(() => {
                        $('.scrolling p:not(:last-child)').css({ 'opacity': '1', 'transform': 'translateX(0px)' });
                    }, 500);
                };

            },
            introduce: function () {
                if (this.wT > $('.intro').offset().top - 500) {
                    $('.intro h2').css({ 'opacity': '1', 'transform': 'translateY(0px)' });
                    $('.intro .contents_wrap').animate({ width: '100%' }, 1000);
                    setTimeout(() => {
                        $('.intro .contents_wrap').find('img').css({ 'opacity': '1', 'transform': 'translateX(0px)' });
                        $('.intro .contents_wrap').find('p').css({ 'opacity': '1', 'transform': 'translateX(0px)' });
                    }, 1000);
                };
            },
            clothArea: function () {
                if (this.wT > $('.cloth_change').offset().top - 500) {
                    $('.cloth_change h2').css({ 'opacity': '1', 'transform': 'translateY(0px)' });
                    setTimeout(() => {
                        $('.cloth_color_wrap > svg').css({ 'opacity': '1', 'transform': 'translateY(0px)' });
                        $('.cloth_color_wrap .click').css({ 'opacity': '1', 'transform': 'translateY(0px)' });
                    }, 300)
                    setTimeout(() => {
                        $('.cloth_color_wrap > .color_zone').css({ 'opacity': '1', 'transform': 'translateY(0px)' });
                    }, 600)
                    setTimeout(() => {
                        $('.advice_memo').addClass('memo');
                    }, 1200)
                };
            },
            map: function () {
                if (this.wT < $('.pick_country').offset().top - 101) {
                    $('.pick_country .map img').css({ 'transform': 'rotateX(10deg)' });
                    $('.hero').stop().fadeOut();
                    $('.pin_zone').stop().fadeOut();
                } else if (this.wT > $('.pick_country').offset().top - 100) {
                    $('.pick_country .map img').css({ 'transform': 'rotateX(0deg)' });
                    setTimeout(() => {
                        $('.hero').fadeIn();
                        $('.pin_zone').fadeIn();
                    }, 1000);
                };
            },
            footer: function () {
                if (this.wT < $('footer').offset().top - 500) {
                    $('footer').css({ 'height': '500px' });
                    $('footer h3').css({ 'opacity': '0', 'transform': 'translateY(100px)' });
                    $('footer p').css({ 'opacity': '0', 'transform': 'translateY(100px)' });
                } else if (this.wT >= $('footer').offset().top - 500) {
                    $('footer').css({ 'height': '100vh' });
                    setTimeout(() => {
                        $('footer h3').css({ 'opacity': '1', 'transform': 'translateY(0px)' });
                    }, 1000);
                    setTimeout(() => {
                        $('footer p').css({ 'opacity': '1', 'transform': 'translateY(0px)' });
                    }, 1200);
                };
            },
        };
        scrollEv.init();

    });

});