<template>
    <div class="goodsDesc">
       <div v-html="goodsDetail.content"></div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            id:this.$route.params.id,
               goodsDetail: {},
        }
    },
    created(){
        this.getDetail()
    },
    methods:{
         //获取商品的详情
    getDetail() {
      this.$http.get("goods/getdesc/" + this.id).then(res => {
        this.goodsDetail = res.body.message[0];
      });
    }
    }
}
</script>
<style lang=less >
    .goodsDesc{
        .gomeImgLoad{
            width:100%
        }
    }
</style>
