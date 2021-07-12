<template>
  <div id="chart">
    <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import VueApexCharts from 'vue-apexcharts';
import moment from 'moment';

export default {
  name: "AllLog",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      eyeData: [],
      moleData: [],
      editData: [],
      requestData: [],
      speechData: [],
      speakerData: [],
      series: [
        // this is the annotation for status
        {
          name: 'Eye Tracker',
          //[timestamp, value]
          data: []
        }],
      chartOptions: {
        theme: {mode: 'dark'},
        colors: ['#F44336', '#E91E63', '#9C27B0'],
        dataLabels: {enabled: false},
        chart: {
          height: 350,
          type: 'area',
          id: 'visual-chart-1',
          animation: {enabled: false},
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [20, 100, 100, 100]
          },
        },
        annotations: {
          xaxis: [],
        },
        stroke: {curve: 'straight'},
        title: {
          text: `Visualize chart - 1`,
          align: 'left'
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          offsetX: -10
        },
        xaxis: {
          type: 'datetime',
          min: null, //June 20, 2021 12:10:00 AM
          max: null,
          labels: {
            rotate: -15,
            rotateAlways: true,
            formatter: function (val, timestamp) {
              return moment(timestamp).format("mm:ss.SSS")
            }
          }
        },
      },
    }
  },
  computed: {
    ...mapGetters(['visOneDatas']),
  },
  watch: {
    visOneDatas: async function (newVal) {
      let anewVal = newVal;
      anewVal = newVal.slice(0, anewVal.length - 1) // 162376 6944087, 162376 7024759
      // anewVal.push(newVal.slice(11942, 11955))
      let sd = []
      await anewVal.map(async v => {
        if (v.type === 'eye') {
          this.series[0].data.push([v.start_time, v.value])
          this.series[0].data.push([v.end_time, v.value])
        }
        else if (v.type === 'mole_miss') await this.chartOptions.annotations.xaxis.push({
          x: v.timestamp,
          strokeDashArray: 0,
          borderColor: '#775DD0',
          label: {
            borderColor: '#775DD0',
            style: {
              color: '#fff',
              background: '#775DD0',
            },
            text: 'Mole',
          }
        })
        else {
          if (Array.isArray(v)) sd = v
          else sd.push(v)
        }
      })
      await sd.map(async v => {
        let v_color = this.getTypeColor(v.type);
        this.chartOptions = {
          ...this.chartOptions,
          annotations: {
            xaxis: [
              ...this.chartOptions.annotations.xaxis,
              {
                x: v.start_time,
                x2: v.end_time,
                fillColor: v_color,
                opacity: 0.4,
                label: {
                  // borderColor: 'black',
                  style: {
                    fontSize: '10px',
                    color: 'black',
                    background: v_color,
                  },
                  offsetY: -10,
                  text: v.type,
                }
              }]
          }
        }
      })
      // console.log(this.chartOptions.annotations.xaxis)
      console.log(1, this.chartOptions.xaxis.min = this.series[0].data)
      this.chartOptions.xaxis.min = this.series[0].data[0][0] - 1000
      this.chartOptions.xaxis.max = this.series[0].data[this.series[0].data.length - 1][0] + 1000
    },
  },
  methods: {
    getTypeColor: (type) => {
      switch (type) {
        case 'requset_editing':
          return '#B3F7CA';
        case 'speaker':
          return 'rgb(254, 176, 25)';
        case 'speech':
          return 'rgb(151,90,220)';
        default:
          return 'rgb(0, 143, 251)';
      }
    }
  },
  mounted() {

  },
}
</script>

<style scoped>

</style>
