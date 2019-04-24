<template>
  <div class="LockIncome">
    <myHeader title="资产收益"/>
    <div class="main">
      <h3 class="nav" v-if="false">
        <p v-for="(item , index) in classification" :key="index">
          <span
            @click="changeNavIndex(index)"
            :class="{active:index == tabIndex}">{{item}}
          </span>
        </p>
      </h3>
      <div class="swiper">
        <!--<Swiper :show-dots="false" height='100%' v-model="tabIndex" >
          <SwiperItem v-for="(item , index) in classification" :key="index" height='100%'>-->
        <revenueRecord :showData='showData'
                       :recordText="recordText"
                       :loadBol="loadBol" @addData="addData"/>
        <!--  </SwiperItem>
        </Swiper>-->
      </div>
    </div>
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'
  import revenueRecord from '@/components/myWallet/revenueRecord.vue'
  import {Swiper, SwiperItem} from 'vux'
  import {getdata} from "@/services/mining";

  export default {
    name: "LockIncome",
    components: {
      myHeader,
      revenueRecord,
      Swiper,
      SwiperItem
    },
    data() {
      return {
        //分栏标题
        classification: ['全部', '每日释放', '每日提取'],

        //分栏下标
        tabIndex: 0,

        //默认第一页
        page: 1,

        //默认每页数据8条
        pageDatas: 8,

        //列表数据
        showData: [],

        //上拉加载布尔值
        loadBol: true,

        //文字说明
        recordText: '资产日化收益',
      }
    },
    methods: {
      //切换分栏
      changeNavIndex(index) {
        this.tabIndex = index

      },


      //切换分栏
      changeIndex(index) {
        this.tabIndex = index
      },


      //获取列表数据
      getShowData() {
        this.loadBol = true;
        getdata('/Supernode/getMoneyLockIncomeLog',
          {
            token: this.$token,
            mark: this.$mark,
            p: this.page,
            ps: this.pageDatas,
            type: this.tabIndex,
          }).then(res => {
          this.$vux.loading.hide();
          if (res.data.code == 10000) {
            if (res.data.result.length > 0) {
              this.$vux.toast.text('数据加载成功');
              this.showData = this.showData.concat(res.data.result)
              this.loadBol = false
            } else {
              this.$vux.toast.text('没有更多数据');
            }
          } else {
            this.$vux.toast.text(res.data.message)
          }
        }).catch(error => {
          this.$vux.toast.text('数据加载失败');
        })
      },

      //上拉加载更多数据
      addData() {
        this.$vux.loading.show({
          text: '数据加载中'
        });
        this.page += 1;
        let setId = setTimeout(() => {
          this.getShowData()
          clearTimeout(setId)
        }, 1000)
      },
    },


    created() {
      this.$vux.loading.show({
        text: '数据加载中'
      });
      this.getShowData()
    },


    watch: {
      //监听分栏切换
      tabIndex: function (value) {
        this.$vux.loading.show({
          text: '数据加载中'
        });
        this.tabIndex = value;
        this.showData = [];
        this.page = 1;
        let setId = setTimeout(() => {
          this.getShowData();
          clearTimeout(setId)
        }, 1000)
      }
    }
  }
</script>

<style lang="less" scoped>
  .page-tabbar-tab-container {
    position: absolute;
    top: 4rem;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .swiper {
    height: calc(~'100% - 4rem');
  }

  .vux-slider, .vux-swiper {
    height: 100%;
  }

  .main {
    -webkit-overflow-scrolling: touch;
  }

  .nav {
    height: 4rem;
    width: 100%;
    font-size: 1.2rem;
    display: flex;
    padding: 0 3rem;
    box-sizing: border-box;
    > p {
      flex: 1;
      line-height: 4rem;
      color: #9fa1b0;
      text-align: center;
      > span {
        display: inline-block;
        height: calc(~'100% - 2px');
        &.active {
          border-bottom: 2px solid #4c9ee4;
          color: #4c9ee4;
          font-size: 1.3rem;
        }
      }
      &:nth-child(1) {
        text-align: left;
      }
      &:last-child {
        text-align: right;
      }
    }
  }


</style>
