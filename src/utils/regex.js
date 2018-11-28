//1、用户名正则
export function isUserName(userName) {
  return /^[a-zA-Z0-9_-]{4,16}$/.test(userName)
}
//2、密码强度
export function passwordStrength(password) {
  return /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/.test(password)
}
//3、Email正则
export function isEmail(email) {
  return /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(email)
}
//4、手机号码正则
export function isMobil(tel) {
  return /^1[34578]\d{9}$/.test(tel)
}
//5、身份证号正则(18位)
export function isIDCard(idCard) {
  return /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(idCard)
}
//6、URL正则
export function isURL(url) {
  return /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(url)
}
//7、密码正则(6-16 数字且字母)
export function isPassword(password) {
  return /^(?=.*?[a-zA-Z])(?=.*?[0-9])[a-zA-Z0-9]{6,16}$/.test(password)
}
//8、密码正则(6-16 数字或字母)
export function isPurePassword(password) {
  return /^[a-z0-9]{6,16}$/.test(password)
}
//9、密码正则(6-16 字符)
export function isChatPassword(password) {
  return /^[a-z0-9@#￥$%^&*_\-+*/!.,~`:;]{6,16}$/.test(password)
}
//10、自然数
export function isNumber(number) {
  return /^[0-9]*$/.test(number)
}
//11、是否全是是中文
export function isChn(str) {
    let reg=/^[\u4E00-\u9FA5\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5 ]+$/;
    if (!reg.test(str)){
        // 不全是中文 ;
     return false ;
    } else {
      //全是中文;
      return true;
    }
}
//11、判断输入字符串是否为空或者全部都是空格
export function isNull( str ){
  if ( str == "" ) return true;
  var regu = "^[ ]+$";
  var re = new RegExp(regu);
  return re.test(str);
}
//11、判断空对象
export function isEmptyObject(obj){

    for(var key in obj) {
      return false;
    }
    return true;
}
// 判断是否为金额
export function isCurrency(value){
  return /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(value)
}

export default {
  isUserName,
  passwordStrength,
  isEmail,
  isMobil,
  isIDCard,
  isURL,
  isPassword,
  isPurePassword,
  isChatPassword,
  isNumber,
  isChn,
  isNull,
  isEmptyObject,
  isCurrency
}
