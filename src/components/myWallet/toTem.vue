<template>
  <div class="toActive ">
    <div class="toActive_box" :class="{ myActive : showBol}">
      <div class="toActive_box_center" id="captcha">
        <p class="off_icon">
          <span @click="hideToActiveBox"></span>
        </p>
        <h2>提取到战绩钱包</h2>
        <div class="serviceCharge">
          <p>加速释放今日战绩收益</p>
        </div>
        <p class="reward">今日奖励（LTCC）</p>
        <p class="money_number">{{moneyNum}}</p>
        <div class="extract" id="j-popup" type="primary">提取</div>
      </div>
    </div>

  </div>
</template>

<script>
  import {getdata} from "@/services/mining";

  export default {
    name: "toActive",
    props: ['showBol', 'moneyNum', 'type'],
    data() {
      return {}
    },
    created() {

    },
    methods: {

      //隐藏弹框
      hideToActiveBox() {
        this.$emit('hideToActive');
      },

    },


    mounted() {
      //调易盾滑块验证
      var captchaIns;
      let self = this
      initNECaptcha(
        {
          captchaId: "b0487c82b2de43558aac9d29bfbda686",
          element: "#captcha",
          mode: "popup",
          width: 260,
          onVerify(err, data) {
            if (!err) {
              self.$vux.loading.show();
              if (self.type == 2) {
                getdata('/Supernode/receiveMoneyLockRecord', {
                  token: self.$token,
                  mark: self.$mark,
                  validate: data.validate,
                }).then(res => {
                  self.$vux.loading.hide();
                  self.$vux.toast.text(res.data.message);
                  self.$emit('hideToActive',true);
                  captchaIns.refresh();
                })
              } else {
                getdata('/Supernode/freeMoneyLockIncome', {
                  token: self.$token,
                  mark: self.$mark,
                  validate: data.validate,
                }).then(res => {
                  self.$vux.loading.hide();
                  self.$vux.toast.text(res.data.message);
                  captchaIns.refresh();
                  if (res.data.code == 10000) {
                    self.$emit('hideToActive',true);
                  }
                })
              }
            }
          }
        },
        function (instance) {
          // 初始化成功后，用户输入对应用户名和密码，以及完成验证后，直接点击登录按钮即可
          captchaIns = instance;
        },
        function (err) {
          // 验证码初始化失败处理逻辑，例如：提示用户点击按钮重新初始化
        },
        document.getElementById("j-popup").addEventListener("click", function () {
          captchaIns.popUp();

        })
      );
    }


  }
</script>

<style lang="less" scoped>
  .toActive_box {
    position: fixed;
    height: 0;
    width: 100%;
    overflow: hidden;
    transition: height .2s;
    &.myActive {
      height: 100%;
    }
    background-color: rgba(0, 0, 0, .3);
    > .toActive_box_center {
      width: 70%;
      height: 18rem;
      left: 0;
      right: 0;
      margin: auto;
      position: absolute;
      top: 20%;
      background-color: #fff;
      border-radius: .5rem;
      color: #666;
      text-align: center;
      > .off_icon {
        height: 2rem;
        > span {
          width: 2rem;
          height: 2rem;
          box-sizing: border-box;
          margin: auto;
          float: right;
          background: url("../../assets/off_icon.png") no-repeat center;
        }
      }
      > h2 {

        font-size: 1.4rem;
        color: #333;
        line-height: 3rem;
      }
      > .serviceCharge {
        height: 4rem;
        padding: 0 1rem;
        > p {
          line-height: 2rem;
          word-wrap: break-word
        }
      }
      .reward {
        line-height: 2rem;
      }
      > .money_number {
        font-size: 1.5rem;
        height: 3rem;
        font-weight: bolder;
        color: #ff4848;
        border-bottom: 1px solid #dcdcdc;
      }
      > .extract {
        height: 4rem;
        line-height: 4rem;
        font-size: 1.2rem;
        color: #54aadb;
        &:active {
          color: #3e84f5;
        }
      }
    }
  }
</style>
