<template>
  <div ref="loginBackground" class="background">
    <div style=" padding-top:20%;">
      <h2 class="websiteName">WanAndroid</h2>
      <p class="slogan">洋参-Android开发社区</p>
    </div>
    <div>
      <input class="accountClass" maxlength="30" type="text" v-model="loginFormInline.username" placeholder="请输入账号"/>
      <div class="passwordContent">
        <input class="passwordClass" :type="viewPassword" v-model="loginFormInline.password" placeholder="请输入密码" maxlength="16">
        <img v-if="isShowEye" :src="theEye" class="passwordEye" @click="handleEyeAvailable"/>
      </div>
    </div>
    <div style="display: flex;justify-content: space-between;width: 300px;margin: 15px auto 0 auto;">
      <a style="color: #999999;font-size: 14px">没账号<span style="color: #0BAD47;font-size: 14px" @click="goRegister">去注册一个</span></a>
      <span style="color: #0BAD47;font-size: 14px" @click="goForgetPassword">忘记密码</span>
    </div>
    <div class="loginButton">
      <button v-if="!loginBtnAvailable" class="loginNoBtn">登录</button>
      <button v-if="loginBtnAvailable"class="loginBtn" @click="handleSubmit">登录</button>
    </div>
    <div style="width: 60px;height: 60px;position: absolute;top: 20px;left: 10px" @click="goback">
      <img style="width: 30px;height: 35px;float: left" src="../assets/login/ic_bar_back_white.png">
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        isShowEye:false,
        viewPassword:'password',
        theEye:'../assets/icon_mima_xianshi.png',
        loginBtnAvailable:false,
        loginFormInline:{
          username: "",
          id:"",
          password:''
        }
      }
    },
    mounted(){
      this.getLoginHeight();//获取设备高度设置界面高度
    },
    methods:{
      getLoginHeight(){
        this.$refs.loginBackground.style.height = document.documentElement.clientHeight+"px"
      },
      goback(){
        this.$router.go(-1)
      },
      goForgetPassword(){
        this.$router.push('/')
      },
      goRegister(){
        this.$router.push('/')//注册页面跳转
      },
      handleEyeAvailable(){
        this.eyeIsAble = !(this.eyeIsAble);
        if(this.eyeIsAble===true){//密码明文
          this.theEye = require('../assets/login/icon_mima_bxs.png');
          /*this.eyeStyle = 'eye';*/
          this.viewPassword = 'text';
        }
        else{//密码密文
          this.theEye = require('../assets/login/icon_mima_xianshi.png');
          this.viewPassword = 'password';
        }
      },
      handleSubmit(){
        let that = this;
        this.$Toast.loading(that.$t('message.mobileLoginModalText.loginInText'))
        let sendInfo = {
          account:this.loginFormInline.user,
          password:this.loginFormInline.password,
          accountType:1
        };
        this.encryption(sendInfo).then((sendInfo)=>{
          that.$http.post('/auth/login',sendInfo).then((response)=>{
            if(response.data.code===200){
              let UserInfo = response.data.data;
              UserInfo.account = sendInfo.account;
              UserInfo.accountType = sendInfo.accountType;
              UserInfo = JSON.stringify(UserInfo);
              window.sessionStorage.setItem('UserInfo',UserInfo);
              that.getPersonalInfo();
              try {
                // window.webkit.messageHandlers.loginSuccess.postMessage(UserInfo)
              } catch (e) {
                // window.WebViewJavascriptBridge.callHandler('loginSuccess', UserInfo)
              }finally {
                that.loginResult(that.$t('message.mobileLoginModalText.loginSuccess'),1)
              }
            }else {
              let msg = that.Regex.isNull(response.data.message)?that.$t('message.mobileLoginModalText.loginFailure'):response.data.message
              that.loginResult(msg,0)
            }
          }).catch( (error) =>{
            console.log(error);
            that.loginResult(that.$t('message.mobileLoginModalText.loginFailure'),2)
          });
        })
      },
      getPersonalInfo(){
        this.$http.get('/personal/info').then((response) => {
          let personalInfo = {};
          if(response.data.code===200){
            let totalInfo = response.data.data;
            if(totalInfo){
              personalInfo = {
                name:totalInfo.nickName||'',
                avatar:totalInfo.avatar||'',
                sex:totalInfo.sex||4,
                describe:totalInfo.introduction||'',
                accountType:totalInfo.accountType,
                account:totalInfo.account
              }
            }
          }
          window.sessionStorage.setItem('personalInfo', JSON.stringify(personalInfo));
        }).catch((error) => {
          console.log(error);
        });
      },

    }
  }
</script>
<style>
  .background{
    background: url("../assets/login/Androidbackground.jpg") no-repeat;
    background-size: 100% 100%;
    text-align: center;
  }
  .websiteName{
    cursor:pointer;/*no*/
    font-size:28px ;/*no*/
    color:rgba(11,173,71,1);/*no*/
    line-height:29px ;/*no*/
    font-weight: bold;/*no*/
    font-family:Ebrima-Bold;/*no*/
  }
  .slogan{
    margin-top:9px ;/*no*/
    margin-bottom:26px ;/*no*/
    font-size:12px ;/*no*/
    line-height: 12px ;/*no*/
    height:12px ;/*no*/
    color:rgba(211,211,211,1);/*no*/
    font-family:MicrosoftYaHei;/*no*/
  }
  .accountClass{
    width:300px;
    height:48px;
    border-radius:6px;
    background: transparent;
    border: 1px solid rgba(255,255,255,0.3);
    padding: 12px;
    color: rgba(255,255,255,1);
    font-size: 15px;
    outline:none;
    font-family:MicrosoftYaHei;/*no*/
  }
  .passwordContent{
    width:300px;
    height:48px;
    background:transparent;
    border-radius:6px;
    border: 1px solid rgba(255,255,255,0.3);
    padding: 12px;
    margin: 30px auto 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .passwordClass{
    width:200px;
    height:auto;
    background:transparent;
    color: rgba(255,255,255,1);
    font-size: 15px;
    outline:none;
    border: none;
  }
  .passwordEye{
    width: 16px;
    height: 11px
  }
</style>
