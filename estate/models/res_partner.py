# -*- coding: utf-8 -*-

from odoo import fields, models

class ResPartner(models.Model):

    _inherit = "res.partner"

    property_ids = fields.One2many(
        "estate.property","buyer_id",string="Properties"
    )