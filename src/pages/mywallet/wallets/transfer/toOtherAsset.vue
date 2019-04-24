<template>
  <div class="toOtherAsset">
    <my-header title="转到他人战绩钱包">
    </my-header>
    <div class="main">
      <div class="serviceCharge">
        <p>
          {{topText}}
        </p>
      </div>
      <div class="ipt_box" id="captcha">
        <div class="phone_number">
          <p>对方手机：</p>
          <p class="num_ipt">
            <input type="text" v-model="phone_number" maxlength="11" placeholder="请输入对方手机号">
          </p>

        </div>
        <div class="user_id">
          <p>对方ID：</p>
          <p class="num_ipt">
            <input type="text" v-model="user_id" maxlength="11" placeholder="请输入对方ID号">
          </p>
        </div>

        <div class="out_num">
          <p>转出数量：</p>
          <p class="num_ipt">
            <input type="text" v-model="money" maxlength="11" placeholder="请输入转账数量">
            <span>LTCC</span>
          </p>

          <p class="maxNum">*当前最大可转：{{max_money}} LTCC</p>
        </div>

        <div class="act_del" v-show="usable_show">
          <p>
            活动钱包扣除：
            <span class="act_num"></span>
          </p>
          <p class="num_ipt">
            <input type="text" v-model="usable_money" maxlength="11" :placeholder="actPlaceholder">
            <span>LTCC</span>
          </p>
          <p class="maxNum">*活动钱包余额：{{initData.usable_money}} LTCC</p>
        </div>

        <div class="act_del" v-show="tem_show">
          <p>
            临时钱包扣除：
            <span class="act_num"></span>
          </p>
          <p class="num_ipt">
            <input type="text" v-model="tem_money" maxlength="11" :placeholder="temPlaceholder">
            <span>LTCC</span>
          </p>
          <p class="maxNum">*临时钱包余额：{{initData.temp_money}} LTCC</p>
        </div>

        <div class="del_to_num">
          <div>
            <p>战绩钱包扣除：</p>
            <p>{{record_money}}</p>
          </div>
          <div>
            <p>他人战绩钱包到账：</p>
            <p>{{toLock_money}}</p>
          </div>
        </div>

        <div class="user_id">
          <p>安全密码：</p>
          <p class="num_ipt">
            <input type="password" v-model="user_pwd" maxlength="6" placeholder="请输入安全密码">
          </p>
        </div>

      </div>
      <div class="extract" id="assetsToUser_btn" type="primary">转账</div>
    </div>
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'
  import {getdata} from "@/services/mining";
  import {add, sub, mul, div} from "@/utils/tool";

  export default {
    name: "toOtherAsset",
    components: {
      myHeader,
    },
    data() {
      return {
        initData: '',
        money: '',
        usable_money: '',
        usable_show:true,
        tem_show:true,
        tem_money: '',
        record_money: '--',
        toLock_money: '--',
        max_money: '',
        money_type: 3,
        phone_number: '',
        user_id: '',
        user_pwd: '',
        actPlaceholder: '不得少于转出数量的30%',
        temPlaceholder: '转出数量的30%',

        topText: ''
      }
    },
    created() {
      this.money_type = this.$route.query.type;
      if (this.money_type == 1) {
        this.tem_show = false
      }else if (this.money_type == 2) {
        this.usable_show = false
      }
     this.getInit()
    },
    methods: {
      getInit() {
        getdata('/Supernode/recordTransferOtherRecordInit', {
          token: this.$token,
          mark: this.$mark,
          type: this.money_type
        }).then(res => {

          this.initData = res.data.result;
          let fee = (100 - Number(this.initData.usable_min_rate)) / 100;
          let temAmov = add(this.initData.usable_money, this.initData.temp_money);
          this.max_money = add(Number(temAmov), Number(this.initData.record_money));


          this.actPlaceholder = '不得少于转出数量的' + this.initData.usable_min_rate + '%';
          this.temPlaceholder = '默认转出数量' + this.initData.temp_min_rate + '%';


          let movMax = div(this.initData.usable_money, (this.initData.usable_min_rate / 100)).toFixed(6);
          this.max_money = Number(this.max_money) > Number(movMax) ? movMax : this.max_money;
          if (this.money_type == 1) {
            this.topText = "*转到他人战绩钱包时将会在活动钱包最低扣除转入数额的" + this.initData.usable_min_rate + "" +
              "%以上(燃烧" + this.initData.usable_fee_rate + "%)，其余部分将在战绩钱包(燃烧" + this.initData.record_fee_rate + "%) " +
              "扣除，当活动钱包余额不足时将无法转账";
          } else if (this.money_type == 2) {
            this.topText = "*转到他人战绩钱包时将会在临时钱包默认扣除转入数额的" + this.initData.temp_min_rate + "" +
              "%(燃烧" + this.initData.usable_fee_rate + "%)，其余部分将在战绩钱包(燃烧" + this.initData.record_fee_rate + "%) " +
              "扣除，当临时钱包余额不足时可调节";
          } else if (this.money_type == 3) {
            this.topText = "*转到他人战绩钱包时将会在活动钱包最低扣除转入数额的" + this.initData.usable_min_rate + "" +
              "%以上(燃烧" + this.initData.usable_fee_rate + "%)，其余部分将在战绩钱包(燃烧" + this.initData.record_fee_rate + "%) " +
              "以及临时钱包(燃烧" + this.initData.temp_fee_rate + "%) 扣除，当活动钱包余额不足时将无法转账";
          }

        });
      },

      clearIpt() {
        this.money = '';
        this.usable_money = '';
        this.record_money = '--';
        this.toLock_money = '--';
        this.phone_number = '';
        this.user_id = '';
        this.user_pwd = '';
        this.tem_money = '';
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
              getdata('/Supernode/recordTransferOtherRecord', {
                token: self.$token,
                mark: self.$mark,
                validate: data.validate,
                money: self.money,
                usable_money: self.usable_money,
                record_money: self.record_money,
                other_mobile: self.phone_number,
                other_id: self.user_id,
                user_pay_pwd: self.user_pwd,
                temp_money: self.tem_money,
                type: self.money_type
              }).then(res => {
                self.$vux.loading.hide();
                self.$vux.toast.text(res.data.message);
                if (res.data.code == 10000) {
                  self.getInit();
                  self.clearIpt();
                }
                captchaIns.refresh();
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
          if (self.money != '' && self.usable_money != '' && self.phone_number != '' && self.user_id != '' && self.user_pwd != '') {
            if (self.money > 0) {
              captchaIns.popUp();
            } else {
              self.$vux.toast.text('请输入大于 0 的转账数量');
            }

          } else {
            if (self.phone_number == '') {
              self.$vux.toast.text('请输入对方手机号');
            } else if (self.user_id == '') {
              self.$vux.toast.text('请输入对方ID');
            } else if (self.money == '') {
              self.$vux.toast.text('请输入转账数量');
            } else if (self.usable_money == '') {
              self.$vux.toast.text('请输入活动钱包扣除数量');
            } else if (self.user_pwd == '') {
              self.$vux.toast.text('请输入安全密码');
            }
          }


        })
      );
    },


    watch: {
      money(value) {
        this.validateMoneyNum();
        if (value != '') {
          this.usable_money = mul(value, div(this.initData.usable_min_rate, 100)).toFixed(6);
          this.tem_money = mul(value, div(this.initData.temp_min_rate, 100)).toFixed(6);
          this.record_money = ((value - this.usable_money) - this.tem_money).toFixed(6);
          this.toLock_money = value;
        } else {
          this.money = '';
          this.usable_money = '';
          this.tem_money = '';
          this.record_money = '--';
          this.toLock_money = '--';
        }
      },
      usable_money(value) {
        if (Number(value) <= Number(this.money)) {
          this.record_money = (this.money - value - this.tem_money).toFixed(6);
        } else {
          if (this.money != '') {
            this.usable_money = value.substring(0, value.length - 1)
          }
        }
      },
      tem_money(value) {
        let temMax = Number(this.money) - Number(this.usable_money)
        if (Number(value) > temMax) {
          this.tem_money = value.substring(0, value.length - 1)
        } else {
          this.record_money = (this.money - value - this.usable_money).toFixed(6);
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .main {
    padding: 1rem;
    > .serviceCharge {
      color: #db3030;
      font-size: 1.1rem;
      margin-bottom: 1rem;
    }
    > .ipt_box {
      margin-top: .5rem;
      margin-bottom: .5rem;
      color: #b9c7d5;
      font-size: 1.2rem;
      > .out_num, > .act_del, > .phone_number, > .user_id {
        margin: .5rem 0;
        font-size: 1.2rem;
        > p {
          margin-bottom: .5rem;
        }
        .act_num {
          font-size: 1rem;
          float: right;
        }
        > .num_ipt {
          > input {

            height: 2.5rem;
            border: 1px solid #707589;
            width: 85%;
            background-color: #1d212d;
            text-indent: 1rem;
            box-sizing: border-box;
            color: #b9c7d5;
          }
          > span {
            float: right;
            line-height: 2.5rem;
            font-size: 1.4rem;
          }
        }
        > .maxNum {
          font-size: 1rem;
          color: #db3030;
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
      background-color: #dbba54;
      text-align: center;
      font-size: 1.4rem;
      border-radius: .5rem;
      color: #fff;
      margin-top: 2rem;
    }
  }
</style>
