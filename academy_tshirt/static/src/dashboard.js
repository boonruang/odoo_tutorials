/** @odoo-module **/ 

import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { getDefaultConfig } from "@web/views/view";
import { useService } from "@web/core/utils/hooks"
import { Domain } from "@web/core/domain"
import { Card } from "./card/card"

const { Component,useSubEnv, onWillStart } = owl;

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
        // this.rpc = useService("rpc");
        this.tshirtService = useService("tshirtService");

        this.keyToString = {
            average_quantity: "the average number of t-shirts by order",
            average_time: "the average for an order to go from 'new' to 'sent' or 'cancelled'",
            nb_cancelled_orders: "Number of cancelled orders this month",
            nb_new_orders: "the number of new orders this month",
            total_amount: "the total amount of orders this month" 
        }
        onWillStart(async () => {
            // this.statistics = await this.rpc("/academy_tshirt/statistics");
            this.statistics = await this.tshirtService.loadStatistics();
        })

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

AcademyDashboard.components = { Layout, Card };
AcademyDashboard.template = "academy_tshirt.clientaction";

registry.category("actions").add("academy_tshirt.dashboard",AcademyDashboard)
