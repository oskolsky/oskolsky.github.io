$(function() {

    $('.js-number').find('.js-number-increment').on('click', function() {

        var $number = $(this).closest('.js-number');
        var $value = $number.find('.js-number-value');
        var $input = $number.find('.js-number-input');

        var value = $input.attr('value');
        value++;

        $input.attr('value', value);
        $value.text(value);

        return false;

    });

    $('.js-number').find('.js-number-decrement').on('click', function() {

        var $number = $(this).closest('.js-number');
        var $value = $number.find('.js-number-value');
        var $input = $number.find('.js-number-input');

        var value = $input.attr('value');

        if (value > 0) {
            value--;
        }

        $input.attr('value', value);
        $value.text(value);

        return false;

    });

});
