<template>
  <div class="myCommunity">
    <my-header title="我的社区">
    </my-header>
    <div class="main">
      <router-link tag="div" to="detailedRecord?index=1&p=2" class="reward_one">
        <p class="main_reward_icon">
          <span class="main_reward_icon_one">
          </span>
        </p>
        <p class="main_reward_right">
          我的好友
          <span>
          </span>
        </p>
      </router-link>
      <router-link tag="div" to="/comAward" class="reward_two">
        <p class="main_reward_icon">
          <span class="main_reward_icon_two">
          </span>
        </p>
        <p class="main_reward_right">
          社区奖励
          <span>

          </span>
        </p>
      </router-link>
      <div class="reward_th" @click="showNotOpen">
        <p class="main_reward_icon">
          <span class="main_reward_icon_th">
          </span>
        </p>
        <p class="main_reward_right">
          DApp应用
          <span>
          </span>
        </p>
      </div>
      <div class="reward_th" @click="showNotOpen">
        <p class="main_reward_icon">
          <span class="main_reward_icon_fo">
          </span>
        </p>
        <p class="main_reward_right">
          社区商城
          <span>
          </span>
        </p>
      </div>
      <div class="reward_th" @click="showNotOpen">
        <p class="main_reward_icon">
          <span class="main_reward_icon_fi">
          </span>
        </p>
        <p class="main_reward_right">
          社区众筹
          <span>
          </span>
        </p>
      </div>
      <div class="reward_th" @click="showNotOpen">
        <p class="main_reward_icon">
          <span class="main_reward_icon_si">
          </span>
        </p>
        <p class="main_reward_right">
          社区聊天室
          <span>
          </span>
        </p>
      </div>

    </div>
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'
  import {AlertModule} from 'vux'
  export default {
    name: "myCommunity",
    components: {
      myHeader
    },
    data() {
      return{

      }
    },
    methods:{
      showNotOpen() {
        AlertModule.show({
          // title: '友情提示',
          content: '敬请期待',
          onHide() {

          }
        })
      }
    }

  }
</script>

<style lang="less" scoped>
  .reward_one, .reward_two ,.reward_th{
    width: 100%;
    height:4rem;
    background-color: #fff;
    /*box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.10);*/
    border-bottom: 1px solid rgba(0,0,0,0.10);
    margin: auto;
    display: flex;
    > p {
      flex: 1;
      line-height: 4rem;
      font-size: 1.3rem;
      color: #000;
      position: relative;
      &.main_reward_icon {
        max-width: 5rem;
        height: 4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        > span {
          width: 2.5rem;
          height: 2.5rem;

          &.main_reward_icon_one {
            background: url("imgs/myf.png") center no-repeat;
            background-size: 100%;
          }
          &.main_reward_icon_two {
            background: url("imgs/com_icon.png") center no-repeat;
            background-size: 100%;
          }
          &.main_reward_icon_th {
            background: url("imgs/DApp_icon.png") center no-repeat;
            background-size: 100%;
          }
          &.main_reward_icon_fo {
            background: url("imgs/shop_icon.png") center no-repeat;
            background-size: 100%;
          }
          &.main_reward_icon_fi {
            background: url("imgs/zc_icon.png") center no-repeat;
            background-size: 100%;
          }
          &.main_reward_icon_si {
            background: url("imgs/tak_icon.png") center no-repeat;
            background-size: 100%;
          }

        }
      }
      &.main_reward_right {
        > span {
          height: 4rem;
          width: 3rem;
          position: absolute;
          right: 0;
          background: url("imgs/next.png") no-repeat center;
          background-size: 20%;
        }
      }
    }

  }

  .reward_one {
    margin-top: 1rem;
    border-top: 1px solid rgba(0,0,0,0.10);
  }
</style>
