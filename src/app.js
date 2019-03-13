import 'normalize.css'

import jQuery from 'jquery';

import './js/jq-selectmenu';
import './js/notify';
//import './js/checkCardCVV';
import './js/inputProcessor'

import './scss/main.scss';



jQuery(function() {
    var notify = jQuery('.notify').notify();

    function createNotify(elemet, code) {

        var settings = elemet.data('settings');

        var errorMessages = {
            'ACCEPTED'      : "Успех",
            'EMPTY_VALUE'   : "Это поле нужно заполнить обязательно.",
            'LONG_VALUE'    : "Значение должно быть не более " + settings.maxLength + ' символов.',
            'SHORT_VALUE'   : "Значение должно быть не менее " + settings.minLength + ' символов.',
            'REG_ERROR'     : "Неверный формат значения",
        };

        var title = elemet.attr('title');
        var content = errorMessages[code];

        notify.notify('show', {'title' : title, 'content' : content});
        //jQuery('.notify').notify('show', {'title' : title, 'content' : content});
    }

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
    });

    var cvv = jQuery( ".card__input-cvv" ).inputProcessor({
        'minLength'     : 3,
        'maxLength'     : 4,
        'accepted'		: inputAccepted,
        'rejected'		: inputRejected,
    });
    var holder = jQuery( ".card__input-holder" ).inputProcessor({
        'maxLength'     : 50,
        'minLength'     : 3,
        'testRegExp'	: /^[a-zA-Z]+\s+[a-zA-Z]+$/,
        'processRegExp'	: /^[a-zA-Z\s]+$/,
        'accepted'		: inputAccepted,
        'rejected'		: inputRejected,
    });


    jQuery( "form" ).submit(function(e) {
        jQuery( ".notify" ).html("");

        var option = {
            'success'		: function (element) {
                //console.log('ACCEPTED', $this);
            },
            'error'		: function (element, code) {
                //console.log('ERROR', elemet, code);

                createNotify(element, code)

                e.preventDefault();
            },
        };
        number.inputProcessor('test', option);
        cvv.inputProcessor('test', option);
        holder.inputProcessor('test', option);
    });
});


