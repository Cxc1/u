<template>
  <ul class="item_box" v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loadBol"
      infinite-scroll-distance="0">
    <li class="record_products" v-for="(item , index) in showData" :key="index">

      <div class="record_products_center">
        <div class="record_products_center_left">
          <p>
            {{item.title}}
          </p>
          <p></p>
          <p>燃烧：<span>{{item.fee_value}}</span></p>
        </div>
        <div class="record_products_center_right">
          <p class="" :class="{r_color :item.money >= 0}">
            {{item.money}} UUC</p>
          <p>
            <span v-if="item.other_mobile && item.other_mobile != ''">对方账号：</span><span>{{item.other_mobile}}</span></p>
          <p>{{item.time}}</p>
        </div>
      </div>
    </li>
  </ul>

</template>

<script>
  export default {
    name: "puresRecord",
    props: ['showData', 'loadBol'],
    data() {
      return {
        moneyType: false
      }
    },
    methods: {
      //上拉加载更多数据
      loadMore() {
        if (this.showData.length >= 12) {
          this.$emit('addData');
        }
      }
    },
    mounted() {
    },
    created() {
      if (this.$route.name === 'integralPures' || this.$route.query.purse === 'integralPures') {
        this.moneyType = true;
      }
    }
  }
</script>

<style lang="less" scoped>
  @import url("../../styles/walletRecord.less");

  .icon {
    > span {
      border-radius: 50%;
      border: 1px solid #b9c7d5;
      color: #b9c7d5;

      &.type_1 {

        border: 1px solid #15d17f;
        color: #15d17f;
      }
      &.type_2 {
        border: 1px solid #e95521;
        color: #e95521;
      }
      &.type_3 {
        border: 1px solid #bdbb23;
        color: #bdbb23;
      }
      &.type_4 {
        border: 1px solid #2ed0ed;
        color: #2ed0ed;
      }
      &.type_5 {
        border: 1px solid #3e84f5;
        color: #3e84f5;
      }
      &.type_6 {
        border: 1px solid #09f1e9;
        color: #09f1e9;
      }
      &.type_7 {
        border: 1px solid #dbba53;
        color: #dbba53;
      }
      &.type_8 {
        border: 1px solid #fff;
        color: #fff;
      }
      &.type_9 {
        border: 1px solid #0bb20c;
        color: #0bb20c;
      }
      &.type_10 {
        border: 1px solid #fef5a8;
        color: #fef5a8;
      }
      &.type_11 {
        border: 1px solid #13c4ed;
        color: #13c4ed;
      }
      &.type_12 {
        border: 1px solid #35808e;
        color: #35808e;
      }
      &.type_13 {
        border: 1px solid #ff4949;
        color: #ff4949;
      }
      &.type_14 {
        border: 1px solid bisque;
        color: bisque;
      }
      &.type_15 {
        color: #C5C1AA;
        border: 1px solid #C5C1AA;
      }
      &.type_16 {
        color: #CD00CD;
        border: 1px solid #CD00CD;
      }
      &.type_17 {
        color: #8DB6CD;
        border: 1px solid #8DB6CD;
      }
      &.type_18 {
        color: #00FF7F;
        border: 1px solid #00FF7F;
      }
      &.type_19 {
        color: #FF83FA;
        border: 1px solid #FF83FA;
      }
      &.type_20 {
        color: #E6E6FA;
        border: 1px solid #E6E6FA;
      }
    }
  }

  .item_box {
    height: 100%;
    width: 100%;
    overflow-y: scroll;
  }

  .record_products_center {
    > div {

      &.record_products_center_left {
        color: #b9c7d5;
        &.type_1 {

          color: #15d17f;
        }
        &.type_2 {
          color: #e95521;
        }
        &.type_3 {
          color: #bdbb23;
        }
        &.type_4 {
          color: #2ed0ed;
        }
        &.type_5 {
          color: #3e84f5;
        }
        &.type_6 {
          color: #09f1e9;
        }
        &.type_7 {
          color: #dbba53;
        }
        &.type_8 {
          color: #fff;
        }
        &.type_9 {
          color: #0bb20c;
        }
        &.type_10 {
          color: #fef5a8;
        }
        &.type_11 {
          color: #13c4ed;
        }
        &.type_12 {
          color: #35808e;
        }
        &.type_13 {
          color: #ff4949;
        }
        &.type_14 {
          color: bisque;
        }
        &.type_15 {
          color: #C5C1AA;
        }
        &.type_16 {
          color: #CD00CD;
        }
        &.type_17 {
          color: #8DB6CD;
        }
        &.type_18 {
          color: #00FF7F;
        }
        &.type_19 {
          color: #FF83FA;
        }
        &.type_20 {
          color: #E6E6FA;
        }
        > p {
          &.active {
            line-height: 3.4rem;
            height: 3.4rem;
          }

        }
      }
      > p {
        color: #b9c7d5;
        &.type_1 {

          color: #15d17f;
        }
        &.type_2 {
          color: #e95521;
        }
        &.type_3 {
          color: #bdbb23;
        }
        &.type_4 {
          color: #2ed0ed;
        }
        &.type_5 {
          color: #3e84f5;
        }
        &.type_6 {
          color: #09f1e9;
        }
        &.type_7 {
          color: #dbba53;
        }
        &.type_8 {
          color: #fff;
        }
        &.type_9 {
          color: #0bb20c;
        }
        &.type_10 {
          color: #fef5a8;
        }
        &.type_11 {
          color: #13c4ed;
        }
        &.type_12 {
          color: #35808e;
        }
        &.type_13 {
          color: #ff4949;
        }
        &.type_14 {
          color: bisque;
        }
        &.type_15 {
          color: #C5C1AA;
        }
        &.type_16 {
          color: #CD00CD;
        }
        &.type_17 {
          color: #8DB6CD;
        }
        &.type_18 {
          color: #00FF7F;
        }
        &.type_19 {
          color: #FF83FA;
        }
        &.type_20 {
          color: #E6E6FA;
        }
      }
    }
  }

</style>
