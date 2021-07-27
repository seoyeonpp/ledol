$(function(){
    // 페이지 로딩화면
    setTimeout(function(){
        $('#loading').fadeOut();
        $('#wrap').fadeIn();
    },1000);
    

    // 레고 옷 변경
    $('.color_zone button').on('click',function(){
        if($(this).hasClass('pink')){
            $('.cls-4').css({'fill':'#e40988'});
            $('.cls-3').css({'fill':'#9b075d'});
        }else if($(this).hasClass('red')){
            $('.cls-4').css({'fill':'#e11a1b'});
            $('.cls-3').css({'fill':'#a51624'});
        }else if($(this).hasClass('sky')){
            $('.cls-4').css({'fill':'#74bffa'});
            $('.cls-3').css({'fill':'#5285ac'});
        }else if($(this).hasClass('purple')){
            $('.cls-4').css({'fill':'#91279d'});
            $('.cls-3').css({'fill':'#5f1767'});
        }else if($(this).hasClass('blue')){
            $('.cls-4').css({'fill':'#0279c3'});
            $('.cls-3').css({'fill':'#005b93'});
        }else if($(this).hasClass('yellowGreen')){
            $('.cls-4').css({'fill':'#99cb47'});
            $('.cls-3').css({'fill':'#779d39'});
        }else if($(this).hasClass('yellow')){
            $('.cls-4').css({'fill':'#e0cc3f'});
            $('.cls-3').css({'fill':'#ab9c30'});
        }else if($(this).hasClass('orange')){
            $('.cls-4').css({'fill':'#fb6d02'});
            $('.cls-3').css({'fill':'#b44e01'});
        };
    });

    //레고 슬라이드 이벤트
    $(window).scroll(function(){
        $('.scrolling img').each(function(){
            const elBottom = $(this).offset().top + $(this).outerHeight(),
                  winBottom = $(window).scrollTop() + $(window).height();

            if(elBottom<winBottom){
                $(this).animate({'opacity':'1','margin-bottom':'0'});

                console.log('ddd');
            }
        });
    });

});