<template>
  <div class="receiveAwards">
    <my-header title="领取奖励">
    </my-header>
    <div class="main">
      <router-link tag="div" to="/combatGains/1" class="reward_one">
        <p class="main_reward_icon">
          <span class="main_reward_icon_one">
          </span>
        </p>
        <p class="main_reward_right">
          空投奖励
          <span>
          </span>
        </p>
      </router-link>
      <router-link tag="div" to="/combatGains/2" class="reward_two">
        <p class="main_reward_icon">
          <span class="main_reward_icon_two">
          </span>
        </p>
        <p class="main_reward_right">
          玩家奖励
          <span>

          </span>
        </p>
      </router-link>
      <router-link tag="div" to="/combatGains/3" class="reward_two">
        <p class="main_reward_icon">
          <span class="main_reward_icon_tre">
          </span>
        </p>
        <p class="main_reward_right">
          社区奖励
          <span>

          </span>
        </p>
      </router-link>
    </div>
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'

  export default {
    name: "receiveAwards",
    components: {
      myHeader
    }
  }
</script>

<style lang="less" scoped>
  .reward_one, .reward_two {
    width: 88%;
    height: 6rem;
    background-color: #fff;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.10);
    border-radius: 5px;
    margin: auto;
    margin-bottom: 1rem;
    display: flex;
    > p {
      flex: 1;
      line-height: 6rem;
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
            background: url("imgs/wk_icon.png") center no-repeat;
            background-size: 100%;
          }
          &.main_reward_icon_two {
            background: url("imgs/fx_icon.png") center no-repeat;
            background-size: 100%;
          }
          &.main_reward_icon_tre {
            background: url("imgs/read_icon.png") center no-repeat;
            background-size: 100%;
          }

        }
      }
      &.main_reward_right {
        > span {
          height: 6rem;
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
    margin-top: 2rem;
  }
</style>
