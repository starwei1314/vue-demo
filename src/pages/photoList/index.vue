<template>
  <div class="photoList">
    <!-- 组件头部区 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item', {'mui-active':item.id==0}]"
            v-for="item in photoCate"
            :key="item.id"
            @click="getPhotolist(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>
    <!-- 图片列表展示区 -->
    <ul class="photo-list">
      <!-- 懒加载  v-lazy的值为图片的地址   查看mint文档 -->
      <router-link :to="'/home/photoInfo/'+item.id" tag="li" v-for="(item , index) in photoList" :key="index">
        <img v-lazy="item.img_url">
        <div class="art">
          <div class="art-title">{{item.title}}</div>
          <div class="art-body">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
//如果需要插件实现滑动效果则  需要引入js文件
import mui from "@/libs/mui/js/mui.js";
export default {
  data() {
    return {
      id: "",
      photoCate: [],
      photoList: []
    };
  },
  created() {
    this.getPhotocate();
    this.getPhotolist(0)
    
  },
  mounted() {
    //初始化滑动组件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getPhotocate() {
      this.$http.get("getimgcategory").then(res => {
        //由于数据库中没 有  全部  的数据  但由于要求需要则手动添加
        res.body.message.unshift({
          title: "全部",
          id: 0
        });
        this.photoCate = res.body.message;
      });
    },
    getPhotolist(listId) {
      this.$http.get("getimages/" + listId).then(res => {
        this.photoList = res.body.message;
      });
    }
  }
};
</script>
<style lang=less>
* {
  touch-action: pan-y;
}
.photoList {
  
  .photo-list {
    margin: 0;
    padding: 10px;
    padding-bottom: 0;
    li{
       background-color: #ccc;
       text-align: center;
       margin-bottom: 10px;
       box-shadow: 0 0 9px #999;
       position: relative;
       img {
        width: 100%;
        vertical-align: middle;
          }
        img[lazy="loading"] {
          width: 40px;
          height: 300px;
          margin: auto;
            }
    .art {
      color: white;
      padding:10px;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
      .art-title {
        color: red;
        font-size: 16px;
      }
      .art-body {
        font-size: 12px;
        color: white;
      }
    }
    }
   
  }
}
</style>

