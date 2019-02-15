<template>
    <div class="newsInfo-container">
        <!-- 这里是大标题 -->
        <h3 class="title">{{newsInfo.title}}</h3>
        <!-- 子标题 -->
        <p class="subtitle">
            <span>发表时间:{{newsInfo.add_time | dateFormat}}</span>
            <span>点击:{{newsInfo.click}}次数</span>
        </p>
        <hr>

        <!-- 内容区域 -->
        <div class="content" v-html="newsInfo.content"></div>
        <!-- 评论区域 -->
        <commet :commetId="id"></commet>
    </div>  
</template>
<script>
export default {
    
    data(){
        return {
            id:this.$route.params.id,//将url地址中传递过来的Id值,挂载到data上,方便以后调用
            newsInfo:[]
        }
    },
    //已经页面获取值发送详情的请求
    created(){
        this.getInfo()
    },
    methods:{
        getInfo(){
            this.$http.get("getnew/"+this.id).then(res=>{
                this.newsInfo=res.body.message[0]
            })
        }
    }
}
</script>
<style lang="less">
//scoped的作用,是为了限制样式只在当前组件中生效,不会影响其他组件
//原理是给当前组件类所有的标签都加入唯一的一个标识符例如data-v-aasda
//然后,在设置样式的时候利用属性选择器来修改
    .newsInfo-container{
        padding: 0 5px;
        .title{
            font-size:15px;
            color:red;
            text-align: center;
        }
        .subtitle{
            font-size: 12px;
            color:skyblue;
            display: flex;
            justify-content: space-between;
            text-indent: 3em
        }
        .content{
            img{
                width:100%
            }
        }
    }
</style>

