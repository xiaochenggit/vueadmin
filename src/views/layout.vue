<template>
  <div class="layout">
    <el-container>
      <el-aside width="200px">
      <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="false"
        text-color="rgb(191, 203, 217)"
        active-text-color="rgb(64, 158, 255)"
        background-color="rgb(48, 65, 86)"
      >
        <el-submenu v-for="(item, key) in routes" :index="item.name" :key="key">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{item.meta.title}}</span>
          </template>
          <el-menu-item-group v-for="(child, num) in item.children" :key='num'>
            <router-link :to="item.path + '/' + child.path">
              <el-menu-item :index="item.path + '/' + child.path ">{{child.meta.title}}</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isCollapse: true
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  computed: {
    routes () {
      var routes = this.$router.options.routes
      return routes
    }
  }
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    box-sizing: border-box;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-menu-item:hover,
.el-submenu__title:hover {
  background-color: #001528 !important;
}
.el-aside {
  background-color: rgb(48, 65, 86);
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
body > .el-container {
  margin-bottom: 40px;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}
.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-menu-item-group__title {
  padding: 0;
}
</style>
