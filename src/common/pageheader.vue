<template>
  <div class="page">
    <mt-header :title='headerData.title'>
      <router-link :to="headerData.link" slot="left" class="abc">
        <mt-button icon="back"></mt-button>
      </router-link>
      <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>

      <slot></slot>

  </div>
</template>
<script>
  export default {
      name:'page',
      props:{
        headerConfig: Object,
      },
      data(){
        let headerData = {};
        if(headerData){
          headerData = Object.assign({}, this.headerConfig);
          console.log( headerData.title)
        }
        return {
          headerData,
        }
      }
  }
</script>

<style lang='less' scope>
 @import url("../styles/record.less");
  .content{
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    bottom: 0;

  }

.mint-header{

  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
}

</style>
