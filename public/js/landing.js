/*
 * Application
 */
$(function () {
    // Background Video
    var $backgroundVideo = new $.backgroundVideo(
        $('body'), {
        "align": "centerXY",
        "width": 854,
        "height": 480,
        "path": "vids/",
        "filename": "enactus",
        "types": ["webm", "mp4", "ogv"]
    });

    // Simple Text Rotator
    $(".js-rotate").Morphext({
        animation: "fadeInRight",
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
        if ($centreMarginHeight <= 20)
            $centreMarginHeight = 20;
        $centreMarginObj.css('margin', $centreMarginHeight / 2 + 'px auto');
    }
    centreMargin();
    $window.resize(centreMargin);
});