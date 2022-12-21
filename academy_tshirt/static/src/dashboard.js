/** @odoo-module **/ 

import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { getDefaultConfig } from "@web/views/view";

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
    }
}

AcademyDashboard.components = { Layout };
AcademyDashboard.template = "academy_tshirt.clientaction";

registry.category("actions").add("academy_tshirt.dashboard",AcademyDashboard)
