# -*- coding: utf-8 -*-

from odoo import models

class IrHttp(models.AbstractModel):
    _inherit = 'ir.http'

    def session_info(self):
        res = super(IrHttp, self).session_info()
        res['tshirt_statistics'] = self.env["academy_tshirt_order"].get_statistics()
        return res