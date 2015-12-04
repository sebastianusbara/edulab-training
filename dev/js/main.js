/*! [PROJECT_NAME] | Suitmedia */

;(function ( window, document, undefined ) {

    var path = {
        css: myPrefix + 'assets/css/',
        js : myPrefix + 'assets/js/vendor/'
    };

    var assets = {
        _jquery_cdn     : 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js',
        _jquery_local   : path.js + 'jquery.min.js',
        _jquery_migrate : 'http://code.jquery.com/jquery-migrate-1.2.1.min.js',
        _fastclick      : path.js + 'fastclick.min.js',
        _slickslider    : path.js + 'slick.min.js'
    };

    var Site = {

        init: function () {
            Site.fastClick();
            Site.enableActiveStateMobile();
            Site.WPViewportFix();
            Site.accordionSlide();
            Site.toggleButton();
            Site.toggleSubmenu();
            Site.toggleSidebar();
            Site.minatTabs();
            Site.buttonForm();
            Site.slickSlider();

            window.Site = Site;
        },

        fastClick: function () {
            Modernizr.load({
                load    : assets._fastclick,
                complete: function () {
                    FastClick.attach(document.body);
                }
            });
        },

        enableActiveStateMobile: function () {
            if ( document.addEventListener ) {
                document.addEventListener('touchstart', function () {}, true);
            }
        },

        WPViewportFix: function () {
            if ( navigator.userAgent.match(/IEMobile\/10\.0/) ) {
                var style   = document.createElement("style"),
                fix     = document.createTextNode("@-ms-viewport{width:auto!important}");

                style.appendChild(fix);
                document.getElementsByTagName('head')[0].appendChild(style);
            }
        },

        accordionSlide: function () {
            var $accordionIcon       = $('.fa');
            var $accordionHeader     = $('.accordion__header');
            

            $accordionHeader.on ( 'click', '.accordion__header__trigger' , function() {
                $(this).parents('.accordion').find('.accordion__content').slideToggle();
                $(this).find($accordionIcon).toggleClass('fa-chevron-down fa-chevron-up');
            });
        }, 

        toggleButton: function () {
            var $responsiveButton  = $('.nav__button');
            
            $responsiveButton.on ( 'click', function() {
                $(this).parents('.nav').find('.nav__menu').toggleClass('show hidden');
            });
        },

        toggleSubmenu: function () {
            var $Menu = $('.nav__menu');
            
            $('.nav__menu').on ( 'click','.nav__menu-list--dropdown a', function() {
                $(this).siblings('.nav__submenu').toggleClass('show2 hidden');
                $(this).find('.fa-mob').toggleClass('fa-chevron-down fa-chevron-up');
            });
        },

        toggleSidebar: function () {
            var $toggleButton  = $('.main__toggle');
            
            $toggleButton.on ( 'click', function() {
                $(this).parents('.main-content').siblings('.nav').toggleClass('show hidden');
                $(this).parents('.main-content').toggleClass('full compact');
            });
        },

        minatTabs: function () {
            var $toggleTalent = $('.talent-tab');
            var $toggleFinger = $('.fingerprint-tab');
            
            $toggleTalent.on ( 'click', function() {
                $(this).parents('.post__tabs').siblings('.fingerprint').removeClass('show');
                $(this).parents('.post__tabs').siblings('.fingerprint').addClass('hidden');
                $(this).parents('.post__tabs').siblings('.talent').removeClass('hidden');
                $(this).parents('.post__tabs').siblings('.talent').addClass('show');
                $(this).parents('.post__tabs').find('.post__tabs__active').removeClass('post__tabs__active');
                $(this).parent().addClass('post__tabs__active');
            });

            $toggleFinger.on ( 'click', function() {
                $(this).parents('.post__tabs').siblings('.talent').removeClass('show');
                $(this).parents('.post__tabs').siblings('.talent').addClass('hidden');
                $(this).parents('.post__tabs').siblings('.fingerprint').removeClass('hidden');
                $(this).parents('.post__tabs').siblings('.fingerprint').addClass('show');
                $(this).parents('.post__tabs').find('.post__tabs__active').removeClass('post__tabs__active');
                $(this).parent().addClass('post__tabs__active');
            });
        },

        buttonForm: function () {
            var $buttonForm     = $('.register .btn');
            var $registerForm   = $('.register');

                $registerForm.on ( 'click', '.btn', function() {
                $(this).toggleClass('btn--active btn--deactive');
            });
        },

        slickSlider: function () {
            Modernizr.load({
                load    : assets._slickslider,
                complete: function () {
                    $('.main__slider').slick(
                        {
                          dots: true,
                          infinite: true,
                          prevArrow: $('.prev'),
                          nextArrow: $('.next'),
                          adaptiveHeight: false
                        }
                    );
                    $('.belajar__slider').slick(
                        {
                          dots: false,
                          infinite: true,
                          prevArrow: $('.prev'),
                          nextArrow: $('.next'),
                          adaptiveHeight: false
                        }
                    );
                }
            });
        }
    };

    var checkJquery = function () {
        Modernizr.load([
        {
            test    : window.jQuery,
            nope    : assets._jquery_local,
            complete: Site.init
        }
        ]);
    };

    Modernizr.load({
        load    : assets._jquery_cdn,
        complete: checkJquery
    });

})( window, document );
