<template>
  <div class="transfer">
    <myHeader :title="title"/>
    <div class="main">
      <div class="transfer_main_content">
        <div class="transfer_main_content_ipt">
          <p>对方账户</p>
          <input type="text" placeholder="请输入对方账号" @blur="mblur" v-model="user_mobile" maxlength="11">
        </div>
        <div class="transfer_main_content_ipt">
          <p>对方ID</p>
          <input type="text" placeholder="请输入对方ID号" @blur="mblur" v-model="user_id" maxlength="11">
        </div>
      </div>
      <div class="transfer_main_btn" @click="toTransferNext">下一步</div>
    </div>
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'
  import {getdata_u} from "@/services/mining";

  export default {
    name: "transfer",
    components: {
      myHeader
    },
    data() {
      return {
        title: '',
        transfer_type: this.$route.query.transfer_type,
        user_mobile: '',
        user_id: '',
      }
    },
    created() {
      if (this.transfer_type == 1) {
        this.title = '转到他人可用资产'
      } else if (this.transfer_type == 2) {
        this.title = '转到他人战绩钱包'
      } else if (this.transfer_type == 3) {
        this.title = '转到他人兑换资产'
      }
    },

    methods: {
      toTransferNext() {
        if (this.user_mobile !== '' && this.user_id !== '') {
          getdata_u('/Transfer/validateOtherId', {
            token: this.$token,
            mark: this.$mark,
            other_mobile: this.user_mobile,
            other_id: this.user_id
          }).then(res => {
            if (res.data.code == 10000) {
              this.$router.push({
                path: '/transfer_next',
                query: {
                  transfer_type: this.transfer_type,
                  user_mobile: this.user_mobile,
                  user_id: this.user_id
                }
              });
            }else {
              this.$vux.toast.text(res.data.message)
            }
          });

        } else if (this.user_mobile === '') {
          this.$vux.toast.text('请输入对方账号')
        } else if (this.user_id === '') {
          this.$vux.toast.text('请输入对方ID')
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .main {
    > .transfer_main_top {
      height: 10rem;
      display: flex;
      justify-content: center;
      align-items: center;

      > .transfer_main_top_imgs {
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
        background-color: #fff;
        > img {
          width: 100%;
          height: 100%;
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
    > .transfer_main_content {
      height: 17.5rem;
      padding: 1rem;
      background-color: #fff;
      > .transfer_main_content_ipt {
        height: 7rem;
        &:nth-child(2) {
          margin-top: 1.5rem;
        }
        > p {
          height: 3rem;
          font-size: 1.4rem;
          line-height: 3rem;
          font-weight: normal;
          color: #333;
        }
        > input {
          height: 3rem;
          width: 100%;
          text-indent: 1rem;

          font-size: 1.2rem;
          font-weight: normal;
          color: rgba(112, 114, 132, 1);

        }
      }
    }
    > .transfer_main_btn {
      margin: 2rem auto;
      text-align: center;
      height: 4rem;
      line-height: 4rem;
      width: 90%;
      background: linear-gradient(-270deg,#3567F9 0%, #6B9DFC 100%);
      border-radius: .3rem;
      font-size: 1.4rem;
      font-weight: normal;
      color: rgba(255, 255, 255, 1);
    }
  }
</style>
