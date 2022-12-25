/** @odoo-module */

import { loadJS } from "@web/core/assets";
import { getColor } from "@web/views/graph/colors";

const { Component, onWillStart, useRef, onMounted, onWillUnmount } = owl;

export class LineChart extends Component {
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

    onLineClick(ev, chartElem) {
        const clickedIndex = chartElem[0]._index;
        this.props.onLineClick(this.labels[clickedIndex]);
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
                onClick: this.onLineClick.bind(this),
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

LineChart.template = "academy_tshirt.LineChart";
LineChart.props = {
    data: { type: Object },
    label: { type: String },
    onLineClick: { type: Function },
};