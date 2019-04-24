<template>
  <div class="recordOfPurse">
    <myHeader :title="title"/>
    <div class="main">
      <h3 class="nav">
        <p v-for="(item , index) in classification" :key="index" :class="{active:index == tabIndex}">
          <span @click="changeNavIndex(index)">{{item}}</span>
        </p>
      </h3>
      <div class="swiper">
        <Swiper :show-dots="false" height='100%' v-model="tabIndex">
          <SwiperItem v-for="(item , index) in classification" :key="index" height='100%'>
            <puresRecord :showData="showData" :loadBol="loadBol" :dateType="dateType" @addData="addData"/>
          </SwiperItem>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'
  import puresRecord from '@/components/myWallet/puresRecord.vue'
  import transactionRecord from '@/components/myWallet/transactionRecord.vue'
  import {Swiper, SwiperItem} from 'vux'

  export default {
    name: "recordOfPurse",
    components: {
      myHeader,
      puresRecord,
      transactionRecord,
      Swiper,
      SwiperItem
    },
    data() {
      return {
        title: '',
        //默认分栏数据为全部
        tabIndex: 0,

        //当前为哪个钱包的记录
        puresRecords: this.$route.query.purse,

        //初始化分栏
        classification: [],

        //初始化列表数据
        showData: [],

        //初始化获取第1 页数据
        page: 1,

        //默认每页12 条数据
        pageDatas: 12,

        //上拉加载布尔值
        loadBol: false,

        //初始化数据表对应的状态说明
        dateType: {},
      }
    },
    methods: {
      //切换分类
      changeNavIndex(index) {
        this.tabIndex = index
      },


      //上拉加载更多数据
      addData() {
        this.$vux.loading.show({
          text: '数据加载中'
        });
        this.page += 1;
        let Object = {
          token: this.$token,
          mark: this.$mark,
          page: this.page,
          rows: this.pageDatas,
          type: this.tabIndex,
        };
        let setId = setTimeout(() => {
          if (this.puresRecords == 'temporaryPurse') {
            this.getShowData('/Transfer/getExchangeLog', Object);
            // this.purse = 1;
          } else if (this.puresRecords == 'lockPurse') {
            this.getShowData('/Supernode/getMoneyLockLog', Object);
            // this.purse = 2
          } else if (this.puresRecords == 'movablePurse') {
            this.getShowData('/Transfer/getFlowLog', Object);
            // this.purse = 3
          } else if (this.puresRecords == 'integralPures') {
            this.getShowData('/Supernode/getMoneyIntegralLog', Object);
            // this.purse = 4
          } else if (this.puresRecords == 'assetsPures') {
            this.getShowData('/Supernode/getMoneyRecordLog', Object)
          }
        }, 1000)
      },


      //获取列表数据方法
      getShowData(url, obj) {
        return this.$http.post(this.api + url, this.$qs.stringify(obj))
          .then(res => {
            this.$vux.loading.hide();
            if (res.data.code == 10000) {
              this.loadBol = true;
              if (res.data.result.length <= 0) {
                this.$vux.toast.text('没有更多数据')
              } else {
                this.showData = this.showData.concat(res.data.result);
                this.$vux.toast.text('数据加载成功');
                this.loadBol = false
              }
            } else {
              this.$vux.toast.text(res.data.message)
            }
          }).catch(error => {
            this.$vux.toast.text('数据加载失败');
            console.log(error)
          })
      }
    }
    ,
    created() {
      let Object = {
        token: this.$token,
        mark: this.$mark,
        page: this.page,
        rows: this.pageDatas,
        type: this.tabIndex,
      };

      this.$vux.loading.show({
        text: '数据加载中'
      });
      //根据不同的钱包类型改变 数据表对应的状态说明 、分类名 、数据获取
      if (this.puresRecords == 'temporaryPurse') {
        this.title = '兑换资产记录';
        this.classification = ['全部', '划转', '转出', '转入', '激活矿池'];
        this.dateType = {
          typeon: '兑',
          typeto: '资',
          typest: '资',
          typefo: '活',
          typefi: '节',
          typesi: '出',
          typese: '入',
          typeei: '充',
          typeni: '超',
          typete: '卓',
          typeel: '领',
          typetw: '入',
          typeth: '入',
          typeft: '战',
          typefit: '扣',
          typesit: '出',
          typeset: '出',
          typeeit: '出',
          typenit: '兑',
          typeetwt: '撤',
          typeonText: '兑换',
          typetoText: '手动转到资产包',
          typestText: '自动转到资产包',
          typefoText: '提取到活动钱包',
          typefiText: '节点费',
          typesiText: '转出其他用户',
          typeseText: '其他用户转入',
          typeeiText: '后台充值',
          typeniText: '超级节点服务',
          typeteText: '卓越节点服务',
          typeelText: '领袖节点服务',
          typetwText: '从资产包转入',
          typethText: '他人活动钱包转入',
          typeftText: '战绩收益',
          typefitText: '后台扣除',
          typesitText: '战绩钱包转出其他用户资产包',
          typesetText: '战绩钱包转出其他用户战绩钱包',
          typeeitText: '战绩钱包转自己资产包',
          typenitText: '兑换UUC',
          typetwtText: '兑换UUC撤销',
        };
        this.getShowData('/Transfer/getExchangeLog', Object)
      } else if (this.puresRecords == 'lockPurse') {
        this.title = '资产包记录';
        this.classification = ['全部', '释放', '转入', '提取'];
        this.dateType = {
          typeon: '入',
          typeto: '入',
          typest: '入',
          typefo: '释',
          typefi: '战',
          typesi: '出',
          typese: '充',
          typeei: '扣',
          typeni: '入',
          typete: '入',
          typeonText: '临时钱包手动转入',
          typetoText: '临时钱包自动转入',
          typestText: '活动钱包转入',
          typefoText: '资产包收益手动释放',
          typefiText: '战绩收益提取',
          typesiText: '转出到临时钱包',
          typeseText: '后台充值',
          typeeiText: '后台扣除',
          typeniText: '战绩钱包转入',
          typeteText: '他人战绩钱包转入',
        };
        this.getShowData('/Supernode/getMoneyLockLog', Object)
      } else if (this.puresRecords == 'movablePurse') {
        this.title = '战绩钱包记录';
        this.classification = ['全部', '划转', '转出', '转入', '奖励'/*,'激活矿池'*/];
        this.dateType = {
          typeon: '入',
          typeto: '出',
          typest: '兑',
          typefo: '释',
          typefi: '战',
          typesi: '出',
          typese: '划',
          typeei: '出',
          typeni: '出',
          typete: '出',
          typeel: '战',
          typetw: '出',
          typeth: '入',
          typeonText: '临时钱包转入',
          typetoText: '转出到资产包',
          typestText: '兑换LTCC',
          typefoText: '资产包收益释放',
          typefiText: '战绩收益',
          typesiText: '转到他人临时钱包',
          typeseText: '划转通证',
          typeeiText: '战绩钱包转出其他用户资产包',
          typeniText: '战绩钱包转出其他用户战绩钱包',
          typeteText: '战绩钱包转资产包',
          typeelText: '战绩钱包收益释放',
          typetwText: '转出其他用户',
          typethText: '其他用户转入',
        };
        this.getShowData('/Transfer/getFlowLog', Object)
      } else if (this.puresRecords == 'integralPures') {
        this.title = '通证钱包记录';
        this.classification = ['全部', '收入', '支出'];
        this.dateType = {
          typeon: '释',
          typeto: '战',
          typest: '划',
          typefo: '购',
          typeonText: '资产收益释放',
          typetoText: '战绩收益',
          typestText: '活动钱包划转',
          typefoText: '商城购物',
        };
        this.getShowData('/Supernode/getMoneyIntegralLog', Object)
      } else if (this.puresRecords == 'assetsPures') {
        this.title = '战绩钱包记录';
        this.classification = ['全部', '收入', '支出'];
        this.dateType = {
          typeon: '战',
          typeto: '出',
          typest: '出',
          typefo: '入',
          typefi: '资',
          typesi: '战',
          typese: '释',
          // typeei : '扣',
          typeonText: '战绩钱包收益手动释放',
          typetoText: '转出到其他用户资产包',
          typestText: '转出其他用户战绩钱包',
          typefoText: '其他用户转入',
          typefiText: '转到资产包',
          typesiText: '战绩收益',
          typeseText: '从资产包释放',
          // typeeiText: '后台扣除',
        },
          this.getShowData('/Supernode/getMoneyRecordLog', Object)
      }

    }
    ,
    watch: {
      //分栏切换，获取分类数据
      tabIndex: function (value) {
        this.$vux.loading.show({
          text: '数据加载中'
        });
        this.tabIndex = value;
        this.showData = [];
        this.page = 1;
        let Object = {
          token: this.$token,
          mark: this.$mark,
          page: this.page,
          rows: this.pageDatas,
          type: this.tabIndex,
        };
        //根据不同钱包类型，获取属于当前钱包的数据
        let setId = setTimeout(() => {
          if (this.puresRecords == 'temporaryPurse') {
            this.getShowData('/Transfer/getExchangeLog', Object)
          } else if (this.puresRecords == 'lockPurse') {
            this.getShowData('/Supernode/getMoneyLockLog', Object)
          } else if (this.puresRecords == 'movablePurse') {
            this.getShowData('/Transfer/getFlowLog', Object)
          } else if (this.puresRecords == 'integralPures') {
            this.getShowData('/Supernode/getMoneyIntegralLog', Object)
          } else if (this.puresRecords == 'assetsPures') {
            this.getShowData('/Supernode/getMoneyRecordLog', Object)
          }
          clearTimeout(setId)
        }, 1000)
      }
    }
  }
</script>

<style lang="less" scoped>
  .swiper {
    height: calc(~'100% - 4rem');
  }

  .vux-slider, .vux-swiper {
    height: 100%;
  }

  /*数据*/
  .transaction_record_box {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 4rem;
    overflow-y: scroll;
    color: #fff;
    > .record_products {
      height: 9rem;
      padding: .5rem 1rem;
      box-sizing: border-box;
      > div {
        height: 2rem;
        line-height: 2rem;
        color: #ccc;
        display: flex;
        &:nth-child(1) {
          > p:nth-child(2) {
            max-width: 30%;
            font-size: 1.2rem;
            &.green {
              color: #33de60;
            }
          }
        }
        &:nth-child(2), &:nth-child(3) {
          > p:nth-child(1) {
            font-size: 1.1rem;
            > span {
              font-size: 1.2rem;
              &.green {
                color: #33de60;
              }
            }
          }
        }
        &:nth-child(3) {
          border-bottom: 1px solid #333;
        }
        &:nth-child(4) {
          > p {
            width: 100%;
          }
        }
        > p {
          display: inline-block;
          flex: 1;
          overflow-x: scroll;
          white-space: nowrap;
          padding: 0 .5rem;
          /*text-overflow: ellipsis;*/
          &:nth-child(2) {
            text-align: right;
            max-width: 45%;
          }
        }
      }
    }
  }

  .nav {
    height: 4rem;
    width: 100%;
    display: flex;
    font-size: 1.2rem;
    padding: 0 1rem;
    border-bottom: 1px solid #f5f5f5;
    box-sizing: border-box;
    background-color: #fff;
    > p {
      flex: 1;
      line-height: 4rem;
      color: #9fa1b0;
      text-align: center;
      &.active {
        border-bottom: 3px solid #4B8BF9;
        color: #4B8BF9;
        font-size: 1.3rem;
      }
      > span {
        display: inline-block;
        height: calc(~'100% - 2px');

      }
    }
  }

</style>
