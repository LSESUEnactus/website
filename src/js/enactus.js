(function ($) {
    $(document).foundation();

    var $onScreenObj = $('.js-onScreen');

    if (!Modernizr.touch)
        $('.footer').onScreen({
            doIn: function () {
                $onScreenObj.show();
            },
            doOut: function () {
                $onScreenObj.hide();
            },
            tolerance: '-50'
        });
    else
        $onScreenObj.css({
            'bottom': '0',
            'position': 'relative'
        }).show();

    /*
     * Window height will not remain static (don't cache)
     * Wrapper height is likely to remain static (cache)
     * Calculate the difference so we only need to call height() once
     * Listen for window resize and throttle the calls
     */
    var $window = $(window);
    var $wrapperHeight = $('.wrapper').height();
    var $container = $('.js-extend');
    var extendContainer = function () {
        var $difference = $window.height() - $wrapperHeight;
        if ($difference > 0)
            $container.css('height', $difference);
    }
    extendContainer();
    $window.on('resize', Foundation.utils.throttle(extendContainer, 300));
})(jQuery);