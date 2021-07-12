<template>
  <div>
    <div id="chart">
      <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
    <v-row v-if="selectedData">
      <v-col lg="4" sm="12">
        <v-card>
          <v-card-title></v-card-title>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left" v-for="keyName in Object.keys(selectedData)" :key="keyName">
                  {{ keyName }}
                </th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>{{ selectedData[keyName] }}</td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
      <v-col lg="8" sm="12">

      </v-col>
    </v-row>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import VueApexCharts from 'vue-apexcharts';
import moment from "moment";
// import moment from 'moment';

export default {
  name: "XYPosition",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      selectedData: {},
      series: [{
        name: 'Visualize Two Data',
        data: []
      }],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
          events: {
            click: (event, chartContext, config) => {
              this.showDetailData(config.dataPointIndex)
            }
          }
        },
        theme: {mode: 'dark'},
        plotOptions: {
          bar: {
            colors: {
              ranges: [{
                from: -2000,
                to: -800,
                color: '#E91E63'
              }, {
                from: -800,
                to: 0,
                color: '#F44336'
              },
                {
                  from: 0,
                  to: 800,
                  color: '#66DA26'
                },
                {
                  from: 800,
                  to: 2000,
                  color: '#2E93fA'
                },
              ]
            },
            columnWidth: '80%',
          }
        },
        dataLabels: {
          enabled: true,
        },
        yaxis: {
          title: {
            text: 'Distance',
          },
          labels: {
            formatter: function (y) {
              return y.toFixed(0) + 'px';
            }
          }
        },
        xaxis: {
          type: 'datetime',
          min: null,
          max: null,
          labels: {
            rotate: -20,
            rotateAlways: true,
            formatter: function (val, timestamp) {
              return moment(timestamp).format("mm:ss.SSS")
            }
          }
        }
      },
    }
  },
  computed: {
    ...mapGetters(['visTwoDatas']),
  },
  watch: {
    visTwoDatas: function (newVal) {
      console.log('anewVal', newVal);
    },
  },
  methods: {
    showDetailData(index){
      this.selectedData = this.visTwoDatas[index];
      console.log(this.selectedData)
    }
  },
  async mounted() {
    console.log(this.visTwoDatas)
    let anewVal = this.visTwoDatas;
    // let sd = []
    await anewVal.map(async v => {
      this.series[0].data.push([v.timestamp, v.distance])
    })

    this.chartOptions.xaxis.min = this.series[0].data[0][0] - 1000
    this.chartOptions.xaxis.max = this.series[0].data[this.series[0].data.length - 1][0] + 1000
  },
}
</script>

<style scoped>

</style>
