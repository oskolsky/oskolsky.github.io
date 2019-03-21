/**
 * Created by zuoa on 12.07.2017.
 */

const Helper = (() => {
    let _this = {},
        _document = $(document);

    // /**
    //  * Helper for validation
    //  * @returns {_this}
    //  */
    // _this.valid = function () {
    //     // Стили js-valid.css
    //
    //     let _self = this,
    //         prefix = 'js-valid',
    //         radioList = {},
    //
    //         // Типы полей
    //         inputType = {
    //             EMAIL: 'email',
    //             PHONE: 'tel',
    //             NUMBER: 'number',
    //             RADIO: 'radio',
    //             CHECKBOX: 'checkbox',
    //             FILE: 'file',
    //             DATE: 'date'
    //         },
    //
    //         prefixInput = prefix + '__input', // Обрабатываемые поля
    //         inputError = prefixInput + '--error', // Поле с ошибкой
    //         inputCorrect = prefixInput + '--correct', // Корректное поле
    //         inputRequired = prefixInput + '--required', // Обязательное поле
    //
    //         formError = prefix + '__error',  // Блок с ошибкой
    //         errorBox = null,
    //
    //         // Сообщения об ошибках
    //         validationMessages = [];
    //
    //     _self.validationTemplates = {};
    //     _self.showErrorByChange = true;
    //     _self.isShowInputsStatuses = false;
    //
    //     // Статусы полей формы (валидно поле или нет)
    //     _self.formState = {};
    //
    //     /**
    //      * Дополнительная проверка, общая для всех полей
    //      * Так же метод заполняет _self.formState
    //      *
    //      * @param {jQuery} input
    //      * @param {bool} correct
    //      * @returns {bool} Валидно ли поле
    //      */
    //     _self.commonValidCheck = function (input, correct) {
    //         let name = input.attr('name'),
    //             required = input.hasClass(inputRequired),
    //             length = input.attr("type") !== "checkbox"
    //                 ? input.val().length && Boolean(input.val().match(/\S/))
    //                 : input.prop("checked"),
    //             file = input[0].files;
    //
    //         // Если в поле что-то введено
    //         if (length) {
    //             _self.formState[name] = correct;
    //         } else if (required) { // Если в поле ничего не введено и оно обязательное
    //             _self.formState[name] = false;
    //         } else { // Если в поле ничего не введено и оно не обязательное
    //             _self.formState[name] = true;
    //         }
    //
    //         return _self.formState[name];
    //     };
    //
    //     /**
    //      * Установить полю класс состояния и показать ошибку
    //      *
    //      * @param input
    //      * @param correct
    //      * @param type
    //      */
    //     _self.showInputStatus = function (input, correct, type) {
    //
    //         // Если стоит запрет показа ошибок
    //         if (!_self.isShowInputsStatuses) return;
    //
    //         let currentMessageType = type === undefined ? "required" : type;
    //         if (correct) {
    //             _self.errorMessage({validationItem: input, messageType: currentMessageType, action: "remove"});
    //             input.removeClass(inputError);
    //             input.addClass(inputCorrect);
    //         } else {
    //             _self.errorMessage({validationItem: input, messageType: currentMessageType, action: "add"});
    //             input.removeClass(inputCorrect);
    //             input.addClass(inputError);
    //         }
    //     };
    //
    //     // Валидация полей по типу
    //     _self.inputHandler = function (item) {
    //         const type = item.data('validType') ? item.data('validType') : item.attr('type');
    //         let messageType = '';
    //         let valid = true;
    //
    //         switch (type) {
    //             // Валидация почты
    //             case inputType.EMAIL:
    //                 return function () {
    //                     let value = item.val();
    //                     valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
    //                     valid = _self.commonValidCheck(item, valid);
    //                     messageType = "email";
    //                     _self.showInputStatus(item, valid, messageType);
    //                 };
    //                 break;
    //
    //             // Валидация телефона
    //             case inputType.PHONE:
    //                 return function () {
    //                     valid = !item.val() || Boolean(item.val().match(/_/ig));
    //
    //                     if (_self.showErrorByChange) item.toggleClass(inputError, valid);
    //                     // item.toggleClass(inputCorrect, !valid);
    //                     valid = _self.commonValidCheck(item, !valid);
    //                     _self.showInputStatus(item, valid, messageType);
    //                 };
    //                 break;
    //
    //             // Радиокнопки
    //             case inputType.RADIO:
    //                 return function () {
    //                     //
    //                 };
    //                 break;
    //
    //             // Числа
    //             case inputType.NUMBER:
    //                 return function () {
    //                     const value = item.val().replace(/\s+/g, '');
    //                     valid = Boolean(value.match(/^\d+$/));
    //                     if (_self.showErrorByChange) item.toggleClass(inputError, !valid);
    //                     valid = _self.commonValidCheck(item, valid, "number");
    //                     messageType = "number";
    //                     _self.showInputStatus(item, valid, messageType);
    //
    //                     // Дополнительная валидация чисел
    //
    //                     // Максимальное значение
    //                     const max = item.data('validMax') ? item.data('validMax') : false;
    //                     if (max && valid) {
    //                         valid = value <= parseInt(max);
    //                         if (_self.showErrorByChange) item.toggleClass(inputError, !valid);
    //                         valid = _self.commonValidCheck(item, valid, "max");
    //                         messageType = "max";
    //                         _self.showInputStatus(item, valid, messageType);
    //                     }
    //
    //                     // Минимальное значение
    //                     const min = item.data('validMin') ? item.data('validMin') : false;
    //                     if (min && valid) {
    //                         valid = value >= parseInt(min);
    //                         if (_self.showErrorByChange) item.toggleClass(inputError, !valid);
    //                         valid = _self.commonValidCheck(item, valid, "min");
    //                         messageType = "min";
    //                         _self.showInputStatus(item, valid, messageType);
    //                     }
    //
    //                     // Минимальная длина
    //                     const minLength = item.attr('minlength') ? item.attr('minlength') : false;
    //                     if (minLength && valid) {
    //                         valid = value.length >= parseInt(minLength);
    //                         if (_self.showErrorByChange) item.toggleClass(inputError, !valid);
    //                         item.toggleClass(inputCorrect, valid);
    //                     }
    //                 };
    //                 break;
    //
    //             // Файлы
    //             case inputType.FILE:
    //                 return function () {
    //                     const fileInput = item,
    //                         file = fileInput[0].files[0];
    //                     valid = file !== undefined && file !== null;
    //                     valid = _self.commonValidCheck(item, valid);
    //                     _self.showInputStatus(item, valid, messageType);
    //
    //                     // Файл существует?
    //                     if (valid && !Boolean(file)) {
    //                         valid = false;
    //                         valid = _self.commonValidCheck(item, valid);
    //                         _self.showInputStatus(item, valid, messageType);
    //                         return;
    //                     }
    //
    //                     if (valid) {
    //                         const fileSize = file.size;
    //                         // Максимальный вес файла
    //                         // 1 мегабайт = 1000000 байт
    //                         const maxSize = item.data('validFileMaxSize');
    //                         if (maxSize !== undefined) {
    //                             valid = fileSize <= parseInt(maxSize);
    //                             valid = _self.commonValidCheck(item, valid);
    //                             _self.showInputStatus(item, valid, messageType);
    //                         }
    //                     }
    //
    //                     if (valid) {
    //                         const fileType = file.type;
    //                         // Формат файла
    //                         const format = item.data('validFileFormat');
    //                         if (format !== undefined) {
    //                             switch (format) {
    //                                 case 'pdf':
    //                                     valid = fileType === 'application/pdf';
    //                                     valid = _self.commonValidCheck(item, valid);
    //                                     _self.showInputStatus(item, valid, messageType);
    //                                     break;
    //                                 default:
    //                                     break;
    //                             }
    //                         }
    //                     }
    //                 };
    //                 break;
    //
    //             // Чекбоксы
    //             case inputType.CHECKBOX:
    //                 return function () {
    //                     valid = item.prop('checked');
    //                     valid = _self.commonValidCheck(item, valid);
    //                     _self.showInputStatus(item, valid, messageType);
    //                 };
    //                 break;
    //
    //             // Дата
    //             case inputType.DATE:
    //                 return function () {
    //                     valid = item.val().replace(/[^0-9]/g, "").length === 8;
    //                     valid = _self.commonValidCheck(item, valid);
    //                     _self.showInputStatus(item, valid, messageType);
    //                 };
    //                 break;
    //
    //             // Текстовые поля
    //             default:
    //                 return function () {
    //                     let value = item.val(),
    //                         notSpace = Boolean(value.match(/\S/)),
    //                         externalError = item.hasClass('external-error'),
    //                         mask = item.data('mask'),
    //                         additionalRules;
    //
    //                     valid = value.length > 0 && notSpace;
    //
    //                     if (mask) {
    //                         value = value.toString().replace(/_/g, '');
    //                         valid = mask.toString().length === value.toString().length;
    //                     }
    //
    //                     if (externalError) {
    //                         valid = !externalError;
    //                     }
    //
    //                     additionalRules = new _self.additionalRules(valid);
    //                     additionalRules.valid(item);
    //                 };
    //                 break;
    //         }
    //     };
    //
    //     _self.additionalRules = function(status) {
    //         let additionalRules = this,
    //             handlers = {
    //                 equal: function () {
    //                     try {
    //                         let object = this,
    //                             data = object.data(),
    //                             slave = !!data.slave && $(data.slave) || $([]);
    //
    //                         if (slave.length) {
    //                             additionalRules.status = object.val() === slave.val();
    //                             let valid = _self.commonValidCheck(slave, additionalRules.status);
    //                             _self.showInputStatus(slave, valid);
    //                         }
    //                     }
    //                     catch (e) {
    //
    //                     }
    //                 }
    //             },
    //             getHandler = function (handler, object) {
    //                 try {
    //                     !!handler && !!handlers[handler] && handlers[handler].apply(object);
    //                 }
    //                 catch (e) {
    //
    //                 }
    //             };
    //
    //         this.status = status;
    //         this.valid = function (object) {
    //             let data = object.data();
    //
    //             try {
    //                 !!data && !!data.handler && getHandler(data.handler, object);
    //             }
    //             catch (e) {
    //
    //             }
    //             let valid = _self.commonValidCheck(object, this.status);
    //             _self.showInputStatus(object, valid);
    //         }
    //
    //     };
    //
    //     // Валидация по отправке
    //     _self.validForm = function (form) {
    //         _self.isShowInputsStatuses = true;
    //
    //         var list = form.find('.' + prefixInput + ':not([disabled])'),
    //             radio = list.filter('[type=radio]'),
    //             radioValid = true;
    //
    //         list.each(function (i) {
    //             _self.inputHandler(list.eq(i)).call(this);
    //         });
    //         var inputIsValid = !list.filter('.' + inputError).length;
    //
    //         if (radio.length) {
    //             radioValid = radio.filter(':checked').length;
    //         }
    //
    //         return inputIsValid && radioValid;
    //     };
    //
    //     // Активация обработчика поля
    //     _self.bindHandler = function (item) {
    //         const itemName = item.attr('name');
    //         if (_self.showErrorByInput) {
    //             _self.form.off('input.valid', `[name="${itemName}"]`).on('input.valid', `[name="${itemName}"]`, (event) => {
    //                 const item = $(event.target);
    //
    //                 // Если нужно менять класс кнопки в зависимости от валидности формы,
    //                 // проходим по всем полям и проверяем из валидность
    //                 if (_self.buttonInvalidClass) {
    //                     _self.inputs.each(function (i) {
    //                         let item = $(this);
    //                         _self.inputHandler(item).call(this);
    //                     });
    //
    //                     // Меняем класс кнопки отправки, если нужно
    //                     _self.setButtonDisableClass(Object.keys(_self.formState).map(e => _self.formState[e]).indexOf(false) !== -1 || _self.isButtonDisable);
    //                 } else {
    //                     _self.inputHandler(item).call(this);
    //                 }
    //
    //                 if (_self.callbackInputted && typeof _self.callbackInputted === 'function') {
    //                     _self.callbackInputted.apply(this, [event]);
    //                 }
    //             }).prop('disabled', false);
    //         }
    //         _self.form.off('change.valid', `[name="${itemName}"]`).on('change.valid', `[name="${itemName}"]`, (event) => {
    //             const item = $(event.target);
    //             _self.inputHandler(item).call(this);
    //             if (_self.callbackChanged && typeof _self.callbackChanged === 'function') {
    //                 _self.callbackChanged.apply(this, [event]);
    //             }
    //         }).prop('disabled', false);
    //     };
    //
    //     /**
    //      * Меняет активность кнопки
    //      *
    //      * @param isDisable Сделать ли кнопку неактивной
    //      */
    //     _self.setButtonDisableClass = function (isDisable) {
    //         _self.btnSubmit.toggleClass(_self.buttonInvalidClass, isDisable);
    //     };
    //
    //     // Деактивация обработчика поля
    //     _self.unbindHandler = function (item) {
    //         if (_self.showErrorByInput) {
    //             item.off('input.valid');
    //         } /*else {*/
    //             item.off('change.valid');
    //         /*}*/
    //     };
    //
    //     /**
    //      * Очистка формы
    //      * @param {boolean} clearValues Очистить поля?
    //      * @returns {boolean}
    //      */
    //     _self.resetForm = function (clearValues = true) {
    //         if (_self.form === undefined) return false;
    //         let inputs = _self.form.find(`.${prefixInput}`);
    //         inputs.each(function (i, e) {
    //             let element = $(e);
    //
    //             element.removeClass(`${inputError} ${inputCorrect}`);
    //         });
    //         if (clearValues) {
    //             if (typeof _self.form[0].reset === 'function') {
    //                 _self.form[0].reset();
    //             } else {
    //                 inputs.each((i, e) => {
    //                     let element = $(e);
    //
    //                     switch(element.attr('type')) {
    //                         case "radio":
    //                         case "checkbox":
    //                             if (element.attr('checked')) {
    //                                 element.attr('checked', false);
    //                             }
    //                             break;
    //                         default:
    //                             element.val("");
    //                             break;
    //                     }
    //
    //                     element.trigger('focusout');
    //                 });
    //             }
    //         }
    //
    //     };
    //
    //     // Сформировать массив Сообщений об ошибках
    //     // Метод формирует массив с актуальными ошибками при каждой попытке отправить форму
    //     _self.errorMessage = ({validationItem, messageType, action}) => {
    //         // Если заданны кастомные сообщения об ошибках
    //         if (_self.validationTemplates) {
    //             // Вставляем сообщение в массив
    //             // Каждому полю ввода соответствует своё сообщение об ошибке
    //             let validationMessagesLength = validationMessages.length;
    //             // Проходим по всем соответствиям поле-ошибка
    //             for (let i = 0; i <= validationMessagesLength; i++) {
    //                 // Добавить или удалить ошибку из массива
    //                 if (action === 'add') {
    //                     if (typeof validationMessages[i] !== 'undefined' && validationMessages[i]["element"] === validationItem.get(0)) {
    //                         validationMessages[i]["message"] = _self.validationTemplates[messageType];
    //                         break;
    //                     } else if (validationMessagesLength === i) {
    //                         // Ошибки required всегда добавляем в начало макссива, так как они приоритетные
    //                         if (messageType === 'required') {
    //                             validationMessages.unshift({
    //                                 "element": validationItem.get(0),
    //                                 "message": _self.validationTemplates[messageType]
    //                             });
    //                         } else {
    //                             validationMessages.push({
    //                                 "element": validationItem.get(0),
    //                                 "message": _self.validationTemplates[messageType]
    //                             });
    //                         }
    //                     }
    //                 } else {
    //                     if (typeof validationMessages[i] !== 'undefined' && validationMessages[i]["element"] === validationItem.get(0)) {
    //                         validationMessages.splice(i, 1);
    //                         break;
    //                     }
    //                 }
    //
    //
    //             }
    //         }
    //     };
    //
    //     // Поместить на страницу сообщение об ошибке
    //     _self.insertErrorMessage = () => {
    //         if (validationMessages.length > 0) errorBox.html(validationMessages[0]["message"]);
    //     };
    //
    //     /**
    //      * Запуск сабмита формы
    //      * @param event
    //      * @returns {boolean}
    //      */
    //     _self.submit = (event) => {
    //         if (_self.isButtonDisable) return false;
    //         _self.showErrorByChange = true;
    //         if (_self.validForm(_self.form)) {
    //             if (_self.callbackSuccess && typeof _self.callbackSuccess === 'function') {
    //                 let formData = {};
    //                 _self.form.find('.js-valid__input').each((i, e) => {
    //                     let element = $(e);
    //                     formData[element.attr('name')] = element.val();
    //                 });
    //                 _self.callbackSuccess.apply(event.target,[event, formData]);
    //             }
    //             errorBox.hide();
    //         } else {
    //             _self.insertErrorMessage();
    //             errorBox.show();
    //             if (_self.focusedInvalid) {
    //                 _self.form.find('.js-valid__input--error').first()[0].focus();
    //             }
    //             if (_self.callbackError && typeof _self.callbackError === 'function') {
    //                 _self.callbackError.apply(event.target,[event]);
    //             }
    //             return false;
    //         }
    //     };
    //
    //     /**
    //      * Инициализация валидатора
    //      * @param {Object} options - Опции
    //      * @param {jQuery} options.form - Форма для валидации
    //      * @param {Function} options.callbackSuccess - Функция вызывается в случае успешной валидации
    //      * @param {Function} options.callbackError - Функция вызывается в случае неуспешной валидации
    //      * @param {bool} options.showErrorByChange - Показывать ошибки сразу при потере фокуса на поле до первой попытки отправки
    //      * @param {bool} options.focusedInvalid - Фокусироваться на первом неправильном поле
    //      * @param {bool} options.showErrorByInput - Показывать ошибки в процессе ввода
    //      * @param {Function} options.callbackChanged - Вызовется, если у хотя бы одного поля произойдёт событие onchange
    //      * @param {Function} options.callbackInputted - Вызовется, если  у хотя бы одного поля произойдёт событие oninput
    //      * @param {String} options.buttonInvalidClass - Класс, который нужно задать кнопке сабмита, если аорма не валидна
    //      * @param {bool} options.isButtonDisable - Сделать кнопку не активной (для деактивации по условиям из вне)
    //      */
    //     _self.init = function (options) {
    //         const form = options.hasOwnProperty('form') ? options.form : false;
    //         const callbackSuccess = options.hasOwnProperty('callbackSuccess') ? options.callbackSuccess : false;
    //         const callbackError = options.hasOwnProperty('callbackError') ? options.callbackError : false;
    //         _self.form = form;
    //         _self.callbackSuccess = callbackSuccess;
    //         _self.callbackError = callbackError;
    //         _self.showErrorByChange = options.hasOwnProperty('showErrorByChange') ? options.showErrorByChange : false;
    //         _self.focusedInvalid = options.hasOwnProperty('focusedInvalid') ? options.focusedInvalid : false;
    //         _self.showErrorByInput = options.hasOwnProperty('showErrorByInput') ? options.showErrorByInput : false;
    //         _self.callbackChanged = options.hasOwnProperty('callbackChanged') ? options.callbackChanged : false;
    //         _self.callbackInputted = options.hasOwnProperty('callbackInputted') ? options.callbackInputted : false;
    //
    //         _self.buttonInvalidClass = options.hasOwnProperty('buttonInvalidClass') ? options.buttonInvalidClass : false;
    //         _self.isButtonDisable = options.hasOwnProperty('isButtonDisable') ? options.isButtonDisable : false;
    //
    //         if (form) {
    //             _self.form = form;
    //             _self.btnSubmit = form.find('.' + prefix + '__submit');
    //             errorBox = form.find('.' + formError);
    //
    //             // Получаем кастомные сообщения об ошибках
    //             // Пока можно задать сообщения только общие для всей формы
    //             _self.validationTemplates = form.data('validMessages');
    //
    //             _self.inputs = form.find('.' + prefixInput);
    //
    //             // Проходим по каждому полю, инициализируя его
    //             _self.inputs.each(function () {
    //                 var item = $(this),
    //                     type = item.attr('type');
    //
    //                 item.on('helperValid:reset', function (event) {
    //                     let _self = (!!event && (event.target || event.currentTarget)) || this, object = $(_self);
    //
    //                     try {
    //                         if (/select/.test(_self.type)) {
    //                             object.find('option').attr({selected: false});
    //                         }
    //
    //                         object.val('').removeClass(`${inputError} ${inputCorrect}`);
    //                     } catch (e) {
    //                         console.log(e.stack);
    //                     }
    //                 });
    //
    //                 switch (type) {
    //                     case inputType.PHONE:
    //                         var patter,
    //                             value = item.val();
    //
    //                         if (item.inputmask) {
    //                             item.val(value === '' ? '7' : value);
    //                             item.inputmask('phone', {
    //                                 placeholder: item.attr('placeholder') || '_',
    //                                 clearMaskOnLostFocus: item.data('clear-mask-on-lost-focus') || false
    //                             });
    //                         } else if (item.mask) {
    //                             patter = item.attr('placeholder').replace(/_/ig, 9);
    //                             item.mask(patter, {
    //                                 placeholder: item.attr('placeholder') || '_',
    //                                 clearMaskOnLostFocus: item.data('clear-mask-on-lost-focus') || false
    //                             });
    //                         }
    //
    //                         break;
    //
    //                     case inputType.RADIO:
    //                         var name = item.attr('name');
    //
    //                         if (!Array.isArray(radioList[name])) {
    //                             radioList[name] = [];
    //                         }
    //                         radioList[name].push(item);
    //                         break;
    //
    //                     case inputType.NUMBER:
    //                         // При нажатии клавиши в поле
    //                         item.on('keypress', (e) => {
    //                             // Делаем поле только для ввода цифр
    //                             if (e.ctrlKey || e.altKey || e.metaKey) return false;
    //                             let key = e.key;
    //                             if (key === null) return false;
    //                             if (key < '0' || key > '9') return false;
    //                             // Запрещаем ввод больше maxlength
    //                             let inputValue = item.val(),
    //                                 maxLength = item.attr('maxlength');
    //                             if (maxLength && inputValue.length >= maxLength) return false;
    //                         });
    //                         // При потере фокуса на поле
    //                         item.on('focusout', (e) => {
    //                             // Проверяем цифры ли в поле и удаляем лишние символы
    //                             let inputValue = item.val(),
    //                                 checkCardPrice = inputValue.match(/^\d+$/);
    //                             if (!(checkCardPrice && checkCardPrice[0] > 0)) item.val('');
    //                         });
    //
    //                         break;
    //
    //                     default:
    //                         if (!!item.data('mask')) {
    //                             if (item.inputmask) {/*TODO what about another mask?*/
    //                                 item.inputmask('', {placeholder: '_', clearMaskOnLostFocus: false});
    //                             }
    //                             else {
    //                                 item.mask(item.data('mask').toString && item.data('mask').toString() || item.data('mask'));
    //                             }
    //                         }
    //                         break;
    //                 }
    //
    //                 // Первоначально заполняем  _self.formState
    //                 _self.inputHandler(item).call(this);
    //
    //                 // Меняем класс кнопки отправки, если нужно
    //                 if (_self.buttonInvalidClass) {
    //                     _self.setButtonDisableClass(Object.keys(_self.formState).map(e => _self.formState[e]).indexOf(false) !== -1 || _self.isButtonDisable);
    //                 }
    //
    //                 // Активация обработчика поля
    //                 _self.bindHandler(item);
    //             });
    //             // .trigger('change');
    //
    //             form
    //                 .off('submit')
    //                 .on('submit', function (event) {
    //                     _self.showErrorByChange = true;
    //                     event.preventDefault();
    //                     event.stopPropagation();
    //                     return false;
    //                 });
    //
    //             _self.btnSubmit
    //                 .off('click')
    //                 .on('click', _self.submit);
    //
    //             // Производим первоначальную валидацию
    //             /*_self.validForm(_self.form);*/
    //         }
    //     };
    //
    //     return this;
    // };
    //
    // /**
    //  * Helper for maps
    //  * @returns {{}}
    //  */
    // _this.helperMap = function () {
    //     // Select Google maps API key for current domain
    //     const secondLevelDomain = window.location.hostname.match(/[^.]*\.[^.]{2,3}(?:\.[^.]{2,3})?$/g);
    //     const keys = {
    //         'bork.by': 'AIzaSyCWFs1m1ssbzPJkYwxOePBZSUV8cA4v_5M',
    //         'bork.kz': 'AIzaSyB4yGHhj4Xg692PAKhu2bI6a8mJaB-FQkk',
    //         'bork.ru': 'AIzaSyAqvQMTkRphr9Y_QCDmw-uhm641gO1kj1E',
    //         'bork.ua': 'AIzaSyCxfFXDcCVAEHV6yLKEkkDG6g7KbaYjhv4',
    //         'kambrook.ru': 'AIzaSyC2Zuq0NKYQYlTc6VhyQDBt3gJtxFYmWJI',
    //         'breville.pro': 'AIzaSyBwLXXo0wVV_wNnvw6E_peyoTG1vSSFL9g',
    //         'laurastar.ru': 'AIzaSyA0_0WT-Q2zqzadmJaLLpUNF5aYHBjRixc',
    //         'jurarussia.ru': 'AIzaSyC3erUiI01Sa5pTWLmtJV0fsGiRkfjlA_E',
    //     };
    //
    //     let _self = {},
    //         googleMap = `//maps.googleapis.com/maps/api/js?key=${keys[secondLevelDomain[0]]}`,
    //         blackMarker = '//st.bork.ru/images/maps/black_pin.svg',
    //         orangeMarker = '//st.bork.ru/images/maps/orange_pin.svg',
    //         defaultCenter = {
    //             lat: 55.7498582,
    //             lng: 37.3516342,
    //         },
    //         markers = {},
    //         currentCenter = null,
    //         manualMarkerActivation = false; // Режим ручного управление активацией маркера при клике на него
    //
    //     _self.load = function (callback) {
    //         if (!(_self.script || $('[src="' + googleMap + '"]').length)) {
    //             _self.script = document.createElement('script');
    //             _self.script.onload = callback;
    //             _self.script.src = googleMap;
    //             document.body.appendChild(_self.script);
    //         } else {
    //             if (
    //                 !!window.google
    //                 &&
    //                 !!window.google.maps
    //             ) {
    //                 callback();
    //             }
    //             else {
    //                 setTimeout(function () {
    //                     _self.load(callback);
    //                 }, 100);
    //             }
    //
    //         }
    //     };
    //
    //     /**
    //      * Инициализация карты
    //      *
    //      * @param {String} params.id - DOM Id элемента карты
    //      * @param {int} params.zoom - Степень приближения
    //      *
    //      * @param {Array} params.list - Массив маркеров
    //      * @param {Array<int>} params.list[0] id - Id маркера
    //      * @param {Array<float>} params.list[1] lat - Широта
    //      * @param {Array<float>} params.list[2] lng - Долгота
    //      * @param {Array<string>} params.list[3] title - Имя маркера
    //      * @param {Array<string>} params.list[4] balloon - Контент балуна
    //      * @param {Array<string>} params.list[5] icon - Иконка для маркера
    //      *    или
    //      * @param {Array<Object>} params.list[5] icon - Кастомный маркер
    //      * @param {Object<string>} params.list[5].url - Url изображения
    //      * @param {Object<Array>} params.list[5].size - Размеры маркера (Ширина и высота в пикселях)
    //      * @param {Object<Array>} params.list[5].origin - Расположение маркера
    //      * @param {Object<Array>} params.list[5].anchor - Расположение маркера относительно точки на которую он поставлен
    //      * @param {Object<Array>} params.list[5].scaledSize - Размер маркера при масштабировании
    //      * @param {Array<object>} params.list[5].additionalData - Дополнительные данные для добавления к объекту маркера
    //      *
    //      * @param {Function} params.markerClick - Коллбек клика по маркеру
    //      * @param {bool} params.manualMarkerActivation - Режим ручного управления активацией маркера
    //      *
    //      * @param {Function} params.afterInit - Коллбек, вызывается после инициализации
    //      */
    //     _self.init = function (params) {
    //         _self.load(function () {
    //             var center = params.list ? _self.getCenter(params.list) : defaultCenter,
    //                 zoom = params.zoom ? params.zoom : 11;
    //             manualMarkerActivation = params.manualMarkerActivation;
    //
    //             var styledMapType = new google.maps.StyledMapType(
    //                 [
    //                     {
    //                         "featureType": "all",
    //                         "elementType": "labels.text.fill",
    //                         "stylers": [
    //                             {
    //                                 "saturation": 36
    //                             },
    //                             {
    //                                 "color": "#333333"
    //                             },
    //                             {
    //                                 "lightness": 40
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         "featureType": "all",
    //                         "elementType": "labels.text.stroke",
    //                         "stylers": [
    //                             {
    //                                 "visibility": "on"
    //                             },
    //                             {
    //                                 "color": "#ffffff"
    //                             },
    //                             {
    //                                 "lightness": 16
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         "featureType": 'poi.business',
    //                         "stylers": [{visibility: 'off'}]
    //                     },
    //                     {
    //                         "featureType": "administrative",
    //                         "elementType": "geometry.fill",
    //                         "stylers": [
    //                             {
    //                                 "color": "#fefefe"
    //                             },
    //                             {
    //                                 "lightness": 20
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         "featureType": "administrative",
    //                         "elementType": "geometry.stroke",
    //                         "stylers": [
    //                             {
    //                                 "color": "#fefefe"
    //                             },
    //                             {
    //                                 "lightness": 17
    //                             },
    //                             {
    //                                 "weight": 1.2
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         "featureType": "landscape",
    //                         "elementType": "geometry",
    //                         "stylers": [
    //                             {
    //                                 "hue": "#ff0000"
    //                             },
    //                             {
    //                                 "saturation": "-100"
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         "featureType": "poi",
    //                         "elementType": "geometry",
    //                         "stylers": [
    //                             {
    //                                 "color": "#f5f5f5"
    //                             },
    //                             {
    //                                 "lightness": 21
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         "featureType": "poi.park",
    //                         "elementType": "geometry",
    //                         "stylers": [
    //                             {
    //                                 "color": "#dedede"
    //                             },
    //                             {
    //                                 "lightness": 21
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         "featureType": "road.highway",
    //                         "elementType": "geometry.fill",
    //                         "stylers": [
    //                             {
    //                                 "color": "#ffffff"
    //                             },
    //                             {
    //                                 "lightness": 17
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         "featureType": "road.highway",
    //                         "elementType": "geometry.stroke",
    //                         "stylers": [
    //                             {
    //                                 "color": "#ffffff"
    //                             },
    //                             {
    //                                 "lightness": 29
    //                             },
    //                             {
    //                                 "weight": 0.2
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         "featureType": "road.arterial",
    //                         "elementType": "geometry",
    //                         "stylers": [
    //                             {
    //                                 "color": "#ffffff"
    //                             },
    //                             {
    //                                 "lightness": 18
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         "featureType": "road.local",
    //                         "elementType": "geometry",
    //                         "stylers": [
    //                             {
    //                                 "color": "#ffffff"
    //                             },
    //                             {
    //                                 "lightness": 16
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         "featureType": "transit",
    //                         "elementType": "geometry",
    //                         "stylers": [
    //                             {
    //                                 "color": "#f2f2f2"
    //                             },
    //                             {
    //                                 "lightness": 19
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         "featureType": "water",
    //                         "elementType": "geometry",
    //                         "stylers": [
    //                             {
    //                                 "color": "#e9e9e9"
    //                             },
    //                             {
    //                                 "lightness": 17
    //                             }
    //                         ]
    //                     }
    //                 ], {
    //                     name: 'Styled Map'
    //                 }
    //             );
    //
    //             _self.map = new google.maps.Map(document.getElementById(params.id), {
    //                 zoom: zoom,
    //                 center: center,
    //                 disableDefaultUI: true,
    //                 zoomControl: true,
    //                 clickableIcons: false, // Disable point-of-interest information window
    //                 mapTypeControlOptions: {
    //                     mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
    //                 },
    //             });
    //
    //             _self.map.mapTypes.set('styled_map', styledMapType);
    //             _self.map.setMapTypeId('styled_map');
    //
    //             // После инициализации карты
    //             google.maps.event.addListenerOnce(_self.map, 'idle', function () {
    //                 if (params.list) {
    //                     _self.set(params);
    //                 }
    //
    //                 if (params.afterInit) {
    //                     params.afterInit(markers);
    //                 }
    //             });
    //
    //             // При клике на карту закроем все балуны у тех маркеров, у которых они есть
    //             google.maps.event.addListener(_self.map, 'click', function () {
    //                 _self.closeAllWindows();
    //                 return false;
    //             });
    //         });
    //
    //     };
    //
    //     _self.set = function (params) {
    //         if (!(params.list && params.list.length)) {
    //
    //             return false;
    //         }
    //
    //         _self.activeMarker = null;
    //
    //         for (var key in markers) {
    //             if (markers.hasOwnProperty(key)) {
    //                 markers[key].setMap(null);
    //                 delete markers[key];
    //             }
    //         }
    //
    //         params.list.forEach(function (item) {
    //             let id = item[0],
    //                 lat = +item[1],
    //                 lng = +item[2],
    //                 title = item[3],
    //                 balloon = item[4],
    //
    //                 icon = item[5],
    //                 markerIcon = null,
    //
    //                 additionalData = item[6];
    //
    //             // Формируем кастомный маркер, если он указан
    //             if (typeof icon === 'object') {
    //                 markerIcon = {
    //                     url: icon['url'],
    //                     size: new google.maps.Size(icon['size'][0], icon['size'][1]),
    //                     origin: new google.maps.Point(icon['origin'][0], icon['origin'][1]),
    //                     anchor: new google.maps.Point(icon['anchor'][0], icon['anchor'][1]),
    //                     scaledSize: new google.maps.Size(icon['scaledSize'][0], icon['scaledSize'][1])
    //                 };
    //             } else {
    //                 markerIcon = {
    //                     url: blackMarker,
    //                     scaledSize: new google.maps.Size(31, 38)
    //                 }
    //             }
    //
    //             let marker = new google.maps.Marker({
    //                 position: {
    //                     lat: lat,
    //                     lng: lng
    //                 },
    //                 icon: markerIcon,
    //                 map: _self.map, // Устанавливаем маркер на карту
    //                 optimized: false,
    //                 title: title
    //             });
    //
    //             // Если есть дополнительные данные, добавим их к объекту маркера
    //             if (typeof additionalData !== 'undefined') {
    //                 marker = $.extend(marker, additionalData);
    //             }
    //
    //             // Если установлен html шаблон для балуна
    //             if (typeof balloon !== 'undefined') {
    //                 marker.infowindow = new google.maps.InfoWindow({
    //                     content: balloon,
    //                     maxWidth: 307
    //                 });
    //                 let deleteCloseIcon = function () {
    //                     $('.gm-style-iw').siblings()[1].remove(); // удаление крестика из инфоокна
    //                 };
    //                 google.maps.event.addListener(marker.infowindow, 'domready', deleteCloseIcon);
    //                 marker.infowindow.opened = false;
    //             }
    //
    //             marker.clicked = false;
    //             marker.closed = false;
    //             marker.addListener('click', function () {
    //                 // Открытие и закрытие балунов
    //                 if (typeof balloon !== 'undefined') {
    //                     if (marker.infowindow.opened) { // Если балун для маркера открыт
    //                         // Закроем его балун
    //                         marker.infowindow.close(_self.map, marker);
    //                         marker.infowindow.opened = false;
    //                     } else { // Если балун у маркера закрыт
    //                         // Закроем все балуны
    //                         _self.closeAllWindows();
    //                         // Откроем его балун
    //                         marker.infowindow.open(_self.map, marker);
    //                         marker.infowindow.opened = true;
    //                     }
    //                 }
    //
    //                 if (params.hasOwnProperty('markerClick')) {
    //                     params.markerClick(id); // Вызываем кастомный обработчик клика по маркеру с его id
    //                 }
    //                 if (!manualMarkerActivation) {
    //                     _self.setActive(id);
    //                 }
    //             });
    //
    //             markers[id] = marker;
    //         });
    //
    //         // При нажатии на маркер ставим его  в центре
    //         currentCenter = _self.getCenter(params.list);
    //         _self.map.setCenter(
    //             _self.getCenter(params.list)
    //         );
    //
    //         if (params.callback && typeof params.callback === 'function') {
    //             params.callback(markers);
    //         }
    //     };
    //
    //     /**
    //      * Закрывает балуны у всех маркеров на карте, у которых они есть
    //      */
    //     _self.closeAllWindows = function () {
    //         for (let item in markers) {
    //             if (typeof markers[item].infowindow === 'undefined') continue;
    //             markers[item].infowindow.close(_self.map, markers[item]);
    //             markers[item].infowindow.opened = false;
    //         }
    //     };
    //
    //     _self.setActive = function (active) {
    //         if (_self.activeMarker) {
    //             markers[_self.activeMarker].setIcon({url: blackMarker, scaledSize: new google.maps.Size(31, 38)});
    //         }
    //
    //         var marker = markers[active],
    //             lat = marker.getPosition().lat(),
    //             lng = marker.getPosition().lng();
    //
    //         marker.setIcon({url: orangeMarker, scaledSize: new google.maps.Size(31, 38)});
    //         _self.activeMarker = active;
    //         _self.map.setCenter({
    //             lat: lat,
    //             lng: lng
    //         });
    //     };
    //
    //     /**
    //      * Убирает активность с маркера и устанавливаем изначальный центр на карте
    //      */
    //     _self.unsetActive = function () {
    //         if (_self.activeMarker) {
    //             markers[_self.activeMarker].setIcon(blackMarker);
    //         }
    //         _self.map.setCenter(
    //             currentCenter
    //         );
    //     };
    //
    //     _self.setStatus = (items, status) => {
    //         items.each((id) => items.eq(id)[0].setIcon(status ?
    //             {url: orangeMarker, scaledSize: new google.maps.Size(31, 38)} :
    //             {url: blackMarker, scaledSize: new google.maps.Size(31, 38)}))
    //     };
    //
    //     _self.getCenter = function (list) {
    //         var positionMax = {
    //                 lat: 0,
    //                 lng: 0
    //             },
    //             positionMin = {
    //                 lat: 0,
    //                 lng: 0
    //             };
    //
    //         list.forEach(function (item) {
    //             var lat = +item[1],
    //                 lng = +item[2];
    //
    //             if (lat > positionMax.lat) positionMax.lat = lat;
    //             if (lng > positionMax.lng) positionMax.lng = lng;
    //
    //             if (lat < positionMin.lat || !positionMin.lat) positionMin.lat = lat;
    //             if (lng < positionMin.lng || !positionMin.lng) positionMin.lng = lng;
    //         });
    //
    //         return {
    //             lat: (positionMax.lat + positionMin.lat) / 2,
    //             lng: (positionMax.lng + positionMin.lng) / 2
    //         };
    //     };
    //
    //     return _self;
    // };
    //
    // /**
    //  * Helper for yandex maps
    //  */
    // _this.helperYandexMap = function () {
    //
    //     let _self = {},
    //         yandexMap = '//api-maps.yandex.ru/2.1/?lang=ru_RU',
    //         blackMarker = '//st.bork.ru/images/maps/black_pin.svg',
    //         orangeMarker = '//st.bork.ru/images/maps/orange_pin.svg',
    //         defaultCenter = [55.7498582, 37.3516342],
    //         markers = [],
    //         geolocation = {},
    //         map;
    //
    //     /**
    //      * Инициализация карты
    //      *
    //      * @param {String} params.id - DOM Id элемента карты
    //      * @param {int} params.zoom - Степень приближения
    //      *
    //      * @param {Array} params.list - Массив маркеров
    //      * @param {Array<int>} params.list[0] id - Id маркера
    //      * @param {Array<float>} params.list[1] lat - Широта
    //      * @param {Array<float>} params.list[2] lng - Долгота
    //      * @param {Array<string>} params.list[3] title - Имя маркера
    //      * @param {Array<string>} params.list[4] balloon - Контент балуна
    //      * @param {Array<string>} params.list[5] icon - Иконка для маркера
    //      *    или
    //      * @param {Array<Object>} params.list[5] icon - Кастомный маркер
    //      * @param {Object<string>} params.list[5].url - Url изображения
    //      * @param {Object<Array>} params.list[5].size - Размеры маркера (Ширина и высота в пикселях)
    //      * @param {Object<Array>} params.list[5].origin - Расположение маркера
    //      * @param {Object<Array>} params.list[5].anchor - Расположение маркера относительно точки на которую он поставлен
    //      * @param {Object<Array>} params.list[5].scaledSize - Размер маркера при масштабировании
    //      * @param {Array<object>} params.list[5].additionalData - Дополнительные данные для добавления к объекту маркера
    //      *
    //      * @param {Function} params.markerClick - Коллбек клика по маркеру
    //      * @param {bool} params.manualMarkerActivation - Режим ручного управления активацией маркера
    //      * @param {bool} params.activationZoom - Приближать при активации
    //      * @param {bool} params.activationZoom - Центрировать при активации
    //      *
    //      * @param {Function} params.afterInit - Коллбек, вызывается после инициализации
    //      */
    //     _self.init = function (params) {
    //         _self.load(function () {
    //             const center = params.list ? _self.getCenter(params.list) : defaultCenter,
    //                 zoom = params.zoom ? params.zoom : 11,
    //                 container = $(`#${params.id}`);
    //
    //             // Проверяем существование контейнера
    //             if (container.length === 0) return;
    //
    //             _self.activationZoom = params.activationZoom !== undefined ? params.activationZoom : true;
    //             _self.activationCenter = params.activationCenter !== undefined ? params.activationCenter : true;
    //             _self.manualMarkerActivation = params.manualMarkerActivation !== undefined ? params.manualMarkerActivation : false;
    //             ymaps.ready(function () {
    //                 // geolocation = ymaps.geolocation;
    //                 container.empty();
    //                 _self.map = new ymaps.Map(params.id, {
    //                     center: center,
    //                     zoom: zoom,
    //                     controls: ['geolocationControl', 'searchControl', 'trafficControl', 'typeSelector', 'zoomControl']
    //                 }, {
    //                     searchControlProvider: 'yandex#search'
    //                 });
    //
    //                 _self.map.behaviors.disable('scrollZoom');
    //
    //                 // geolocation.get({
    //                 //     provider: 'yandex',
    //                 //     mapStateAutoApply: true
    //                 // }).then(function (result) {
    //                 //     result.geoObjects.options.set('preset', 'islands#redCircleIcon');
    //                 //     result.geoObjects.get(0).properties.set({
    //                 //         balloonContentBody: 'Мое местоположение'
    //                 //     });
    //                 //     _self.map.geoObjects.add(result.geoObjects);
    //                 // });
    //
    //                 // geolocation.get({
    //                 //     provider: 'browser',
    //                 //     mapStateAutoApply: true
    //                 // }).then(function (result) {
    //                 //     result.geoObjects.options.set('preset', 'islands#blueCircleIcon');
    //                 //     _self.map.geoObjects.add(result.geoObjects);
    //                 // });
    //             });
    //
    //             if (params.list && params.list.length !== 0) {
    //                 _self.set(params);
    //             }
    //
    //             if (params.afterInit && typeof params.afterInit === 'function') {
    //                 params.afterInit(markers, container);
    //             }
    //         }, params);
    //     };
    //
    //     _self.load = function (callback, params) {
    //         if (window.ymaps === undefined || _self.map === undefined || $(`#${params.id}`).children().length === 0) {
    //             if (!(_self.script || $('[src="' + yandexMap + '"]').length)) {
    //                 _self.script = document.createElement('script');
    //                 _self.script.onload = callback;
    //                 _self.script.src = yandexMap;
    //                 document.body.appendChild(_self.script);
    //             } else {
    //                 if (!!window.ymaps &&!!window.ymaps.Map ) {
    //                     callback();
    //                 }
    //                 else {
    //                     setTimeout(function () {
    //                         _self.load(callback);
    //                     }, 100);
    //                 }
    //
    //             }
    //         } else {
    //             _self.map.geoObjects.removeAll();
    //             _self.set(params);
    //         }
    //
    //     };
    //
    //     _self.set = function (params) {
    //         ymaps.ready(function () {
    //             if (!(params.list && params.list.length)) {
    //
    //                 return false;
    //             }
    //
    //             _self.activeMarker = null;
    //
    //             for (let key in markers) {
    //                 if (markers.hasOwnProperty(key)) {
    //                     _self.map.geoObjects.remove(markers[key]);
    //                     delete markers[key];
    //                 }
    //             }
    //
    //             // Создаём макет содержимого.
    //             MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
    //                 '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
    //             );
    //
    //             params.list.forEach(function (item) {
    //                 let id = item[0],
    //                     lat = +item[1],
    //                     lng = +item[2],
    //                     title = item[3],
    //                     balloon = item[4],
    //
    //                     icon = item[5],
    //                     markerIcon = null,
    //
    //                     additionalData = item[6],
    //                     marker = {};
    //
    //                 // Проверяем наличие координат у точки
    //                 if (!Boolean(lat) && !Boolean(lng)) return;
    //
    //                 // Формируем кастомный маркер, если он указан, иначе дефолтный
    //                 if (typeof icon === 'object') {
    //                     markerIcon = icon;
    //                 } else {
    //                     markerIcon = {
    //                         url: blackMarker,
    //                         size: [30, 30],
    //                         origin: [0, 0]
    //                     }
    //                 }
    //
    //                 // let markerGeoObject = new ymaps.GeoObject({}, {
    //                 //     iconImageHref: icon
    //                 // });
    //
    //                 marker = new ymaps.Placemark([lat, lng], {
    //                     balloonContent: balloon,
    //                     hintContent: title
    //                 }, {
    //                     iconLayout: 'default#image',
    //                     iconImageHref: markerIcon['url'],
    //                     iconImageSize: markerIcon['size'],
    //                     iconImageOffset: markerIcon['origin'],
    //                     zIndex: 1
    //                 });
    //
    //                 // Если есть дополнительные данные, добавим их к объекту маркера
    //                 if (typeof additionalData !== 'undefined') {
    //                     marker = $.extend(marker, additionalData);
    //                 }
    //
    //                 // Добавляем данные о кастомном маркере
    //                 if (typeof icon === 'object' && icon.url !== undefined) {
    //                     marker = $.extend(marker, {markerUrl: markerIcon.url});
    //                 }
    //
    //                 // Добавляем данные об активном маркере
    //                 if (markerIcon && markerIcon.activeUrl !== undefined) {
    //                     marker = $.extend(marker, {activeMarkerUrl: markerIcon.activeUrl});
    //                 }
    //
    //                 marker.events.add('click', function (e) {
    //                     if (params.hasOwnProperty('markerClick')) {
    //                         params.markerClick(id); // Вызываем кастомный обработчик клика по маркеру с его id
    //                     }
    //                     if (!_self.manualMarkerActivation) {
    //                         _self.setActive(id);
    //                     }
    //                 });
    //
    //                 markers[id] = marker;
    //             });
    //
    //             // Если не сформировано ни одного маркета
    //             if (markers.length === 0) return;
    //
    //             markers.forEach(function (item) {
    //                 _self.map.geoObjects.add(item);
    //             });
    //
    //             // Устанавливаем границы карты в зависимости от меток
    //             // Что бы элементы карты не прилипали к краю карты
    //             if (window.isMobile()) {
    //                 _self.map.margin.setDefaultMargin(30);
    //             } else {
    //                 _self.map.margin.setDefaultMargin(100);
    //             }
    //             _self.map.setBounds(_self.map.geoObjects.getBounds(), {
    //                 useMapMargin: true
    //             });
    //             if (params.list.length === 1) {
    //                 _self.map.setZoom(16, {duration: 1000});
    //             }
    //
    //             // // При нажатии на маркер ставим его  в центре
    //             // currentCenter = _self.getCenter(params.list);
    //             // _self.map.setCenter(
    //             //     _self.getCenter(params.list)
    //             // );
    //
    //             // После установки маркеров
    //             if (params.callback && typeof params.callback === 'function') {
    //                 params.callback(markers);
    //             }
    //         });
    //     };
    //
    //     _self.setActive = function (active) {
    //         if (_self.activeMarker) {
    //             markers[_self.activeMarker].options.set('iconImageHref', markers[_self.activeMarker].markerUrl !== undefined ?
    //                 markers[_self.activeMarker].markerUrl :
    //                 blackMarker);
    //             markers[_self.activeMarker].options.set('zIndex', 1);
    //         }
    //
    //         var marker = markers[active],
    //             lat = marker.geometry.getCoordinates()[0],
    //             lng = marker.geometry.getCoordinates()[1];
    //
    //         marker.options.set('iconImageHref',  marker.activeMarkerUrl !== undefined ? marker.activeMarkerUrl : orangeMarker);
    //         _self.activeMarker = active;
    //
    //         marker.options.set('zIndex', 2);
    //
    //         if (_self.activationCenter) {
    //             let currentZoom = _self.map.getZoom();
    //             _self.map.setCenter([lat, lng], currentZoom < 12 && _self.activationZoom ? 12 : currentZoom, {
    //                 checkZoomRange: true
    //             });
    //         }
    //     };
    //
    //     /**
    //      * Убирает активность с маркера и устанавливаем изначальный центр на карте
    //      */
    //     _self.unsetActive = function () {
    //         if (_self.activeMarker) {
    //             markers[_self.activeMarker].options.set('iconImageHref', markers[_self.activeMarker].markerUrl !== undefined ?
    //                 markers[_self.activeMarker].markerUrl :
    //                 blackMarker);
    //         }
    //
    //         if (_self.map.geoObjects.getLength() === 1) {
    //             _self.map.setZoom(16);
    //         } else {
    //             if (_self.activationZoom) {
    //                 _self.map.setBounds(_self.map.geoObjects.getBounds(), {
    //                     useMapMargin: true
    //                 });
    //             }
    //         }
    //     };
    //
    //     _self.setStatus = (items, status) => {
    //         for (let item of items) {
    //             markers[item].options.set('iconImageHref', status ?
    //                 markers[item].activeMarkerUrl !== undefined ?
    //                     markers[item].activeMarkerUrl :
    //                     orangeMarker :
    //                 markers[item].markerUrl !== undefined ?
    //                     markers[item].markerUrl :
    //                     blackMarker)
    //         }
    //     };
    //
    //     _self.getCenter = function (list) {
    //         var positionMax = {
    //                 lat: 0,
    //                 lng: 0
    //             },
    //             positionMin = {
    //                 lat: 0,
    //                 lng: 0
    //             };
    //
    //         list.forEach(function (item) {
    //             var lat = +item[1],
    //                 lng = +item[2];
    //
    //             if (lat > positionMax.lat) positionMax.lat = lat;
    //             if (lng > positionMax.lng) positionMax.lng = lng;
    //
    //             if (lat < positionMin.lat || !positionMin.lat) positionMin.lat = lat;
    //             if (lng < positionMin.lng || !positionMin.lng) positionMin.lng = lng;
    //         });
    //
    //         return [(positionMax.lat + positionMin.lat) / 2, (positionMax.lng + positionMin.lng) / 2];
    //     };
    //
    //     /**
    //      * Установка видимости маркера
    //      * @param marker
    //      * @param isVisible
    //      */
    //     _self.setVisible = function (marker, isVisible) {
    //         marker.options.set('visible', isVisible)
    //     };
    //
    //     return _self;
    // };
    //
    // _this.inputCounter = function (item) {
    //     var input = item.find('[maxlength]'),
    //         disabled = input.is(':disabled'),
    //         eventSet = 'js-counter--set';
    //
    //     if (!(disabled || item.hasClass(eventSet))) {
    //         var title = item.data('symbols-title'),
    //             max = parseInt(input.attr('maxlength'));
    //
    //         if (!title) {
    //             item.attr('data-symbols-title', 'Осталось символов');
    //         }
    //
    //         input.off('input').on('input', function (event) {
    //             var value = event.target.value.length,
    //                 newValue = max - value;
    //
    //             if (newValue === max) {
    //                 item.removeAttr('data-symbols');
    //             } else {
    //                 item.attr('data-symbols', newValue);
    //             }
    //         });
    //
    //         item.addClass(eventSet);
    //     }
    // };
    //
    // _this.select = function () {
    //     const selectClass = `select`;
    //     const selectClassActive = `select--active`;
    //     const selectReady = `select--init`;
    //     const template = (list, id) => `
    //         <div>
    //             <ul>
    //                 ${list.map((option) => `
    //                     <li>
    //                         <input
    //                             type="radio"
    //                             name="option-list-${id + 1}"
    //                             value="${option.value}"
    //                             data-content="${option.innerHTML}"
    //                             id="${id}-${option.value}">
    //                         <label for="${id}-${option.value}">${option.innerHTML}</label>
    //                     </li>
    //                 `).join(``)}
    //             </ul>
    //         </div>
    //     `;
    //     const item = $(`.${selectClass}`);
    //
    //     if (item.length) {
    //         item.each((i) => {
    //             const thisItem = item.eq(i);
    //             if (thisItem.hasClass(selectReady)) {
    //                 return;
    //             }
    //             const select = thisItem.find(`select`);
    //             const options = select.find(`option`);
    //             const activeOption = options.filter(`:selected`);
    //
    //             const optionsArr = [];
    //             options.each(function (indx, element) {
    //                 optionsArr.push(element);
    //             });
    //
    //             select.after(template(optionsArr, i));
    //
    //             const itemChange = (event) => {
    //                 let module;
    //
    //                 const value = event.target.value;
    //                 const content = $(event.target).data('content');
    //                 const newOptions = select.find(`option`);
    //
    //                 thisItem.attr(`data-title`, content);
    //                 newOptions.filter(`:selected`).prop(`selected`, false);
    //                 newOptions.filter(`[value="${value}"]`).prop(`selected`, true); // Установка значения селекта. Проблема: не туда устанавливается!
    //                 select.trigger(`change`);
    //                 thisItem.removeClass(selectClassActive); // Скрытие селекта при выборе опции
    //
    //                 module = select.data('module');
    //                 if (
    //                     module
    //                     &&
    //                     !!window[module]
    //                     &&
    //                     !!window[module]['run']
    //                     &&
    //                     !!window[module]['run']['call']
    //                 ) {
    //                     window[module].run(select.data('trigger'), select);
    //                 }
    //
    //                 select.trigger('select:afterChange');
    //             };
    //
    //             const radio = thisItem.find(`input[type=radio]`);
    //             radio.off('change').on(`change`, itemChange);
    //             radio.filter(`[value="${activeOption.val()}"]`).trigger(`click`);
    //
    //             thisItem.off('click').on(`click`, (event) => {
    //                 if ($(event.target).is(thisItem)) {
    //                     thisItem.toggleClass(selectClassActive); // Скрытие или открытие селекта при нажатии на него
    //                 } else {
    //                     thisItem.removeClass(selectClassActive); // Скрытие селекта при нажатии на другой селект
    //                 }
    //             });
    //
    //             // Для навигации табом
    //             /*thisItem
    //                 .off('focusin').on(`focusin`, (event) => {
    //                 thisItem.addClass(selectClassActive);
    //             })
    //                 .off('focusout').on(`focusout`, (event) => {
    //                 thisItem.removeClass(selectClassActive);
    //             });*/
    //
    //             // TODO: Лучше вешать не несколько событий на один элемент, а одно событие, и в нём сделать всё необходимое
    //             _document.on(`mousedown touchstart`, (event) => {
    //                 if (!($(event.target).is(thisItem) || thisItem.has(event.target).length)) {
    //                     thisItem.removeClass(selectClassActive); // Скрытие селекта при нажатии по области вне него
    //                 }
    //             });
    //
    //             select.off('update').on(`update`, (event, reset) => {
    //                 const options = select.find(`option`);
    //
    //                 const activeOption = reset ? options.filter(`:first`) : options.filter(`:selected`).length && options.filter(`:selected`) || options.filter(`:first`);
    //                 const list = thisItem.find('div');
    //
    //                 list.replaceWith(template([...options], i));
    //
    //                 const radio = thisItem.find(`input[type=radio]`);
    //                 radio.off('change').on(`change`, itemChange);
    //                 radio.filter(`[value="${activeOption.val()}"]`).trigger(`click`);
    //                 select.trigger('select:afterUpdate');
    //             });
    //
    //             thisItem.addClass(selectReady);
    //         });
    //     }
    // };
    //
    // /**
    //  * Helper for filtration
    //  * Need to add 'data-filter-rule' attr to button and 'data-filter-item' with the same value to items (multiple values can be specified separated by commas).
    //  * Add class 'current-filter' to current filter button.
    //  *
    //  * @param callback function. Call after filtering done.
    //  */
    // _this.filters = (callback) => {
    //     const filters = [],
    //         allFilters = $('[data-filter-rule]'),
    //         currentClass = 'current-filter',
    //         filterItems = $('[data-filter-item]'),
    //         filterReset = $('[data-filter-reset]:not(.js-init)');
    //
    //     let lazyLoad = new Helper.lazyLoad();
    //
    //     filterReset
    //         .off('click.filters')
    //         .on('click.filters', function (e) {
    //             if ($(this).hasClass($(this).data('active') || 'active')) {
    //                 e.preventDefault();
    //             } else {
    //                 return true;
    //             }
    //
    //             allFilters.filter('.' + currentClass).trigger('click');
    //         })
    //         .addClass('js-init');
    //
    //     allFilters.each(function () {
    //         let filterRule = $(this).data('filterRule').toString(),
    //             filterRuleArr;
    //         const ruleIndex = filters.indexOf(filterRule);
    //         // Если в filterRule список, составляем массив
    //         if (filterRule.indexOf(',') >= 0) {
    //             filterRuleArr = filterRule.split(',')
    //         }
    //         if (ruleIndex < 0) {
    //             filters.push(filterRule);
    //             let currentFilter = $(`[data-filter-rule="${filterRule}"]`);
    //             currentFilter.off('click.filters').on('click.filters', function () {
    //                 let resetFilter = currentFilter.hasClass(currentClass);
    //
    //                 allFilters.removeClass(currentClass);
    //
    //                 if (!resetFilter) {
    //                     currentFilter.addClass(currentClass);
    //                 }
    //
    //                 filterItems.hide();
    //                 if (typeof filterRuleArr !== 'undefined' && !resetFilter) { // Если data-filter-rule это массив
    //                     for (let rule in filterRuleArr) {
    //                         let currentItem = $(`[data-filter-item*="${filterRuleArr[rule]}"]`);
    //                         currentItem.show();
    //                         lazyLoad.init(currentItem.find('.lazyload'));
    //                     }
    //                 } else {
    //                     for (let item in filters) {
    //                         let currentItem = $(`[data-filter-item*="${filters[item]}"]`);
    //                         if (filters[item] === filterRule || filterRule === '' || resetFilter) {
    //                             currentItem.show();
    //                             lazyLoad.init(currentItem.find('.lazyload'));
    //                         }
    //                     }
    //                 }
    //                 if (callback && typeof callback === 'function') {
    //                     callback.apply(this);
    //                 }
    //
    //                 // Расставляем классы чётным и нечётным элементам фильтрации
    //                 filterItems.removeClass('even').removeClass('odd');
    //                 let visible = filterItems.not('[style="display: none;"]'),
    //                     even = true;
    //                 visible.each((i, el) => {
    //                     if (even) {
    //                         $(el).addClass('even');
    //                     } else {
    //                         $(el).addClass('odd');
    //                     }
    //                     even = !even;
    //                 });
    //             });
    //         }
    //     });
    // };
    //
    // _this.counter = function (object) {
    //     let show = function (counter) {
    //             return (
    //                     counter = +object.data('counter'))
    //                 && counter > 0
    //                 && object.html(prepareTime(--counter))
    //                 && object.data('counter', counter)
    //                 && setTimeout(show, 1000)
    //                 || xBork.activeTrigger.apply(object, ['check']
    //                 );
    //         },
    //         prepareTime = function (time) {
    //             let i, result = {
    //                 minutes: Math.floor(time / 60),
    //                 seconds: time % 60
    //             };
    //             for (i in result) {
    //                 if (result.hasOwnProperty(i)) {
    //                     result[i] = result[i].toString().slice(0, 2);
    //                     result[i] = result[i].length === 1 ? '0' + result[i] : result[i];
    //                 }
    //             }
    //             return ([result.minutes, result.seconds]).join(':');
    //         };
    //
    //     return show();
    // };
    //
    // _this.arrayHelper = function () {
    //     /* The method gets content by keys. e.g. getValueByKey({1:{2:{3:4}}},'1.2.3',false) will return 4 */
    //     this.getValue = function (object, key, defaultValue) {
    //         try {
    //             let i, temp;
    //
    //             key = !!key && !!key.split && key.split('.') || [];
    //             temp = object;
    //
    //             for (i in key) {
    //                 if (
    //                     key.hasOwnProperty(i)
    //                     &&
    //                     temp.hasOwnProperty
    //                     &&
    //                     temp.hasOwnProperty(key[i])
    //                 ) {
    //                     temp = temp[key[i]];
    //                 }
    //             }
    //
    //             return typeof temp === 'undefined' ? defaultValue : temp;
    //         }
    //         catch (e) {
    //             return defaultValue;
    //         }
    //     };
    //     /* The method gets content by one key. e.g. getValueByKey({1:{2:{3:4}}},'3',false) will return 4 */
    //     this.getValueByKey = function (object, key, defaultValue) {
    //         try {
    //             let i, temp, result = null;
    //
    //             temp = object;
    //
    //             for (i in temp) {
    //                 if (
    //                     temp.hasOwnProperty
    //                     &&
    //                     temp.hasOwnProperty(i)
    //                 ) {
    //                     if (i === key) {
    //                         result = temp[i];
    //                     }
    //                     else {
    //                         result = result !== null && result || this.getValueByKey(temp[i], key, defaultValue);
    //                     }
    //                 }
    //             }
    //
    //             return result !== null && result || defaultValue;
    //         }
    //         catch (e) {
    //             return defaultValue;
    //         }
    //     };
    //     this.getFormDataFromArray = function (form) {
    //         const formArray = form.serializeArray();
    //         const formObject = {};
    //
    //         $.map(formArray, function (n) {
    //             formObject[n['name']] = n['value'];
    //         });
    //
    //         return formObject;
    //     };
    //     this.getKeys = function () {
    //         let a, b = [];
    //
    //         for (a in this) {
    //             if (this.hasOwnProperty(a)) {
    //                 b.push(a);
    //             }
    //         }
    //
    //         return b;
    //     };
    // };
    //
    // _this.ArrayHelper = _this.arrayHelper;

    /**
     * Helper for lazyLoad images
     */
    _this.lazyLoad = () => {
        return {
            /**
             * Инициализация ленивой загрузки
             * @param {jQuery.element} elementsLazy - Набор элементов (изображений) для ленивой загрузки
             * @param {Object} options - Дополнительные опции
             * @param {bool} options.ignoreViewport - Принудительно загрузить изображение при инициализации, не смотря на его видимость
             * @param {string} options.ignoreSelector - Стока для фильтрации элементов, которые не нужно обрабатывать
             * @param {number} options.visibilityFrameX - Границы по горизонтали для конкретного экземпляра
             * @param {number} options.visibilityFrameY - Границы по вертикали для конкретного экземпляра
             * @param {Function} options.callback - Вызовется после загрузки элемента
             */
            init: function (elementsLazy, options) {
                const ignoreViewport = options !== undefined && options.ignoreViewport !== undefined ? options.ignoreViewport : false,
                    ignoreSelector = options !== undefined && options.ignoreSelector !== undefined ? options.ignoreSelector : false,
                    callback = options !== undefined && options.callback !== undefined ? options.callback : false;
                this.visibilityFrameX = options !== undefined && options.visibilityFrameX !== undefined ? options.visibilityFrameX : false;
                this.visibilityFrameY = options !== undefined && options.visibilityFrameY !== undefined ? options.visibilityFrameY : false;
                elementsLazy.each((i, e) => {
                    let element = $(e),
                        currentSrc = '',
                        currentAttr = 'data-src';
                    if (ignoreSelector && element.filter(ignoreSelector).length !== 0) {
                        return;
                    }
                    if (!ignoreViewport) {
                        if (!this.isInViewport(element.get(0))) return;
                    }
                    if (element.hasClass('lazyloaded')) {
                        return;
                    }
                    if (element.hasClass('lazyload')) {
                        element.removeClass('lazyload').addClass('lazyloading');
                    }

                    if (element.is('video')) { // video
                        let elementSrcMp4 = element.data('srcMp4'),
                            elementSrcWebm = element.data('srcWebm'),
                            supportWebm = element.get(0).canPlayType('video/webm');
                        if (supportWebm && elementSrcWebm) {
                            element.attr('src', String(elementSrcWebm));
                            currentSrc = elementSrcWebm;
                            currentAttr = 'data-webm-src';
                        } else if (elementSrcMp4) {
                            element.attr('src', String(elementSrcMp4));
                            currentSrc = elementSrcMp4;
                            currentAttr = 'data-mp4-src';
                        } else {
                            return;
                        }
                        element.one("loadeddata", () => {
                            element.removeClass('lazyloading').addClass('lazyloaded');
                            this.loadSimilar(elementsLazy, element, currentSrc, currentAttr, true);
                            if (Preloader !== undefined) Preloader.remove({element: element, parent: true});
                            if (typeof callback === 'function') {
                                callback(element);
                            }
                        });
                    } else { // img
                        let elementSrc = element.data('src');
                        if (elementSrc) {
                            element.attr('src', String(elementSrc));
                            let pictureElement = element.parent('picture');
                            if (pictureElement !== 0) {
                                pictureElement.find('source').each((i, e) => {
                                    let element = $(e);
                                    if (element.data('srcset')) {
                                        element.attr('srcset', String(element.data('srcset')));
                                    }
                                });
                            }
                            currentSrc = elementSrc;
                        } else {
                            return;
                        }
                        element.one("load", () => {
                            element.removeClass('lazyloading').addClass('lazyloaded');
                            this.loadSimilar(elementsLazy, element, currentSrc, currentAttr, false);
                            if (Preloader !== undefined) Preloader.remove({element: element, parent: true});
                            if (typeof callback === 'function') {
                                callback(element);
                            }
                        });
                    }
                });
            },

            /**
             * Загрузить все аналогичные изображения из набора
             *
             * @param elementsLazy
             * @param element
             * @param src
             * @param attr
             * @param isVideo
             */
            loadSimilar: function (elementsLazy, element, src, attr, isVideo) {
                let similars = null;

                if (isVideo) {
                    return elementsLazy.not(element).filter(`img[${attr}="${src}"]`).attr('src', src).removeClass('lazyload').addClass('lazyloaded');
                }

                let promise = $.Deferred(() => {
                    let img = new Image();

                    img.onload = function () {
                        if (/youtube/i.test(img.src)) {
                            if (img.naturalHeight !== 90 && img.naturalWidth !== 120) {
                                promise.resolve(src);
                            } else {
                                promise.reject();
                            }
                        } else {
                            promise.resolve(src);
                        }
                    };
                    img.onerror = function () {
                        promise.reject();
                    };
                    img.src = src;
                });

                promise.then(
                    (src) => {
                        similars = elementsLazy.not(element).filter(`img[${attr}="${src}"]`);
                        similars.each((i, e) => {
                            let similar = $(e);
                            if (Preloader !== undefined) Preloader.remove({element: similar, parent: true});
                        });
                        similars.attr('src', src).removeClass('lazyload').addClass('lazyloaded');
                    },
                    () => {
                        element.parent().hide();
                    }
                );
            },

            isInViewport: function (element) {
                // Величина отступа от краёв видимой области, в которую должен попасть элемент для его видимости (в пикселях)
                const visibilityFrameX = this.visibilityFrameX ? this.visibilityFrameX : 20, // Отступ справа и слева
                    visibilityFrameY = this.visibilityFrameY ? this.visibilityFrameY : -100; // Отступ сверху и снизу
                let rect = element.getBoundingClientRect();
                let html = document.documentElement;
                return (
                    rect.top <= (window.innerHeight || html.clientHeight) - visibilityFrameY && rect.left <= (window.innerWidth || html.clientWidth) - visibilityFrameX
                    &&
                    rect.bottom >= visibilityFrameY && rect.right >= visibilityFrameX
                );
            },

            preloader: function (action, element) {
                switch (action) {
                    case 'add':
                        if (element.hasClass('product-white__img')) {
                            Preloader.add({
                                element: element,
                                parent:'.product-white__picture-wrapper',
                                type: 'gradient'
                            });
                        }
                        break;
                    case 'remove':
                        if (element.hasClass('product-white__img')) {
                            Preloader.remove({
                                element: element,
                                parent:'.product-white__picture-wrapper',
                                type: 'gradient'
                            });
                        }
                        break;
                }
            }
        }
    };


    // _this.base64EncodeUnicode = (str) => {
    //     return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
    //         (match, p1) => {
    //             return String.fromCharCode('0x' + p1);
    //         })
    //     );
    // };
    //
    // _this.base64DecodeUnicode = (str) => {
    //     return decodeURIComponent(atob(str).split('').map(
    //         (c) => {
    //             return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    //         })
    //         .join('')
    //     );
    // };
    //
    // _this.isHandler = (name) => {
    //     return !!_this[name];
    // };
    //
    // _this.setHandler = function (name, func) {
    //     this[name] = func;
    // };
    //
    // _this.getHandler = (name) => {
    //     if (_this.isHandler(name)) {
    //         return _this[name];
    //     }
    //
    //     throw new Error('Not found ' + name + ' in Helper');
    // };
    //
    // _this.setScript = function (url) {
    //     let n = document.getElementsByTagName("script")[0],
    //         s = document.createElement("script"),
    //         f = function () {
    //             n.parentNode.insertBefore(s, n);
    //         };
    //
    //     s.type = "text/javascript";
    //     s.async = true;
    //     s.defer = true;
    //     s.src = (document.location.protocol === "https:" ? "https:" : "http:") + url;
    //
    //     window.opera === "[object Opera]" ? document.addEventListener("DOMContentLoaded", f, false) : f();
    //
    //     return s;
    // };
    //
    // _this.prepareCSRF = (data) => {
    //     data[$('meta[name=csrf-param]').attr('content')] = $('meta[name=csrf-token]').attr('content');
    //
    //     return data;
    // };
    //
    // _this.objectFitPolyfill = function () {
    //     return {
    //         init: function (context) {
    //             /*console.log(`objectFitPolyfill`);*/
    //             let currentContext;
    //             if (context !== undefined) {
    //                 currentContext = context;
    //             } else {
    //                 currentContext = $('body');
    //             }
    //             const containers = currentContext.find('.object-fit-container');
    //             let container, img, imgUrl, imgSrc;
    //             containers.each((indx, elem) => {
    //                 container = $(elem);
    //                 img = container.find("img");
    //                 imgSrc = container.find("img").prop("src");
    //                 imgUrl = imgSrc !== '' ? imgSrc : container.find("img").data("src");
    //                 if (imgUrl) {
    //                     container.css("backgroundImage", 'url(' + imgUrl + ')');
    //                 }
    //             });
    //         }
    //     }
    // };
    //
    window.Helper = _this;
    //
    // window.Helper.map = _this.helperMap;
    //
    // window.Helper.yaMap = _this.helperYandexMap;
    //
    // window.Helper.refreshToken = () => {
    //     let a = window,
    //         b = ["XHUwMDJmXHUwMDYxXHUwMDZhXHUwMDYxXHUwMDc4XHUwMDJmXHUwMDMxXHUwMDJlXHUwMDMwXHUwMDJmXHUwMDZkXHUwMDYxXHUwMDY5XHUwMDZlXHUwMDJmXHUwMDMwXHUwMDJmXHUwMDcyXHUwMDY1XHUwMDY2XHUwMDcyXHUwMDY1XHUwMDczXHUwMDY4XHUwMDU0XHUwMDZmXHUwMDZiXHUwMDY1XHUwMDZlXHUwMDJlXHUwMDZhXHUwMDczXHUwMDZmXHUwMDZl", "XHUwMDYzXHUwMDZmXHUwMDZlXHUwMDc0XHUwMDY1XHUwMDZlXHUwMDc0", "XHUwMDY5XHUwMDZlXHUwMDcwXHUwMDc1XHUwMDc0XHUwMDViXHUwMDc0XHUwMDc5XHUwMDcwXHUwMDY1XHUwMDNkXHUwMDIyXHUwMDY4XHUwMDY5XHUwMDY0XHUwMDY0XHUwMDY1XHUwMDZlXHUwMDIyXHUwMDVkXHUwMDViXHUwMDZlXHUwMDYxXHUwMDZkXHUwMDY1XHUwMDNkXHUwMDIyXHUwMDIzXHUwMDIzXHUwMDIyXHUwMDVk", "XHUwMDZkXHUwMDY1XHUwMDc0XHUwMDYxXHUwMDViXHUwMDZlXHUwMDYxXHUwMDZkXHUwMDY1XHUwMDNkXHUwMDIyXHUwMDYzXHUwMDczXHUwMDcyXHUwMDY2XHUwMDJkXHUwMDcwXHUwMDYxXHUwMDcyXHUwMDYxXHUwMDZkXHUwMDIyXHUwMDVk", "XHUwMDZkXHUwMDY1XHUwMDc0XHUwMDYxXHUwMDViXHUwMDZlXHUwMDYxXHUwMDZkXHUwMDY1XHUwMDNkXHUwMDIyXHUwMDYzXHUwMDczXHUwMDcyXHUwMDY2XHUwMDJkXHUwMDc0XHUwMDZmXHUwMDZiXHUwMDY1XHUwMDZlXHUwMDIyXHUwMDVk", "XHUwMDYxXHUwMDZhXHUwMDYxXHUwMDc4", "XHUwMDYxXHUwMDc0XHUwMDc0XHUwMDcy", "XHUwMDZhXHUwMDUxXHUwMDc1XHUwMDY1XHUwMDcyXHUwMDc5", "XHUwMDcyXHUwMDY1XHUwMDcwXHUwMDZjXHUwMDYxXHUwMDYzXHUwMDY1", "XHUwMDczXHUwMDc1XHUwMDYzXHUwMDYzXHUwMDY1XHUwMDczXHUwMDcz", "XHUwMDc1XHUwMDcyXHUwMDZj", "XHUwMDc2XHUwMDYxXHUwMDZj"],
    //         c = (d) => {
    //             const e = Helper.base64DecodeUnicode, f = e('SlNPTg=='), g = e('cGFyc2U=');
    //             return a[f][g]('"' + e(b[d]) + '"');
    //         }, h = (m) => {
    //             let r = $(c(3))[c(6)](c(1)), s = m.data || m;
    //             if (!!s[r]) {
    //                 $(c(4))[c(6)](c(1), s[r]);
    //                 $(c(2)[c(8)]('##', r))[c(11)](s[r]);
    //             }
    //         }, i = {};
    //     i[c(10)] = c(0);
    //     i[c(9)] = h;
    //     a[c(7)][c(5)](i);
    // };

    return window.Helper;
})();
