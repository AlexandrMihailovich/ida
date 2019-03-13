import 'jquery-ui/themes/base/theme.css'
import 'jquery-ui/themes/base/core.css'
import 'jquery-ui/themes/base/menu.css'
import 'jquery-ui/themes/base/button.css'
import 'jquery-ui/themes/base/selectmenu.css'

import 'jquery-ui/ui/widgets/selectmenu';

import jQuery from 'jquery';

jQuery(function() {
    jQuery( ".card__mouth" ).selectmenu({
        classes: {
            "ui-selectmenu-button": "card__input card__input-date card__mouth"
        }
    });
    jQuery( ".card__year" ).selectmenu({
        classes: {
            "ui-selectmenu-button": "card__input card__input-date card__year"
        }
    });
});
