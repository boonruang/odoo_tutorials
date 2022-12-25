/** @odoo-module */

import { registry } from "@web/core/registry";
import { kanbanController } from "@web/views/kanban/kanban_controller";
import { kanbanView } from "@web/views/kanban/kanban_view";
import { useInterval } from "../utils";

class AutoreloadKanbanController extends kanbanController {
    setup() {
        super.setup();
        useInterval(() => {
            this.model.load();
        },30_000);
    }
}

const AutoreloadKanbanView = {
    ...kanbanView,
    Controller: AutoreloadKanbanController
}

registry.category("views").add("autoreloadkanban",AutoreloadKanbanView);