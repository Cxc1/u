import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/wallet',
      name: 'wallet',//钱包
      component: resolve => require(['@/pages/mywallet/wallet'], resolve),
    },
    {
      path: '/receiveAwards',
      name: 'receiveAwards',
      component: resolve => require(['@/pages/mywallet/receiveAwards'], resolve),
    },
    {
      path: '/comAward',
      name: 'comAward',
      component: resolve => require(['@/pages/mywallet/comAward'], resolve),
    },
    {
      path: '/myCommunity',
      name: 'myCommunity',
      component: resolve => require(['@/pages/mywallet/myCommunity'], resolve),
    },
    {
      path: '/purse',
      name: 'purse',//钱包
      component: resolve => require(['@/pages/mywallet/purse'], resolve),
    },
    {
      path: '/foundWallet',
      name: 'foundWallet',//创建钱包
      component: resolve => require(['@/pages/mywallet/foundWallet'], resolve),
    },
    {
      path: '/foundWalletSuc',
      name: 'foundWalletSuc',//创建成功
      component: resolve => require(['@/pages/mywallet/foundWalletSuc'], resolve),
    },
    {
      path: '/uuc_wallet',
      name: 'mywallet',
      component: resolve => require(['@/pages/mywallet/myWallet'], resolve),
    },

    {
      path: '/information/:id',
      name: 'information',//资讯
      component: resolve => require(['@/pages/information/information'], resolve),
    },

    {
      path: '/refushpage',
      name: 'refushpage',
      component: resolve => require(['@/common/refushpage'], resolve),
    },
    {
      path: '/refresh',
      name: 'refresh',
      component: resolve => require(['@/common/pullrefresh'], resolve),

    },

    {
      path: '/accountBook',
      name: 'accountBook',//账本
      component: resolve => require(['@/pages/mywallet/accountBook/accountBook'], resolve),
    },
    {
      path: '/Supernode',
      name: 'Supernode',//节点
      component: resolve => require(['@/pages/mywallet/Supernode/Supernode'], resolve),
    },
    {
      path: '/lockIncome',
      name: 'LockIncome',//资产收益
      component: resolve => require(['@/pages/mywallet/Supernode/LockIncome'], resolve),
    },
    {
      path: '/combatGains/:id',
      name: 'combatGains',//战绩收益
      component: resolve => require(['@/pages/mywallet/Supernode/combatGains'], resolve),
    },
    {
      path: '/detailedRecord',
      name: 'detailedRecord',//M（x）级好友
      component: resolve => require(['@/pages/mywallet/Supernode/detailedRecord'], resolve),
    },
    {
      path: '/movablePurse',
      name: 'movablePurse',//活动钱包
      component: resolve => require(['@/pages/mywallet/wallets/movablePurse'], resolve),
    },
    {
      path: '/integralPures',
      name: 'integralPures',//通证钱包
      component: resolve => require(['@/pages/mywallet/wallets/integralPures'], resolve),
    },
    {
      path: '/lockPurse',
      name: 'lockPurse',//资产包
      component: resolve => require(['@/pages/mywallet/wallets/lockPurse'], resolve),
    },
    {
      path: '/assetsPures',
      name: 'assetsPures',//战绩钱包
      component: resolve => require(['@/pages/mywallet/wallets/assetsPures'], resolve),
    },
    {
      path: '/assetsTransfer',
      name: 'assetsTransfer',//战绩钱包转账
      component: resolve => require(['@/pages/mywallet/wallets/transfer/assetsTransfer'], resolve),
    }, {
      path: '/withholding',
      name: 'withholding',//战绩钱包转账扣款方式
      component: resolve => require(['@/pages/mywallet/wallets/transfer/withholding'], resolve),
    }, {
      path: '/toOtherLock',
      name: 'toOtherLock',//战绩钱包转其他人资产
      component: resolve => require(['@/pages/mywallet/wallets/transfer/toOtherLock'], resolve),
    }, {
      path: '/toSelfLock',
      name: 'toSelfLock',//战绩钱包转自己资产
      component: resolve => require(['@/pages/mywallet/wallets/transfer/toSelfLock'], resolve),
    }, , {
      path: '/movToUuc',
      name: 'movToUuc',//战绩钱包转自己资产
      component: resolve => require(['@/pages/mywallet/wallets/transfer/movToUuc'], resolve),
    }, {
      path: '/toOtherAsset',
      name: 'toOtherAsset',//战绩钱包转别人战绩
      component: resolve => require(['@/pages/mywallet/wallets/transfer/toOtherAsset'], resolve),
    },
    {
      path: '/temporaryPurse',
      name: 'temporaryPurse',//临时钱包
      component: resolve => require(['@/pages/mywallet/wallets/temporaryPurse'], resolve),
    },
    {
      path: '/withdrawMoney',
      name: 'withdrawMoney',//提币
      component: resolve => require(['@/pages/mywallet/withdrawMoney'], resolve),
    },
    {
      path: '/ltccToUuc',
      name: 'ltccToUuc',//提币
      component: resolve => require(['@/pages/mywallet/ltccToUuc'], resolve),
    },
    {
      path: '/chargeMoney',
      name: 'chargeMoney',//充币
      component: resolve => require(['@/pages/mywallet/chargeMoney'], resolve),
    },
    {
      path: '/commonAddress',
      name: 'commonAddress',//钱包地址
      component: resolve => require(['@/pages/mywallet/commonAddress'], resolve),
    },
    {
      path: '/recordOfPurse',
      name: 'recordOfPurse',//钱包记录
      component: resolve => require(['@/pages/mywallet/wallets/recordOfPurse'], resolve),
    },
    {
      path: '/rewardDetails',
      name: 'rewardDetails',//奖励明细
      component: resolve => require(['@/pages/mywallet/Supernode/rewardDetails'], resolve),
    },
    {
      path: '/transfer',
      name: 'transfer',//战绩钱包转别人战绩
      component: resolve => require(['@/pages/mywallet/wallets/transfer/transfer'], resolve),
    },
    {
      path: '/transfer_next',
      name: 'transfer_next',//战绩钱包转别人战绩
      component: resolve => require(['@/pages/mywallet/wallets/transfer/transfer_next'], resolve),
    },{
      path: '/ifd',
      name: 'ifd',//邀请好友
      component: resolve => require(['@/pages/mining/ifd'], resolve),
    },
    {
      path: '/ifnnum',
      name: 'ifnnum',//邀请码
      component: resolve => require(['@/pages/mining/ifn'], resolve),
    },
    {
      path: '/ifi',
      name: 'ifi',//邀请好友收入明细
      component: resolve => require(['@/pages/mining/ifi'], resolve),
    },
    {
      path: '/exploits/:id',//邀请好友M...成绩
      name: 'exploits',
      component: resolve => require(['@/pages/mining/ifd_exploits'], resolve),
    },
    {
      path: '/cheats',
      name: 'cheats',//算力秘籍
      component: resolve => require(['@/pages/mining/cheats'], resolve),
    },
    {
      path: '/ceRecord',
      name: 'ceRecord',//换币记录
      component: resolve => require(['@/pages/conversion/ceRecord'], resolve),
    },
  ]
})
