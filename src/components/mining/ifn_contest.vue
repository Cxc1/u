<template>
  <div class="ifn_wrap">
    <div class="ifn_wrap_content">
      <p class="ifn_wrap_content_text">您的邀请码</p>
      <div class="ifn_wrap_content_code">
        <p>{{invite_code}}</p>
      </div>
      <p class="user_id">
        邀请人ID : {{user_id}}
      </p>
      <p class="ifn_wrap_content_ipt">
        <!--<input type="text" v-model="message" width="0" readonly="readonly">-->
        <span
          v-clipboard:copy="message"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError">复制链接</span>
      </p>
      <p class="ifn_wrap_content_user_number">
        我是 <span>{{user_nickname}}</span>
      </p>
      <p class="ifn_wrap_content_user_number">
       我在UUC公链社区等你，不见不散
      </p>
      <div class="ifn_wrap_content_qrcode">
        <img src="https://diqiucun.oss-cn-shanghai.aliyuncs.com/uuc/uucxz.png" alt="">
      </div>
      <p class="ifn_wrap_content_user_number">
        请在浏览器中扫描下载UUC公链社区
      </p>
      <p class="ifn_wrap_content_user_number">
        基于区块链生态价值平台
      </p>
    </div>
  </div>
</template>
<script>
  import {getuserinfo} from '@/services/mining.js'

  export default {
    name: 'ifn-contest',
    data() {
      return {
        message: '亲爱的朋友，恭喜您即将成为UUC公链社区的一员！请主动向我获取邀请码免费注册成为UUC用户，' +
         '邀请您更多好友免费注册成为UUC社区成员!' +
        '下载地址：'+ 'http://www.jwsew.com/qu/',//链接
        user_nickname: '',//用户昵称
        user_id: '',//用户id 排名
        invite_code: '',

      }
    },
    methods: {
      //复制的方法
      onCopy: function (e) {
        this.$vux.toast.show({
          text: '复制成功',
          width: '9.5rem',
          type: 'success',
        })
      },
      onError: function (e) {
        this.$vux.toast.show({
          text: '复制失败',
          type: 'cancel',

        })
      },
      //获取用户信息
      requestuserinfo() {
        getuserinfo({
          mark: this.$mark,
          token: this.$token,
        })
          .then(result => {
            if (result.data.code == 10000) {
              // this.message= result.data.result.user_id;
              this.invite_code = result.data.result.invite_code;
              this.user_id = result.data.result.user_id;
              this.user_nickname = result.data.result.user_nickname;
            }

          })
      }
    },
    mounted() {
      this.requestuserinfo();
    }

  }
</script>
<style lang="less" scoped>
  @import url("../../styles/var.less");

  .ifn_wrap {
    position: fixed;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 0;
    background: url(imgs/yq_bg.png) no-repeat;
    background-size: 100% 100%;
    overflow-y: auto;
  }
  .ifn_wrap_content{
    width: 100%;
    margin: 5rem 0 4rem;
    background: url(imgs/yp_bgs.png) no-repeat center;
    background-size: 90% 100%;
    text-align: center;
    padding: 2rem 0;
    >.ifn_wrap_content_text {
      height: 2rem;
      color: #000;
      font-size: 1.4rem;
    }
    >.user_id{
      height: 3rem;
      width: 100%;
      color: #6078EA;
      font-size: 1.2rem;
    }
    >.ifn_wrap_content_code{
      height: 5rem;
      /*background: url("imgs/quan.png") center no-repeat;*/
      background-size: 100%;
      >p{
        height:4rem;
        line-height: 4rem;
        font-size:4rem;
        font-weight:normal;
        color: #6078EA;
        letter-spacing: 0;
        text-align: center;

      }
    }
    >.ifn_wrap_content_ipt {
      display: flex;
      align-content: center;
      padding: 0 10%;
      height: 4rem;
      justify-content: center;
      /*input {*/
        /*height: 3rem;*/
        /*width: 75%;*/
        /*padding-left: 0.5rem;*/
        /*border: 1px solid #bbbaba;*/
        /*box-sizing: border-box;*/
        /*color: #666666;*/
        /*font-size: 1rem;*/
      /*}*/
      span {
        padding: 0 2rem;
        background: linear-gradient(-270deg,#3567F9 0%, #6B9DFC 100%);
        color: #fff;
        font-size: 1.4rem;
        display: inline-block;
        height: 3rem;
        line-height: 3rem;
        border-radius: 1.5rem;
      }
    }
    >.ifn_wrap_content_user_number{

      font-size: 1.2rem;
      color:#000;
      line-height: 2rem;
      >span{

        color: #6078EA;
      }
    }
    .ifn_wrap_content_qrcode{
      width:14rem;
      height:14rem;
      margin: 4rem auto 1rem;
      background:rgba(255,255,255,1);
      >img{
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
</style>

