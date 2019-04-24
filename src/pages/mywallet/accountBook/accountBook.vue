<template>
  <div class="accountBook">
    <myHeader title="账本"/>
    <div class="main">
      <div class="nav">
        <tab bar-active-color="#4B8BF9" default-color="#999" active-color='#4B8BF9' v-model="demoIndex" :line-width="3">
          <tab-item class="vux-center" style="background-color:#fff " v-for="(item, index) in classification"
                    :selected="demoIndex == index"
                    @on-item-click="changeDemoIndex(index)" :key="index">{{item}}
          </tab-item>
        </tab>
      </div>
      <div class="swiper">

        <swiper v-model="demoIndex" height="100%" :show-dots="false">
          <swiper-item v-for="(item, index) in classification" :key="index">
            <ul class="transaction_record_box" v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loadBol"
                infinite-scroll-distance="0">
              <li class="record_products" v-for="(item,index) in transferlist" :key="index"
                  :class="{myActive :item.style_type == 2}">
                <div class="record_products_center">
                  <p v-if="item.style_type ==1" :class="{
              green:item.wt_status ==1,
              yellow:item.wt_status ==2,
              orange:item.wt_status ==3,
              blur:item.wt_status ==4,}">
                    <span>{{item.title}}</span>
                    <span :class="{r_color:item.wt_money>=0}">数量：{{item.wt_money}}</span>
                  </p>
                  <p v-if="item.style_type ==2">
                    <span>{{item.title}}</span>
                    <span :class="{r_color:item.money>=0}">数量：{{item.money}}</span>
                  </p>
                  <p v-if="item.style_type == 1">
                    <span>地址：{{item.address}}</span>
                    <span>实际扣除：{{item.total}}</span>
                  </p>
                  <p v-if="item.style_type == 1">
                    <span v-if="item.style_type == 1">地址标签：{{item.tag}}</span>
                    <span v-if="item.style_type == 1">燃烧：{{item.wt_fees}}</span>
                  </p>
                  <p v-if="item.style_type == 2" :class="{height_0 :item.other_mobile == '' }">
                    <span></span>
                    <span v-if="item.style_type == 2&&item.other_mobile != ''">对方手机号 : {{item.other_mobile}}</span>
                  </p>
                  <p :class="{b_border:item.style_type == 1}">
                    <span v-if="item.style_type == 1">{{item.foot}}</span>
                    <span v-if="item.style_type == 2">燃烧 : {{item.fee_value}}</span>
                    <span v-if="item.style_type == 1">{{item.wt_start_time}}</span>
                    <span v-if="item.style_type == 2">{{item.time}}</span>
                  </p>
                </div>
              </li>
            </ul>
          </swiper-item>
        </swiper>
      </div>
    </div>
  </div>
</template>
<script>
  import myHeader from '@/common/myHeader.vue'
  import {getdata_u} from "@/services/mining";
  import {Tab, TabItem, Swiper, SwiperItem} from 'vux'

  export default {
    components: {
      myHeader,
      Tab,
      TabItem,
      Swiper,
      SwiperItem
    },
    data() {
      return {
        //默认第一页
        page: 1,

        //默认每页8条数据
        pageDatas: 12,

        //初始化列表数据
        transferlist: [],

        //币种id
        wcid: this.$route.query.wc_id,

        //控制上拉加载的布尔值
        loadBol: true,
        classification: [
          '全部', '充币', '提币', '转入', '转出'/*,'激活矿池' ,'挖矿奖励'*/
        ],
        demoIndex: 0,
      }
    },


    methods: {
      changeDemoIndex(index) {
        this.demoIndex = index;
      },
      //获取列表数据接口
      gettransferlist() {
        this.loadBol = true;
        getdata_u('/Transfer/getAccountLog', {
          token: this.$token,
          mark: this.$mark,
          wc_id: this.wcid,
          page: this.page,
          rows: this.pageDatas,
          type: this.demoIndex,
        }).then(res => {
          this.$vux.loading.hide();
          if (res.data.code == 10000) {
            if (res.data.result.length > 0) {
              this.transferlist = this.transferlist.concat(res.data.result);
              if (res.data.result.length >= 8) {
                this.$vux.toast.text(res.data.message);
                this.loadBol = false;
              } else {
                this.$vux.toast.text('所有数据加载完成');
              }
            }
          } else {
            this.$vux.toast.text(res.data.message)
          }
        })
      },


      //上拉加载
      loadMore() {
        this.$vux.loading.show({
          text: '数据加载中'
        });
        this.page += 1;
        let setId = setTimeout(() => {
          this.gettransferlist();
          clearTimeout(setId)
        }, 1000)
      },
    },


    created() {
      this.$vux.loading.show({
        text: '数据加载中'
      });
      this.gettransferlist()
    },
    watch: {
      demoIndex(value) {
        this.page = 1;
        this.transferlist = [];
        this.gettransferlist()
      }
    }
  }
</script>
<style lang="less" scoped>
  @import url("../../../styles/record.less");

  .swiper {
    height: calc(~'100% - 4rem');
  }

  .vux-slider, .vux-swiper {
    height: 100%;
  }

  .transaction_record_box {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    overflow-y: scroll;
    .record_products {
      .record_products_center {
        p {
          &:nth-child(1) {
            color: #000;
            > span:nth-child(2) {
              color: #06C38A;
              &.r_color {
                color: #FF5858;

              }
            }
          }
          &:nth-child(2) {
            &.height_0 {
              height: 0;
            }
            > span:nth-child(2) {
              color: #000;
            }
          }
          span {
            &:nth-child(2) {
              float: right;
            }
            &.blod {
              font-weight: bolder;
            }
          }
          &.b_border {
            border-top: 1px solid #ccc;
          }
          &:nth-child(4) {
            span {
              &.yellow {
                color: #dbba54;
              }
            }
          }

        }
      }
    }

  }

  .nav {
    height: 44px;
    width: 100%;

  }


</style>
