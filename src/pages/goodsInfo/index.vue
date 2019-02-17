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
            <mt-button type="danger" size="small" @click="addCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>


    <!-- 小球动画 -->
  <transition 
  @before-enter="beforeEnter"
  @enter="Enter"
  @after-enter="afterEnter">
    <!-- ref属性通过$refs指向这个元素 -->
    <div class="ball" v-show="ballFlag" ref="ball"></div>
  </transition>


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
        <mt-button type="danger" size="large" plain @click="goCommets(id)">商品评论</mt-button>
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
     ballFlag:false,
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
      //当输入框输入数字大于库存量时会自动同步为最大的库存量
        if(this.buyCount>this.infoList.stock_quantity){
            this.buyCount=this.infoList.stock_quantity
        }
    },
    goDesc(id){
      // 点击以后跳转到商品详情页
        this.$router.push("/home/goodsDesc/"+id)
    },
    goCommets(id){
      //点击跳转到评论组件的页面
      this.$router.push("/home/goodsCommets/"+id)
    },
    addCar(){
      //添加到到购物车实现小球的动画
      //Element.getBoundingClientRect()使用Javascript提供的原生方法
      //返回的一组矩形的集合, 即：是与该元素相关的CSS 边框集合 。除了 width 和 height 外的属性都是相对于视口的左上角位置而言的
      //点击加入购物车后小球显示并执行动画
      this.ballFlag=!this.ballFlag
    },
    beforeEnter(el){
      //执行动画前元素保留在原来位置不移动
      el.style.transform="translate(0,0)"
    },
    Enter(el,done){
      el.offsetWidth//必须要加  原因需要dom实时刷新也可以通过定时器settimeOut来打断结束的执行来进行刷新
      //1.首先获取小球在页面中的位置
      console.log(this)
      console.log(this.$refs.ball)
      let ballPosition=this.$refs.ball.getBoundingClientRect()
      //由于小球最终都会跳转到徽标的地方所以直接获取徽标的位置,
      let badgePosition=document.getElementById("badge").getBoundingClientRect()
      //通过最终位置和起始位置相减得出元素需要移动的距离
      let moveX=badgePosition.left-ballPosition.left
      let moveY=badgePosition.top-ballPosition.top
     
      //元素最终需要移动的大小
      el.style.transform=`translate(${moveX}px,${moveY}px)`
      el.style.transition="all 1s cubic-bezier(.4,-0.3,1,.68)"
      done()
    },
    afterEnter(el){
      //当小球完成动画后将其隐藏
      this.ballFlag=!this.ballFlag
    }
   
  }
};
</script>
<style lang="less">
.goodsInfo {
  .ball{
    position: absolute;
    top:375px;
    left:155px;
    // bottom:18px;
    // left:160px;
    width: 20px;
    height: 20px;
    background-color: red;
    z-index: 99;
    border-radius:50%;

  }
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
