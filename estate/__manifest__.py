# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

{
    'name': "estateONE",
    'version': '1.0',
    'depends': ['base','web','mail'],
    'author': "VPANO Studio",
    'category': 'Category',
    'description': """
    I'm sure, you make It's happen.
    """,
    "license": "LGPL-3",
    # data files always loaded at installation
    'data': [
        'security/ir.model.access.csv',
        'views/estate_property_views.xml',
        'views/estate_property_type_views.xml',
        'views/estate_property_tag_views.xml',
        'views/estate_property_offer_views.xml',
        'views/res_users_view.xml',
        'views/estate_menus.xml',
    ],
    "application": True,

}