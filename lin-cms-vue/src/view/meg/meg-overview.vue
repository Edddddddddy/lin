<template>
  <div class="container"  v-if="!showEdit">
    <el-row gutter="10px">
<!--      第一列-->
      <el-col class="meg-visual" span="10">
        <el-row >
          <common-el-card :cardName="'meg可视化'"  :cardWidth="'100%'" :cardHeight="'600px'">
            <div>
              <canvas id="smoothie-chart" width="800" height="400"></canvas>
            </div>
          </common-el-card>
        </el-row>

        <el-row gutter="10">
          <el-col span="3">
            <common-el-card  :cardName="'ICA'"  :cardWidth="'300px'">
              <div id="qrcode" class="qrcodeBox" >
                <img :src="'http://127.0.0.1:5000/assets/megData/ica_components.png'"/>
                <p>{{testNum}}</p>
              </div>
            </common-el-card>
          </el-col>
        </el-row>
      </el-col>

<!--      第二列-->
      <el-col class="sidebar" span="6" >
        <common-el-card  :cardName="'设置'" :cardWidth="'300px'" :cardHeight="'100vh'" >
          <!-- 你的自定义内容 -->
          <div >
            <el-row>
              <div>
                <el-row  style="margin-top: 7px">
                  <el-button @click="show = !show">数据读取</el-button>
                </el-row>

                <div  style="margin-top: 7px">
                  <el-collapse-transition>
                    <div v-show="show" class="transition-box">
                      <el-upload
                        action="http://127.0.0.1:5000/v1/file/upload"
                        on-preview="handlePreview"
                        on-remove="handleRemove"
                        :file-list="fileList"
                        :before-upload="beforeUpload"
                        :on-success="handleSuccess"
                      >
                       <p>当前选区的文件为: {{ filePath }}</p>
                       <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <!--            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
                      </el-upload>
                    </div>
                  </el-collapse-transition>
                </div>
              </div>

            </el-row>
            <el-row>
              <div>
                <el-row  style="margin-top: 7px">
                  <el-button @click="show2 = !show2" >数据滤波</el-button>
                </el-row>

                <div  style="margin-top: 7px">
                  <el-collapse-transition>
                    <div v-show="show2" >
                      <div class="transition-box">
                        <p> 此处放滤波选项</p>
                      </div>
                    </div>
                  </el-collapse-transition>
                </div>
              </div>
            </el-row>
            <el-row>
              <div>
                <el-row style="margin-top: 7px">
                  <el-button @click="show3 = !show3">视图选择</el-button>
                </el-row>

                <div style="margin-top: 7px">
                  <el-collapse-transition>
                    <div v-show="show3" >
                      <div class="transition-box">
                        <el-checkbox v-model="checked1" label="脑地形图" size="large" />
                        <el-checkbox v-model="checked2" label="热力图" size="large" />
                      </div>
                    </div>
                  </el-collapse-transition>
                </div>
              </div>
            </el-row>

          </div>
        </common-el-card>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import { SmoothieChart, TimeSeries } from 'smoothie'
import { CommonElCard } from '@/component/layout'
import { defineComponent, onMounted, ref } from 'vue';
import axios from 'axios'
import * as echarts from 'echarts'


export default {
  name: 'MegOverview',
  components: {
    CommonElCard,
  },
  data() {
    return {
      activeNames: ['1'],
      fileList: [],
      filePath: '',
      // ---------------------smoothie
      smoothie: null,
      timeSeries: [],
      linCnt: [],
      options: null,
      megData: {},
      timeline: [],

      show: ref(true),
      show2: ref(true),
      show3: ref(true),
      checked1: ref(true),
      checked2: ref(true),
      setIntervalCnt: 0,
      startTime: 0,
      myCardName: '',

      testNum: 0,


      countries: [
        'Finland',
        'France',
        'Germany',
        'Iceland',
        'Norway',
        'Poland',
        'Russia',
        'United Kingdom'
      ],
      datasetWithFilters: [],
      seriesList: [],



    }
  },
  computed: {},
  watch: {},
  mounted() {

    // ---------------------smoothie chart
    {
      // this.smoothie = new SmoothieChart()
      // this.timeSeries = new TimeSeries()
      // this.smoothie.addTimeSeries(this.timeSeries, { strokeStyle: 'rgb(0, 255, 0)', lineWidth: 1 })
      // this.smoothie.streamTo(document.getElementById('smoothie-chart'), 1000)
      // // 模拟脑电数据
      // setInterval(() => {
      //   this.timeSeries.append(new Date().getTime(), Math.random() * 10000)
      // }, 1000)

      // 获取数据
      axios.get('http://localhost:5000/v1/file/sendData')
        .then(response => {
          this.megData = response.data
          console.log(new Date().getTime())
          {
            this.linCnt = Array.from({ length: this.megData.ch_num }, (_, index) => index + 1),
            this.timeSeries = Array(64).fill(0).map(() => new TimeSeries()),
            this.options = {
              millisPerLine: 0.001,
              grid: {
                fillStyle: '#333333',
                strokeStyle: 'rgba(0,0,0,0.1)',
                sharpLines: false,
                verticalSections: this.megData.ch_num,
                borderVisible: true
              },
              labels: {
                disabled: true
              },
              maxValue: 1,
              minValue: 0,
              // millisPerPixel: 2,
              // timestampFormatter: SmoothieChart.timeFormatter,
          },
          this.timeSeries = Array(64).fill(0).map(() => new TimeSeries())
          this.smoothie = new SmoothieChart(this.options) //
          this.timeSeries.forEach(line => {
            this.smoothie.addTimeSeries(line, {
              strokeStyle: 'rgb(0, 255, 0)',
              lineWidth: 1
            })
          })
          this.smoothie.streamTo(document.getElementById('smoothie-chart'), 1000)
          this.startTime = new Date().getTime()
          setInterval(() => {
            this.timeSeries.forEach((line, index) => {
              // line.append(new Date().getTime(), Math.random() * 0.1 + this.linCnt[index] * 0.01)
              line.append(new Date().getTime(), this.megData.data[this.setIntervalCnt][index] + this.linCnt[index] * 0.01)
              this.setIntervalCnt++
            })
          }, 1000)
          }

          //——————————————————————echarts
          {

          }
        })
        .catch(error => {
          console.error(error)
        })


    }
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
    //margin: 3px;
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
  .transition-box {
    width: 300px;
    height: 100px;
    border-radius: 4px;
    text-align: center;
    background-color:lightgray;
  }
}
</style>
