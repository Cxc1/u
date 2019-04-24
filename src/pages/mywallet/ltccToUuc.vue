<template>
  <div class="ltccToUuc">
    <myHeader title="兑换">
      <router-link to="/ceRecord" tag="span" class="right_icon">
        兑换记录
      </router-link>
    </myHeader>
    <!--主体部分开始-->
    <div class="main">
      <div class="main_center">
        <div class="ltccToUuc_top" id="captcha">
          <p>出账钱包 : </p>
          <div class="ltccToUuc_top_select">
            <p @click="out_slt_show">
              {{sel_wc.c_name}}{{sel_wc.money_type_name}}
              <span></span>
            </p>
            <ul class="ltccToUuc_top_select_item" :class="{myActive:!sltShow&&wc_type.length>0}">
              <li :class="{myActive : sltShow ,select_wc : index === select_wc_index}" v-for="(item , index) in wc_type"
                  @click="select_wc(item , index)" :key="index">
                <span>{{item.c_name}}{{item.money_type_name}}</span><span>可用数量 : {{item.c_money}}</span>
              </li>
            </ul>
          </div>
          <p>兑换数量 : </p>
          <div class="ltccToUuc_top_number">
            <input type="text" maxlength="11" placeholder="请输入兑换数量" v-model="ltcc_number">
            <div>
              <span>燃烧 : {{(ltcc_number * (in_sel_wc.c_fee/100)).toFixed(6)}}</span>
              <span>最大可兑换 : {{in_sel_wc.max_number}}</span>
            </div>

          </div>
        </div>
        <div class="rate">
          <h5>实时汇率 : </h5>
          <div class="rate_btn">
            <div>
              <p>{{sel_wc.c_name}}/CNY</p>
              <p>{{sel_wc.c_price}}</p>
            </div>
            <div>
              <p>{{in_sel_wc.c_name}}/CNY</p>
              <p>{{in_sel_wc.c_price}}</p>
            </div>
          </div>
        </div>
        <div class="ltccToUuc_bottom">
          <h5 class="red">预计兑换 : 1 {{sel_wc.c_name}} = {{(sel_wc.c_price/in_sel_wc.c_price).toFixed(6)}}
            {{in_sel_wc.c_name}}</h5>
          <p>入账币种 : </p>
          <div class="ltccToUuc_top_select">
            <p @click="in_slt_show">
              {{in_sel_wc.c_name}}
              <span></span>
            </p>
            <ul class="ltccToUuc_top_select_item" :class="{myActive:!btmSltShow&&in_wc_type.length>0}">
              <li :class="{myActive : btmSltShow ,select_wc : index === btm_select_wc_index}"
                  v-for="(item , index) in in_wc_type"
                  @click="btm_select_wc(item , index)" :key="index">
                <span>{{item.c_name}}</span><span>当前价格 : {{item.c_price}}/CNY</span>
              </li>
            </ul>
          </div>
          <p>接收数量 : </p>
          <div class="ltccToUuc_top_number">
            <input type="text" maxlength="11" disabled="disabled" v-model="uuc_number">
          </div>
        </div>
        <div class="ltccToUuc_btn" id="ltccToUuc_btn">提 交</div>
      </div>
    </div>

    <!--主体部分结束-->
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'
  import {getdata_u} from "@/services/mining";
  import {div, mul} from "@/utils/tool";

  export default {
    name: "ltccToUuc",
    components: {
      myHeader
    },
    data() {
      return {
        sltShow: false,
        btmSltShow: false,
        uucExchangeInit: '',
        proportion: '',
        uuc_number: '',
        ltcc_number: '',
        type: 1,
        wc_type: [],
        in_wc_type: [],
        sel_wc: "",
        in_sel_wc: '',
        select_wc_name: '请选择出账钱包',
        btm_select_wc_name: '请选择入账钱包',
        select_wc_index: 0,
        btm_select_wc_index: 0,
      };
    },
    created() {
      this.getUucExchangeInit();

    },
    methods: {
      out_slt_show() {
        this.btmSltShow = false;
        this.sltShow = !this.sltShow
      },
      in_slt_show() {
        this.sltShow = false;
        this.btmSltShow = !this.btmSltShow
      },

      select_wc(item, index) {
        this.select_wc_name = item.c_name;
        this.select_wc_index = index;
        this.sel_wc = this.wc_type[index];
        this.in_wc_type = this.sel_wc.exchange_list;
        this.in_sel_wc = this.in_wc_type[0];
        console.log(this.in_sel_wc.c_fee);
        this.btm_select_wc_index = 0;
        this.ltcc_number = '';
        this.sltShow = false
      },
      btm_select_wc(item, index) {
        this.btm_select_wc_name = item.c_name;
        if (this.btm_select_wc_index != index) {
          this.btm_select_wc_index = index;
          this.ltcc_number = '';
        }
        this.in_sel_wc = this.in_wc_type[index];
        this.btmSltShow = false
      },

      getUucExchangeInit() {
        getdata_u('/Exchange/exchangeInit', {
          mark: this.$mark,
          token: this.$token
        }).then(res => {

          if (res.data.code == 10000) {
            this.wc_type = res.data.result;
            this.sel_wc = res.data.result[0];
            this.in_wc_type = res.data.result[0].exchange_list;
            this.in_sel_wc = this.sel_wc.exchange_list[0];
          } else {
            this.$vux.toast.text(res.data.message);
          }
        })
      },


      validateLtccNum() {
        let money = this.ltcc_number;
        let max = this.in_sel_wc.max_number;
        if (isNaN(money)) {
          this.ltcc_number = money.substr(0, money.length - 1);
        } else {
          if (money != '') {
            if (Number(money) > Number(max)) {
              this.ltcc_number = money.substr(0, money.length - 1);
              this.$vux.toast.text('输入的金额过大');
            } else {
              let index = money.indexOf('.');
              if (index >= 0) {
                let floatNum = money.substr(index + 1, money.length);
                if (floatNum.length > 6) {
                  this.$vux.toast.text('只能输入小数点后六位');
                  this.ltcc_number = money.substr(0, money.length - 1);
                }
              } else {
                this.ltcc_number = money / 1 + ''
              }
            }
          }
        }
      },


    },
    watch: {
      ltcc_number(value) {
        this.validateLtccNum();
        if (value != '') {
          let proportion = this.sel_wc.c_price / this.in_sel_wc.c_price;
          this.uuc_number = mul(value, proportion).toFixed(6);
        } else {
          this.uuc_number = '';
        }
      },
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
              captchaIns.refresh();
              self.$vux.loading.show();
              getdata_u('/Exchange/createExchangeNew', {
                token: self.$token,
                mark: self.$mark,
                validate: data.validate,
                number: self.ltcc_number,
                currency_keyword_left: self.sel_wc.c_keyword,
                currency_keyword_right: self.in_sel_wc.c_keyword,
                money_type: self.sel_wc.money_type
              }).then(res => {
                self.$vux.loading.hide();
                self.$vux.toast.text(res.data.message);
                if (res.data.code == 10000) {
                  self.getUucExchangeInit();
                  self.btm_select_wc_index = 0;
                  self.select_wc_index = 0;
                  self.ltcc_number = '';
                }
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
        document.getElementById("ltccToUuc_btn").addEventListener("click", function () {
          if (self.ltcc_number != '') {
            captchaIns.popUp();
          } else {
            self.$vux.toast.text('请输入兑换数量');
          }
        })
      );
    },
  }
</script>

<style lang="less" scoped>
  .main_center {
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: #fff;
  }

  .ltccToUuc {

    .ltccToUuc_top, .ltccToUuc_bottom {
      height: 16rem;
      width: 100%;
      padding: 2rem 1rem 1rem;
      box-sizing: border-box;
      color: #bac4d2;

      > p {
        height: 2rem;
        font-size: 1.4rem;
        line-height: 2rem;
        color: #333333;
      }
      > .ltccToUuc_top_select, .ltccToUuc_top_number {
        height: 4rem;
        width: 100%;
        box-sizing: border-box;
        position: relative;
        > .ltccToUuc_top_select_item {
          left: 0;
          right: 0;
          position: absolute;
          background-color: #fff;
          color: #090c11;
          top: 4rem;
          z-index: 999;
          overflow: hidden;
          border: 1px solid #979797;
          &.myActive {
            border: none;
          }
          > li {
            height: 0;
            line-height: 3rem;
            font-size: 1.3rem;
            display: flex;
            text-align: center;
            transition: height .1s;
            &.myActive {
              height: 3rem;
            }
            &.select_wc {
              background-color: #4B8BF9;
              color: #fff;
            }

            > span {
              flex: 1;
              &:nth-child(1) {
                max-width: 35%;
              }
              &:nth-child(2) {
                padding-right: .5rem;
                font-size: 1.2rem;
                text-align: right;
              }
            }

          }

        }
        > p {
          height: 3rem;
          line-height: 3rem;
          width: 100%;
          color: #000;
          font-size: 1.2rem;
          text-indent: .5rem;
          border: 1px solid #CCCCCC;
          box-sizing: border-box;
          border-radius: 2px;
          > span {
            display: inline-block;
            height: 3rem;
            width: 3rem;
            background: url("imgs/dom_icon2.png") no-repeat center;
            background-size: 40%;
            float: right;
          }
        }
        > input {
          height: 3rem;
          width: 100%;
          background-color: #fff;
          color: #999;
          font-size: 1.2rem;
          text-indent: .5rem;
          margin-bottom: .2rem;
          border: 1px solid #CCCCCC;
          border-radius: 2px;
          box-sizing: border-box;
        }
        > div {
          display: flex;
          height: 1.5rem;
          width: 100%;
          color: #999;
          > span {
            flex: 1;
            height: 1.5rem;
            line-height: 1.5rem;
            &:nth-child(2) {
              min-width: 65%;
              text-align: right;
              overflow-x: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }

      }

    }

    .rate {
      height: 8rem;
      color: #eee;

      > h5 {
        font-size: 1.2rem;
        font-family: PingFangSC-Semibold;
        height: 2rem;
        line-height: 2rem;
        color: #4B8BF9;
        text-indent: 2rem;
        background-color: #fff;
      }
      > .rate_btn {
        height: 6rem;
        display: flex;
        text-align: center;
        box-shadow: 1px 0 6px 0 rgba(0, 0, 0, 0.20);
        position: relative;
        &::before {
          content: '';
          display: block;
          position: absolute;
          height: 2.5rem;
          width: 1px;
          background: rgba(0, 0, 0, 0.10);
          left: 0;
          right: 0;
          top: 1rem;
          bottom: 0;
          margin: auto;
        }
        > div {
          height: 6rem;
          flex: 1;
          background-color: #fff;

          &:nth-child(2) {
          }
          > p {
            height: 2.5rem;
            line-height: 2.5rem;
            font-size: 1.2rem;
            color: #999;
            &:nth-child(1) {
              height: 3rem;
              line-height: 3rem;
              font-size: 1.4rem;
              color: #333;
            }
          }
        }
      }
    }

    .ltccToUuc_bottom {
      height: 18rem;

      > h5 {
        height: 2rem;
        line-height: 2rem;
        font-size: 1.2rem;
        color: #4B8BF9;
      }
    }
    .ltccToUuc_btn {
      background-color: #fff;
      height: 4rem;
      width: 90%;
      line-height: 4rem;
      font-size: 1.4rem;
      color: #fff;
      text-align: center;
      background-image: linear-gradient(-270deg, #3567F9 0%, #6B9DFC 100%);
      border-radius: 3px;
      margin: 2rem auto;

    }
  }
</style>
