<template>
    <div class="commet-container">
        <hr>
         <div class="commetsList">
            <div class="cml-item" v-for="(item,i) in commets" :key="item.add_time">
                <div class="cml-title"> 第{{i+1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}</div>
            </div>

        </div> 
        <hr>
        <h3>发表评论:{{commetId}}</h3>
        <hr>
        <textarea placeholder="请输入要吐槽的内容(最多吐槽100字)" max-length="100"></textarea>
        <mt-button type="primary" size="large">发表评论</mt-button>
        <mt-button type="danger" size="large" plain>加载更多...</mt-button>
    </div>
</template>
<script>
export default {
    props:["commetId"],
    data(){
        return {
            commets:null,
            pageIndex:1//设置默认为第一页
        }
    },
    created(){
        this.getCommets()
    },
    methods:{
        getCommets(){
            this.$http.get("getcomments/"+this.commetId+"?pageindex="+this.pageIndex).then(
                res=>{
                    console.log(res)
                    this.commets=res.body.message
                }
            )
        }
    }
}
</script>
<style>

</style>
