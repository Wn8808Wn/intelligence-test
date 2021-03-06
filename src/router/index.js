import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    //方便后期维护入口
    {
      path: '/',
      name: 'login',
      component: () => import('@/pages/login/login'),
    }, 
    //接入第三方平台用于跳转
    {
      path: '/loading',
      name: 'loading',
      component: () => import('@/pages/loading'),
    }, 
    {
      path: '/manage',
      name: 'manage',
      component: () => import('@/pages/manage'),
      redirect:'/examManage',
      children: [
        {
          path: '/examManage',
          name: 'examManage',
          component: () => import('@/pages/examManage/examManage'),
        },
        {
          path: '/examManage/addRoom',
          name: 'addRoom',
          component: () => import('@/pages/examManage/addRoom'),
        },
        {
          path: '/examManage/frozenRoom',
          name: 'frozenRoom',
          component: () => import('@/pages/examManage/frozenRoom'),
        },
        {
          path: '/examManage/examRoomDetail',
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
          path: '/planManage/limiteSet', //考试计划
          name: 'limiteSet',
          component: () => import('@/pages/planManage/limiteSet'),
        },
        {
          path: '/planManage/planList', //限报设置
          name: 'planList',
          component: () => import('@/pages/planManage/planManage'),
        },
        {
          path: '/planManage/addPlan', //考试计划 
          name: 'addPlan',
          component: () => import('@/pages/planManage/addPlan')
        },
        {
          path: '/planManage/editPlan', //考试计划 
          name: 'editPlan',
          component: () => import('@/pages/planManage/editPlan')
        },
        {
          path: '/orderManage', //订单管理
          name: 'orderManage',
          component: () => import('@/pages/orderManage/orderManage'),
        },
        {
          path: '/orderManage/orderDetail', //订单管理
          name: 'orderDetail',
          component: () => import('@/pages/orderManage/orderDetail'),
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
