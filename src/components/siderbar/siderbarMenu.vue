<template>
  <div style="height: 100%;background: #f5f5f5">
    <div style="height: 100%;width: 100%;">
      <div class="menu-left" style=";height: 200px;width: 100%;">
      </div>
      <div style="display: flex;margin-top: 20px;padding-left: 10px;background: #e4e4e4;padding-top: 5px;padding-bottom: 5px" @click="login()">
        <img src="../../assets/logo.png" style="display: inline-block;height: 22px;width: 22px;"/>
        <p style="padding: 0;margin:0 0 0 10px">登录</p>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "siderbar-menu",
      methods:{
        login(){
          this.$router.push('/login')
        },
      }
    }
</script>

<style scoped>
  .menu-left{
    background: url("../../assets/login/header_bg1.png") no-repeat;
    background-size: cover;
  }
</style>
