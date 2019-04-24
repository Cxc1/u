<template>
  <div class="comAward">
    <my-header title="社区奖励">
    </my-header>
    <div class="main">
      <div class="reward_one">
        <p class="main_reward_right">
          24H空投奖励：{{teamInit.today_kt}}
          <span>
          </span>
        </p>
      </div>
      <div class="reward_one">
        <p class="main_reward_right">
          24H玩家奖励：{{teamInit.today_player}}
          <span>

          </span>
        </p>
      </div>
      <div class="reward_one">
        <p class="main_reward_right">
          24H社区奖励：{{teamInit.today_team}}
          <span>

          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'
  import {getdata_u} from "@/services/mining";

  export default {
    name: "comAward",
    components: {
      myHeader
    },
    data() {
      return {
        teamInit: '',
      }
    },
    created() {
      this.getTeamInit();
    },
    methods: {
      getTeamInit() {
        getdata_u('/SuperNode/teamInit', {
          token: this.$token,
          mark: this.$mark
        }).then(res => {
          if (res.data.code == '10000') {
            this.teamInit = res.data.result;
          } else {
            this.$vux.toast.text(res.data.message)
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .reward_one {
    width: 88%;
    height: 6rem;
    text-indent: 1rem;
    background-image: linear-gradient(-210deg, #286EEB 0%, #33CBF1 100%);
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.10);
    border-radius: 5px;
    margin: auto;
    margin-bottom: 1rem;
    display: flex;
    &:nth-child(2) {
      background-image: linear-gradient(-224deg, #6950FB 0%, #CA78F1 100%);
    }
    &:nth-child(3) {
      background-image: linear-gradient(-224deg, #E24759 0%, #F6849A 100%);
    }
    > p {
      flex: 1;
      line-height: 6rem;
      font-size: 1.3rem;
      color: #fff;
      position: relative;
      &.main_reward_right {
        > span {
          height: 6rem;
          width: 3rem;
          position: absolute;
          right: 0;
          /*background: url("imgs/next.png") no-repeat center;*/
          background-size: 20%;
        }
      }
    }

  }

  .reward_one {
    margin-top: 1rem;
  }
</style>
