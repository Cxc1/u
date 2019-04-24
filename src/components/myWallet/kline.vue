<template>
  <div class="kline">
    <div class="kline_top">
      <div class="kline_top_left">
        <p>
          当前价格：{{selectItem}} / CNY
        </p>
        <p>
          ￥{{price.now}}
        </p>
      </div>
      <div class="kline_top_right">
        <p>
          高：
          <span> {{price.high}}</span>
        </p>
        <p>
          低：
          <span>
           {{price.low}}
          </span>
        </p>

      </div>
    </div>
    <div class="kline_canvas_box">
      <ve-line
        height="100%"
        :data="chartData"
        :legend-visible="false"
        :grid="grid"
        :loading="Ltcc_k_loading"
      ></ve-line>
    </div>
    <div class="kline_foot">
      <p>
        <span :class="{myActive :trend_type ==3 }" @click="$emit('changeTrend_type', 3)">月</span>
        <span :class="{myActive :trend_type ==2 }" @click="$emit('changeTrend_type', 2)">周</span>
        <span :class="{myActive :trend_type ==1 }" @click="$emit('changeTrend_type', 1)">日</span>
      </p>
    </div>
  </div>
</template>

<script>

  import 'v-charts/lib/style.css'

  export default {
    name: "kline",
    props: ['rows', 'price', 'trend_type', 'Ltcc_k_loading', 'selectItem'],
    data() {
      this.grid = {
        top: 20,
        bottom: 20,
        left: 30,
        right: 30,
      };

      return {
        chartData: {
          columns: ['create_time', 'open'],
          rows: this.rows
        },
      };
    },
    created() {

    },
    destroyed() {

    },
    methods: {},
    watch: {
      rows: function (value) {
        this.chartData.rows = value;
      }
    }
  }
</script>

<style lang="less" scoped>
  .kline {
    width: 100%;
    height: 29rem;
    padding: 0 2rem;
    box-sizing: border-box;
    /*background-color: #f5f5f5;*/
    > .kline_top {
      height: 5rem;
      display: flex;
      padding: .5rem 0;
      > div {
        flex: 1;
        height: 100%;
        &.kline_top_left {
          > p {
            height: 2rem;
            line-height: 2rem;
            font-size: 1.2rem;
            color: #666;
            &:nth-child(2) {
              height: 3rem;
              line-height: 3rem;
              font-size: 1.6rem;
              color: #333;
              font-weight: bolder;
            }
          }
        }
        &.kline_top_right {
          > p {
            height: 2.5rem;
            line-height: 2.5rem;
            color: #03C086;
            white-space: nowrap;
            overflow-x: hidden;
            text-overflow: ellipsis;
            font-size: 1.2rem;
            font-family: PingFangSC-Semibold;
            text-align: right;
            &:nth-child(2) {
              color: #EA6E44;
            }
            > span {
              padding: 0 .5rem;

            }
          }
        }
      }
    }

    > .kline_canvas_box {
      height: 18rem;
      background-color: #fff;
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.20);

    }
    > .kline_foot {
      height: 5rem;
      width: 50%;
      display: flex;
      align-items: center;
      font-size: 1.4rem;
      text-align: center;
      color: #eee;
      float: right;
      > p {
        width: 100%;
        height: 3rem;
        display: flex;
        > span {
          flex: 1;
          height: 2rem;
          line-height: 2rem;
          margin: 0 .5rem;
          background-color: #fff;
          border: 1px solid #4B8BF9;
          color: #4B8BF9;
          &.myActive {
            background-color: #4B8BF9;
            color: #fff;
          }
        }
      }

    }
  }
</style>
