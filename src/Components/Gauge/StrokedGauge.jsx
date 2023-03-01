import React, { Component } from "react";
import Chart from 'react-apexcharts'

class RadialBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
    
      series: [66],
      options: {
        chart: {
          height: 350,
          type: 'radialBar',
          offsetY: -10
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 135,
            dataLabels: {
              name: {
                fontSize: '16px',
                color: undefined,
                offsetY: 120
              },
              value: {
                offsetY: 76,
                fontSize: '22px',
                color: undefined,
                formatter: function (val) {
                  return val + "%";
                }
              }
            }
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
              shade: 'dark',
              shadeIntensity: 0.15,
              inverseColors: false,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 50, 65, 91]
          },
        },
        stroke: {
          dashArray: 4
        },
        labels: ['Progress'],
      },
    };
  }

  render() {
    return (
      <div className="RadialBar">
        <Chart options={this.state.options} series={this.state.series} type="radialBar" height={350} />
      </div>
     );
    }
  }

export default RadialBar;