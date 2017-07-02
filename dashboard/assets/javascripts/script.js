function moveTableRowRow($el, direction) {
    // For demo move table row
    //
    // For move down run: moveTableRowRow($('.js-row-demo-move'), 'down');
    // For move up run: moveTableRowRow($('.js-row-demo-move'), 'up');

    if (direction == 'up') {
        $el.fadeOut(1000);
        setTimeout(function() { $el.insertBefore($el.prev()); }, 1000)
        $el.fadeIn(1000);

        console.log('move up');
    }

    if (direction == 'down') {
        $el.fadeOut(1000);
        setTimeout(function() { $el.insertAfter($el.next()); }, 1000)
        $el.fadeIn(1000);

        console.log('move down');
    }

    return $el;
}

function widgetRotation(widgetNumber) {
    // For demo rotation

    var randomWidget = Math.floor(Math.random() * $('.js-widget-rotation-' + widgetNumber).length);

    $('.js-widget-rotation-' + widgetNumber).hide().eq(randomWidget).fadeIn(600);
}

function updateDay() {
    var day = new Date().getDay();
    var days = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Петница',
        'Суббота'
    ];

    $('#js-day').html(days[day]);
}

function updateDate() {
    var date = new Date().getDate();
    var month = new Date().getMonth();
    var months = [
        'января',
        'февраля',
        'марта',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря'
    ];

    $('#js-date').html(date + ' ' + months[month]);
}

function updateClock() {
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();

    minutes = minutes < 10 ? '0' + minutes : minutes

    $('#js-clock').html(hours + '<span class="date_clock-colon">:</span>' + minutes);
}

$(function() {
    widgetRotation(1);
    widgetRotation(2);

    updateDay();
    updateDate();
    updateClock();

    setInterval('widgetRotation(1)', 30000);
    setInterval('widgetRotation(2)', 30000);

    setInterval('updateDay()', 60000);
    setInterval('updateDate()', 60000);
    setInterval('updateClock()', 1000);
})
