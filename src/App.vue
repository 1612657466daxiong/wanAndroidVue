<template>
  <div id="app">
    <!--<keep-alive>-->
      <!--<router-view v-if="$route.meta.keepAlive" name="app"></router-view>-->
    <!--</keep-alive>-->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
  mounted:function(){

  }
}
</script>

<style>
/*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
/*}*/
  #app{
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
  }
</style>
