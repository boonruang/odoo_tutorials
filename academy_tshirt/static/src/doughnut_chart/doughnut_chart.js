/** @odoo-module */

import { loadJS } from "@web/core/assets";
import { getColor } from "@web/views/graph/colors";

const { Component, onWillStart, useRef, onMounted, onWillUnmount } = owl;

export class DoughnutChart extends Component {
    setup() {
        this.canvasRef = useRef("canvas");

        this.labels = Object.keys(this.props.data);
        this.data = Object.values(this.props.data);
        this.color = this.labels.map((_, index) => {
            return getColor(index);
        });

        onWillStart(() => {
            return loadJS(["/web/static/lib/Chart/Chart.js"]);
        });

        onMounted(() => {
            this.renderChart();
        });

        onWillUnmount(() => {
            if (this.chart) {
                this.chart.destroy();
            }
        });
    }

    onDoughnutClick(ev, chartElem) {
        const clickedIndex = chartElem[0]._index;
        this.props.onDoughnutClick(this.labels[clickedIndex]);
    }

    renderChart() {
        if (this.chart) {
            this.chart.destroy();
        }
        this.chart = new Chart(this.canvasRef.el, {
            type: "doughnut",
            data: {
                labels: this.labels,
                datasets: [
                    {
                        label: this.env._t(this.props.label),
                        data: this.data,
                        backgroundColor: this.color,
                    },
                ],
            },
            options: {
                onClick: this.onDoughnutClick.bind(this),
            },            
        });
    }
}

DoughnutChart.template = "academy_tshirt.DoughnutChart";
DoughnutChart.props = {
    data: { type: Object },
    label: { type: String },
    onDoughnutClick: { type: Function },
};