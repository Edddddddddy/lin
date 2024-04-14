<template>
  <el-container>
    <el-main>
      <canvas ref="canvas" width="800" height="1200"></canvas>
    </el-main>
    <el-aside width="200px">
      <el-button @click="toggleAnimation">暂停/开始</el-button>
    </el-aside>
  </el-container>
</template>

<script>
import jsonData from './randomData.json'
export default {
  data() {
    return {
      ctx: null,
      lineData: [],
      time: 0,
      channelCount: Object.keys(jsonData).length,
      intervalId: null,
      isAnimating: true,
    }
  },
  mounted() {
    const canvas = this.$refs.canvas
    this.ctx = canvas.getContext('2d')
    this.lineData = Array(this.channelCount).fill(0).map(() => Array(100).fill(0).map(() => 0))
    this.draw()
    this.intervalId = setInterval(this.draw, 10)
  },
  methods: {
    draw() {
      const {ctx, lineData, time} = this
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      Object.keys(jsonData).forEach((channelName, channelIndex) => {
        const channelData = lineData[channelIndex]
        channelData.shift()
        const value = jsonData[channelName][time % jsonData[channelName].length]
        channelData.push(value)
        ctx.beginPath()
        channelData.forEach((value, index) => {
          ctx.lineTo(index * 8, value * 50 + channelIndex * 50)
        })
        ctx.stroke()
        ctx.fillText(channelName, 0, channelIndex * 50)
      })
      this.time += 1
    },
    toggleAnimation() {
      if (this.isAnimating) {
        clearInterval(this.intervalId)
      } else {
        this.intervalId = setInterval(this.draw, 10)
      }
      this.isAnimating = !this.isAnimating
    },
  },
}
</script>

<style scoped>
.el-main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-aside {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
