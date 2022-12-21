/** @odoo-module **/ 

import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { getDefaultConfig } from "@web/views/view";
import { useService } from "@web/core/utils/hooks"
import { Domain } from "@web/core/domain"

const { Component,useSubEnv } = owl;

class AcademyDashboard extends Component {
    setup() {
        useSubEnv({
            config: {
                ...getDefaultConfig(),
                ...this.env.config,
            },
        });
        
        this.display = {
            controlPanel: { "top-right": false, "bottom-right" : false}
        };

        this.action = useService("action");

    }

    openCustomerView() {
        this.action.doAction("base.action_partner_form");
    }

    openOrders(title,domain) {
        this.action.doAction({
            type: "ir.actions.act_window",
            name: title,
            res_model: "academy_tshirt_order",
            domain: new Domain(domain).toList(),
            views: [
                [false, "list"],
                [false, "form"]
            ]
        })
    }

    openLast7DaysOrders() {
        const domain = 
        "[('create_date', '>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d'))]";
        this.openOrders("Last 7 days orders", domain);
    }

    openLast7DaysCancelledOrders() {
        const domain = 
        "[('create_date', '>=', (context_today() - datetime.timedelta(days=7)).strftime('%Y-%m-%d')),('state', '=', 'cancelled')]";
        this.openOrders("Last 7 days cancelled orders", domain);
    }    
}

AcademyDashboard.components = { Layout };
AcademyDashboard.template = "academy_tshirt.clientaction";

registry.category("actions").add("academy_tshirt.dashboard",AcademyDashboard)
