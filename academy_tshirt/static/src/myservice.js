/** @odoo-module **/ 

import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks"
import { getDefaultConfig } from "@web/views/view";
import { Layout } from "@web/search/layout";
import { Card } from "./card/card"
import { PieChart } from "./pie_chart/pie_chart"

const { Component,useSubEnv,onWillStart } = owl;

class myService extends Component {
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
        this.rpc = useService("rpc");

        this.keyToString = {
            average_quantity: "Average amount of t-shirt by order this month",
            average_time: "Average time for an order to go from 'new' to 'sent' or 'cancelled'",
            nb_cancelled_orders: "Number of cancelled orders this month",
            nb_new_orders: "Number of new orders this month",
            total_amount: "Total amount of new orders this month",
        };

        onWillStart(async () => {
            this.statistics = await this.rpc("/academy_tshirt/statistics");
        });       
    }

    openCustomerView() {
        this.action.doAction("base.action_partner_form");
    }
}

myService.components = { Layout, Card, PieChart };
myService.template = "academy_tshirt.serviceaction";
registry.category("actions").add("academy_tshirt.myservice",myService)
