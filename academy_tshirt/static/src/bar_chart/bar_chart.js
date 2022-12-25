/** @odoo-module */

import { loadJS } from "@web/core/assets";
import { getColor } from "@web/views/graph/colors";

const { Component, onWillStart, useRef, onMounted, onWillUnmount } = owl;

export class BarChart extends Component {
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

    onBarClick(ev, chartElem) {
        const clickedIndex = chartElem[0]._index;
        this.props.onBarClick(this.labels[clickedIndex]);
    }

    renderChart() {
        if (this.chart) {
            this.chart.destroy();
        }
        this.chart = new Chart(this.canvasRef.el, {
            type: "bar",
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
                onClick: this.onBarClick.bind(this),
                scales: {
                    yAxes: [
                        {
                          ticks: {
                            beginAtZero: true
                          }
                        }
                      ]
                }
            },            
        });
    }
}

BarChart.template = "academy_tshirt.BarChart";
BarChart.props = {
    data: { type: Object },
    label: { type: String },
    onBarClick: { type: Function },
};