<template>
  <div style="margin: 50px">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ cardName }}</span>
<!--          <el-button class="button" type="text">操作按钮</el-button>-->
        </div>
      </template>
      <div style="height: 200px">
        <slot></slot>
      </div>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'CommonElCard',
  data() {
    return {

    }
  },
  props: {
    cardName: {
      type: String,
      default: ''
    },
    cardWidth: {
      type: String,
      default: '480px' // 默认宽度
    },
    cardHeight: {
      type: String,
      default: '200px' // 默认高度
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
  width: v-bind(cardWidth);
  height: v-bind(cardHeight);
}

</style>
