ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
        center: [55.751574, 37.573856],
        zoom: 10
    }, {
        searchControlProvider: 'yandex#search'
    }),

    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
    ),

    myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
        hintContent: 'Собственный значок метки',
        balloonContent: 'Это красивая метка'
    }, {
        iconLayout: 'default#image',
        iconImageHref: 'assets/images/map-point-shop.png',
        iconImageSize: [20, 33],
        iconImageOffset: [-10, -15]
    });

    myMap.geoObjects.add(myPlacemark);
});
