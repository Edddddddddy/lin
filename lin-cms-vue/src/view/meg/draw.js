export function draw(ctx, x, y) {
  ctx.beginPath()
  ctx.arc(x, y, 50, 0, 2 * Math.PI)
  ctx.stroke()
}
