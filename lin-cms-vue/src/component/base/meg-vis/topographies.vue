<template>
  <div class="topographies" >
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
export default {
  name: 'Topographies',
  mounted() {
    const { canvas } = this.$refs
    canvas.width = canvas.parentElement.offsetWidth * 0.8
    canvas.height = canvas.parentElement.offsetHeight * 0.8
    this.drawTopographies()
  },
  methods: {
    drawTopographies() {
      const { canvas } = this.$refs
      const ctx = canvas.getContext('2d')

      // 清除画布
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = 0.4 * canvas.width
      const noseAngle = Math.PI / 9
      const earAngle = Math.PI / 17

      // 绘制头部
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
      ctx.stroke()

      // 绘制鼻子的左侧
      ctx.beginPath()
      ctx.moveTo(centerX, centerY - radius * 1.07) // 鼻子的顶部
      ctx.lineTo(centerX - radius * Math.sin(noseAngle), centerY - radius * Math.cos(noseAngle)) // 鼻子的左侧
      ctx.stroke()

      // 绘制鼻子的右侧
      ctx.beginPath()
      ctx.moveTo(centerX, centerY - radius * 1.07) // 鼻子的顶部
      ctx.lineTo(centerX + radius * Math.sin(noseAngle), centerY - radius * Math.cos(noseAngle)) // 鼻子的左侧
      ctx.stroke()

      const tmp1 = radius * 1.1 * Math.cos(earAngle)
      const tmp2 = radius * 1.1 * Math.sin(earAngle)
      // 绘制左耳
      ctx.beginPath()
      ctx.moveTo(centerX - tmp1 / 1.1, centerY - tmp2 / 1.1)
      ctx.bezierCurveTo(
        centerX - tmp1,
        centerY - tmp2,
        centerX - tmp1,
        centerY + tmp2,
        centerX - tmp1 / 1.1,
        centerY + tmp2 / 1.1
      )
      ctx.stroke()

      // 绘制右耳
      ctx.beginPath()
      ctx.moveTo(centerX + tmp1 / 1.1, centerY - tmp2 / 1.1)
      ctx.bezierCurveTo(
        centerX + tmp1,
        centerY - tmp2,
        centerX + tmp1,
        centerY + tmp2,
        centerX + tmp1 / 1.1,
        centerY + tmp2 / 1.1
      )
      ctx.stroke()
    }
  }
}
</script>

<style scoped>
.topographies{
  height: 300px;
  width: 300px;
  .canvas {
    background-color: #ffffff;
  }
}

</style>
