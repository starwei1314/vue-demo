// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入vue-resource发送请求
import VueResource from "vue-resource"
Vue.use(VueResource)

//导入mint-ui组件
import MintUi from "mint-ui"
//引入mintUI样式
import "../node_modules/_mint-ui@2.2.13@mint-ui/lib/style.css"
//安装mint-UI(全局注册所有)
Vue.use(MintUi)
//引入mui扩展字体的css文件   mui的样式文件 common.css通用文件
import './style/common.css'//css reset cs样式初始化
import './libs/mui/css/mui.min.css'
import './libs/mui/css/icons-extra.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
