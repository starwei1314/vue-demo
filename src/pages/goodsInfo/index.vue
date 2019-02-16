<template>
  <div class="goodsInfo">
    <!-- 展示轮播图区域 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item of swiperList" :key="item.src">
        <img :src="item.src" alt>
      </mt-swipe-item>
    </mt-swipe>
    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{infoList.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价:
            <del>￥{{infoList.market_price}}</del>
            &nbsp;&nbsp;销售价：
            <span class="now">￥{{infoList.sell_price}}</span>
          </p>
          <div class="numbox">
            <span class="title">购买数量:</span>
            <input type="button" value="-" @click="buyCount>=2&&buyCount--" :disabled="buyCount==1">
            <input  @change="buyCountchange"
             type="number" placeholder="1" v-model="buyCount">
            <input type="button" value="+"
            @click="buyCount<infoList.stock_quantity&&buyCount++"
            :disabled="buyCount==infoList.stock_quantity">
          </div>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>
    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ infoList.goods_no }}</p>
          <p>库存情况：{{ infoList.stock_quantity }}件</p>
          <p>上架时间：{{ infoList.add_time | dateFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
        <!-- <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button> -->
      </div>
    </div>
        
    <!-- <div v-html="goodsDetail.content"></div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      buyCount: "1",
     
      swiperList: null,
      infoList: {}
    };
  },
  created() {
    //获取详情
    // this.getDetail();
    //获取轮播图
    this.getSwiper();
    //获取价格参数
    this.getPrice();
  },
  methods: {
    //获取轮播图
    getSwiper() {
      this.$http.get("getthumimages/" + this.id).then(res => {
        this.swiperList = res.body.message;
      });
    },
    //获取产品参数价格
    getPrice() {
      this.$http.get("goods/getinfo/" + this.id).then(res => {
        this.infoList = res.body.message[0];
      });
    },
    buyCountchange(){
        if(this.buyCount>this.infoList.stock_quantity){
            this.buyCount=this.infoList.stock_quantity
        }
    },
    goDesc(id){
        this.$router.push("/home/goodsDesc/"+id)
    }
   
  }
};
</script>
<style lang="less">
.goodsInfo {
  .mint-swipe {
    padding: 10px;
    padding-bottom: 0;
    height: 200px;
    .mint-swipe-item {
      img {
        height: 100%;
        width: 100%;
      }
    }
  }
  .mui-card {
    .mui-card-header {
      font-size: 16px;
      text-algin: center;
    }
    .mui-card-content {
      .mui-card-content-inner {
        .now {
          font-weight: bold;
          color: red;
        }
        .numbox {
          display: flex;
          margin: 5px;
          .title {
            height: 50px;
            line-height: 50px;
          }
          input {
            margin: 5px;
            padding: 0;
            width: 40px;
            height: 40px;
            text-align: center;
            &[type="number"] {
              border-left: 0;
              border-right: 0;
              font-size: 12px;
              color: gray;
            }
          }
        }
      }
    }
  }
}
</style>
