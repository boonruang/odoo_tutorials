/** @odoo-module */

import { registry } from "@web/core/registry";

const { Component,markup } = owl;

class OrderWarningWidget extends Component {
    get warnings() {
        const warningsList = [];
        if (this.props.record.data.image_url.length === 0){
            warningsList.push(markup("This is no <b> image </b>"));
        }
        if (this.props.record.data.amount > 100) {
            warningsList.push(markup("Add promotional <b> meterial </b>"));
        }
        return warningsList;
    }
}

OrderWarningWidget.template = "academy_tshirt.OrderWarningWidget";
OrderWarningWidget.fieldDependencies = {
    image_url: { type : "char"},
    amount: { type : "float" }
};

registry.category("view_widgets").add("order_warning",OrderWarningWidget)