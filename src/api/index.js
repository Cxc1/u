// 测试
// const URL = 'http://test.globeblock.net/Api';

var URL = '/api';
var URL_U = '/Api2';
if (location.href.indexOf("localhost") > -1) {
  URL = 'http://i.uuc.com/api';
  URL_U = 'http://i.uuc.com/Api2';
  // URL = '//test1.globeblock.net/api';
  // URL_U = '//test1.globeblock.net/Api2';
}
const USERINFO_URL = URL + '/Users/getuserinfo';//获取用户信息
export default {
  URL,
  URL_U,
  USERINFO_URL,
}
