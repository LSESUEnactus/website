$(document).foundation();

$(function() {
    var $window = $(window);
    var $headerObj = $('.header');

    $(".js-rotate").textrotator({
      animation: "flipCube",
      separator: ";",
      speed: 2000
    });

    var $centreMarginObj = $('.js-centre');
    var $centreMarginHeight;
    var centreMargin = function () {
        $centreMarginHeight = $window.outerHeight() - $headerObj.outerHeight() - $centreMarginObj.outerHeight();
        if ($centreMarginHeight <= 10)
            $centreMarginHeight = 10;
        $centreMarginObj.css('margin', $centreMarginHeight / 2 + 'px auto');
    }
    centreMargin();
    $window.resize(centreMargin);
});