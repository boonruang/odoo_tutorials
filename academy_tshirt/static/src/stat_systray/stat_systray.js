/** @odoo-module */

import { registry } from "@web/core/registry";
import { getDefaultConfig } from "@web/views/view";
import { useService } from "@web/core/utils/hooks";
import { Domain } from "@web/core/domain";

const { Component, onWillStart,useSubEnv } = owl;

export class StatSystray extends Component {
    setup() {

        useSubEnv({
            config: {
                ...getDefaultConfig(),
                ...this.env.config,
            },
        });


        // this.statService = useService("statistics");
        this.action = useService("action");
        this.tshirtService = useService("tshirtService");

        onWillStart(async () => {
            // this.statistics = await this.statService.loadStatistics();
            this.statistics = await this.tshirtService.loadStatistics();
        });
    }

    openNewOrders() {
        this.action.doAction({
            type: "ir.actions.act_window",
            name: "New orders",
            res_model: "academy_tshirt_order",
            domain: new Domain("[('state', '=', 'new')]").toList(),
            views: [
                [false, "list"],
                [false, "form"]
            ]
        });
    }
}

StatSystray.template = "academy_tshirt.StatSystray";
export const systrayItem = {
    Component: StatSystray
}
registry.category("systray").add("academy_tshirt.Statistics",systrayItem, { sequence: 1000});