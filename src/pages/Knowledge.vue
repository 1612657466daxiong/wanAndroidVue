<template>
  <siderbar>
    <div class="knowledgeContent" slot="content">
      <m-header v-on:onMenuLeftClick="onMenuleft()" title="知识体系" fixed bg ></m-header>

      <div :style="'height:'+listHeight" style="overflow: hidden;background: #f5f5f5;padding-right: 5px; ">
        <scroll ref="scroll"

                :data="knowledgeList"
                :scrollbar="scrollbarObj"
                style="background: #f5f5f5;">
          <div v-if="knowledgeList.length" v-for="(item,index) in knowledgeList" :key="index">
            <div style="width: 100%;margin: 10px 5px 0;background: white;padding: 10px">

              <div style="width: 100%;font-size: 16px;font-weight: bold">{{item.name}}</div>
              <div style="margin: 0 0 0 0;overflow: hidden">
                <ul class="childrenListView" style="content: none;list-style-type: none;padding: 0;display: inline-flex;flex-flow: row;flex-wrap: wrap;overflow: hidden" >
                  <li v-for="child in item.children" v-if="item.children && item.children.length>0" style="display:block;margin-top: 3px;margin-left: 5px;padding: 3px;border-radius: 3px;height: min-content;width: min-content;overflow: hidden;word-wrap: break-word"
                      :style="{'background':getRundomColor()}">
                    <div style="display: inline-flex;text-align: start;overflow: hidden;white-space: nowrap; ">{{child.name}}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </scroll>

      </div>
      <mBottomBar style="position: absolute;bottom: 0;"></mBottomBar>
    </div>
    <!--<div slot="menu" style="height: 100%;background: #f5f5f5">-->
      <!--<div style="height: 100%;width: 100%;">-->
        <!--<div class="menu-left" style=";height: 200px;width: 100%;">-->
        <!--</div>-->
        <!--<div style="display: flex;margin-top: 20px;padding-left: 10px;background: #e4e4e4;padding-top: 5px;padding-bottom: 5px" @click="login()">-->
          <!--<img src="../assets/logo.png" style="display: inline-block;height: 22px;width: 22px;"/>-->
          <!--<p style="padding: 0;margin:0 0 0 10px">登录</p>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <sidermenu slot="menu"> </sidermenu>
  </siderbar>

</template>

<script>
  import mHeader from '../components/header'
  import mBottomBar from "../components/tabbar/BottomBar.vue";
  import scroll from '../components/scroll/components/scroll/scroll'
  import siderbar from '../components/siderbar/siderbar'
  import sidermenu from '../components/siderbar/siderbarMenu'
    export default {
        name: "knowledge",
      components:{
        siderbar,
        sidermenu,
        mHeader,
        scroll,
        mBottomBar
      },
      data(){
          return{
            //Scroll数据
            scrollbar: true,
            scrollbarFade: true,
            pullDownRefresh: true,
            pullDownRefreshThreshold: 90,
            pullDownRefreshStop: 50,
            pullUpLoad: true,
            pullUpLoadThreshold: -50,

            currentPage:1,

            knowledgeList:[
            ],
            colorArray:[
              '#ffff66',
              '#ffccff',
              '#ff9900',
              '#ff3300',
              '#ccff66',
              '#cc66cc',
              '#99ccff',
              '#66cc00',
              '#9999ff',
              '#66ccff',
              '#00cc66',
              '#ff0000',
              '#996600',
            ]
          }
      },
      computed:{
        listHeight: function() {
          return (document.documentElement.clientHeight -49-64) + 'px;'
        },
        /**
         * Scroll配置
         */
        scrollbarObj: function () {
          return this.scrollbar ? {fade: this.scrollbarFade} : false
        },
        pullDownRefreshObj: function () {
          return this.pullDownRefresh ? {
            threshold: parseInt(this.pullDownRefreshThreshold),
            stop: parseInt(this.pullDownRefreshStop)
          } : false
        },
        pullUpLoadObj: function () {
          return this.pullUpLoad ? {
            threshold: parseInt(this.pullUpLoadThreshold),
            txt: {more:"加载更多", noMore: "没有更多数据了"}
          } : false
        }
      },
      mounted(){
        this.getKnowledgeData();
      },
      methods:{
        onMenuleft(){

        },
          getRundomColor(){
            let varIndex = Math.floor(Math.random()*this.colorArray.length);
            return this.colorArray[varIndex]
          },
          getKnowledgeData(){
            let that=this;
            this.$http.get('/tree/json').then(function (res) {
              that.knowledgeList = res.data.data;
              console.log(res.data.data)
            })
          },
        /**
         * 重置Scroll
         */
        rebuildScroll() {
          Vue.nextTick(() => {
            this.$refs.scroll.destroy()
            this.$refs.scroll.initScroll()
          })
        },
        /**
         * 下拉刷新
         */
        onPullingDown() {
          console.log('pulling down and load data')
          setTimeout(() => {
            this.currentPage = 1
            // this.getHomeData()
          }, 500)
        },
        /**
         * 上拉刷新
         */
        onPullingUp() {
          console.log('pulling up and load data')
          setTimeout(() => {
            // this.getHomeData()
          }, 500)
        },
      }
    }
</script>

<style scoped>
  .knowledgeContent{
    height: 200px;
  }
  .childrenListView :after{
    content: "";
    display: table;
    clear: both;
  }
</style>
