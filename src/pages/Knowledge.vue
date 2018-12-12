<template>
  <div class="knowledgeContent">
    <m-header title="wanAndroid" fixed bg></m-header>

  <div :style="'height:'+listHeight" style="overflow: hidden;background: #f5f5f5;padding-right: 5px; ">
    <scroll ref="scroll"
            :data="knowledgeList"
            :scrollbar="scrollbarObj"

            style="background: #f5f5f5;">
      <div v-if="knowledgeList.length" v-for="(item,index) in knowledgeList" :key="index">
        <div style="height: 50px;width: 100%;margin: 10px 5px 0;background: white">

          <div style="width: 100%">{{item.name}}</div>
        </div>
      </div>
    </scroll>

  </div>
  <mBottomBar></mBottomBar>
  </div>
</template>

<script>
  import mHeader from '../components/header'
  import mBottomBar from "../components/tabbar/BottomBar.vue";
  import scroll from '../components/scroll/components/scroll/scroll'
    export default {
        name: "knowledge",
      components:{
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
              // {
              //   children: [
              //     {
              //       children: [],
              //       courseId: 13,
              //       id: 60, // id会在查看该目录下所有文章时有用
              //       name: "Android Studio相关", // 子名称
              //       order: 1000,
              //       parentChapterId: 150,
              //       visible: 1
              //     },
              //   ],
              //   courseId: 13,
              //   id: 150,
              //   name: "开发环境", // 一级的名称
              //   order: 1,
              //   parentChapterId: 0,
              //   visible: 1
              // }
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
</style>
