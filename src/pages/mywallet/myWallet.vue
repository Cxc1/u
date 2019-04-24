<template>
  <div class="myWalletBox">
    <my-wallet-header @fillInput="fillInput"
                      :currencylist="currencylist"
                      :wc_id="wcid"
                      @goback="goback"
                      :selectIndex="selectIndex"
                      :selectItem="selectItem">
    </my-wallet-header>
    <h2 class="tabIndex">
      <p v-for="(item,index) in currencylist" :key="index" @click="changeItem(index,item)"
         :class="{myActive : index == tabIndex}">
        <span>
          {{item.wc_name}}
        </span>
      </p>

    </h2>
    <div class="swiper">
      <div class="account_box">
        <div v-for="(item ,index) in currency" :key="index">
          <account :productor="item"
                   :tabIndex="tabIndex"/>
          <div class="btn_box">
            <p @click="toCTC">c2c</p>
            <router-link tag="p" :to="{path : '/accountBook' ,query:{ wc_id : wcid , tabIndex : tabIndex}}">
              查看账本
            </router-link>
          </div>
          <kline v-if="selectItem !== 'USDT'"
                 :Ltcc_k_loading="Ltcc_k_loading"
                 :trend_type="trend_type"
                 @changeTrend_type="changeTrend_type"
                 :selectItem='selectItem'
                 :rows="rows"
                 :price="price"
          />
        </div>

      </div>

      <div class="ct_tabar" :class="{pos_btm : selectItem === 'USDT'}">

        <p @click="isToChargeMoney">
          充币
        </p>
        <p @click="isToWithdrawMoney">
          提币
        </p>
        <router-link tag="p" to="/ltccToUuc">
          兑换
        </router-link>
      </div>


    </div>

  </div>
</template>

<script>
  import {Tab, TabItem} from 'vux'
  import myWalletHeader from '@/common/myWalletHeader.vue'
  import account from '@/components/myWallet/account.vue'
  import knowledge from '@/components/myWallet/knowledge.vue'
  import kline from '@/components/myWallet/kline.vue'
  import other_kline from '@/components/myWallet/other_kline.vue'
  import transactionRecord from '@/components/myWallet/transactionRecord.vue'
  import {getdataBz} from "@/services/mining";
  import randomKeyboard from '@/common/randomKeyboard.vue'
  import {AlertModule} from 'vux'
  import {getCookie} from "@/utils/tool";

  export default {
    name: "myWallet",
    components: {
      myWalletHeader,
      account,
      transactionRecord,
      kline,
      randomKeyboard,
      other_kline,
      knowledge,
      Tab,
      TabItem
    },
    data() {
      return {
        rows: [],

        otherRows: [],

        knowledgeShow: false,

        typeBol: false,
        //是否显示节点
        nodeBol: true,

        KeyBoardBol: false,
        //币种下标
        tabIndex: 0,

        currency: [],

        colorBol: false,
        //币种列表
        currencylist: '',
        //当前选择的币种下标
        selectIndex: 0,
        //当前选择的币种对象
        selectItem: '',
        //币种id
        wcid: '',
        //交易列表数据
        transferlist: '',
        //获取第一页数据
        page: 1,
        //显示2条数据
        pageDatas: 2,

        //定时器id
        setId: '',
        //定时器id
        otherSetId: '',


        //ltcc uuc ltcy价格走势类型
        trend_type: '1',
        //usdt btc 价格走势类型
        other_trend_type: 'D1',

        //ltcc uuc ltcy币种价格参数
        price: '',

        //usdt btc价格参数
        otherPrice: '',


        //ltcc uuc ltcy走势图loading
        Ltcc_k_loading: true,

        // usdt btc走势图loading
        other_k_loading: true
      };
    },


    created() {
      // this.$vux.loading.show();

      let routeIndex = this.$route.query.tabIndex;
      if (routeIndex) {
        this.tabIndex = Number(routeIndex)
      }

      this.getcurrencylist();
      this.getTrend();

    },

    destroyed() {
      //组件关闭时清除定时器
      clearTimeout(this.setId);
      clearTimeout(this.otherSetId);
    },
    methods: {
      changeItem(index, item) {
        this.tabIndex = index;
        this.selectIndex = index;
        this.selectItem = item.wc_name;
        this.currency = [this.currencylist[index]];
        this.wcid = this.currencylist[index].wc_id;
        this.getKlineData();
      },


      goback() {
        let client = getCookie('odrplatform');//客户端
        if (client === 'ios') {
          //ios端退出页面
          window.webkit.messageHandlers.iosAction.postMessage("exit");
        } else if (client === 'android') {
          apps.finish();
        }
      },


      //改变 ltcc天 周 月
      changeTrend_type(value) {
        this.Ltcc_k_loading = true;
        this.trend_type = value;
        this.other_trend_type = value == 1 ? 'D1' : value == 2 ? 'W1' : 'MONTH';
        this.getKlineData();
      },
      //每五秒更新一次ltcc 价格信息 setInterval
      getTrend() {
        this.setId = setTimeout(() => {
          this.getKlineData();
          clearTimeout(this.setId);
          this.getTrend()
        }, 300000);
      },
      //获取ltcc ltcy uuc 走势图数据
      getKlineData() {

        if (this.selectItem === 'BTC' || this.selectItem === 'ETH') {
          getdataBz('/wallet/getDateByUrl', {
            url: `http://api.coindog.com/api/v1/tick/BITFINEX:${this.selectItem}USD?unit=cny`
          }).then(res => {
            if (res.status == 200) {
              res.data.now = res.data.close.toFixed(2);
              res.data.high = res.data.high.toFixed(6);
              res.data.low = res.data.low.toFixed(6);
              if (Number(res.data.degree) > 0) {
                this.colorBol = true
              } else {
                this.colorBol = false
              }
              res.data.close = res.data.close.toFixed(6);
              this.price = res.data;
              getdataBz('/wallet/getDateByUrl', {
                url: "http://api.coindog.com/api/v1/klines/BITFINEX:" + this.selectItem + "USD/" + this.other_trend_type
              }).then(res => {
                if (res.status == 200) {
                  for (let i = 0; i < res.data.length; i++) {
                    res.data[i].create_time = this.timestampToTime(res.data[i].dateTime)
                  }
                  this.rows = res.data.reverse();
                  this.Ltcc_k_loading = false
                }
              })


            }
          })
        } else {
          getdataBz('/Exchange/getTrend2', {
            token: this.$token,
            mark: this.$mark,
            trend_type: this.trend_type,
            trend_name: this.selectItem,
          }).then(res => {
            this.Ltcc_k_loading = false;
            if (res.data.code == 10000) {
              this.rows = res.data.result.trends.reverse();
              this.price = res.data.result.price;
            } else {
              this.$vux.toast.text(res.data.message)
            }
          });
        }
        //更新后台本地交易列表信息
        getdataBz('/Wallet/getblockchainlog ', {
          token: this.$token,
          mark: this.$mark,
          wcid: this.wcid,
        }).then(res => {
          this.audit = res.data.result
        });
      },

      isToWithdrawMoney() {
        if (this.tabIndex == 0) {
          AlertModule.show({
            content: 'UUC提币功能暂时关闭',
            onHide() {

            }
          })
        } else {
          this.$router.push({
            path: '/withdrawMoney',
            query: {wc_id: this.wcid, tabIndex: this.tabIndex, wc_name: this.selectItem}
          });
        }

      },
      toCTC() {
        AlertModule.show({
          content: '敬请期待',
          onHide() {

          }
        })
      },
      //判断是否需要创建钱包地址
      isToChargeMoney() {
        this.$vux.loading.show();
        getdataBz('/Wallet/iscreatebywcid', {
          token: this.$token,
          mark: this.$mark,
          wcid: this.wcid,
        }).then(res => {
          this.$vux.loading.hide();
          if (res.data.code == 10000) {
            this.$router.push({
              path: '/chargeMoney',
              query: {wc_id: this.wcid, wc_name: this.selectItem, tabIndex: this.tabIndex}
            })
          } else {
            this.$router.push({
              path: '/wallet',
              query: {wc_id: this.wcid, wc_name: this.selectItem, tabIndex: this.tabIndex}
            })
          }
        })
      },

      //扫码跳转到提币页面，并把获得的值填充到输入框中
      fillInput(name) {
        this.$router.push({
          path: '/withdrawMoney',
          query: {
            wc_id: this.wcid,
            address: name
          }
        })
      },


      //获取初始数据
      getcurrencylist() {
        getdataBz('/Wallet/getcurrencylist', {
          token: this.$token,
          mark: this.$mark
        }).then(res => {
          if (res.data.code == 10000) {
            this.currencylist = res.data.result;
            this.currency = [this.currencylist[this.tabIndex]];
            this.selectItem = this.currencylist[this.tabIndex].wc_name;
            this.wcid = this.currencylist[this.tabIndex].wc_id;
            this.getKlineData();
          } else {
            this.$vux.toast.text(res.data.message)
          }
        }).catch(error => {

        });
      },


      //获取最近交易记录数据
      /*   gettransferlist() {
           getdataBz('/Wallet/transferlist', {
             token: this.$token,
             mark: this.$mark,
             wcid: this.wcid,
             page: this.page,
             rows: this.pageDatas
           }).then(res => {
             this.$vux.loading.hide();
             if (res.data.code == 10000) {
               this.transferlist = res.data.result;
             } else {
               // this.$vux.toast.text(res.data.message);
             }
           }).catch(error => {
             this.$vux.toast.text('数据加载失败,请检查网络是否正常');
             this.$vux.loading.hide();
           })
         },*/

      //时间格式转换
      timestampToTime(timestamp) {
        let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes();
        let s = date.getSeconds();
        return Y + M + D + h + m;
      },

    },
    watch: {
      //币种页面切换执行操作，重新获取相应币种数据
      // tabIndex: function (value) {
      //   this.tabIndex = value;
      //   this.selectIndex = value;
      //   this.currency = this.currencylist[value];
      //   this.getKlineData();
      //   if (this.currencylist) {
      //     this.selectItem = this.currencylist[value].wc_name;
      //   }
      // }
    }
  }
</script>

<style lang="less" scoped>
  @import url("../../styles/record.less");

  .tabIndex {
    height: 4rem;
    top: 46px;
    width: 100%;
    position: fixed;
    display: flex;
    background-color: #fff;
    border-bottom: 1px solid #CCCCCC;
    box-sizing: border-box;
    > p {
      flex: 1;
      line-height: 3.6rem;
      height: 4rem;
      box-sizing: border-box;
      color: #999;
      font-size: 1.36rem;
      display: flex;
      justify-content: center;
      &.myActive {
        border-bottom: 2px solid #4B8BF9;
        color: #4B8BF9;
      }
      > span {
        display: inline-block;
        padding: 0 .2rem;

      }
    }
  }

  .swiper {
    position: fixed;
    top: calc(~'47px + 4rem');
    bottom: 0;
    right: 0;
    left: 0;
    overflow-y: auto;
    background-color: #f5f5f5;
    > .account_box {
      height: 40rem;
    }

  }

  .vux-slider, .vux-swiper {
    height: 100%;

  }

  .btn_box {
    height: 4rem;
    display: flex;
    padding: 0 1rem;
    margin-bottom: .5rem;
    justify-content: space-between;
    box-sizing: border-box;
    text-align: center;
    > p {
      flex: 1;
      max-width: 48%;
      line-height: 4rem;
      font-size: 1.3rem;
      color: #FFFFFF;
      border-radius: 3px;
      &:nth-child(1) {
        background: #4A90E2;
      }
      &:nth-child(2) {
        background: #F5A623;
      }
    }
  }

  .vux-slider > .vux-swiper {
    overflow-y: auto;
  }

  .ct_tabar {
    width: 100%;
    font-size: 1.2rem;
    text-align: center;
    color: #2e85ca;
    line-height: 4rem;
    &.pos_btm {
      position: absolute;
      bottom: 0;
    }
    > p {
      width: 90%;
      background: linear-gradient(-270deg, #3567F9 0%, #6B9DFC 100%);
      border-radius: 3px;
      color: #fff;
      text-align: center;
      margin: 0 auto 1rem;
      &:nth-child(2) {
        color: #666;
        background: #fff;
      }
    }
  }
</style>
