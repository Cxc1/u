<template>
  <div class="purse">
    <my-header title="我的钱包">
    </my-header>
    <div class="main">
      <router-link tag="div" :to="{path : '/uuc_wallet' ,query:{ e : 1}}" class="reward_one">
        <div class="main_reward_icon">
          <span class="main_reward_icon_one">
          </span>
        </div>
        <div class="main_reward_right">
          <p> 流通钱包 <span>{{walletInit.usable_money}}</span></p>
          <p>折合BTC：{{walletInit.usable_btc}}</p>
          <p>折合CNY：{{walletInit.usable_cny}}</p>

          <span>
          </span>
        </div>
      </router-link>
      <router-link tag="div" to="/movablePurse" class="reward_two">
        <div class="main_reward_icon">
          <span class="main_reward_icon_two">
          </span>
        </div>
        <div class="main_reward_right">
          <p>战绩钱包 <span>{{walletInit.flow_money}}</span></p>
          <p>折合BTC：{{walletInit.flow_btc}}</p>
          <p>折合CNY：{{walletInit.flow_cny}}</p>

          <span>

          </span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'
  import {getdata_u} from "@/services/mining";

  export default {
    name: "purse",
    components: {
      myHeader
    },
    data() {
      return {
        walletInit: ''
      }
    },
    created() {
      this.getWalletInit();
    },
    methods: {
      getWalletInit() {
        getdata_u('/SuperNode/walletInit', {
          token: this.$token,
          mark: this.$mark
        }).then(res => {
          if (res.data.code == '10000') {
            this.walletInit = res.data.result;
          } else {
            this.$vux.toast.text(res.data.message)
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .reward_one, .reward_two {
    width: 88%;
    height: 10rem;
    background-color: #fff;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.10);
    border-radius: 5px;
    margin: auto;
    margin-bottom: 1rem;
    display: flex;
    > div {
      flex: 1;
      line-height: 3rem;
      font-size: 1.3rem;
      color: #666;
      position: relative;
      &.main_reward_icon {
        max-width: 6rem;
        height: 6rem;
        display: flex;
        align-items: center;
        justify-content: center;
        > span {
          width: 3.5rem;
          height: 3.5rem;

          &.main_reward_icon_one {
            background: url("imgs/pus_icon.png") center no-repeat;
            background-size: 100%;
          }
          &.main_reward_icon_two {
            background: url("imgs/lt_icon.png") center no-repeat;
            background-size: 100%;
          }

        }
      }
      &.main_reward_right {
        padding: 1.25rem 0;
        > p {
          line-height: 2.5rem;
          color: #666;
          font-size: 1.2rem;
          &:nth-child(1) {
            color: #333333;
            font-weight: bolder;
            font-size: 1.4rem;
          }
        }
        > span {
          height: 10rem;
          width: 3rem;
          position: absolute;
          right: 0;
          top: 0;
          background: url("imgs/next.png") no-repeat center;
          background-size: 20%;
        }
      }
    }

  }

  .reward_one {
    margin-top: 2rem;
  }
</style>
