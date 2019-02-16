<template>
  <div class="goodsList">
    <div class="good_item" v-for="item in goodsList" :key="item.id" @click="getInfo(item.id)">
      <img :src="item.img_url">
      <h2 class="title">{{item.title}}</h2>
      <div class="info">
        <p class="price">
          <span class="now">${{item.market_price}}</span>
          <span class="old">${{item.sell_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}</span>
        </p>
      </div>
    </div>
    <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button> 
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageIndex: 1,
      goodsList: []
    };
  },
  created() {
    this.getGoods();
  },
  methods: {
    getGoods() {
      this.$http.get("getgoods?pageindex=" + this.pageIndex).then(res => {
        this.goodsList = this.goodsList.concat(res.body.message);
      });
    },
     getMore(){
        //点击获取更多的商品
         this.pageIndex++
        this.getGoods()
    },
    getInfo(id){
    // 使用js形式的路由导航
        this.$router.push("/home/goodsInfo/"+id)
    }
  }
};
</script>
<style lang=less>
.goodsList {
    background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  .good_item {
    width: 48%;
    margin:3px;
    box-shadow: 0 0 10px #999;
    min-height: 293px;
    display: flex;
     flex-direction: column;
    justify-content: space-between;
    .title{
        font-size:14px;
        text-align: center;
    }
    img {
      width: 100%;
    }
    .info{
        p{
            margin:0;
        }
        background-color:rgba(8, 8, 8, 0.123);
        .price{  
            display:flex;
            justify-content: space-around;
            padiing:10px;
            font-size:12px;
            .now{
                color:red;
                font-weight: bolder;
            }
            .old{
                color:white;
                text-decoration: line-through;
            }
        }
        .sell{
            display:flex;
            justify-content: space-around;
            color:darkgray;
        }
    }
  }
}
</style>

