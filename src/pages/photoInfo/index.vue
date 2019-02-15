<template>
    <div class="photoInfo-container">
        <h4>{{photoInfo.title}}</h4>
        <p class="subtitle">
            <span>发表时间:{{photoInfo.add_time | dateFormat}}</span>
            <span>点击:{{photoInfo.click}}次</span>
        </p>
        <!-- 图片缩略图区域 -->
        <!-- 内容展示区域 -->
        <div class="content" v-html="photoInfo.content"></div>
        <!-- 评论组件 -->
        <commet></commet>
    </div>
</template>
<script>
export default {
    data(){
        return {
            id:this.$route.params.id,
            photoInfo:{}
        }
    },
    created(){
        this.getPhotoinfo()
    },
    methods:{
        getPhotoinfo(){
            this.$http.get("getimageInfo/"+this.id).then(res=>{
                this.photoInfo=res.body.message[0]
            })
        }
    }
}
</script>
<style>

</style>

