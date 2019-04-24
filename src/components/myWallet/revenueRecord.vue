<template>
  <ul class="transaction_record_box_enter" v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loadBol"
      infinite-scroll-distance="0">
    <li class="record_products" v-for="(item,index) in showData" :key="index">
      <div class="record_products_center">
        <p>
          <span class="blur">每日奖励</span>
          <span></span>
        </p>
        <p>
          <span class="blur">奖励数量：{{item.actual_money}}</span>
          <span class="green">燃烧：{{item.fee_value}}</span>
        </p>
        <p class="yellow">
          <span class="green">燃烧率：{{item.fee_rate}}%</span>

          <span class="green">{{item.time}}</span>
        </p>
      </div>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "revenueRecord",
    props: ['showData', 'loadBol', 'recordText'],
    data() {
      return {}
    },
    methods: {

      //上拉加载更多数据
      loadMore() {
        if (this.showData.length >= 8) {
          this.$emit('addData');
        }
      }

    }

  }
</script>

<style lang="less" scoped>
  @import url("../../styles/record.less");

  .transaction_record_box_enter {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    overflow-y: scroll;
    > .record_products {
      height: 7rem;
    }
    .record_products {
      .green {
        color: #b9c7d5;
      }
      .orange {
        color: #e95521;
      }
      .blur {
        color: #333;
      }
      .record_products_center {
        p {
          span {
            &:nth-child(2) {
              float: right;
            }
            &.blod {
              font-weight: bolder;
            }
          }
          &:nth-child(2) {
            border-bottom: 1px solid #f5f5f5;
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
</style>
