<template>
  <div class="container">
    <el-container style="height: 100vh; width: 100vw;">
      <splitpanes class="default-theme">
        <pane size="20" max-size="30" min-size="10">
          <el-aside class="aside">
            <el-input placeholder="请输入搜索内容" v-model="searchText"></el-input>
            <el-tree :data="fileStructure" :props="defaultProps"></el-tree>
          </el-aside>
        </pane>
        <pane class="pane2">
          <div class="main-container">
            <el-col class="main1" span="8">
              <splitpanes horizontal>
                <pane>
                  <div class="chart-type">
                    <div>图表类型</div>
                    <div class="button-container">
                      <el-button
                        v-for="button in buttons"
                        :key="button"
                        :type="selectedButtonName === button ? 'primary' : 'default'"
                        @mouseover="showButtonName(button)"
                        @mouseout="showButtonName(selectedButtonName)"
                        @click="selectButton(button)"
                      >
                        {{ button }}
                      </el-button>
                    </div>
                    <div class="button-name">
                      <p>{{ hoveredButtonName }}</p>
                    </div>
                  </div>
                </pane>
                <pane>
                  <div class="paramTabs">
                    <el-tabs v-model="activeTab">
                      <el-tab-pane label="图形参数" name="params">
                        <el-form-item label="参数1">
                          <el-input v-model="param1" placeholder="参数1"></el-input>
                        </el-form-item>
                        <el-form-item label="参数2">
                          <el-input v-model="param2" placeholder="参数2"></el-input>
                        </el-form-item>
                      </el-tab-pane>
                      <el-tab-pane label="组件样式" name="styles">
                        <el-tree :data="styleTreeData" :props="defaultProps"></el-tree>
                        <!-- 添加更多的 el-tree -->
                      </el-tab-pane>
                    </el-tabs>
                  </div>
                </pane>
              </splitpanes>
            </el-col>
            <el-col class="main2">
              <div >图表类型</div>
<!--              <div style="height: 300px">-->
<!--                <Topographies/>-->
<!--              </div>-->
              <canvas class="myChart" id="myChart"></canvas>
            </el-col>
          </div>
        </pane>
      </splitpanes>
    </el-container>
  </div>
</template>

<script>
import { ElContainer, ElAside, ElInput, ElTree } from 'element-plus'
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
// import dsp from 'dsp.js'
// import Topographies from '@/component/base/meg-vis/topographies.vue'
import { draw } from './draw.js'
import { drawTopographies } from './drawHead.js'

export default {
  components: {
    ElContainer,
    ElAside,
    ElInput,
    ElTree,
    Splitpanes,
    Pane
  },
  data() {
    return {
      // aside
      searchText: '',
      fileStructure: [
        {
          label: '文件夹1',
          children: [
            { label: '文件1' },
            { label: '文件2' }
          ]
        },
        {
          label: '文件夹2',
          children: [
            { label: '文件3' },
            { label: '文件4' }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // main1
      buttons: ['按钮1', '按钮2', '按钮3', '按钮4', '按钮5', '按钮6', '按钮7', '按钮8', '按钮9', '按钮10'],
      hoveredButtonName: '按钮2',
      selectedButtonName: '按钮2',
      activeTab: 'params',
      param1: '',
      param2: '',
      styleTreeData: [
        {
          label: '样式1',
          children: [
            { label: '子样式1' },
            { label: '子样式2' }
          ]
        },
        {
          label: '样式2',
          children: [
            { label: '子样式3' },
            { label: '子样式4' }
          ]
        },
      ]
    }
  },
  watch: {
    selectedButtonName() {
      this.updateChart()
    }
  },
  methods: {
    showButtonName(button) {
      this.hoveredButtonName = button
    },
    selectButton(button) {
      this.selectedButtonName = button
      this.hoveredButtonName = button
    },
    updateChart() {
      const canvas = document.getElementById('myChart')
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height) // 清除之前的绘图

      if (this.selectedButtonName === '按钮1') {
         // 计算四个部分的中心点的坐标
        const centerX1 = canvas.width / 4
        const centerY1 = canvas.height / 4
        const centerX2 = (canvas.width / 4) * 3
        const centerY2 = (canvas.height / 4) * 3

        // 在四个部分中分别绘制圆
        drawTopographies(ctx, centerX1, centerY1, 0.4 * canvas.width / 2)
        drawTopographies(ctx, centerX2, centerY1, 0.4 * canvas.width / 2)

      } else if (this.selectedButtonName === '按钮2') {
        // 画一个三角形
        ctx.beginPath()
        ctx.moveTo(canvas.width / 2, canvas.height / 2 - 50)
        ctx.lineTo(canvas.width / 2 - 50, canvas.height / 2 + 50)
        ctx.lineTo(canvas.width / 2 + 50, canvas.height / 2 + 50)
        ctx.closePath()
        ctx.stroke()
      }
    }
  }
}
</script>

<style scoped>
.container {
  background-color: white;
  height: 100vh;
  .aside {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    color: #fff;
    text-align: center;
  }

  .main-container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    .el-col {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .chart-type {
        text-align: center;
        margin-top: 20px;
        height: 300px;
      }
    }
    .main1 {
      width: 350px;
      height: 100%;
      display: flex;
      flex-direction: column;
      .button-container {
        height: 100px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        overflow-y: auto;
        overflow-x: hidden;
        white-space: nowrap;
        .el-button{
          height: 30px;
          width: 60px;
          margin-left: 12px;
          margin-top: 3px;
          margin-bottom: 3px;
        }
      }
      .button-name {
        margin-top: 20px;
      }
      .paramTabs {
        height: 300px;
      }
    }
    .main2 {
      width: 100%;
      height: 500px;
      .myChart {
        width: 100%;
        height: 100%;
      }
    }
  }

}
</style>
