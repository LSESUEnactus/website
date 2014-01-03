$(function () {
	/*
	 * WARNING: Extremely messy.
	 * @TODO: Clean up of course (use functions).
	 */
	$('.contact__form-input > input').on('blur keydown', function (e) {
		if (e.type === 'keydown' && e.keyCode !== 13)
			return;
		e.preventDefault();
		$(this).parent().prev().text( $(this).val() || $(this).parent().prev().text() );
		$(this).parent().fadeOut();
	});
	$('.contact__form-confirm').click(function () {
		$(this).parent().prev().text( $(this).prev().val() || $(this).parent().prev().text() );
		$(this).parent().fadeOut();
	});
	$('.contact__form-select > li').click(function () {
		if ($(this).parents('.contact__form-projects').length > 0 || 
			$(this).text() === 'join an existing project')
			$('.contact__form-projects').fadeIn().css("display", "inline-block");
		else
			$('.contact__form-projects').fadeOut();
		$(this).parent().parent().prev().text( $(this).text() );
		$(this).parent().parent().fadeOut();
	});
	$('.contact__form-placeholder').click(function () {
		$(this).next().fadeIn().find('input').focus();
	});
});