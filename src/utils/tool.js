//获得cooke
export function getCookie(name) {
  var strcookie = document.cookie;
  var arrcookie = strcookie.split("; ");
  for (var i = 0; i < arrcookie.length; i++) {
    var arr = arrcookie[i].split("=");
    if (arr[0] == name) return unescape(arr[1]);
  }
  return null;
}

//删除cookie
export function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null) document.cookie = name + "=" + cval + "; path=/;expires=" + exp.toGMTString();
}

export function addCookie(name, value, expireHours) {
  var cookieString = name + "=" + escape(value) + "; path=/";
  //判断是否设置过期时间
  if (expireHours > 0) {
    var date = new Date();
    date.setTime(date.getTime() + expireHours * 3600 * 1000);
    cookieString = cookieString + ";expires=" + date.toGMTString();
  }
  document.cookie = cookieString;
}

function getCookies(name) {
  var strcookie = document.cookie;
  var arrcookie = strcookie.split("; ");
  for (var i = 0; i < arrcookie.length; i++) {
    var arr = arrcookie[i].split("=");
    if (arr[0] == name) return unescape(arr[1]);
  }
  return null;
}
export function webgotologin(){
  var client = getCookies('odrplatform');//客户端
  if (client == 'android') {
    apps.gotologin();
  } else if (client == 'ios') {
    // window.webkit.messageHandlers.iosAction.postMessage("exit");
  }
}

//退出页面
export function exitpage() {
  var client = getCookies('odrplatform');//客户端
  if (client == 'android') {
    apps.finish();
  } else if (client == 'ios') {
    window.webkit.messageHandlers.iosAction.postMessage("exit");
  }
}

//跳转到算力秘籍
export function gotopromote() {
  var client = getCookies('odrplatform');//客户端
  if (client == 'android') {

  } else if (client == 'ios') {
    window.webkit.messageHandlers.iosAction.postMessage("gotopromote");
  }
}

//隐藏底部
export function hidebottom() {
  var client = getCookies('odrplatform');//客户端
  if (client == 'android') {
    apps.hide();
  } else if (client == 'ios') {
    window.webkit.messageHandlers.iosAction.postMessage("hidebottom");
  }
}


//显示底部
export function showbottom() {
  var client = getCookies('odrplatform');//客户端
  if (client == 'android') {
    apps.show();
  } else if (client == 'ios') {
    window.webkit.messageHandlers.iosAction.postMessage("showbottom");
  }
}

// 扫一扫
export function saoyisao() {
  var client = getCookies("odrplatform"); //客户端
  if (client == "android") {
    apps.gotoscan("1");
  } else if (client == "ios") {
    window.webkit.messageHandlers.iosAction.postMessage("gotoscan");
  }
}

export function clearNoNum(obj) {
  obj.value = obj.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
  obj.value = obj.value.replace(/\.{4,}/g, "."); //只保留第一个. 清除多余的
  obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/, '$1$2.$3');//只能输入两个小数
  if (obj.value.indexOf(".") < 0 && obj.value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
    obj.value = parseFloat(obj.value);
  }
}

//浮点数加法
export function add(num1, num2) {
  var r1, r2, m, n;
  try {
    r1 = num1.toString().split(".")[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = num2.toString().split(".")[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2));
  n = (r1 >= r2) ? r1 : r2;
  return ((num1 * m + num2 * m) / m).toFixed(n);
}

//浮点数的减法
export function sub(num1, num2) {
  var r1, r2, m, n;
  try {
    r1 = num1.toString().split(".")[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = num2.toString().split(".")[1].length
  } catch (e) {
    r2 = 0
  }
  n = (r1 >= r2) ? r1 : r2;
  m = Math.pow(10, Math.max(r1, r2));
  return ((num1 * m - num2 * m) / m).toFixed(n);
}

//浮点数的乘法
export function mul(num1, num2) {
  var m = 0;
  try {
    m += num1.toString().split(".")[1].length
  } catch (e) {
  }
  try {
    m += num2.toString().split(".")[1].length
  } catch (e) {
  }
  return (Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", ""))) / Math.pow(10, m)
}

//浮点数的除法
export function div(arg1, arg2) {
  var t1 = 0, t2 = 0, r1, r2;
  try {
    t1 = arg1.toString().split(".")[1].length
  } catch (e) {
  }
  try {
    t2 = arg2.toString().split(".")[1].length
  } catch (e) {
  }
  r1 = Number(arg1.toString().replace(".", ""));
  r2 = Number(arg2.toString().replace(".", ""));
  return (r1 / r2) * Math.pow(10, t2 - t1);
}
