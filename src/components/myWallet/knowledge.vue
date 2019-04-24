<template>
  <div class="knowledge">
    <div class="knowledge_box " :class="{myActive : knowledgeShow}">
      <div class="knowledge_box_center">
        <h2>村民须知 <span class="x_icon" @click="$emit('hideKnowledge')"></span></h2>
        <div class="text_center">
          <p class="text_center_few">
            1、地球村APP软件是免费注册、免费推广，为区块链行业以及数字资产投机玩家提供服务的平台；
          </p>
          <p class="text_center_few">
            2、村民主动、自愿把全球主流数字资产储存到地球村APP的钱包里，且自愿兑换其它数字资产；
          </p>
          <p class="text_center_few">
            3、数字资产存在极高风险，在免费推广的同时可以获得一定的奖励，在奖励的过程中项目方会根据市场环境、
            全球政府政策的影响，所有参数会有所调整，模式会进行修改，价格也会大幅波动；
          </p>
          <p class="text_center_few">
            4、地球村APP内容会随时更改不作另行通知，项目方采取了合理措施确保准确性，但并不保证其准确性的程度，
            亦不会承担任何因APP上的资讯或因未能链接互联网、传送或接收任何通知和信息时的烟雾或失败而直接或间接产生的损失；
          </p>
          <p class="text_center_few">
            5、使用互联网形式的系统亦会存在风险，由于我们不能控制互联网的可靠性和可用性，我们不会对失真、
            延误和链接失败而承担任何责任；
          </p>
          <p class="text_center_few">
            6、我们对由于信息网络设备维护、信息网络连接故障、电脑、通讯或其他系统的故障、电力故障、天气原因、
            意外事故、罢工、劳动争议、暴乱、起义、骚乱、生产力或生产资料不足、火灾、洪水、风暴、爆炸、战争、
            银行或其他合作方原因、数字资产市场崩溃、政府行为、 司法或行政机关的命令、
            其他不在我们可控范围内或我们无能力控制的行为或第三方的原因而造成的不能服务或延迟服务，以及造成的您的损失，
            我们不承担任何责任；
          </p>
          <p class="text_center_few">
            7、我们不能保证本网站包含的全部信息、程序、文本等完全安全，不受任何病毒、木马等恶意程序的干扰和破坏，
            故您登陆、使用本网站任何服务或下载及使用该下载的任何程序、信息、数据等均是您个人的决定并自行承担风险及可能产生的损失；
          </p>
          <p class="text_center_few">
            8、如有对地球村项目、团队、其个人造成严重恶劣影响，重大财产损失，身体伤害的村民，项目方有权封号处理；
          </p>
          <p class="text_center_few">
            9、您点击【同意】按钮，就证明您完全了解村民须知，有风险意识和具备抗风险的能力，能和地球村项目一路前行直到巅峰！
          </p>

        </div>
        <div class="checkbox " :class="{myActive : checkboxBol}">
          <span :class="{myActive : checkboxBol}" @click="changecCheckboxBol"></span> 是否勾选,不再弹出风险提示?
        </div>
        <div class="mbtn" @click="showKeyBoard">同意</div>
      </div>
    </div>

  </div>
</template>

<script>
  import {getdata} from "@/services/mining";

  export default {
    name: "knowledge",
    props: ['knowledgeShow'],
    data() {
      return {
        checkboxBol: false,
        prompt_status: 1,
      };
    },
    created() {
    },
    methods: {
      changecCheckboxBol() {
        this.checkboxBol = !this.checkboxBol;
        if (this.checkboxBol) {
          this.prompt_status = 2;
        } else {
          this.prompt_status = 1;
        }
      },
      showKeyBoard() {
        getdata('/Supernode/updatePromptStatus', {
          token: this.$token,
          mark: this.$mark,
          prompt_status: this.prompt_status
        }).then(res => {
          if (res.data.code == 10000) {
            this.$emit('toNode')
          }
        })
      }
    },
    watch: {}
  }
</script>

<style lang="less" scoped>
  .knowledge_box {
    position: fixed;
    height: 0;
    width: 100%;
    overflow: hidden;
    transition: height .2s;
    &.myActive {
      height: 100%;
    }
    background-color: rgba(0, 0, 0, .3);
    > .knowledge_box_center {
      width: 85%;
      height: 70%;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      position: absolute;
      padding: 0 0 1rem;
      background-color: #fff;
      border-radius: .5rem;
      color: #666;
      text-align: center;
      /*overflow-y: auto;*/
      > h2 {
        font-size: 1.6rem;
        color: #666;
        line-height: 3rem;
        font-weight: 600;
        height: 3rem;
        position: relative;
        > .x_icon {
          display: inline-block;
          width: 3rem;
          height: 3rem;
          box-sizing: border-box;
          margin: auto;
          position: absolute;
          right: 0;
          background: url("../../assets/off_icon.png") no-repeat center;
        }
      }
      > .text_center {
        height: calc(~'100% - 8.5rem');
        padding: 0 1rem;
        overflow-y: scroll;
        > .text_center_few {
          text-align: left;
          margin-top: .5rem;
        }
      }
      > .mbtn {
        text-align: center;
        line-height: 3rem;
        width: 70%;
        margin: auto;
        margin-top: .5rem;
        height: 3rem;
        background-color: #3e84f5;
        border: none;
        border-radius: 1.5rem;
        font-size: 1.4rem;
        color: #ddd;
        &:active {
          background-color: #2a8edb;
          color: #fff;
        }
      }
      > .checkbox {
        height: 1.5rem;
        margin-top: .5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        color: #666;
        text-decoration: underline;
        &.myActive {
          color: #3e84f5;
        }
        > span {
          width: 1rem;
          height: 1rem;
          border: 1px solid #666;
          margin-right: .5rem;
          border-radius: .2rem;
          &.myActive {
            background: url("../../assets/check_icon.png") no-repeat center;
            border: 1px solid #3e84f5;
          }

        }
      }

    }
  }
</style>
