<template>
    <div class="ifd">
        <!-- <div class="banner">
                <img src="./imgs/ifd_banner.png" >
        </div> -->
        <div class="container">
            <div>
                <p>我的邀请码</p>
                <input type="text" v-model="message" readonly=true >
            </div>
            <button type="button"
            v-clipboard:copy="message"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError">复制</button>
        </div>
         <router-link to="/ifnnum">
            <div class="create">
                <p>生成邀请卡</p>
                <p>截图发给好友并叮嘱其注册时填写邀请码</p>
            </div>
         </router-link>
    </div>
</template>
<script>
import {getuserinfo} from '@/services/mining.js'
export default {
    name:'ifd-invite',
    data(){
        return{
            message:''//邀请码
        }
    },
     methods: {
        onCopy: function (e) {
           this.$vux.toast.show({
             text: '复制成功',
             width:'9.5rem',
             type:'success',
          })
        },
        onError: function (e) {
             this.$vux.toast.show({
             text: '复制失败',
             type:'cancel',
             width:'9.5rem',
          })
        },

        //获取用户信息
        requestuserinfo(){
            this.$vux.loading.show({
                    text: '正在加载中'
                  })
            getuserinfo({
                mark:this.$mark,
                token:this.$token,
            })
            .then(result=>{
                if(result.data.code==10000){
                     this.message= result.data.result.invite_code;
                }
                 this.$vux.loading.hide()
            })
        }
    },
    mounted(){
      this.requestuserinfo();
    },
    activated(){

    }
}
</script>

<style lang='less'  scoped>
     @import url("../../styles/record.less");
     *{
         padding: 0;
         margin: 0
     }
     .banner{
         width: 100%;
         height: 11rem;
         margin-top: 44px;
         img{
             width: 100%;
             height: 100%;
         }
     }
     .container{
         display: flex;
         height: 4rem;
         margin-top:47px;
         color: #a9acb5;
         line-height: 4rem;
         padding: 0 15px;
         width: 100%;
         box-sizing: border-box;
         justify-content: space-between;
         font-size: 1.4rem;
         background: #1e202d;
        div {
            display: flex;
            p{
                margin-right: 1rem;
                width:8rem;
            }
            input{
                background: #1e202d;
                color: #dab950;
                font-size: 1.4rem;
                border:none;
                letter-spacing: .1rem;
                width: 8rem;
            }
        }
        button{
            background: #dab950;
            border:none;
            width: 4.7rem;
            height: 2.4rem;
            line-height: 2.4rem;
            margin-top: .8rem;
             font-size: 1.3rem;
            color: white;
            border-radius: 5px;
        }
     }
    .create{
        width: 100%;
        height: 4rem;
        background: url(./imgs/ifd_bg.png) no-repeat center;
        background-size:100% 100%;
        text-align: center;
        color: white;
        padding-top:1rem;
        :nth-child(1){
            font-size: 1.3rem;
            letter-spacing: 0.4rem;
            font-weight: 900;
        }
         :nth-child(2){
            font-size: 1.1rem;
            letter-spacing: 0.2rem;
        }
    }

</style>
