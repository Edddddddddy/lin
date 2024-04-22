export function drawTopographies(ctx, x, y, a) {
  // 清除画布
  ctx.clearRect(x - a / 2, y - a / 2, a, a)

  const radius = 0.4 * a
  const noseAngle = Math.PI / 9
  const earAngle = Math.PI / 17

  // 绘制头部
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, 2 * Math.PI)
  ctx.stroke()

  // 绘制鼻子的左侧
  ctx.beginPath()
  ctx.moveTo(x, y - radius * 1.07) // 鼻子的顶部
  ctx.lineTo(x - radius * Math.sin(noseAngle), y - radius * Math.cos(noseAngle)) // 鼻子的左侧
  ctx.stroke()

  // 绘制鼻子的右侧
  ctx.beginPath()
  ctx.moveTo(x, y - radius * 1.07) // 鼻子的顶部
  ctx.lineTo(x + radius * Math.sin(noseAngle), y - radius * Math.cos(noseAngle)) // 鼻子的左侧
  ctx.stroke()

  const tmp1 = radius * 1.1 * Math.cos(earAngle)
  const tmp2 = radius * 1.1 * Math.sin(earAngle)
  // 绘制左耳
  ctx.beginPath()
  ctx.moveTo(x - tmp1 / 1.1, y - tmp2 / 1.1)
  ctx.bezierCurveTo(
    x - tmp1,
    y - tmp2,
    x - tmp1,
    y + tmp2,
    x - tmp1 / 1.1,
    y + tmp2 / 1.1
  )
  ctx.stroke()

  // 绘制右耳
  ctx.beginPath()
  ctx.moveTo(x + tmp1 / 1.1, y - tmp2 / 1.1)
  ctx.bezierCurveTo(
    x + tmp1,
    y - tmp2,
    x + tmp1,
    y + tmp2,
    x + tmp1 / 1.1,
    y + tmp2 / 1.1
  )
  ctx.stroke()
}
