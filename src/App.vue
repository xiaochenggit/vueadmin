<template>
  <div id="app">
    <lay-out></lay-out>
  </div>
</template>

<script>
import layOut from './views/layout'
export default {
  name: 'App',
  components: {
    layOut
  }
}
</script>

<style lang="scss" type="text/css">
@import url('normalize.css');
html, body, #app {
  height: 100%;
}
#app > .layout {
  height: 100%;
  & > .el-container {
    height: 100%;
  }
  a {
    text-decoration: none;
  }
}
</style>
