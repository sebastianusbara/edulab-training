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
        _slickslider    : path.js + 'slick.min.js',
        _moment         : path.js + 'moment.min.js',
        _jqueryui       : path.js + 'jquery-ui.custom.min.js',
        _fullcalendar   : path.js + 'fullcalendar.min.js',
        _lightbox       : path.js + 'lightbox.min.js',
        _googlemap      : 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBiUgjizNVXDx-GO15JFYPf9hnZQssrpTI&callback=Site.initMap',
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
            Site.slickSlider();
            Site.fullCalendar();
            Site.boxBack();
            Site.formValidation();
            Site.lightBox();
            Site.minatTabs();
            Site.kontakMap();

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
                $(this).parents('.accordion').find('.accordion__content').toggleClass('show hidden');
                $(this).find($accordionIcon).toggleClass('fa-chevron-down fa-chevron-up');
                $(this).toggleClass('btn--close btn--open');
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
            var $toggleMinat = $('.post__tabs li');
            var $postTabs = $('.post__tabs');

            $toggleMinat.on ( 'click', function() {
                $(this).parents($postTabs).find('.post__tabs__active').removeClass('post__tabs__active off-click');
                $(this).addClass('post__tabs__active off-click');
                $(this).parents($postTabs).siblings('.talent').toggleClass('show hidden');
                $(this).parents($postTabs).siblings('.fingerprint').toggleClass('show hidden');
            });
        },

        slickSlider: function () {
            var $slider = $('.main__slider');
            var $slider2 = $('.post__slider');
            if(!$slider.length && !$slider2.length) return;

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
        },

        fullCalendar: function () {
            var $calendar = $('#calendar');
            if( !$calendar.length ) return;

            Modernizr.load([
              {
                load    : assets._moment,
              },
              {
                load    : assets._jqueryui,
              },
              {
                load    : assets._fullcalendar,
                complete: function() {
                    var $events = $calendar.attr('events-data');
                        $.getJSON( $events, function(json, textStatus) {
                            $('#calendar').fullCalendar (
                            {
                                header: {
                                    left: 'title',
                                    right: 'prev, next'
                                },
                                firstDay: 1,
                                defaultDate: '2013-09-01',
                                editable: true,
                                eventLimit: true, // allow "more" link when too many events
                                dayNames: json.dayNames,
                                dayNamesShort: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
                                events: json.events,

                                eventClick: function(event) {
                                    var $start      = moment(event.start).format('DD');
                                    var $monthyear  = moment(event.end).format('MMMM YYYY');
                                    var $end        = moment(event.end).format('DD');
                                    var $tooltip    = event.tooltip;

                                    $('.calendar__tooltip').remove();
                                    $(this).before('<div class="calendar__tooltip show"><div class="calendar__tooltip__head"></div><div class="calendar__tooltip__body"></div></div>');
                                    $('.calendar__tooltip__head').text($start + ' - ' + $end + ' ' + $monthyear );
                                    $('.calendar__tooltip__body').text($tooltip);
                                }
                            }
                        );
                    });
                }
              }
            ]);
        },

        formValidation: function () {
            var $input          = $('form .form-input');
            var $submit         = $('button:submit');
            var $err            = $('.err-msg');
            var $errMsg         = $('.form-input').attr('messages-data');
            var $checkbox       = $('input[name="bimbingan"]');
            var $checkboxErr    = $('.err-opt');
            var $checkboxMsg    = $('.err-opt').attr('messages-data');
            

            $submit.on ( 'click', function(e) {
                $('form .err-msg').remove();
                $input.removeClass('form-input--success form-input--error');
                $input.each(function(index, value){
                    if ($.trim($input.eq(index).val()).length > 0 && $checkbox.prop('checked') === true) {
                        $input.eq(index).addClass('form-input--success');
                    } else if ($.trim($input.eq(index).val()).length === 0) {
                        $input.eq(index).addClass('form-input--error');
                        $input.eq(index).after('<div class="err-msg"></div>');
                        $('.err-msg').text($errMsg);
                        $('.form-input--error:first').focus();
                        event.preventDefault(e);
                    } else if ($checkbox.prop('checked') === false) {
                        $checkboxErr.text($checkboxMsg);
                        event.preventDefault(e);
                    }
                });
            });   
        },

        boxBack: function() {
            $('.box__back').on ( 'click', function() {
                window.history.back();
            });
        },

        kontakMap: function () {
            Modernizr.load({
                load    : assets._googlemap
            });
        },

        lightBox: function() {
            Modernizr.load({
                load    : assets._lightbox,
                complete: function() {
                    lightbox.option({
                      'resizeDuration': 200,
                      'wrapAround': true,
                      'showImageNumberLabel': false,
                  })
                }
            });
        },

        initMap: function() {
            var myLatLng = { lat: -6.914094, lng: 107.6141906};
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 17,
                center: myLatLng
            });

            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: 'Hello World!'
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
