from odoo import models, fields

class EstatePropertyTag(models.Model):
    _name = "estate.property.tag"
    _description = "real estate property tag"
    _order = "name"

    _sql_constraints = [
        ("check_name", "UNIQUE(name)", "The name must be unique")
    ]

    # Basic
    name = fields.Char("Name", required=True)
    color =fields.Integer("Color Index")