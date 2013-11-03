$(document).foundation();

$(function () {
    $('.footer').onScreen({
        doIn: function () {
            $(this).find('.footer__content').show();
            console.log('test');
        },
        doOut: function () {
            $(this).find('.footer__content').hide();
        }
    });
});