<template>
  <div class="test">
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
  <div>
    <Topographies/>
  </div>
</template>



<script>
export default {
  name: 'Test',
  components: {},
  data() {
    return {
      buttons: ['按钮1', '按钮2', '按钮3', '按钮4', '按钮5', '按钮6', '按钮7', '按钮8', '按钮9', '按钮10'],
      hoveredButtonName: '按钮1',
      selectedButtonName: '按钮1'
    }
  },
  methods: {
    showButtonName(button) {
      this.hoveredButtonName = button;
    },
    selectButton(button) {
      this.selectedButtonName = button;
      this.hoveredButtonName = button;
    }
  }
}
</script>

<style scoped>
.test {
  width: 300px;
  text-align: center;
  margin-top: 60px;
}

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
</style>
