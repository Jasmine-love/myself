console.log('%c技术支持：建站人http://www.jianzhanren.cn/', 'color: #ff6666');

$(function() {

    if ($('.lazy').length > 0) {
        $("img.lazy").lazyload({ effect: "fadeIn" });
    }
    if ($(window).scrollTop() > 0) {
        $('.tabTurn').addClass('top');
    }
    $('.nav-ctrl').click(function() {
        var p = $('.header');
        $('.headTop .icon-search').removeClass('active');
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('.header').removeClass('active active-c');
            // p.find(".animated").removeClass('fadeInRight');
            $('.header').removeClass('fixed');
        } else {
            $(this).addClass('active');
            $('.header').removeClass('active-s');
            $('.header').addClass('active active-c');
            $('.header').addClass('fixed');
            // p.find(".animated").addClass('fadeInRight');
        }
    });

    $('.headTop .icon-search').click(function() {
        var p = $('.header');
        $('.nav-ctrl').removeClass('active');
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('.header').removeClass('active active-s');
            $('.header').removeClass('fixed');
        } else {
            $(this).addClass('active');
            $('.header').removeClass('active-c');
            $('.header').addClass('active active-s');
            $('.header').addClass('fixed');
        }
    });

    $('.head').click(function() {
        var p = $('.header');
        $('.nav-ctrl').removeClass('active');
        $('.header').removeClass('active');
        p.find(".animated").removeClass('fadeInRight');
    });
    $('.headMain').click(function(e) {
        e.stopPropagation();
    });
    // 导航滚轮效果
    // $('body').on('mousewheel', function(event, delta, deltaX, deltaY) {
    //     var sT = $(window).scrollTop();
    //     var hT = h() * 0.8;
    //     var hT = $('.header').height() * 2;
    //     if ($('.joinModal')) {
    //         var m = $('.joinModal');
    //         if (m.css('display') == 'block') {
    //             return false;
    //         }
    //     }
    //     if (sT > hT) {
    //         $('.header').addClass('on');
    //         if (deltaY > 0) {
    //             $('.header').removeClass('open');
    //         } else {
    //             $('.header').addClass('open');
    //         }
    //     } else {
    //         $('.header').removeClass('on');
    //     }
    // });

    var t = 0,
        p = 0;
    $(window).scroll(function(event) {
        p = $(this).scrollTop();
        res = p - t;
        if ($(window).scrollTop() <= 10) {
            $('.header').removeClass('open');
            return false;
        }
        $('.header').addClass('on');
        if (res < 0) {
            $('.header').removeClass('open');
            t = p;
        } else if (res >= 0) {
            $('.header').addClass('open');
            t = p;
        }
    });


    // 查看更多
    $('.clickP ul li').each(function() {
        var p = $(this).parents('.clickP');
        var y = parseInt(p.find('.clickMore').attr('data-num'));
        if ($(this).index() < y) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
    var spNum = 1;
    $('.clickP').on('click', '.clickMore', function() {
        var p = $(this).parents('.clickP');
        var y = parseInt($(this).attr('data-num'));
        var len = p.find('.click-content>li').length;
        spNum++;
        var num = y * spNum;
        if (num >= len) {
            $(this).html('没有更多了');
        }
        p.find('.click-content li').each(function() {
            if ($(this).index() < num) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    // 模态框
    $('body').on('click', '.modal-backdrop', function() {
        $(this).parents('.modal').fadeOut();
        move();
    });
    $('body').on('click', '[data-dismiss]', function() {
        var el;
        $(this).attr('data-dismiss') == '' ? $(this).parents('.modal').fadeOut() : $(this).parents('#' + $(this).attr('data-dismiss')).fadeOut();
        move();
    });
    $('[data-toggle="modal"]').on('click', function(e) {
        var el;
        $(this).attr('data-toggle') == 'modal' ? el = $(this).attr('data-target') : " ";
        $('#' + el).fadeIn();
        // hide(e);
    });

    // 页签
    $('.tabs').on('click', 'li', function() {
        var tab = $(this).parents('.tab');
        tab.find('.tab-content .item').hide();
        tab.find('.tab-content .item').eq($(this).index()).stop().fadeIn();
        var tabs = $(this).parents('.tabs');
        tabs.find('li').each(function() {
            $(this).css('background-image', 'url("img/tittle/' + $(this).attr('data-img') + '")');
        });
        $(this).css('background-image', 'url("img/tittle/' + $(this).attr('data-hover') + '")');

        $(this).addClass('on').siblings().removeClass('on');
    });

    // 了解更多
    $('.case .topPic .item').each(function(){
        if($(this).index()>=1){
            $(this).hide();
        }
    });

    var topNum=[];
    $('.case .contentBody .content').each(function(index, el) {
        topNum.push('1')
    });
    $('.case .topPic .more').click(function(){
        var index=$(this).parents('.content').index();
        var picNum=topNum[index];
        var p = $(this).parents('.topPic');
        var y = 1;
        var len = p.find('.item').length;
        picNum++;
        topNum[index]=picNum;
        var num = y * picNum;
        if (num >= len) {
            $(this).find('a').html('<i></i>没有更多了');
        }
        console.log(len)
        p.find('.item').each(function() {
            if ($(this).index() < num) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    //案例
    if(!isPc()){
        $.each($('.tabTurn .swiper-slide .tabChoose'),function(i,item){
            $(this).width($(window).width())
            $(this).css('left',"-"+$(this).parent().offset().left+"px");
        })
        $.each($('.case .tabChoose li'),function(i,item){
            $(this).children('a').height(parseInt($(window).width()/3*.91))
        })
    }
    Pic();
    $('.caseBody .tabChoose').on('click', 'li', function() {
        $(this).addClass('active').siblings().removeClass('active');
        Pic()
        $('.tabTurn .swiper-slide.active li').eq($(this).index()).addClass('active').siblings().removeClass('active');
        $('.contentBody .content').eq($(this).index()).show().siblings().hide();
    })
    $('.case .tabTurn .tabChoose').on('click', 'li', function() {
        sessionStorage.setItem('id', $(this).index());
    })
    $('.server .serverTab').on('click', 'li', function() {
        sessionStorage.setItem('id', $(this).index());
    })
    $('.footMid .mainLt div').on('click', 'li', function() {
        sessionStorage.setItem('id', '0');
    })
    $('.case .tabTurn .swiper-slide').on({
        'mouseover': function() {
            if (isPc()) {
                $(this).find('.tabChoose').stop().slideDown();
            }
        },
        'mouseleave': function() {
            if (isPc()) {
                $(this).find('.tabChoose').stop().slideUp();
            }
        },
        'click': function() {
            if (!isPc()) {
                if ($(this).hasClass('choose')) {
                    $('body').css('overflow', 'auto');
                    $('.masking').hide()
                    $(this).removeClass('choose').find('.tabChoose').stop().slideUp().siblings('div').find('.tabChoose').stop().slideUp();
                } else {
                    $('body').css('overflow', 'hidden');
                    $('.masking').show()
                    $(this).addClass('choose');
                    $(this).find('.tabChoose').stop().slideDown();
                    $(this).siblings('div').find('.tabChoose').stop().slideUp();
                    $(this).siblings('div').removeClass('choose')
                }
            }
        }
    })
    $('.masking').click(function() {
        $('.case .tabTurn .swiper-slide').removeClass('choose')
        $('.case .tabTurn .tabChoose').hide()
        $(this).hide()
        $('body').css('overflow', 'auto');
    })
    // if (!isPc()) {
        var windowTop = 0;
        $(window).scroll(function() {
            var sc = $(window).scrollTop();
            var header = $('header').css('height');
            if (sc > windowTop) {
                $('.tabTurn').css({ 'top': 0 });
                windowTop = sc;
            } else if (sc <= 0) {
                $('.tabTurn').css({ 'top': header });
            } else {
                $('.tabTurn').css({ 'top': header });
                windowTop = sc;
            }
        })
    // }
});

// 返回顶部
goTop();
isShow();
$(window).scroll(function(event) {
    isShow();
});

function goTop() {
    $('.goTop').click(function() {
        $('body').animate({ 'scrollTop': '0' }, 500);
    });
}

function isShow() {
    if ($(window).scrollTop() > 300) {
        $('.goTop').fadeIn();
    } else {
        $('.goTop').fadeOut();
    }
}

// 屏幕高度
wH();
$(window).resize(function(event) {
    wH();
});

function wH() {
    $('.wHeight').each(function() {
        $(this).height(h());
    });
}

function h() {
    return $(window).height();
}


// 判断是否是PC端
function isPc() {
    if ($(window).innerWidth() <= 767) {
        return false;
    } else {
        return true;
    }
}

// 动态添加动效
addAnimated();
$(window).scroll(function(event) {
    addAnimated();
});

function addAnimated() {
    $('[data-animated]').each(function() {
        if ($(this).offset().top - $(window).scrollTop() <= $(window).height() * 0.99) {
            if (isPc()) {
                $(this).addClass($(this).attr('data-animated')).addClass('animateOn');
            } else {
                $(this).removeClass($(this).attr('data-animated')).removeClass('.animateOn');
                $(this).addClass('fadeInUp').addClass('animateOn');
            }
        }
    });

    $('.imgList li').each(function() {
        if ($(this).offset().top - $(window).scrollTop() <= $(window).height() * 0.6 && $(this).offset().top > $(window).scrollTop() - $(this).height()) {
            $(this).addClass('animateLi');
        } else {
            $(this).removeClass('animateLi');
        }
    });
    $('.InNews .bigNews').each(function() {
        if ($(this).offset().top - $(window).scrollTop() <= $(window).height() * 0.6 && $(this).offset().top > $(window).scrollTop() - $(this).height()) {
            $(this).addClass('animateLi');
        } else {
            $(this).removeClass('animateLi');
        }
    });
    $('.case .contentBody .item').each(function() {
        if ($(this).offset().top - $(window).scrollTop() <= $(window).height() * 0.6 && $(this).offset().top > $(window).scrollTop() - $(this).height()) {
            $(this).addClass('animateLi');
        } else {
            $(this).removeClass('animateLi');
        }
    });
}

function isPc() {
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
        return false;
    } else {
        return true;
    }
}

// loading
var load = '<div class="loading-modal" onclick="hideLoading()"> <div class="loadEffect"> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> </div> </div>';

function showLoading() {
    $('body').append(load);
    $('.loading-modal').stop().fadeIn();
}

function hideLoading() {
    $('.loading-modal').stop().fadeOut(function() {
        $(this).remove();
    });
}

function storage() {
    var a = sessionStorage.getItem('id');
    $('.caseBody .tabChoose li').eq(a).addClass('active').siblings().removeClass('active');
    $('.caseBody .contentBody .content').eq(a).show().siblings().hide();
    // sessionStorage.setItem('id', '0');
    return a;
}
//判断qq浏览器
function qq(){
    var a=window.navigator.userAgent.toLowerCase();
    if(a.match(/mqqbrowser/i) == 'mqqbrowser'){
        return true;
    }else{
        return false;
    }
}
//默认图片
function Pic(){
    $.each($('.tabChoose li'),function(i,item){
        if($(this).hasClass('active')){
            $(this).children('a').css('backgroundImage',"url("+$(this).children('a').data('img2')+")")
        }else{
            $(this).children('a').css('backgroundImage',"url("+$(this).children('a').data('img1')+")")
        }
    })
}
