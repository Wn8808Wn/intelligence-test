import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  // mode: 'history',
  routes: [{
      path: '/',
      name: 'login',
      component: () => import('@/pages/login/login')
    }, {
      path: '/manage',
      name: 'manage',
      component: () => import('@/pages/manage'),
      children: [{
          path: '/examManage',
          name: 'examManage',
          component: () => import('@/pages/examManage/examManage'),
        },
        {
          path: '/addRoom',
          name: 'addRoom',
          component: () => import('@/pages/exammanage/addRoom/addRoom'),
        },
        {
          path: '/examRoomDetail',
          name: 'examRoomDetail',
          component: () => import('@/pages/exammanage/examRoomDetail/examRoomDetail'),
        }

        , {
          path: '/standardManage',   //考题标准
          name: 'standardManage',
          component: () => import('@/pages/standardManage/standardManage'),
          children: [{
            path: '/standardManage',   //考题标准
            name: 'standard',
            component: () => import('@/pages/standardManage/standard/standard'),
          },
          {
            path: '/addStandard',   //考题标准
            name: 'addStandard',
            component: () => import('@/pages/standardManage/addStandard/addStandard'),
          },
          {
            path: '/standardTemplate',   //考题标准
            name: 'standardTemplate',
            component: () => import('@/pages/standardManage/standardTemplate/standardTemplate'),
          }
        
        ]
        },
         {
          path: '/planManage',       //考试计划
          name: 'planManage',
          component: () => import('@/pages/planManage/planManage')
        }, {
          path: '/orderManage',      //订单管理
          name: 'orderManage',
          component: () => import('@/pages/orderManage/orderManage')
        }, {
          path: '/status',
          name: 'status',
          component: () => import('@/pages/status/status')
        }, {
          path: '/ticketManage',
          name: 'ticketManage',
          component: () => import('@/pages/ticketManage/ticketManage')
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
