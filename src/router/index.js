import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        title: '首页',
        icon: 'index'
      }
    },
    {
      path: '/data',
      name: 'Data',
      meta: {
        title: '数据统计',
        icon: 'Data'
      },
      component: () => import('@/views/data/data'),
      redirect: '/data/data1',
      children: [{
        path: 'data1',
        name: 'Data1',
        component: () => import('@/views/data/data1'),
        meta: {
          title: '实时数据',
          icon: 'Data1'
        }
      }, {
        path: 'data2',
        name: 'Data2',
        component: () => import('@/views/data/data2'),
        meta: {
          title: '订单日报',
          icon: 'Data2'
        }
      }]
    }
  ]
})
