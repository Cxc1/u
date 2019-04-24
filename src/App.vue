<template>
  <div id="app">
    <!--<transition enter-active-class="slideInRight" leave-active-class="fadeOut">-->
    <!--<router-view/>-->
    <!--</transition>-->
    <transition :name="transitionName">
      <router-view class="Router"/>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        transitionName: '', // 默认动态路由变化为slide-right
      };
    },
    watch: {
      '$route'(to, from) {
        if (from.name) {
          let isBack = this.$router.isBack;
          if (isBack) {
            this.transitionName = 'slide-right';
          } else {
            this.transitionName = 'slide-left';
          }
          this.$router.isBack = false
        }
      }
    }
  }
</script>

<style lang="less">

  html, body, #app {
    height: 100%;
    width: 100%;
    overflow: scroll;
    background-color: #f5f5f5;
  }

  .Router {
    transition: all 0.5s ease;
  }

  .slide-left-enter,
   .slide-right-leave-active {
    /* opacity: 1; */
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100% 0);
  }
</style>
