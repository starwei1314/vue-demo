<template>
    <div class="photoInfo-container">
        <h4>{{photoInfo.title}}</h4>
        <p class="subtitle">
            <span>发表时间:{{photoInfo.add_time | dateFormat}}</span>
            <span>点击:{{photoInfo.click}}次</span>
        </p>
        <!-- 图片缩略图区域 -->
        <div class="prevw">
            <img class="preview-img" v-for="(item, index) in preList" :src="item.src" height="150" @click="$preview.open(index, preList)" :key="index">
        </div>
        <!-- 内容展示区域 -->
        <div class="content" v-html="photoInfo.content"></div>
        <!-- 评论组件 -->
        <commet :commetId="id"></commet>
    </div>
</template>
<script>
export default {
    data(){
        return {
            id:this.$route.params.id,
            photoInfo:{},
            preList:[]
        }
    },
    created(){
        this.getPhotoinfo()
        this.getPrewv()
    },
    methods:{
        //获取图片详情
        getPhotoinfo(){
            this.$http.get("getimageInfo/"+this.id).then(res=>{
                this.photoInfo=res.body.message[0]
            })
        },
        //获取缩略图详情
        getPrewv(){
            this.$http.get("getthumimages/"+this.id).then(res=>{
            //根据文档要求   补全数据
               res.body.message.forEach(item=>{
                    item.w=400
                    item.h=200
                })
               
                this.preList=res.body.message
            })
        }

    }
}
</script>
<style lang=less scoped>
    .photoInfo-container{
        padding:10px 0;
        h4{
            color:darkgray;
        }
        .subtitle{
            display: flex;
            justify-content: space-between;
            margin-right: 20px;
        }
        .prevw{
            img{
                margin-left:5px;
                box-shadow: 0,0,10px #ccc;
            }
        }
    }
</style>

