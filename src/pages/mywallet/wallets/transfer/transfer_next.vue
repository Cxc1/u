<template>
  <div class="transfer_next">
    <myHeader :title="title"/>
    <div class="main">
      <div class="transfer_next_main_top" id="captcha">
        <div class="transfer_next_main_top_imgs">
          <div class="transfer_next_main_top_userData">
            <p>
              对方账号：<span>{{user_mobile}}</span>
            </p>
            <p>
              对方ID：<span>{{user_id}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="transfer_next_main_content">
        <div class="transfer_next_main_content_ipt">
          <p>转账数量 <span>（余额：{{init_money}}）</span></p>
          <input type="text" @blur="mblur" placeholder="请输入转账数量" v-model="transfer_money" maxlength="11">
          <div class="transfer_next_main_content_ipt_btm">
            <p>燃烧率：<span>{{init_fee}}%</span></p>
            <p>实际扣除：<span>{{actual_money}}</span></p>
          </div>
        </div>
      </div>
      <div class="transfer_next_main_btn" @click="changeKeyBoardBol">下一步</div>
    </div>
    <randomKeyboard :KeyBoardBol="KeyBoardBol" @hide="hideKeyBoard" @comfirmSubmit="comfirmSubmit"/>
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue';
  import randomKeyboard from '@/common/randomKeyboard.vue'
  import {getdata_u} from "@/services/mining";
  import qs from 'qs'
  import {add, mul, div} from "../../../../utils/tool";

  export default {
    name: "transfer_next",
    components: {
      myHeader,
      randomKeyboard
    },
    data() {
      return {
        title: '',
        transfer_type: this.$route.query.transfer_type,
        user_mobile: this.$route.query.user_mobile,
        user_id: this.$route.query.user_id,
        init_money: '',
        init_fee: '',
        init_data: '',
        transfer_money: '',
        transfer_url: '',
        actual_money: '--',
        captchaIns: '',
        user_pay_pwd: '',
        KeyBoardBol: false,
      }
    },
    created() {
      this.getMonryData()
    },
    mounted() {
      //调易盾滑块验证

      this.validate('comfirm')
    },

    methods: {
      changeKeyBoardBol() {
        if (this.transfer_money !== '' && this.transfer_money > 0) {
          this.KeyBoardBol = true;
        } else {
          this.$vux.toast.text('请输入大于0的转账数量');
        }
      },
      comfirmSubmit(value) {
        this.user_pay_pwd = value;
        if (value !== '') {
          this.captchaIns.popUp();
        } else {
          this.$vux.toast.text('请输入安全密码');
        }
      },

      hideKeyBoard() {

        this.KeyBoardBol = false;
      },


      getMonryData() {
        let obj = {
          token: this.$token,
          mark: this.$mark,
        };
        if (this.transfer_type == 1) {
          this.title = '转到他人可用资产';
          this.transfer_url = '/Transfer/usableToOtherUsable';
          this.getInitData('/Transfer/usableToOtherUsableInit', qs.stringify(obj)).then(res => {
            if (res.data.code == 10000) {
              this.init_money = res.data.result.usable_money;
              this.init_fee = res.data.result.fee_rate
            }
          });
        } else if (this.transfer_type == 2) {
          this.title = '转到他人战绩钱包';
          this.transfer_url = '/Transfer/flowToOtherFlow';
          this.getInitData('/Transfer/flowToOtherFlowInit', qs.stringify(obj)).then(res => {
            if (res.data.code == 10000) {
              this.init_money = res.data.result.flow_money;
              this.init_fee = res.data.result.fee_rate
            }
          });
        } else if (this.transfer_type == 3) {
          this.title = '转到他人兑换资产';
          this.transfer_url = '/Transfer/exchangeToOtherExchange';
          this.getInitData('/Transfer/exchangeToOtherExchangeInit', qs.stringify(obj)).then(res => {
            if (res.data.code == 10000) {
              this.init_money = res.data.result.exchange_money;
              this.init_fee = res.data.result.fee_rate
            }
          });
        }
      },

      getInitData(url, obj) {
        return new Promise((resolve, reject) => {
          this.$http.post(this.api + url, obj).then(res => {
            resolve(res);
          }).catch(error => {
            reject(error);
          });
        })
      },
      validate() {
        let self = this;
        initNECaptcha(
          {
            captchaId: "b0487c82b2de43558aac9d29bfbda686",
            element: "#captcha",
            mode: "popup",
            width: 260,
            onVerify(err, data) {
              if (!err) {
                self.captchaIns.refresh();
                self.$vux.loading.show();
                let obj = {
                  token: self.$token,
                  mark: self.$mark,
                  validate: data.validate,
                  money: self.transfer_money,
                  user_pay_pwd: self.user_pay_pwd,
                  other_id: self.user_id,
                  other_mobile: self.user_mobile
                };
                self.getInitData(self.transfer_url, qs.stringify(obj)).then(res => {
                  self.$vux.loading.hide();
                  self.$vux.toast.text(res.data.message);
                  if (res.data.code == 10000) {
                    self.transfer_money = '';
                    self.KeyBoardBol = false;
                    // self.getMonryData();
                    self.$router.go(-2)
                  }
                })
              }
            }
          },
          function (instance) {
            // 初始化成功后，用户输入对应用户名和密码，以及完成验证后，直接点击登录按钮即可
            self.captchaIns = instance;
          },
          function (err) {
            // 验证码初始化失败处理逻辑，例如：提示用户点击按钮重新初始化
          },
        );
      },
      validateTransferNum() {
        let money = this.transfer_money;
        let max = this.init_money;
        if (isNaN(money)) {
          this.transfer_money = money.substr(0, money.length - 1);
        } else {
          if (money != '') {
            if (Number(money) > Number(max)) {
              this.transfer_money = money.substr(0, money.length - 1);
              this.$vux.toast.text('输入的金额过大');
            } else {
              let index = money.indexOf('.');
              if (index >= 0) {
                let floatNum = money.substr(index + 1, money.length);
                if (floatNum.length > 6) {
                  this.$vux.toast.text('只能输入小数点后六位');
                  this.transfer_money = money.substr(0, money.length - 1);
                }
              } else {
                this.transfer_money = money / 1 + ''
              }
            }
          }
        }
      },
    },
    watch: {
      transfer_money(value) {
        this.validateTransferNum();
        let fee = div(add(100, this.init_fee), 100);
        this.actual_money = mul(value, fee).toFixed(6)
      }
    }
  }
</script>

<style lang="less" scoped>
  .main {
    > .transfer_next_main_top {
      height: 10rem;
      justify-content: center;
      align-items: center;
      background: linear-gradient(-270deg,#3567F9 0%, #6B9DFC 100%);
      > .transfer_next_main_top_imgs {
        width: 100%;
        height: 5rem;
        justify-content: center;
        align-items: center;
        > .transfer_next_main_top_userData {
          width: 100%;
          font-size: 1.2rem;
          color: #fff;
          box-sizing: border-box;
          padding:2rem 1rem;
          > p {
            height: 3rem;
            line-height: 3rem;
            font-size: 1.5rem;
            &:nth-child(2){
              font-size: 1.2rem;
            }
          }
        }
      }
    }
    > .transfer_next_main_content {
      height: 10rem;
      padding: 1rem;
      background-color: #fff;
      > .transfer_next_main_content_ipt {
        height: 7rem;
        > p {
          height: 3.5rem;
          font-size: 1.4rem;
          line-height: 3.5rem;
          font-weight: normal;
          color: #333;

          > span {
            color: rgba(234, 110, 68, 1);
            float: right;
          }
        }
        > input {
          height: 3.5rem;
          width: 100%;
          font-size: 1.4rem;
          font-weight: normal;
          color: rgba(112, 114, 132, 1);
          text-indent: 1rem;
        }
        > .transfer_next_main_content_ipt_btm {
          height: 3rem;
          display: flex;
          > p {
            flex: 1;
            font-size: 1rem;
            color: #666;
            line-height: 3rem;
          }
        }
      }
    }
    > .transfer_next_main_btn {
      margin: 2rem auto;
      text-align: center;
      height: 4rem;
      line-height: 4rem;
      width: 90%;
      background: linear-gradient(-270deg, #3567F9 0%, #6B9DFC 100%);
      border-radius: .2rem;
      font-size: 1.4rem;
      font-weight: normal;
      color: rgba(255, 255, 255, 1);
    }
  }
</style>
