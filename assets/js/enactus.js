$(document).foundation();

$(function() {
    var $window = $(window);
    var $headerObj = $('.header');

    // BigVideo
    var BV = new $.BigVideo();
    BV.init();
    BV.show('assets/vids/enactus.mp4', {ambient:true});

    $(".js-rotate").textrotator({
      animation: "flipCube",
      separator: ";",
      speed: 2000
    });

    var $centreMarginObj = $('.js-centre');
    var $centreMarginHeight;
    var centreMargin = function () {
        $centreMarginHeight = $window.outerHeight() - $headerObj.outerHeight() - $centreMarginObj.outerHeight();
        if ($centreMarginHeight < 0)
            $centreMarginHeight = 0;
        $centreMarginObj.css('margin', $centreMarginHeight / 2 + 'px auto 0');
    }
    $window.load(centreMargin);
    $window.resize(centreMargin);
});