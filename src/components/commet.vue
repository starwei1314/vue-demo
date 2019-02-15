<template>
    <div class="commet-container">
        <hr>
        <h3>评论内容</h3>
         <div class="commetsList">
            <div class="cml-item" v-for="(item,i) in commets" :key="i">
                <div class="cml-title"> 第{{i+1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}</div>
                <div class="cml-body">{{item.content==="undefined"?"该用户很懒,嘛都不说;":item.content}}</div>
            </div>

        </div> 
        
        <hr>
        <textarea v-model="msg"  placeholder="请输入要吐槽的内容(最多吐槽100字)" max-length="100"></textarea>
        <mt-button type="primary" size="large"  @click="postCommets">发表评论</mt-button>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多...</mt-button>
    </div>
</template>
<script>
import {Toast} from "mint-ui"
export default {
    props:["commetId"],
    data(){
        return {
            commets:[],
            pageIndex:1,//设置默认为第一页
            msg:""
        }
    },
    created(){
        this.getCommets()
    },
    mounted(){
        this.getCommets()
    },
    methods:{
        getCommets(){
            this.$http.get("getcomments/"+this.commetId+"?pageindex="+this.pageIndex).then(
                res=>{
                    console.log(res)
                    this.commets=this.commets.concat(res.body.message)
                }
            )
        },
        getMore(){
            this.pageIndex++
            this.getCommets()
        },
        //点击发表评论
        postCommets(){
            //假如提交的为空着提示用户不能为空
            if(this.msg.trim().length==0){
                return Toast("评论不能为空")
            }
        
            this.$http.post("postcomment/"+this.commetId,{
                content:this.msg
            }).then(res=>{
                Toast(res.body.message)
                 //为了让用户在第一楼看见提交的评论   则需要自己添加的数组的第一项中
                // this.commets.unshift({
                //     add_time:Date.now(),
                //     content:"aaaa",
                //     user_name:"匿名用户"
                // })//为什么没有重新渲染到页面上  数据改变需要刷新页面
                 this.commets=[]
                 this.pageIndex=1
                 this.getCommets()
                //清空文本域
                this.msg=""
            })
           

        }
    }
}
</script>
<style lang=less scoped>
.commet-container{
    h3{
        color:rgb(105, 23, 23)
    }
    .commetsList{
        padding:5;
          .cml-item{
                margin:5px;
              .cml-title{
                  font-size:12px;
                  color:skyblue;
              }
              .cml-body{
                  font-size:14px;
                  color:#999
              }
          } 
        }
}
    
</style>
