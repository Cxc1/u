<template>
  <div>
    <myHeader title="邀请卡">
    </myHeader>
    <ifn-contest></ifn-contest>
  </div>
</template>
<script>
  import Ifn_contest from '@/components/mining/ifn_contest';
  import {getCookie, exitpage} from '@/utils/tool.js'
  import myHeader from '@/common/myHeader.vue'
  export default {
    name: 'ifn_num',
    components: {
      [Ifn_contest.name]: Ifn_contest,
      myHeader
    },
    data() {
      return {
        headerData: {
          isShow: true,
          title: '邀请码'
        }
      }
    },
    methods: {
      exitP() {
        exitpage();
      },
    }
  }
</script>

<style lang='less' scoped>

</style>
