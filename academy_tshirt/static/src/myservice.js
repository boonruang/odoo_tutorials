/** @odoo-module **/ 

import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks"
import { Domain } from "@web/core/domain"
import { getDefaultConfig } from "@web/views/view";
import { Layout } from "@web/search/layout";
import { Card } from "./card/card"
import { PieChart } from "./pie_chart/pie_chart"
import { LineChart } from "./line_chart/line_chart"
import { BarChart } from "./bar_chart/bar_chart"
import { DoughnutChart } from "./doughnut_chart/doughnut_chart"
import { sprintf } from "@web/core/utils/strings"

const { Component,useSubEnv,onWillStart, useState } = owl;

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
        this.state = useState({ value: 0});

        this.keyToString = {
            average_quantity: this.env._t("Average amount of t-shirt by order this month"),
            average_time: this.env._t(
                "Average time for an order to go from 'new' to 'sent' or 'cancelled'"
            ),
            nb_cancelled_orders: this.env._t("Number of cancelled orders this month"),
            nb_new_orders: this.env._t("Number of new orders this month"),
            total_amount: this.env._t("Total amount of new orders this month"),
        }

        onWillStart(async () => {
            this.statistics = await this.rpc("/academy_tshirt/statistics");
        });       
    }

    increment() {
        this.state.value++;
    }

    decrement() {
        this.state.value--;
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

    openFilteredBySizeOrders(size) {
        const title = sprintf(this.env._t("Filtered orders by %s size"), size);
        const domain = `[('size','=', '${size}')]`;
        this.openOrders(title, domain);
    }    
}

myService.components = { Layout, Card, PieChart, LineChart, BarChart, DoughnutChart };
myService.template = "academy_tshirt.serviceaction";
registry.category("actions").add("academy_tshirt.myservice",myService)
