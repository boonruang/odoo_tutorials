# -*- coding: utf-8 -*-
{
    'name': "Academy Tshirt",

    'summary': """
        Short (1 phrase/line) summary of the module's purpose, used as
        subtitle on modules listing or apps.openerp.com""",

    'description': """
        Pratice app from Awesome tshirt app and named academy tshirt
    """,

    'author': "VPANO360",
    'website': "https://www.vpano360.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/16.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Productivities',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base','web','mail'],

    # always loaded
    'data': [
        'security/ir.model.access.csv',
        'views/views.xml',
        # 'views/templates.xml',
    ],
    # only loaded in demonstration mode
    # 'demo': [
    #     'demo/demo.xml',
    # ],

    'assets': {
        'web.assets_backend': [
            'academy_tshirt/static/src/**/*'
        ]
    }
}
