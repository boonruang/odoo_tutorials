/** @odoo-module **/ 

import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks"
import { getDefaultConfig } from "@web/views/view";

const { Component,useSubEnv } = owl;

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


    }
}
myService.components = {};
myService.template = "academy_tshirt.myservice";
registry.category("actions").add("academy_tshirt.myservice",myService)
