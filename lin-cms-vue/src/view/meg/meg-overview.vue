<template>
  <div class="container" v-if="!showEdit">
    <el-row>
      <el-col class="meg-visual" :xs="24" :sm="16" :md="12" :lg="15">
        <div slot="header"><span>可视化页面</span></div>
        <el-row style="margin-bottom: 10px">
          <!--          <canvas id="timeSeries" width="950" height="450"></canvas>-->
          <canvas ref="canvas" width="950" height="450"></canvas>
        </el-row>
      </el-col>
      <el-col class="sidebar" :xs="24" :sm="8" :md="12" :lg="8">
        <el-card>
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
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { SmoothieChart, TimeSeries } from 'smoothie'
import { lightningChart } from '@arction/lcjs'

export default {
  name: 'MegOverview',
  components: {},
  data() {
    return {
      fileList: [],
      filePath: '',
      // ---------------------smoothie
      // smoothie: null,
      // timeSeries: null,

      // ---------------------lightningChart
      chart: null,
      lineSeries: [],
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.init()
    // ---------------------smoothie
    // this.smoothie = new SmoothieChart()
    // this.timeSeries = new TimeSeries()
    // this.smoothie.addTimeSeries(this.timeSeries, { strokeStyle: 'rgb(0, 255, 0)', fillStyle: 'rgba(0, 255, 0, 0.4)', lineWidth: 3 })
    // this.smoothie.streamTo(document.getElementById('timeSeries'), 1000)
    // // 模拟脑电数据
    // setInterval(() => {
    //   this.timeSeries.append(new Date().getTime(), Math.random() * 10000)
    // }, 1000)

    // ---------------------lightningChart
    // 获取 canvas 元素的引用
    const { canvas } = this.$refs

    // 创建一个 LightningChart 图表实例
    this.chart = lightningChart().ChartXY({ container: canvas })

    // 创建多个 LineSeries 实例，并添加到图表中
    for (let i = 0; i < 3; i++) {
      const lineSeries = this.chart.addLineSeries()
      this.lineSeries.push(lineSeries)
    }

    // 模拟多个通道的数据更新
    setInterval(() => {
      const time = new Date().getTime()
      for (let i = 0; i < this.lineSeries.length; i++) {
        this.lineSeries[i].add({ x: time, y: Math.random() * 10000 })
      }
    }, 1000)
  },
  methods: {
    init() {
      // console.log('meg-overview,init')
    },

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
  },
}
</script>

<style lang="scss" scoped>
.container {
  //height: 100%;
  //width: 100%;
  //.el-row{
  //  height: 100vh;
  //}
  //.el-col{
  //  height: 100vh;
  //}
  .el-card {
    height: 100vh;
  }
  .sidebar {
    padding: 0px 20px;
    margin: 3px;
  }
}
</style>
