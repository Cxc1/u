<template>
  <div class="toSelfLock">
    <my-header title="转到流通钱包">
    </my-header>
    <div class="main">
      <div class="movablePurse_top">
        <p>战绩钱包余额 (UUC)</p>
        <p>{{initData.flow_money}}</p>
      </div>
      <div class="ipt_box" id="captcha">

        <div class="out_num">
          <p>转出数量：</p>
          <p class="num_ipt">
            <input type="text" v-model="money" @blur="mblur" maxlength="11" placeholder="请输入转账数量">
            <span>UUC</span>
          </p>
          <p class="color_red">
            <span>
              燃烧 :
            </span>
            <span>
              {{fee_rate}}
            </span>
          </p>
        </div>
      </div>
      <div class="extract" id="assetsToUser_btn" type="primary">转账</div>
    </div>
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'
  import {getdata_u} from "@/services/mining";
  import {add, sub, mul, div} from "@/utils/tool";

  export default {
    name: "movToUuc",
    components: {
      myHeader,
    },
    data() {
      return {
        initData: '',
        money: '',
        usable_money: '',
        max_money: '',
      }
    },
    created() {
      this.getInit();
    },
    computed: {
      fee_rate() {
        return ((this.initData.self_fee_rate / 100) * this.money).toFixed(6)
      }
    },
    methods: {
      getInit() {
        getdata_u('/Transfer/flowToOtherFlowInit', {
          token: this.$token,
          mark: this.$mark,
        }).then(res => {
          if (res.data.code == 10000) {
            this.initData = res.data.result;
            this.max_money = this.initData.flow_money;
          } else {
            this.$vux.toast.text(res.data.message)
          }
        });
      },


      clearIpt() {
        this.money = '';
      },
      validateMoneyNum() {
        let money = this.money;
        if (isNaN(money)) {
          this.money = money.substr(0, money.length - 1);
        } else {
          if (money != '') {
            if (Number(money) > Number(this.max_money)) {
              this.money = money.substr(0, money.length - 1);
              this.$vux.toast.text('输入的金额过大');
            } else {
              let index = money.indexOf('.');
              if (index >= 0) {
                let floatNum = money.substr(index + 1, money.length);
                if (floatNum.length > 6) {
                  this.$vux.toast.text('只能输入小数点后六位');
                  this.money = money.substr(0, money.length - 1);
                }
              } else {
                this.money = money / 1 + ''
              }
            }
          }
        }
      }
    },
    mounted() {
      //调易盾滑块验证
      var captchaIns;
      let self = this;
      initNECaptcha(
        {
          captchaId: "b0487c82b2de43558aac9d29bfbda686",
          element: "#captcha",
          mode: "popup",
          width: 260,
          onVerify(err, data) {
            if (!err) {
              self.$vux.loading.show();
              getdata_u('/Transfer/flowToUsable', {
                token: self.$token,
                mark: self.$mark,
                validate: data.validate,
                money: self.money,
              }).then(res => {
                self.$vux.loading.hide();
                self.$vux.toast.text(res.data.message);
                captchaIns.refresh();
                if (res.data.code == 10000) {
                  self.$router.go(-1);
                  // self.getInit();
                  // self.clearIpt();
                }
              });
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
        document.getElementById("assetsToUser_btn").addEventListener("click", function () {
          if (self.money > 0) {
            captchaIns.popUp();
          } else {
            self.$vux.toast.text('请输入转账数量');
          }

        })
      );
    },


    watch: {
      money(value) {
        this.validateMoneyNum();
      }
    }
  }
</script>

<style lang="less" scoped>
  .main {

    .movablePurse_top {
      box-sizing: border-box;
      height: 12rem;
      width: 100%;
      background: linear-gradient(-270deg, #3567F9 0%, #6B9DFC 100%);
      padding: 1rem;
      color: #fff;
      text-align: left;
      > p {
        line-height: 4rem;
        overflow-x: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 1.4rem;
        &:nth-child(2) {
          font-size: 3rem;
          color: #fff;
        }
      }
    }
    > .ipt_box {
      padding: 1rem;
      margin-top: .5rem;
      margin-bottom: .5rem;
      color: #b9c7d5;
      font-size: 1.2rem;
      background-color: #fff;
      > .out_num, > .act_del, > .phone_number, > .user_id {
        margin: .5rem 0;
        font-size: 1.4rem;
        color: #333;
        > p {
          margin-bottom: .5rem;
        }
        .act_num {
          font-size: 1rem;
          float: right;
        }
        > .num_ipt {
          position: relative;
          > input {

            height: 3rem;
            border: 1px solid #ccc;
            width: 100%;
            text-indent: 1rem;
            box-sizing: border-box;
            color: #b9c7d5;
          }
          > span {
            position: absolute;
            right: 1rem;
            top: 0;
            height: 3rem;
            line-height: 3rem;
            font-size: 1.4rem;
          }
        }

      }
      > .phone_number, > .user_id {
        > .num_ipt {
          > input {
            width: 100%;
          }
        }
      }
      > .del_to_num {
        width: 100%;
        display: flex;
        height: 4rem;
        > div {
          flex: 1;
          line-height: 2rem;
          height: 2rem;
          > p {
            &:nth-child(2) {
              text-indent: 2rem;
            }
          }
        }
      }

    }
    > .extract {
      height: 4rem;
      line-height: 4rem;
      background: linear-gradient(-270deg, #3567F9 0%, #6B9DFC 100%);
      text-align: center;
      font-size: 1.4rem;
      border-radius: .3rem;
      width: 90%;
      color: #fff;
      margin: 3rem auto;
    }
    .color_red {
      color: #999;
      font-size: 1rem;
    }
  }
</style>
