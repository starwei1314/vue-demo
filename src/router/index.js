import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

//@就是src目录
//引入路由配置文件访问地址
import home from '../pages/home'
import vip from '../pages/vip'
import shopcar from '../pages/shopcar'
import search from '../pages/search'
import newsList from "../pages/newslist"
import newsInfo from "../pages/newsInfo"
 

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",redirect:"/home"
    },
    {
      path:"/home",component:home
    },
    {
      path:"/vip",component:vip
    },
    {
      path:"/shopcar",component:shopcar
    },
    {path:"/search",component:search
  },
  {
    path:"/home/newsList",component:newsList
  },
  {
    path:"/home/newsInfo/:id",component:newsInfo
  }

    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
  ],
  linkActiveClass:"mui-active"//自定义高亮显示类,完美解决mui框架的高亮显示编写麻烦
})
