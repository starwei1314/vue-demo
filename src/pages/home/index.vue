<template>
  <div class="home-container">
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
  
      <mt-swipe-item v-for="item of swipeList" :key="item.img">
        <img :src="item.img" alt>
      </mt-swipe-item>
    </mt-swipe>
    <!-- // 九宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newsList">
          <img src="@/assets/menu1.png" alt>
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photoList">
          <img src="@/assets/menu2.png" alt>
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodsList">
          <img src="@/assets/menu3.png" alt>
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="#">
          <img src="@/assets/menu4.png" alt>
          <div class="mui-media-body">留言反馈</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="#">
          <img src="@/assets/menu5.png" alt>
          <div class="mui-media-body">视频专区</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="#">
          <img src="@/assets/menu6.png" alt>
          <div class="mui-media-body">联系我们</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      swipeList: null
    };
  },
  //实例创建完毕立即获取数据
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http.get("getlunbo").then(result => {
        this.swipeList = result.body.message;
      });
    }
  }
};
</script>
<style lang=less>
.home-container {
  .mint-swipe {
    height: 200px;
    .mint-swipe-item {
      img {
        height:100%;
        width: 100%;
      }
    }
  }
  .mui-table-view{
      background-color: #fff;
      img{
          width:75%
      }
     .mui-table-view-cell{
         border:none
      }
      .mui-media-body {
      font-size: 13px !important;
    }
  }
}
</style>

