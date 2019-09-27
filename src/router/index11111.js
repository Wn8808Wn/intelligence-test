// router/index.js
import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import store from '../store/index'
Vue.use(Router);
//手动跳转的页面白名单
const whiteList = ['/'];
//默认不需要权限的页面
const constantRouterMap = [
    {
    path: '/',
    name: 'login',
    component: (resolve) => require(['@/pages/login/login'], resolve)
    },
    {
    path: '/loading',
    name: 'loading',
    component: (resolve) => require(['@/pages/loading'], resolve)
    },
    {
        path: '**',
        name: '404',
        component: () => import('@/pages/404pages/404pages')
    }
]

//注册路由
export default new Router({
    mode: 'history',
    routes: constantRouterMap
});

//异步路由（需要权限的页面）
export const asyncRouterMap = [{
    path: '/manage',
    name: 'manage',
    meta: {
        permission: []
    },
    component: () => import('@/pages/manage'),
    redirect: '/examManage',
    children: [{
            path: '/examManage',
            name: 'examManage',
            meta: {
                permission: []
            },
            component: () => import('@/pages/examManage/examManage'),
        },
        {
            path: '/examManage/addRoom',
            name: 'addRoom',
            meta: {
                permission: []
            },
            component: () => import('@/pages/examManage/addRoom'),
        },
        {
            path: '/examManage/frozenRoom',
            name: 'frozenRoom',
            meta: {
                permission: []
            },
            component: () => import('@/pages/examManage/frozenRoom'),
        },
        {
            path: '/examManage/examRoomDetail',
            name: 'examRoomDetail',
            meta: {
                permission: []
            },
            component: () => import('@/pages/examManage/examRoomDetail'),
        },
        {
            path: '/standardManage', //考题标准
            name: 'standardManage',
            meta: {
                permission: []
            },
            redirect: '/standardManage/standard',
            component: () => import('@/pages/standardManage/standardManage'),
            children: [{
                    path: 'standard', //考题标准
                    name: 'standard',
                    meta: {
                        permission: []
                    },
                    component: () => import('@/pages/standardManage/standard/standard'),
                },
                {
                    path: 'addStandard', //增加考题标准
                    name: 'addStandard',
                    meta: {
                        permission: []
                    },
                    component: () => import('@/pages/standardManage/addStandard/addStandard'),
                },
                {
                    path: 'standardTemplate', //考题模板
                    name: 'standardTemplate',
                    meta: {
                        permission: []
                    },
                    component: () => import('@/pages/standardManage/standardTemplate/standardTemplate'),
                },
                {
                    path: 'addStandardTemplate', //增加考题模板
                    name: 'addStandardTemplate',
                    meta: {
                        permission: []
                    },
                    component: () => import('@/pages/standardManage/addStandard/addStandardTemplate'),
                },
                {
                    path: 'standardDetail', //考题详情
                    name: 'standardDetail',
                    meta: {
                        permission: []
                    },
                    component: () => import('@/pages/standardManage/standardDetail/standardDetail'),
                },
                {
                    path: 'updateStandard', //修改考题
                    name: 'updateStandard',
                    meta: {
                        permission: []
                    },
                    component: () => import('@/pages/standardManage/updateStandard/updateStandard'),
                },
                {
                    path: 'updateStandardTemplate', //修改考题模板
                    name: 'updateStandardTemplate',
                    meta: {
                        permission: []
                    },
                    component: () => import('@/pages/standardManage/updateStandard/updateStandardTemplate'),
                }
            ]
        },
        {
            path: '/planManage/limiteSet', //考试计划
            name: 'limiteSet',
            meta: {
                permission: []
            },
            component: () => import('@/pages/planManage/limiteSet'),
        },
        {
            path: '/planManage/planList', //限报设置
            name: 'planList',
            meta: {
                permission: []
            },
            component: () => import('@/pages/planManage/planManage'),
        },
        {
            path: '/planManage/addPlan', //考试计划 
            name: 'addPlan',
            meta: {
                permission: []
            },
            component: () => import('@/pages/planManage/addPlan')
        },
        {
            path: '/planManage/editPlan', //考试计划 
            name: 'editPlan',
            meta: {
                permission: []
            },
            component: () => import('@/pages/planManage/editPlan')
        },
        {
            path: '/orderManage', //订单管理
            name: 'orderManage',
            meta: {
                permission: []
            },
            component: () => import('@/pages/orderManage/orderManage'),
        },
        {
            path: '/orderManage/orderDetail', //订单管理
            name: 'orderDetail',
            meta: {
                permission: []
            },
            component: () => import('@/pages/orderManage/orderDetail'),
        },
        {
            path: '/examStatus',
            name: 'examStatus',
            meta: {
                permission: []
            },
            component: () => import('@/pages/examStatus/examStatus')
        },
        {
            path: '/ticketManage',
            name: 'ticketManage',
            meta: {
                permission: []
            },
            component: () => import('@/pages/ticketManage/ticketManage')
        },
        {
            path: '/shortMessage',
            name: 'shortMessage',
            meta: {
                permission: []
            },
            component: () => import('@/pages/shortMessage/shortMessage')
        }
    ]
}, ]
// component: (resolve) => require(['@/components/Log/userLog'], resolve),

// router/index.js
/**
 * 根据权限匹配路由
 * @param {array} permission 权限列表（菜单列表）
 * @param {array} asyncRouter 异步路由对象
 */
function routerMatch(permission, asyncRouter) {
    return new Promise((resolve) => {
        const routers = [];
        // 创建路由
        function createRouter(permission) {
            // 根据路径匹配到的router对象添加到routers中即可
            permission.forEach((item) => {
                if (item.children && item.children.length) {
                    createRouter(item.children)
                }
                let path = item.path;
                // 循环异步路由，将符合权限列表的路由加入到routers中
                asyncRouter.find((s) => {
                    if (s.path === '') {
                        s.children.find((y) => {
                            if (y.path === path) {
                                y.meta.permission = item.permission;
                                routers.push(s);
                            }
                        })
                    }
                    if (s.path === path) {
                        s.meta.permission = item.permission;
                        routers.push(s);
                    }
                })
            })
        }
        createRouter(permission)
        resolve([routers])
    })
}


// router/index.js
// router.beforeEach((to, form, next) => {
//     if (sessionStorage.getItem('dsToken')) {
//         if (to.path === '/') {
//             router.replace('/login')
//         } else {
//             console.log(store.state.list.length);
//             if (store.state.list.length === 0) {
//                 //如果没有权限列表，将重新向后台请求一次
//                 store.dispatch('saveUserInfo').then(res => {
//                     //调用权限匹配的方法
//                     routerMatch(res, asyncRouterMap).then(res => {
//                         //将匹配出来的权限列表进行addRoutes
//                         router.addRoutes(res[0]);
//                         next(to.path)
//                     })
//                 }).catch(() => {
//                     router.replace('/')
//                 })
//             } else {
//                 if (to.matched.length) {
//                     next()
//                 } else {
//                     router.replace('/')
//                 }
//             }
//         }
//     } else {
//         if (whiteList.indexOf(to.path) >= 0) {
//             next()
//         } else {
//             router.replace('/')
//         }
//     }
// });
