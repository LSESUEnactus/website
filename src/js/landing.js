/*
 * Application
 */
(function ($) {
    // Background Video (w/ Image Fallback)
    if (!Modernizr.video || Modernizr.touch)
        $('body').addClass('body--noVid');
    else
        $('body').vide("vids/enactus", {
            posterType: "jpg"
        });

    // Simple Text Rotator
    $(".js-rotate").Morphext({
        separator: ";",
        speed: 3000
    });

    // Horizontal and vertical centering
    var $window = $(window);
    var $headerObj = $('.header');

    var $centreMarginObj = $('.js-centre');
    var $centreMarginHeight;
    var centreMargin = function () {
        $centreMarginHeight = $window.outerHeight() - $headerObj.outerHeight() - $centreMarginObj.outerHeight();
        if ($centreMarginHeight <= 200) $centreMarginHeight = 200;
        $centreMarginObj.css('margin', $centreMarginHeight / 2 + 'px auto');
    }
    centreMargin();
    $window.on('resize', Foundation.utils.throttle(centreMargin, 300));
})(jQuery);