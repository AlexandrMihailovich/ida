import 'normalize.css'

import jQuery from 'jquery';

import './js/jq-selectmenu';
//import './js/checkCardNumber.js';
//import './js/checkCardCVV';
import './js/inputProcessor'

import './scss/main.scss';



jQuery(function() {
    jQuery( ".card__mouth" ).selectmenu({
        classes: {
          "ui-selectmenu-button": "card__input card__input-data card__mouth"
        }
      });
    jQuery( ".card__year" ).selectmenu({
        classes: {
          "ui-selectmenu-button": "card__input card__input-data card__year"
        }
      });

    var inputError = function(element) {
        element.addClass("card__input-error");
    };
    var inputAccepted = function(element) {
        element.removeClass("card__input-error");
    };

    var number = jQuery( ".card__input-number" ).inputProcessor({
        'accepted'		: inputAccepted,
        'rejected'		: inputError,
        'reachEnd'      : function(element) {
            element.next(".card__input-number").focus();
        },
        'shortLength'    : inputError,
        'emptyValue'     : inputError,
        'overLength'     : inputError
    });//.inputProcessor('test');

    var cvv = jQuery( ".card__input-cvv" ).inputProcessor({
        'maxLength'     : 3,
        'minLength'     : 3,
        'accepted'		: inputAccepted,
        'rejected'		: inputError,
        'shortLength'   : inputError,
        'overLength'    : inputError,
        'emptyValue'     : inputError,
    });
    var holder = jQuery( ".card__input-holder" ).inputProcessor({
        'maxLength'     : 50,
        'minLength'     : 3,
        'testRegExp'		: /^[a-zA-Z]+\s+[a-zA-Z]+$/,
        'processRegExp'		: /^[a-zA-Z\s]+$/,
        'accepted'		: inputAccepted,
        'rejected'		: inputError,
        'shortLength'   : inputError,
        'overLength'    : inputError,
        'emptyValue'     : inputError,
    });

    jQuery( "form" ).submit(function(e) {
        //jQuery( ".notify" ).html("");

        var option = {
            'success'		: function ($this) {
                console.log('ACCEPTED', $this);
            },
            'error'		: function ($this, result) {
                console.log('ERROR', result, $this);


                var item = jQuery( "<div>" )
                    .addClass('notify__item')
                    .text('ERROR: ' + result)
                    .prependTo(".notify");

                setTimeout(function() {
                    item.fadeOut(function() {
                        jQuery(this).remove();
                    });
                }, 3000);

                e.preventDefault();
            },
        };
        number.inputProcessor('test', option);
        cvv.inputProcessor('test', option);
        holder.inputProcessor('test', option);
        //e.preventDefault();
        //return false;
    });
});


