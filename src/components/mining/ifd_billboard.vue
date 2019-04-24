<template>
      <div class="rewardRules-wrap">
                <div  class="rewardRules">
                    <h2>奖励规则</h2>
                    <p>1、每邀请一个好友（M1）完成注册，你就可以获得60个棒棒糖奖励;</p>
                    <p>2、你邀请的好友邀请他的一个好友注册，即二级好友（M2），你将获得50个奖励，以此类推总共设置六级奖励分别为60.50.40.30.20.10;</p>
                    <!-- <p>3、5月1日-5月31日活动期间，每日邀请好友数量第一名的用户，将获得300个BCB糖果，奖励将于第二天发放至【我的资产】</p> -->
                    <!-- <p>4、5月1日-5月31日活动期间，邀请好友总量最高的居民，将额外获得一个ETH的奖励;</p> -->
                    <!-- <p>5、地球村拥有法律范围内对活动的最终解释权，并将严查虚假邀请行为，一经发现将取消奖励资格。</p> -->
                </div>
            </div>
</template>
<script>
export default {
    name:'ifd-billboard'
}
</script>
<style lang="less" scoped>
	@import url("../../styles/var.less");
  .rewardRules-wrap{
        width: 90%;
        height: auto;
        background: #090c11;
        padding:5%;
        padding-bottom: 3rem; 
          .rewardRules{
              width: 100%;
              height: auto;
              color: #a2a5ad;
              h2{
                  font-size: 1.2rem;
                  color: #a2a5ad;
                  font-weight: 600;
                   margin-bottom:1rem; 
              }
              p{
                  font-size: 0.83rem;
                  line-height: 1.5rem;
                  color: #a9acb5;
                  white-space:pre-wrap;  
                  margin-bottom:1rem; 
              }
          }
   
    }
</style>
