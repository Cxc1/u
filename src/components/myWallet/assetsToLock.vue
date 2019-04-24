<template>
  <div class="assetsToLock ">
    <div class="assetsToLock_box" :class="{ myActive : showBol}">
      <div class="assetsToLock_box_center" id="captcha">

        <h2>转到自己资产包 <span class="off_icon" @click="hideAssetsToLockBox"></span></h2>
        <div class="serviceCharge">
          <p>*转到资产包时将会在活动钱包最低扣除转入数额的{{TransferLockInit.usable_min_rate}}%，其余部分将在战绩钱包扣除，当活动钱包余额不足时将无法转账</p>
        </div>
        <div class="ipt_box">

          <div class="out_num">
            <p>转出数量：</p>
            <p class="num_ipt">
              <input type="text" v-model="money" maxlength="11" placeholder="请输入转账数量">
              <span>LTCC</span>
            </p>

            <p class="maxNum">*当前最大可转：{{(TransferLockInit.record_money/((100-30)/100)).toFixed(6)}} LTCC</p>
          </div>

          <div class="act_del">
            <p>
              活动钱包扣除：
              <span class="act_num"></span>
            </p>
            <p class="num_ipt">
              <input type="text" v-model="usable_money" maxlength="11" :placeholder="TransferLockInit.placeText">
              <span>LTCC</span>
            </p>
            <p class="maxNum">*活动钱包余额：{{TransferLockInit.usable_money}} LTCC</p>
          </div>

          <div class="del_to_num">
            <div>
              <p>战绩钱包扣除：</p>
              <p>{{record_money}}</p>
            </div>
            <div>
              <p>资产包到账：</p>
              <p>{{toLock_money}}</p>
            </div>
          </div>
        </div>


        <div class="extract" id="assetsToLock_btn" type="primary">提取</div>
      </div>
    </div>

  </div>
</template>

<script>
  import {getdata} from "@/services/mining";
  import {add, sub, mul, div} from "@/utils/tool";

  export default {
    name: "assetsToLock",
    props: ['showBol', 'TransferLockInit',],
    data() {
      return {
        money: '',
        usable_money: '',
        record_money: '--',
        toLock_money: '--',
        max_money: '',
      }
    },
    created() {

    },
    methods: {

      //隐藏弹框
      hideAssetsToLockBox() {
        this.$emit('hideAssetsToLock');
        this.money = '';
        this.usable_money = '';
        this.record_money = '--';
        this.toLock_money = '--';
      },

      //数量输入限制验证
      // this.money, this.TransferLockInit.record_money
      validateMoneyNum() {
        let money = this.money;
        let max = (this.TransferLockInit.record_money / ((100 - 30) / 100)).toFixed(6)
        if (isNaN(money)) {
          this.money = money.substr(0, money.length - 1);
        } else {
          if (money != '') {
            if (Number(money) > Number(max)) {
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
              getdata('/Supernode/recordTransferLock', {
                token: self.$token,
                mark: self.$mark,
                validate: data.validate,
                money: self.money,
                usable_money: self.usable_money,
                record_money: self.record_money
              }).then(res => {
                self.$vux.loading.hide();
                self.$vux.toast.text(res.data.message);
                if (res.data.code == 10000) {
                  self.$emit('hideAssetsToLock', true);
                  self.money = '';
                  self.usable_money = '';
                  self.record_money = '--';
                  self.toLock_money = '--';
                }
                captchaIns.refresh();
              })

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
        document.getElementById("assetsToLock_btn").addEventListener("click", function () {
          if (self.money != '' && self.usable_money != '') {
            if (self.money > 0) {
              captchaIns.popUp();
            } else {
              self.$vux.toast.text('请输入大于 0 的转账数量');
            }
          } else {
            if (self.money == '') {
              self.$vux.toast.text('请输入转账数量');
            } else {
              self.$vux.toast.text('请输入活动钱包扣除数量');
            }
          }
        })
      );
    },

    watch: {
      money(value) {
        this.validateMoneyNum();
        if (value != '') {
          this.usable_money = mul(value, div(this.TransferLockInit.usable_min_rate, 100)).toFixed(6);
          this.record_money = (value - this.usable_money).toFixed(6);
          this.toLock_money = mul(value, 3);

        } else {
          this.money = '';
          this.usable_money = '';
          this.record_money = '--';
          console.log(this.record_money);
          this.toLock_money = '--';
        }
      },
      usable_money(value) {
        if (Number(value) <= Number(this.money)) {
          this.record_money = (this.money - value).toFixed(6);
        } else {
          if (this.money != '') {
            this.usable_money = value.substring(0, value.length - 1)
          }
        }
      }
    }


  }
</script>

<style lang="less" scoped>
  .assetsToLock_box {
    position: fixed;
    height: 0;
    width: 100%;
    overflow: auto;
    transition: height .2s;
    display:-webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items:center;
    -moz-align-items:center;
    -ms-align-items:center;
    -o-align-items:center;
    align-items:center;
    &.myActive {
      height: 100%;
    }
    background-color: rgba(0, 0, 0, .3);
    > .assetsToLock_box_center {
      width: 80%;
      left: 0;
      right: 0;
      margin: auto;
      position: absolute;
      background-color: #fff;
      border-radius: .5rem;
      color: #666;
      text-align: left;
      > h2 {
        position: relative;
        font-size: 1.4rem;
        color: #333;
        line-height: 3rem;
        text-align: center;
        > .off_icon {
          width: 3rem;
          height: 3rem;
          box-sizing: border-box;
          margin: auto;
          position: absolute;
          right: 0;
          background: url("../../assets/off_icon.png") no-repeat center;
        }
      }
      > .serviceCharge {
        padding: 0 1rem;
        > p {
          line-height: 2rem;
          word-wrap: break-word
        }
      }
      > .ipt_box {
        margin-top: .5rem;
        padding: 0 1rem;
        color: #333;
        font-size: 1.2rem;
        > .out_num, > .act_del {
          margin-bottom: 1rem;
          .act_num {
            font-size: 1rem;
            float: right;
          }
          > .num_ipt {
            > input {
              margin-top: .3rem;
              height: 2rem;
              border: none;
              border-bottom: 1px solid #ccc;
              width: 80%;
            }
            > span {
              float: right;
              line-height: 3rem;
              font-size: 1.4rem;
            }
          }
          > .maxNum {
            font-size: 1rem;
            color: #FF7F00;
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
        font-size: 1.2rem;
        text-align: center;
        color: #54aadb;
        border-top: 1px solid #ccc;
        &:active {
          color: #3e84f5;
        }
      }
    }
  }
</style>
