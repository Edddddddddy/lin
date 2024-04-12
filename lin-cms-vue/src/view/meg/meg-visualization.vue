<template>
  <div ref="myChart" style="width: 800px;height:600px;"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  data() {
    return {
      myChart: null,
      option:{
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%']
          }
        },
        title: {
          left: 'center',
          text: 'Large Area Chart'
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: Array(100).fill(0).map((_, i) => i + 1)
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%']
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 10
          },
          {
            start: 0,
            end: 10
          }
        ],
        series: [
          {
            name: 'Fake Data',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',
            itemStyle: {
              color: 'rgb(25, 70, 131)'
            },
            data: Array(100).fill(0).map(() => Math.random() * 1000)
          }
        ]
      }
    }
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.myChart)
    this.myChart.setOption(this.option)
  }
}
</script>
