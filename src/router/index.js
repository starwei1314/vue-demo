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
import photoList from "../pages/photoList"
import photoInfo from "../pages/photoInfo"
import goodsList from "../pages/goodslist"
import goodsInfo from "../pages/goodsInfo" 
import goodsDesc from "../pages/goodsDesc"
  

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
  },
  {path:"/home/photoList",component:photoList
},
{path:"/home/photoInfo/:id",component:photoInfo
},
{
  path:"/home/goodsList",component:goodsList
},
{
  path:"/home/goodsInfo/:id",component:goodsInfo
},
{
  path:"/home/goodsDesc/:id",component:goodsDesc
}

    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
  ],
  linkActiveClass:"mui-active"//自定义高亮显示类,完美解决mui框架的高亮显示编写麻烦
})
