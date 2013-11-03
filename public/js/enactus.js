$(document).foundation();

$(function () {
    $('.footer').onScreen({
        doIn: function () {
            $(this).find('.footer__content').show();
        },
        doOut: function () {
            $(this).find('.footer__content').hide();
        },
        tolerance: '-200'
    });
});