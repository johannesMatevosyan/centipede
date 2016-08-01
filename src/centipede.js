$( document ).ready(function() {

    (function($){
        $.fn.centipede = function(options){
            var settings = $.extend({
                target : this.selector,
                navigation: true,
                navigation_text: ["back","forward"],
                caption: false,
                fade_effect: false,
                hover: true,
                mrg : 5
            }, options );

            var centipede = {
                target: settings.target,
                active_class : "active",
                c_large : "c_large_item",
                c_thumbnails : "c_thumbnails",
                c_item : "c_item",
                c_s_caption: "show_caption",
                hover: settings.hover,
                navigation: settings.navigation,
                navigation_text: settings.navigation_text,
                caption: settings.caption,
                fade_effect: settings.fade_effect,
                mrg: settings.mrg,
                count : $(settings.target + ' .c_thumbnails').find('.c_item').length,
                dot : '.',
                blank : ' '
            };

            set_css(centipede);
            change_image(centipede);
            set_navigation(centipede);

            return this;
        };
    }(jQuery));

});


// set image dimensions
function set_css(centipede){

    // set width and height of small images
    var small_img_w;
    var img_right_margin = (centipede.mrg/$(centipede.target).width()) * 100;

    if(img_right_margin >= 0){
        // var ul_w = $(centipede.target + centipede.blank + centipede.dot + centipede.c_thumbnails).width();
        small_img_w = (100 / centipede.count) - img_right_margin;
        $(centipede.target + centipede.blank + centipede.dot + centipede.c_thumbnails + centipede.blank + centipede.dot + centipede.c_item).css({
            'width' : small_img_w + '%',
            'margin-right' : img_right_margin + '%'
        });
        $(centipede.target + centipede.blank + centipede.dot + centipede.c_thumbnails + centipede.blank + centipede.dot + centipede.c_item + ':first-child').css({
            'margin-left' : 0.14 + '%'
        });
        $(centipede.target + centipede.blank + centipede.dot + centipede.c_thumbnails + centipede.blank + centipede.dot + centipede.c_item + ':last-child').css({
            'margin-right' : 0
        });

        if($(window).width() <= '500'){
            $(centipede.target + centipede.blank + centipede.dot + centipede.c_thumbnails + centipede.blank + centipede.dot + centipede.c_item).css({'display': 'none'});
        }
        $(window).resize(function(){
            if($(window).width() <= '500'){
                $(centipede.target + centipede.blank + centipede.dot + centipede.c_thumbnails + centipede.blank + centipede.dot + centipede.c_item).css({'display': 'none'});
            }else{
                $(centipede.target + centipede.blank + centipede.dot + centipede.c_thumbnails + centipede.blank + centipede.dot + centipede.c_item).css({'display': 'inherit'});
            }
        });
    }

}

// swap images after click
function change_image(centipede){

    var active_item_src;
    var active_item_alt;
    var set_caption;

    $(centipede.target + centipede.blank + '.c_item:first').addClass(centipede.active_class);

    active_item_src = $(centipede.target + centipede.blank + centipede.dot + centipede.c_item + centipede.dot + centipede.active_class).find('img').attr('src');
    active_item_alt = $(centipede.target + centipede.blank + centipede.dot + centipede.c_item + centipede.dot + centipede.active_class).find('img').attr('alt');

    $(centipede.target).prepend('<div class="' + centipede.c_large + '"><img src="' + active_item_src + '" alt="' + active_item_alt +'"></div>');


    // set opacity
    if(centipede.hover){
        $(centipede.target + centipede.blank + centipede.dot + centipede.c_large).find('img').addClass('img_opacity');
        $(centipede.target + centipede.blank + centipede.dot + centipede.c_item).find('img').addClass('img_opacity');
    }

    // set caption
    if(centipede.caption){
        $(centipede.blank + centipede.target + centipede.blank + centipede.dot + centipede.c_large).append('<div class="' + centipede.c_s_caption + '"></div>');
        set_caption = $(centipede.target + centipede.blank + centipede.dot + centipede.c_item + centipede.dot + centipede.active_class).find('.c_caption').text();
        $(centipede.target + centipede.blank + centipede.dot + centipede.c_large).find(centipede.dot + centipede.c_s_caption).text(set_caption);
    }else{
        $(centipede.blank + centipede.target + centipede.blank + centipede.dot + centipede.c_large + centipede.blank + centipede.dot + centipede.c_s_caption).remove();
    }

    $(centipede.target + centipede.blank + centipede.dot + centipede.c_item).on('click', function(){

        if(!$(this).hasClass(centipede.active_class)){
            $(this).siblings().removeClass(centipede.active_class);
            $(this).addClass(centipede.active_class);

            active_item_src = $(centipede.target + centipede.blank + centipede.dot + centipede.c_item + centipede.dot + centipede.active_class).find('img').attr('src');
            active_item_alt = $(centipede.target + centipede.blank + centipede.dot + centipede.c_item + centipede.dot + centipede.active_class).find('img').attr('alt');

            if(centipede.fade_effect){
                $(this).closest(centipede.dot + centipede.c_thumbnails).siblings(centipede.dot + centipede.c_large).find('img').fadeOut(400, function() {
                    $(this).attr({
                        'src': active_item_src,
                        'alt': active_item_alt
                    });
                }).fadeIn(400);
                $(this).addClass(centipede.active_class);
            }else{
                $(this).closest(centipede.dot + centipede.c_thumbnails).siblings(centipede.dot + centipede.c_large).find('img').attr({
                    'src': active_item_src,
                    'alt': active_item_alt
                });
                $(this).addClass(centipede.active_class);
            }

            if(centipede.caption){
                set_caption = $(centipede.target + centipede.blank + centipede.dot + centipede.c_item + centipede.dot + centipede.active_class).find('.c_caption').text();
                $(this).closest(centipede.dot + centipede.c_thumbnails).siblings(centipede.dot + centipede.c_large).find(centipede.dot + centipede.c_s_caption).text(set_caption);
            }else{
                $(centipede.blank + centipede.target + centipede.blank + centipede.dot + centipede.c_large + centipede.blank + centipede.dot + centipede.c_s_caption).remove();
            }


        }

        return false;
    });

}

function set_caption_text(centipede, caption_text){

    $(centipede.blank + centipede.target + centipede.blank + centipede.dot + centipede.c_large + centipede.blank + centipede.dot + centipede.c_s_caption).remove();
    $(centipede.blank + centipede.target + centipede.blank + centipede.dot + centipede.c_large).append('<div class="' + centipede.c_s_caption + '"></div>');
    $(centipede.blank + centipede.target + centipede.blank + centipede.dot + centipede.c_large).find(centipede.dot + centipede.c_s_caption).text(caption_text);

}

// set navigation
function set_navigation(centipede){

    if(centipede.navigation){
        $(centipede.target + centipede.blank + centipede.dot + centipede.c_large).append('<div class="c_nav">' +
            '<div class="c_prev">' + centipede.navigation_text[0] + '</div><div class="c_next">' + centipede.navigation_text[1] + '</div>' +
            '</div>');

        $(centipede.target + centipede.blank + centipede.dot + centipede.c_large + centipede.blank + '.c_prev').on('click', function(){

            var index = $(this).closest(centipede.dot + centipede.c_large).siblings(centipede.dot + centipede.c_thumbnails).find('.c_item.active').index();
            if(index == 0){

                $(this).closest(centipede.dot + centipede.c_large).siblings(centipede.dot + centipede.c_thumbnails).find(centipede.blank + centipede.dot + centipede.c_item).removeClass('active');
                $(this).closest(centipede.dot + centipede.c_large).siblings(centipede.dot + centipede.c_thumbnails).find(centipede.blank + centipede.dot + centipede.c_item).eq(index-1).addClass('active');
                var set_src = $(this).closest(centipede.dot + centipede.c_large).siblings(centipede.dot + centipede.c_thumbnails).find('.c_item:last').find('img').attr('src');
                $(this).closest(centipede.dot + centipede.c_large).find('img').attr('src', set_src);

                // Set caption text
                if(centipede.caption){
                    var caption_text = $(this).closest(centipede.c_large).siblings(centipede.dot + centipede.c_thumbnails).find(centipede.blank + centipede.dot + centipede.c_item).eq(index-1).find('.c_caption').text();
                    set_caption_text(centipede, caption_text);
                }else{
                    $(centipede.blank + centipede.target + centipede.blank + centipede.dot + centipede.c_large + centipede.blank + centipede.dot + centipede.c_s_caption).remove();
                }

            }
            if(index <= centipede.count - 1 && index != 0){

                $(this).closest(centipede.dot + centipede.c_large).siblings(centipede.dot + centipede.c_thumbnails).find(centipede.blank + centipede.dot + centipede.c_item).removeClass('active');
                $(this).closest(centipede.dot + centipede.c_large).siblings(centipede.dot + centipede.c_thumbnails).find(centipede.blank + centipede.dot + centipede.c_item).eq(index - 1).addClass('active');
                var set_src = $(this).closest(centipede.dot + centipede.c_large).siblings(centipede.dot + centipede.c_thumbnails).find(centipede.blank + centipede.dot + centipede.c_item).eq(index - 1).find('img').attr('src');
                $(this).closest(centipede.dot + centipede.c_large).find('img').attr('src', set_src);

                if(centipede.caption){
                    var caption_text = $(this).closest(centipede.dot + centipede.c_large).siblings(centipede.dot + centipede.c_thumbnails).find(centipede.blank + centipede.dot + centipede.c_item).eq(index - 1).find('.c_caption').text();
                    set_caption_text(centipede, caption_text);
                }else{
                    $(centipede.blank + centipede.target + centipede.blank + centipede.c_large + centipede.blank + centipede.dot + centipede.c_s_caption).remove();
                }
            }

        });

        $(centipede.blank + centipede.target + centipede.blank + centipede.dot + centipede.c_large + centipede.blank + '.c_next').on('click', function(){

            var index = $(this).closest(centipede.dot + centipede.c_large).siblings(centipede.dot + centipede.c_thumbnails).find('.c_item.active').index();
            if(index == 0){
                $(this).closest(centipede.dot + centipede.c_large).siblings(centipede.dot + centipede.c_thumbnails).find(centipede.blank + centipede.dot + centipede.c_item).removeClass('active');
                $(this).closest(centipede.dot + centipede.c_large).siblings(centipede.dot + centipede.c_thumbnails).find(centipede.blank + centipede.dot + centipede.c_item).eq(index + 1).addClass('active');
                var set_src = $(this).closest(centipede.dot + centipede.c_large).siblings(centipede.dot + centipede.c_thumbnails).find(centipede.blank + centipede.dot + centipede.c_item).eq(index + 1).find('img').attr('src');
                $(this).closest(centipede.dot + centipede.c_large).find('img').attr('src', set_src);

                // Set caption text
                if(centipede.caption){
                    var caption_text = $(this).closest(centipede.dot + centipede.c_large).siblings(centipede.dot + centipede.c_thumbnails).find(centipede.blank + centipede.dot + centipede.c_item).eq(index + 1).find('.c_caption').text();
                    set_caption_text(centipede, caption_text);
                }else{
                    $(centipede.blank + centipede.target + centipede.blank + centipede.dot + centipede.c_large + centipede.blank + centipede.dot + centipede.c_s_caption).remove();
                }
            }
            if(index < centipede.count - 1 && index != 0){
                $(this).closest(centipede.dot + centipede.c_large).siblings(centipede.dot + centipede.c_thumbnails).find(centipede.blank + centipede.dot + centipede.c_item).removeClass('active');
                $(this).closest(centipede.dot + centipede.c_large).siblings(centipede.dot + centipede.c_thumbnails).find(centipede.blank + centipede.dot + centipede.c_item).eq(index + 1).addClass('active');
                var set_src = $(this).closest(centipede.dot + centipede.c_large).siblings(centipede.dot + centipede.c_thumbnails).find(centipede.blank + centipede.dot + centipede.c_item).eq(index + 1).find('img').attr('src');
                $(this).closest(centipede.dot + centipede.c_large).find('img').attr('src', set_src);

                // Set caption text
                if(centipede.caption){
                    var caption_text = $(this).closest(centipede.dot + centipede.c_large).siblings(centipede.dot + centipede.c_thumbnails).find(centipede.blank + centipede.dot + centipede.c_item).eq(index + 1).find('.c_caption').text();
                    set_caption_text(centipede, caption_text);
                }else{
                    $(centipede.blank + centipede.target + centipede.blank + centipede.dot + centipede.c_large + centipede.blank + centipede.dot + centipede.c_s_caption).remove();
                }
            }
            if(index == centipede.count - 1 && index != 0){
                index = 0;
                $(this).closest(centipede.dot + centipede.c_large).siblings(centipede.dot + centipede.c_thumbnails).find(centipede.blank + centipede.dot + centipede.c_item).removeClass('active');
                $(this).closest(centipede.dot + centipede.c_large).siblings(centipede.dot + centipede.c_thumbnails).find('.c_item:first').addClass('active');
                var set_src = $(this).closest(centipede.dot + centipede.c_large).siblings(centipede.dot + centipede.c_thumbnails).find(centipede.blank + centipede.dot + centipede.c_item).eq(index).find('img').attr('src');
                $(this).closest(centipede.dot + centipede.c_large).find('img').attr('src', set_src);

                // Set caption text
                if(centipede.caption){
                    var caption_text = $(this).closest(centipede.dot + centipede.c_large).siblings(centipede.dot + centipede.c_thumbnails).find('.c_item:first').eq(index).find('.c_caption').text();
                    set_caption_text(centipede, caption_text);
                }else{
                    $(centipede.blank + centipede.target + centipede.blank + centipede.dot + centipede.c_large + centipede.blank + centipede.dot + centipede.c_s_caption).remove();
                }
            }
        });

    }

}

