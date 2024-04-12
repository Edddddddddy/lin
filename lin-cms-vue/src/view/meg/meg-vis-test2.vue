<template>
<!--  <div ref="myChart" style="width: 800px;height:600px;"></div>-->

<div id="mychart1" style="width:800px;height:250px;"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  data(){
    return {
      nextHour : 0,
      xAxisData: []
    }
  },
  mounted() {
    this.draw()
  },
  methods: {
    draw() {
      const echart1 = echarts.init(document.getElementById('mychart1'))
      const randomData1 = []
      const randomData2 = []
      const randomData3 = []
      const randomData4 = []
      for (let i = 0; i < 30; i++) {
        randomData1.push(Math.floor(Math.random() * 100))
        randomData2.push(Math.floor(Math.random() * 100))
        randomData3.push(Math.floor(Math.random() * 100))
        randomData4.push(Math.floor(Math.random() * 100))
      }

      // 指定图表的配置项和数据
      const option1 = {
        title: {
          text: '<<当日设备OEE分析'
        },
        legend: {},
        dataset: {
          source: [
            ['product', 'oee', 'qe', 'pe', 'ae'],
            ['10:00', 41.1, 30.4, 65.1, 53.3],
            ['11:00', 86.5, 92.1, 85.7, 83.1],
            ['12:00', 24.1, 67.2, 79.5, 86.4],
            ['13:00', 55.2, 67.1, 69.2, 72.4],
            ['14:00', 55.2, 67.1, 69.2, 72.4],
            ['15:00', 55.2, 67.1, 69.2, 72.4],
            ['16:00', 55.2, 67.1, 69.2, 72.4]
          ]
        },
        xAxis: {
          type: 'category',

        },
        yAxis: {
          type: 'value'
        },
        series: [
          { type: 'line', color: 'blue' },
          { type: 'line', color: 'green' },
          { type: 'line', color: 'yellow' },
          { type: 'line', color: 'pink' }
        ],

      }
      // 使用刚指定的配置项和数据显示图表。
      echart1.setOption(option1)
      this.xAxisData = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']
      setInterval(() => {
        randomData1.push(Math.floor(Math.random() * 100))
        // randomData1.shift()
        randomData2.push(Math.floor(Math.random() * 100))
        // randomData2.shift()
        randomData3.push(Math.floor(Math.random() * 100))
        // randomData3.shift()
        randomData4.push(Math.floor(Math.random() * 100))
        // randomData4.shift()

        // this.nextHour = (parseInt(xAxisData[xAxisData.length - 1], 10) + 1) % 24;
        this.xAxisData.push('aa');

        echart1.setOption({
          xAxis: {
            data: this.xAxisData
          },

          series: [
            { data: randomData1, type: 'line', color: 'blue' },
            { data: randomData2, type: 'line', color: 'green' },
            { data: randomData3, type: 'line', color: 'yellow' },
            { data: randomData4, type: 'line', color: 'pink' }
          ],

        })
      }, 3000)
    }
  }
}

</script>
