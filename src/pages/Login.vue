<template>
  <div ref="loginBackground" class="background">
    <div style=" padding-top:20%;">

      <p class="slogan"></p>
    </div>
  </div>
</template>
<script>
  export default {
    mounted(){
      this.getLoginHeight();//获取设备高度设置界面高度
    },
    methods:{
      getLoginHeight(){
        this.$refs.loginBackground.style.height = document.documentElement.clientHeight+"px"
      }
    }
  }
</script>
<style>
  .background{
    background: url("../assets/login/bg_denglu.png") no-repeat;
    background-size: 100% 100%;
    text-align: center;
  }
</style>
