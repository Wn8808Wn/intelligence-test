import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'login',
      component: () => import('@/pages/login/login'),
    }, 
    {
      path: '/manage',
      name: 'manage',
      component: () => import('@/pages/manage'),
      children: [
        {
          path: '/examManage',
          name: 'examManage',
          component: () => import('@/pages/examManage/examManage'),
        },
        {
          path: '/examRoomDetail',
          name: 'examRoomDetail',
          component: () => import('@/pages/examManage/examRoomDetail'),
        },
        {
          path: '/standardManage', //考题标准
          name: 'standardManage',
          redirect:'/standardManage/standard',
          component: () => import('@/pages/standardManage/standardManage'),
          children: [
            {
              path: 'standard', //考题标准
              name: 'standard',
              component: () => import('@/pages/standardManage/standard/standard'),
            },
            {
              path: 'addStandard', //增加考题标准
              name: 'addStandard',
              component: () => import('@/pages/standardManage/addStandard/addStandard'),
            },
            {
              path: 'standardTemplate', //考题模板
              name: 'standardTemplate',
              component: () => import('@/pages/standardManage/standardTemplate/standardTemplate'),
            },
            {
              path: 'addStandardTemplate', //增加考题模板
              name: 'addStandardTemplate',
              component: () => import('@/pages/standardManage/addStandard/addStandardTemplate'),
            },
            {
              path: 'standardDetail', //考题详情
              name: 'standardDetail',
              component: () => import('@/pages/standardManage/standardDetail/standardDetail'),
            },
            {
              path: 'updateStandard', //修改考题
              name: 'updateStandard',
              component: () => import('@/pages/standardManage/updateStandard/updateStandard'),
            },
            {
              path: 'updateStandardTemplate', //修改考题模板
              name: 'updateStandardTemplate',
              component: () => import('@/pages/standardManage/updateStandard/updateStandardTemplate'),
            }
          ]
        },
        {
          path: '/planManage', //考试计划
          name: 'planManage',
          component: () => import('@/pages/planManage/planManage'),
          children:[
            {
              path: '/plansList', //考试计划 
              name: 'plansList',
              component: () => import('@/pages/planManage/plansList')
            },
            {
              path: '/addPlan', //考试计划 
              name: 'addPlan',
              component: () => import('@/pages/planManage/addPlan')
            },
            {
              path: '/editPlan', //考试计划 
              name: 'editPlan',
              component: () => import('@/pages/planManage/editPlan')
            }
          ]
        },
        {
          path: '/orderManage', //订单管理
          name: 'orderManage',
          component: () => import('@/pages/orderManage/orderManage'),
        },
        {
          path: '/examStatus',
          name: 'examStatus',
          component: () => import('@/pages/examStatus/examStatus')
        },
        {
          path: '/ticketManage',
          name: 'ticketManage',
          component: () => import('@/pages/ticketManage/ticketManage')
        },
        {
          path: '/shortMessage',
          name: 'shortMessage',
          component: () => import('@/pages/shortMessage/shortMessage')
        }
      ]
    },
    {
      path: '**',
      name: '404',
      component: () => import('@/pages/404pages/404pages')
    }
  ]
})
