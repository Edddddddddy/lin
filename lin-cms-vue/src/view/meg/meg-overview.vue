<template>
  <div class="container" v-if="!showEdit">
    <el-row gutter="20">
      <el-col class="meg-visual" :xs="24" :sm="16" :md="12" :lg="15">

        <el-row >

          <common-el-card :cardName="'meg可视化'"  :cardWidth="'900px'" :cardHeight="'600px'">

            <div>
              <canvas id="smoothie-chart" width="600" height="200"></canvas>
            </div>
          </common-el-card>
        </el-row>

      </el-col>
      <el-col class="sidebar"  :xs="24" :sm="8" :md="12" :lg="8">
        <common-el-card :cardName="myCardName" :cardWidth="'400px'" :cardHeight="'600px'" >
          <!-- 你的自定义内容 -->
          <template #header>
            <div class="card-header">
              <span>{{ myCardName }}</span>
            </div>
          </template>
           <el-upload
              action="http://127.0.0.1:5000/v1/file/upload"
              on-preview="handlePreview"
              on-remove="handleRemove"
              :file-list="fileList"
              :before-upload="beforeUpload"
              :on-success="handleSuccess"
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <!--            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
            </el-upload>
            <p>文件路径: {{ filePath }}</p>
        </common-el-card>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import { SmoothieChart, TimeSeries } from 'smoothie'
import { CommonElCard } from '@/component/layout'

export default {
  name: 'MegOverview',
  components: {
    CommonElCard,
  },
  data() {
    return {
      fileList: [],
      filePath: '',
      // ---------------------smoothie
      // smoothie: null,
      // timeSeries: null,

      lines: [],
      amplitudes: [],
      timeline: [],
      timeSeries: [],
      colors: [],
      megData: [],
      options: null,

      myCardName: '我的aa卡片',

    }
  },
  computed: {},
  watch: {},
  mounted() {
    // this.addTimeSeriesLines()

    // ---------------------smoothie
    // this.smoothie = new SmoothieChart()
    // this.timeSeries = new TimeSeries()
    // this.smoothie.addTimeSeries(this.timeSeries, { strokeStyle: 'rgb(0, 255, 0)', lineWidth: 1 })
    // this.smoothie.streamTo(document.getElementById('smoothie-chart'), 1000)
    // // 模拟脑电数据
    // setInterval(() => {
    //   this.timeSeries.append(new Date().getTime(), Math.random() * 10000)
    // }, 1000)

    // 创建8条线
    this.options = { millisPerLine: 3000,
      grid: {
        fillStyle: '#333333',
        strokeStyle: 'rgba(0,0,0,0.1)',
        sharpLines: false,
        verticalSections: 8,
        borderVisible: true
      },
      labels: {
        disabled: true
      },
      maxValue: 16,
      minValue: 0 }

    this.lines = Array(8).fill(0).map(() => new TimeSeries())
    this.timeSeries = new SmoothieChart(this.options)
    this.addTimeSeriesLines() // lines加入timeSeries
    this.colors = [{ borderColor: 'rgba(112,185,252,1)', backgroundColor: 'rgba(112,185,252,1)' },
      { borderColor: 'rgba(116,150,161,1)', backgroundColor: 'rgba(116,150,161,1)' },
      { borderColor: 'rgba(162,86,178,1)', backgroundColor: 'rgba(162,86,178,1)' },
      { borderColor: 'rgba(144,132,246,1)', backgroundColor: 'rgba(144,132,246,1)' },
      { borderColor: 'rgba(138,219,229,1)', backgroundColor: 'rgba(138,219,229,1)' },
      { borderColor: 'rgba(232,223,133,1)', backgroundColor: 'rgba(232,223,133,1)' },
      { borderColor: 'rgba(148,159,177,1)', backgroundColor: 'rgba(148,159,177,1)' },
      { borderColor: 'rgba(77,83,96,1)', backgroundColor: 'rgba(77,83,96,1)' }]
    this.megData = Array(8).fill(0).map(() => Array(100).fill(0))
    this.appendTimeSeriesLines(this.megData) // data加入lines

    setInterval(() => {
      this.timeSeries.append(new Date().getTime(), Math.random() * 10000)
    }, 1000)
  },
  methods: {

    handlePreview(file) {
      console.log('Preview file: ', file)
    },
    handleRemove(file, fileList) {
      console.log('Remove file: ', file, fileList)
    },
    beforeUpload(file) {
      console.log('Before upload: ', file)
      return true // return false to cancel upload
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleSuccess(response, file, fileList) {
      this.filePath = response[0].file_path
      console.log('Server response: ', response)
    },

    addTimeSeriesLines() {
      this.lines.forEach((line, index) => {
        this.timeSeries.addTimeSeries(line, {
          strokeStyle: this.colors[index].borderColor
        })
      })
    },

    // appendTimeSeriesLines(data) {
    //   this.lines.forEach((line, index) => {
    //     data[index].forEach(amplitude => {
    //       line.append(new Date().getTime(), amplitude)
    //     })
    //   })
    // },
    appendTimeSeriesLines() {
      this.lines.forEach((line, index) => {
        this.megData[index].forEach(() => {
          line.append(new Date().getTime(), Math.random() * 10000)
        })
      })
    }

  },
}

</script>

<style lang="scss" scoped>
.container {

  .el-card {
    height: 100vh;
  }
  .sidebar {
    padding: 0px 20px;
    margin: 3px;

  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 0px;
    margin-top: 10px;
  }

  .box-card {
    width: 480px;
  }

}
</style>
