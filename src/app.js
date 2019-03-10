import jQuery from 'jquery';

import './js/jq-selectmenu';
import './js/checkCardNumber.js';
import './js/checkCardCVV';

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
});


