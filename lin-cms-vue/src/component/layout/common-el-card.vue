<template >
  <div :style="{ width: cardWidth, height: cardHeight, overflow: 'auto' }">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ cardName }}</span>
        </div>
      </template>
      <div style="height: 100%;">
        <slot></slot>
      </div>
    </el-card>
  </div>

</template>

<script>
export default {
  name: 'CommonElCard',
  props: {
    cardName: {
      type: String,
      default: ''
    },
    cardWidth: {
      type: String,
      default: '100%' // 默认宽度
    },
    cardHeight: {
      type: String,
      default: '100%' // 默认高度
    }
  }
}
</script>

<style scoped lang="scss">
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
  width: 100%;
  height: 100%;
}
</style>
