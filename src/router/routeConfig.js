  //引入公共组件
  import layout from '../layouts/indexLayout.vue'
  import leftLayout from '../layouts/leftLayout.vue'
  //引入抽象过的对象
   import buyroute from './buyroute.js'
   import transferroute from './transferroute.js'

  export default {
    routes : [
        {
          path: '/index',
          component: layout,//公共顶边栏
          children: [{ 
            path: 'index', 
            component: () => import('../views/index/index.vue'),
            meta:{
                column:'index',
            },
            name:'index'
          },
          { 
              path: 'buy', 
              component: leftLayout,//公共左边栏
              //将chirldren中的数组用map的方法映射出来
              children: buyroute.children.map(item =>({
                  path: item.En,//确定子路由的路径
                  component: item.component,//子路由对应的组件
                  meta: {column: 'buy',subcolumn:item.En,Cn:item.Cn},//传出的信息
                  name: item.En//给路由起一个名字，可以用push方法跳转到对应名字的路由
              })),
              redirect: '/index/buy/SelectCar'//重定向，在访问到buy这个栏目自动跳到SelectCar二级页面，承接页的跳转
          },
          { 
              path: 'insurance',
              meta: {
                  column: 'insurance'
              },
              component: () => import('../views/insurance/index.vue')
          },
          { 
              path: 'parking',
              meta: {
                  column: 'parking'
              },
              component: () => import('../views/parking/index.vue')
          },
          { 
              path: 'sale',
              meta: {
                  column: 'sale'
              },
              component: () => import('../views/sale/index.vue')
          },
          {
              path : 'login',
              component : () => import('../views/login/login.vue'),
              name : 'login'
          },
          { 
              path: 'transfer', 
              component: leftLayout,//公共左边栏
              redirect: '/index/transfer/Intoin',
            //   将chirldren中的数组用map的方法映射出来
              children: transferroute.children.map(item =>({
                path: item.En,
                component: item.component,
                meta: {column: 'transfer',subcolumn:item.En,Cn:item.Cn},
                name: item.En
            }))
          }]
        }
    ]
}