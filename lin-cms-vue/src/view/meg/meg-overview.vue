<template>
  <div class="container" v-if="!showEdit">
    <el-row gutter="20">
      <el-col class="meg-visual" :xs="24" :sm="16" :md="12" :lg="15">

        <el-row >
          <!--          <canvas id="timeSeries" width="950" height="450"></canvas>-->

          <common-el-card :cardName="myCardName"  >
            <!-- 你的自定义内容 -->
            <template #header>
              <div class="card-header">
                <span>{{ myCardName }}</span>
              </div>
            </template>
            <p>这是一些自定义的内容。</p>
          </common-el-card>
        </el-row>
        <el-row >
          <!--          <canvas id="timeSeries" width="950" height="450"></canvas>-->

          <common-el-card :cardName="myCardName"  >
            <!-- 你的自定义内容 -->
            <template #header>
              <div class="card-header">
                <span>{{ myCardName }}</span>
              </div>
            </template>
            <p>这是一些自定义的内容。</p>
          </common-el-card>
        </el-row>
        <el-row >
          <!--          <canvas id="timeSeries" width="950" height="450"></canvas>-->

          <common-el-card :cardName="myCardName"  >
            <!-- 你的自定义内容 -->
            <template #header>
              <div class="card-header">
                <span>{{ myCardName }}</span>
              </div>
            </template>
            <p>这是一些自定义的内容。</p>
          </common-el-card>
        </el-row>
        <el-row >
          <!--          <canvas id="timeSeries" width="950" height="450"></canvas>-->

          <common-el-card :cardName="myCardName"  >
            <!-- 你的自定义内容 -->
            <template #header>
              <div class="card-header">
                <span>{{ myCardName }}</span>
              </div>
            </template>
            <p>这是一些自定义的内容。</p>
          </common-el-card>
        </el-row>


      </el-col>
      <el-col class="sidebar"  :xs="24" :sm="8" :md="12" :lg="8">
        <common-el-card :cardName="myCardName"  >
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
// import { SmoothieChart, TimeSeries } from 'smoothie'
import { lightningChart } from '@arction/lcjs'
import { CommonElCard } from '@/component/layout'

export default {
  name: 'MegOverview',
  components: {
    CommonElCard
  },
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
      myCardName: '我的aa卡片',
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
