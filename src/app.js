import jQuery from 'jquery';

import './js/jq-selectmenu';
import './js/checkCartNumber.js';
import './scss/main.scss';

jQuery(function() {
    jQuery( ".cart__mouth" ).selectmenu({
        classes: {
          "ui-selectmenu-button": "cart__input cart__input-data cart__mouth"
        }
      });
    jQuery( ".cart__year" ).selectmenu({
        classes: {
          "ui-selectmenu-button": "cart__input cart__input-data cart__year"
        }
      });
});


