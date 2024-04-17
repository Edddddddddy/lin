<template>
  <el-container class="container" style="height: 100vh;">
    <el-main style="padding: 5px;">
      <el-card class="meg-visualization" style="height: calc(60% - 10px); width: 100%;">
        <template v-slot:header>
          <div >
            <span>MEG可视化</span>
          </div>
        </template>
        <div class="body-container">
          <div class="canvas-container">
            <canvas ref="canvasMegVis" width="800" height="1200"></canvas>
          </div>
        </div>
      </el-card>
      <el-footer style="padding: 5px;">
        <el-card class="additional-settings" style="height: 300px; width: 100%;">
          <template v-slot:header>
            <div class="header-container">
              <span>附加设置</span>
            </div>
          </template>
          <div class="body-container">

<!--            <canvas ref="additionalCanvas" width="800" height="600"></canvas>-->
          </div>
        </el-card>
      </el-footer>
    </el-main>
    <el-aside width="380px" style="padding: 5px;">
      <el-card class="file-settings" style="height: calc(100vh - 10px); width: 380px;">
        <template v-slot:header>
          <div class="header-container">
            <span>文件读取和设置</span>
          </div>
        </template>
        <el-collapse v-model="activeNames" >
          <el-collapse-item name="fileOpen">
            <template v-slot:title>
              <span>文件打开</span>
            </template>

            <el-descriptions
              class="margin-top"
              :column="3"
              :size="'18px'"
              style="font-size: 5px;"
            >
              <el-descriptions-item label="文件名：" >raw.json</el-descriptions-item>
              <el-descriptions-item label="文件大小：">18.5MB</el-descriptions-item>
              <el-descriptions-item label="时间长度：">307s</el-descriptions-item>
            </el-descriptions>
            <div>
              <el-upload
                ref="upload"
                action="http://127.0.0.1:5000/v1/file/upload"
                :on-exceed="handleExceed"
                :on-success="handleSuccess"
                :on-error="handleError"
                :file-list="fileList"
              >
                <el-button slot="trigger" size="small" type="primary">上传文件</el-button>
              </el-upload>
              <el-button @click="toggleAnimation">暂停/开始</el-button>
            </div>
          </el-collapse-item>
          <el-collapse-item name="filter">
            <template v-slot:title>
              <span>滤波功能</span>
            </template>
            <el-row>
              <el-col :span="12">
                <el-input v-model="inputLow" size="small" placeholder="Cut off Low(Hz)" ></el-input>
              </el-col>
              <el-col :span="12">
                <el-switch
                  v-model="filterLowEnabled"
                  style="margin-left: 24px; "
                  inline-prompt>
                </el-switch>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-input v-model="inputMid" size="small" placeholder="Cut off Mid(Hz)" ></el-input>
              </el-col>
              <el-col :span="12">
                <el-switch
                  v-model="filterMidEnabled"
                  style="margin-left: 24px; "
                  inline-prompt>
                </el-switch>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-input v-model="inputHigh" size="small" placeholder="Cut off High(Hz)" ></el-input>
              </el-col>
              <el-col :span="12">
                <el-switch
                  v-model="filterHighEnabled"
                  style="margin-left: 24px; "
                  inline-prompt>
                </el-switch>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item name="visCheckBox">
            <template v-slot:title>
              <span>可视化选项</span>
            </template>
            <div class="demo-button-style">
              <el-checkbox-group v-model="checkListVis">
                <el-checkbox label="MEG可视化" value="visVis" />
                <el-checkbox label="脑地形图" value="visMap" />
                <el-checkbox label="ICA特征提取" value="visIca" />
              </el-checkbox-group>
            </div>
          </el-collapse-item>
          <el-collapse-item name="fileTable">
            <template v-slot:title>
              <span>文件表单</span>
            </template>
            <el-table
              :data="tableData"
              :default-sort="{ prop: 'date', order: 'descending' }"
              style="width: calc(100% ); font-size: 13px;"
              @current-change="handleCurrentChange"
              tableLayout = "auto"
            >
              <el-table-column prop="date" label="日期" sortable />
              <el-table-column prop="filename" label="文件名" />
              <el-table-column label="操作">
                <template #default="scope">
                  <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
                    >Edit</el-button
                  >
                  <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                    >Delete</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
        </el-collapse>
      </el-card>
    </el-aside>
  </el-container>
</template>
<script>
// import mapData from './map.json'
import { ref } from 'vue'
import { ElTable, ElTableColumn } from 'element-plus'
import outputData from './output.json'
import DSP from 'dsp.js'

export default {
  components: {
    ElTable,
    ElTableColumn
  },
  data() {
    return {
      fileList: [],
      tableData: [
        {
          date: '2016-05-03',
          filename: 'file11',
        },
        {
          date: '2016-05-02',
          filename: 'file22',
        },
        {
          date: '2016-05-04',
          filename: 'file23',
        },
        {
          date: '2016-05-01',
          filename: 'file52',
        },
      ],
      tableCurrentRow: ref(null),
      // 网格
      ctx: null,
      lineData: [],
      time: 0,
      channelCount: outputData.channels.length,
      intervalId: null,
      isAnimating: true,
      gridSize: 10, // 网格大小
      dataInterval : ref(1),
      currentNum : 0,

      // brainMapData: null,
      upload: ref(null),
      activeNames: ['fileOpen', 'filter', 'visCheckBox', 'fileTable'],
      size: ref('default'),
      filterLowEnabled: ref(false),
      filterMidEnabled: ref(false),
      filterHighEnabled: ref(true),
      inputLow: ref(''),
      inputMid: ref(''),
      inputHigh: ref(''),
      checkListVis: ref(['visVis', 'visMap', 'visIca']),
    }
  },
  mounted() {
    const { canvasMegVis } = this.$refs
    this.ctx = canvasMegVis.getContext('2d')
    canvasMegVis.width = this.$el.querySelector('.meg-visualization').clientWidth - 10
    this.lineData = Array(this.channelCount).fill(0).map(() => Array(0).fill(0))
    this.drawGrid() // 绘制网格
    this.intervalId = setInterval(this.draw, 16.67) // 60fps
  },
  methods: {

    drawGrid() {
      this.ctx.strokeStyle = '#ccc' // 淡灰色网格
      this.ctx.lineWidth = 0.5
      for (let i = 0; i < this.ctx.canvas.width; i += this.gridSize) {
        this.ctx.beginPath()
        this.ctx.moveTo(i, 0)
        this.ctx.lineTo(i, this.ctx.canvas.height)
        this.ctx.stroke()
      }
      for (let i = 0; i < this.ctx.canvas.height; i += this.gridSize) {
        this.ctx.beginPath()
        this.ctx.moveTo(0, i)
        this.ctx.lineTo(this.ctx.canvas.width, i)
        this.ctx.stroke()
      }
    },
    draw() {
      const { ctx, lineData, time } = this
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      this.drawGrid() // 每次绘制前重新绘制网格

      // 计算每个通道需要多少数据点来填满画布宽度
      const widthPerDataPoint = ctx.canvas.width / this.dataInterval

      if ( this.currentNum <= widthPerDataPoint) {
        for (let i = 0; i < this.channelCount; i++) {
          // 添加随机数据点
          const value = outputData.data[i][time % outputData.data[i].length] * 100
          lineData[i].push(value)
        }
        this.currentNum += 1
      }else {
        for (let i = 0; i < this.channelCount; i++) {
          // 添加随机数据点
          const value = outputData.data[i][time % outputData.data[i].length] * 100
          lineData[i].push(value)
          lineData[i].shift()
        }
      }



      // 绘制每个通道的数据
      outputData.channels.forEach((channelName, channelIndex) => {
        let channelData = []
        if (this.filterHighEnabled){
          const b = []
          const a = []
          const filter = new DSP.IIRFilter(b, a)
          channelData = filter.filter(lineData[channelIndex])
        } else {
          channelData = lineData[channelIndex]
        }

        ctx.beginPath()
        ctx.strokeStyle = '#00008b' // 深蓝色线条
        channelData.forEach((value, index) => {
          ctx.lineTo(this.dataInterval * index, value * 50 + (channelIndex + 0.6) * 50)
        })
        ctx.stroke()
        // 绘制通道名称
        ctx.fillStyle = '#000000' // 文字颜色
        ctx.fillText(channelName, 20, channelIndex * 50 + 20) // 将通道名称绘制在画布左侧
      })
      this.time += 1
    },
    toggleAnimation() {
      if (this.isAnimating) {
        clearInterval(this.intervalId)
      } else {
        this.intervalId = setInterval(this.draw, 16.67)
      }
      this.isAnimating = !this.isAnimating
    },

    // file upload
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    // beforeUpload(file) {
    //   const isJPGPNG = file.type === 'image/jpeg' || file.type === 'image/png';
    //   const isLt500K = file.size / 1024 < 500;
    //
    //   if (!isJPGPNG) {
    //     this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!')
    //   }
    //   if (!isLt500K) {
    //     this.$message.error('上传头像图片大小不能超过 500KB!')
    //   }
    //   return isJPGPNG && isLt500K;
    // },
    handleSuccess(response, file, fileList) {
      this.$message.success('文件上传成功')
      this.filePath = response[0].file_path
      console.log('Server response: ', response)
      // 处理上传成功后的响应
    },
    handleError(err, file, fileList) {
      this.$message.error('文件上传失败')
      // 处理上传失败后的响应
    },
    handleEdit(index, row) {
      console.log(index, row)
      // 执行编辑操作
    },
    handleDelete(index, row) {
      console.log(index, row)
      // 执行删除操作
    },
    handleCurrentChange(val) {
      this.tableCurrentRow = val // 直接更新currentRow的值
    },

  },
}
</script>

<style scoped>
.container {
  .meg-visualization {
    height: 600px; /* 设置el-card的高度 */
    overflow-y: auto; /* 添加滚动条 */
    flex-grow: 1; /* 让左侧的el-card宽度灵活 */
  }

  .file-settings {
    width: 380px; /* 固定右侧el-card的宽度 */
    //overflow-y: auto; /* 添加滚动条 */
  }

  .canvas-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
  }
  .el-switch{
    --el-switch-on-color: #3963bc;
  }

}

</style>
