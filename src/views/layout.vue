<template>
  <div class="layout">
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        text-color="rgb(191, 203, 217)"
        active-text-color="rgb(64, 158, 255)"
        background-color="rgb(48, 65, 86)"
        show-timeout=1000
        hide-timeout=1000
      >
        <template v-for="(item, key) in routes">
          <el-submenu :key="key" :index="item.name"  v-if="item.children&& item.children.length > 0">
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
          <router-link :to="item.path" v-else :key="key">
            <el-menu-item :index="item.path" >
                <i class="el-icon-menu"></i>
                <span slot="title">{{item.meta.title}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <i :class="['el-icon-d-arrow-left', {'close': isCollapse}]" @click="changeBarIsOpen"></i>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <template v-for="(item, key) in routeInfos">
              <el-breadcrumb-item :key="key" :to='item.path' v-if="key ==- 0 && routeInfos.length > 1">{{item.meta.title}}</el-breadcrumb-item>
              <el-breadcrumb-item :key="key" v-else>{{item.meta.title}}</el-breadcrumb-item><span class="fg" :key="item.path">/</span>
            </template>
          </el-breadcrumb>
        </el-header>
        <el-main>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      routeInfos: []
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    changeBarIsOpen () {
      this.$store.dispatch('changeBarIsOpen')
    },
    getRouteInfos () {
      var routeInfos = this.$route.matched
      if (routeInfos[0] && routeInfos[0].name !== 'Index') {
        routeInfos = [{name: 'Index', path: '/', meta: { title: '首页', icon: 'Index' }}].concat(routeInfos)
      }
      this.routeInfos = routeInfos
    }
  },
  created () {
    this.getRouteInfos()
  },
  watch: {
    $route () {
      this.getRouteInfos()
    }
  },
  computed: {
    routes () {
      var routes = this.$router.options.routes
      return routes
    },
    isCollapse () {
      return this.$store.state.bar.barIsOpen
    }
  }
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100%;
  box-sizing: border-box;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.el-header > i {
  font-size: 24px;
  transition: all linear 0.5s;
}
.el-header > i.close {
  transform: rotate(180deg);
}
.el-menu-item:hover,
.el-submenu__title:hover {
  background-color: #001528 !important;
}
.el-aside {
  background-color: rgb(48, 65, 86);
  color: #333;
  padding-top: 60px;
  transition: all 1s;
  overflow-x:hidden;
}
.el-aside::-webkit-scrollbar{
    width: 8px;
    height: 8px;
    background-color: rgb(48, 65, 86);
}
.el-aside::-webkit-scrollbar-track{
    /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3); */
    border-radius: 10px;
    background-color: rgb(48, 65, 86);
}
.el-aside::-webkit-scrollbar-thumb{
    /*width: 10px;*/
    height: 8px;
    border-radius: 8px;
    /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3); */
    background-color:hsla(220,4%,58%,.5);
}
.el-main {
  background-color: #fff;
  color: #333;
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
.el-menu {
  border-right: none;
}
.el-breadcrumb {
  display: inline-block;
}
.el-breadcrumb .fg {
  float: left;
  margin: 0 4px;
}
.el-breadcrumb .fg:last-child{
  display: none;
}
.el-breadcrumb .el-breadcrumb__separator {
  display: none;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
