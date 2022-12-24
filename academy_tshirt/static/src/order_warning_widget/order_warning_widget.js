/** @odoo-module */

import { registry } from "@web/core/registry";

const { Component } = owl;

class OrderWarningWidget extends Component {
    get warnings() {
        const warningsList = [];
        if (this.props.record.data.image_url.length === 0){
            warningsList.push("This is no image");
        }
        if (this.props.record.data.amount > 100) {
            warningsList.push("Add promotional meterial");
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