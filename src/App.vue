<template>
  <div id="app">
    <mt-header fixed title="vue项目策划">
   </mt-header>
	 <!-- 可以给transition添加name   自定义类名的前缀头 -->
    <transition >
    <router-view/>
    </transition>
    
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item " to='/home'>
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">0</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/vip">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员中心</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  padding-top: 40px;
  padding-bottom: 50px;
	overflow-x:hidden;
	 /*overflow-x隐藏水平滚动条 当新的组件页面进来时页面宽度不能超过app的宽度影响用户体验 */
}
.v-enter{
	opacity:0;
  transform:translateX(100%)
}
.v-leave-to{
	opacity:0;
	/* 当组件离开时为了解决独占一行的影响 给其添加绝对定位 */
	position: absolute;
	transform: translateX(-100%)
}
.v-enter-active,.v-leave-active{
	transition: all 0.5s ease;
}
</style>
