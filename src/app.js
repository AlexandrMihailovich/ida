import 'normalize.css'

import jQuery from 'jquery';

import './js/jq-selectmenu';
import './js/notify';
import './js/toggleMenu';
import './js/inputProcessor'

import './scss/main.scss';



jQuery(function() {
    'use strict';

    var notify = jQuery('.notify').notify();

    function createNotify(element, code) {

        var settings = element.data('settings');

        var errorMessages = {
            'ACCEPTED'      : "Успех",
            'EMPTY_VALUE'   : "Это поле обязательно нужно заполнить.",
            'LONG_VALUE'    : "Значение должно быть не более " + settings.maxLength + ' символов.',
            'SHORT_VALUE'   : "Значение должно быть не менее " + settings.minLength + ' символов.',
            'REG_ERROR'     : "Неверный формат данных.",
        };

        if (element.attr('name') === 'holder-input')  {
            errorMessages['REG_ERROR'] += ' Допустимы только символы латинского алфавита(A-Z) и пробел, обязательно должны присутвовать два слова, имя и фамилия. Пример: CARD HOLDER.'
        } else if (element.attr('class') === 'card__input-number'
            || element.attr('name') === 'cvv-input')  {
            errorMessages['REG_ERROR'] += ' Разрешены только числа(0-9).'
        }

        var title = element.attr('title');
        var content = errorMessages[code];

        notify.notify('show', {'title' : title, 'content' : content});
    }

    jQuery('.card_help-button').click(function() {
        notify.notify('show', {
            'title' : 'CVV2/CVC2',
            'content' : 'Этот трехзначный код указан на обороте карты.'
        });
    });

    var inputRejected = function(element) {
        element.addClass("card__input-error");
    };
    var inputAccepted = function(element) {
        element.removeClass("card__input-error");
    };

    var number = jQuery( ".card__input-number" ).inputProcessor({
        'accepted'		: inputAccepted,
        'rejected'		: inputRejected,
        'reachEnd'      : function(element) {
            element.next(".card__input-number").focus();
        },
        'regExpError'   : function () {
            notify.notify('clean').notify('show', {
                'title' : 'Ошибка',
                'content' : 'Разрешены только числа(0-9).'
            });
        }
    });

    var cvv = jQuery( ".card__input-cvv" ).inputProcessor({
        'minLength'     : 3,
        'maxLength'     : 3,
        'accepted'		: inputAccepted,
        'rejected'		: inputRejected,
        'regExpError'   : function () {
            notify.notify('clean').notify('show', {
                'title' : 'Ошибка',
                'content' : 'Разрешены только числа(0-9).'
            });
        }
    });
    var holder = jQuery( ".card__input-holder" ).inputProcessor({
        'maxLength'     : 50,
        'minLength'     : 4,
        'testRegExp'	: /^[a-zA-Z]+\s+[a-zA-Z]+$/,// format: CARD HOLDER
        'processRegExp'	: /^[a-zA-Z\s]+$/,// format: a-zA-Z
        'accepted'		: inputAccepted,
        'rejected'		: inputRejected,
        'regExpError'   : function () {
            notify.notify('clean').notify('show', {
                'title': 'Ошибка',
                'content': 'Разрешены только буквы латинского алфавита(A-Z) и проблел, обязательно должны присутвовать два слова, имя и фамилия. Пример: CARD HOLDER.'
            });
        }
    });


    jQuery( "form" ).submit(function(e) {
        notify.notify('clean');

        var option = {
            'regExpError'   :function(){},
            'error'		: function (element, code) {
                createNotify(element, code);
                e.preventDefault();
            },
        };
        number.inputProcessor('test', option);
        cvv.inputProcessor('test', option);
        holder.inputProcessor('test', option);
    });
});


