<template>
  <div class="newsList-container">
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item of newsList" :key="item.id">
        <router-link :to="'/home/newsInfo/'+item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">{{item.title}}
        <p class="mui-ellipsis">
            <span>发表时间:{{item.add_time | dataFormat}}</span>
            <span>点击次数:{{item.click}}</span></p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newsList: null
    };
  },
  created() {
    this.getNews();
  },
  methods: {
    //根据接口文档发送请求获取新闻页列表的信息
    getNews() {
      this.$http.get("getnewslist").then(res => {
        console.log(res);
        this.newsList = res.body.message;
      });
    }
  }
};
</script>
<style lang=less >
.newsList-container{
    .mui-table-view{
        .mui-table-view-cell{
            .mui-media-body{
                font-size:14px;
                color:red;
                padding-bottom:5px;
                .mui-ellipsis{
                    font-size: 12px;
                    color:skyblue;
                    display:flex;
                    justify-content: space-between;
                }
            }
        }
    }
    }
</style>
