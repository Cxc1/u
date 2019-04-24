<template>
  <div class="withholding">
    <my-header title="选择扣款方式">
    </my-header>
    <div class="main">
      <div class="transfer_box">
        <div class="transfer_item">
          <div @click="toOtherLock(1)">
            <p>战绩钱包+活动钱包互转</p>
            <p>需活动钱包余额大于转账金额的{{min_rate.usable_min_rate}}%</p>
          </div>

          <span></span>
        </div>
        <div class="transfer_item">
          <div @click="toOtherLock(2)">
            <p>战绩钱包+临时钱包互转</p>
            <p>需临时钱包余额大于转账金额的{{min_rate.temp_min_rate}}%</p>
          </div>

          <span></span>
        </div>
        <div class="transfer_item">
          <div @click="toOtherLock(3)">
            <p>战绩钱包+临时钱包+活动钱包互转</p>
            <p>需临时钱包余额与活动钱包余额同时满足大于转账金额的比例</p>
          </div>

          <span></span>
        </div>
      </div>


    </div>

  </div>

</template>

<script>
  import myHeader from '@/common/myHeader.vue'
  import {getdata} from "@/services/mining";

  export default {
    name: "withholding",
    components: {
      myHeader,
    },
    data() {
      return {
        min_rate: ''
      }
    },
    methods: {
      getFee() {
        getdata('/Supernode/recordTransferInit', {
          mark: this.$mark,
          token: this.$token,
          type: this.$route.query.purse
        }).then(res => {
          if (res.data.code == 10000) {
            this.min_rate = res.data.result;
          }
        });

      },
      toOtherLock(value) {
        if (this.$route.query.purse == 1) {
          this.$router.push({
            path: '/toOtherLock',
            query: {type: value}
          });
        } else if (this.$route.query.purse == 2) {
          this.$router.push({
            path: '/toOtherAsset',
            query: {type: value}
          });
        } else if (this.$route.query.purse == 3) {
          this.$router.push({
            path: '/toSelfLock',
            query: {type: value}
          });
        }
      }
    },
    created() {
      this.getFee();
    }

  }
</script>

<style lang="less" scoped>
  .main {
    > .transfer_box {
      > .transfer_item {
        height: 5rem;
        width: 100%;
        background-color: #1d212d;
        padding: .5rem;
        margin-bottom: .5rem;
        font-size: 1.3rem;
        line-height: 4rem;
        box-sizing: border-box;
        color: #b9c7d5;
        text-indent: .5rem;
        display: flex;
        > div {
          min-width: calc(~'100% - 2rem');
          > p {
            line-height: 2rem;
            margin: 0;
            padding: 0;
            width: 100%;
            overflow-x: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            &:nth-child(2) {
              font-size: .8rem;
              color: #d6633b;
            }
          }
        }

        > span {
          width: 2rem;
          height: 2rem;
          padding: 1rem 0;
          float: right;
          background: url("../imgs/next_icon.png") no-repeat center;
        }
      }
    }

  }
</style>
