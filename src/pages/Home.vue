<template>
  <div class="swiper-box"  >
    <m-header title="wanAndroid" fixed bg></m-header>
    <swiper class="swiper_container" v-if="listImage.length>0" :options="swiperOption" ref="mySwiper"  >
        <swiper-slide v-for="(item,index) in listImage" :key="index">
          <div >
            <img class="swiper-image" :src="item.imagePath" :alt="item.title" vspace="0px">
          </div>
        </swiper-slide>
      <!--<div class="swiper-pagination swiper-pagination-fraction" slot="pagination" ref="swiperFraction"></div>-->
    </swiper>
    <div ref="bottom_text" v-if="listImage && listImage.length>0" class="float_span">
      <span  id="span_ceshi" style="color:white;vertical-align: center;position: absolute;bottom: 5px;margin-left: 20px" ></span>
    </div>
    <div :style="'height:'+listHeight" style="overflow: hidden;margin: 0px;width: 100%">
      <scroll ref="scroll"
              :data="homeArticleList"
              :scrollbar="scrollbarObj"
              :pullDownRefresh="pullDownRefreshObj"
              :pullUpLoad="pullUpLoadObj"
              @pullingDown="onPullingDown"
              @pullingUp="onPullingUp"
              style="background: #ffffff;">
        <div v-if="homeArticleList.length" v-for="(item,index) in homeArticleList" :key="index">
            <div class="homeItemBg"
                 style="padding: 4px;min-height: 100px;border-radius: 5px;margin-top: 10px;margin-left:5px;margin-right:5px;display: block;background: #f5f5f5" >
              <div style="width: 100%;display: flex;padding: 5px 5px 5px 5px;">
                <div style="height: 10px;width: 10px;border-radius: 5px;background: darkcyan;margin: auto 0" ></div>
                <p style="padding: 0;margin: 0 0 0 5px;font-size: 14px;font-family: 'KaiTi';color: #666666">{{item.author}}</p>
                <p style="display: inline-block;position: absolute;right: 5px;margin: auto 0;color: darkseagreen;font-size: 14px;margin-right: 5px">{{item.chapterName}}/{{item.superChapterName}}</p>
              </div>
              <p style="text-align: center;text-overflow:ellipsis;overflow: hidden;white-space: nowrap;padding: 0 10px;color: #333333;">{{item.title}}</p>
              <div style="width: 100%;">
                <div id="heart" style="margin-left: 10px;" v-if="item.collect" @click="itemCollectArticle(item)"></div>
                <div id="heart1" style="margin-left: 10px;" v-if="!item.collect" @click="itemCollectArticle(item)"></div>
                <p style="position: absolute;right: 5px;padding: 0;margin: 0 5px 0 0;font-size: 14px;color: #666666">{{item.niceDate}}</p>
              </div>
            </div>
        </div>
      </scroll>

    </div>
    <mBottomBar></mBottomBar>
  </div>

</template>

<script>
  import {swiper,swiperSlide} from 'vue-awesome-swiper'
   import scroll from '../components/scroll/components/scroll/scroll'
   import mHeader from '../components/header'
  import mBottomBar from "../components/tabbar/BottomBar.vue";
  export default {
    components: {
      mHeader,
      swiper,
      swiperSlide,
      scroll,
      mBottomBar
    },


    data() {
      return {
        //Scroll数据
        scrollbar: true,
        scrollbarFade: true,
        pullDownRefresh: true,
        pullDownRefreshThreshold: 90,
        pullDownRefreshStop: 50,
        pullUpLoad: true,
        pullUpLoadThreshold: -50,

        currentPage:0,

        listImage:[],
        homeArticleList:[],
        swiperOption:{
          notNextTick:true,
          effect : 'coverflow',
          autoplay:true,
          grabCursor: true,
          autoHeight:true,
          setWrapperSize:true,
          loop:true,
          autoplayDisableOnInteraction:true,
          observeParents:true,
          direction:'horizontal',
          pagination:{
            el:'.swiper-pagination',
            type:'fraction'
          },
          on:{
            slideChangeTransitionEnd: function(){
              let  i =this.activeIndex;
              if(i>window._app.listImage.length){
                i = i%(window._app.listImage.length)-1
              }else {
                i= i-1
              }

              var  r =document.getElementById("span_ceshi");
              r.innerText=window._app.listImage[i].title
              // var b = document.getElementById("span_count");
              // b.innerText=i+'/'+ window._app.listImage.length
            },

          }
        }
      }
    },

    computed:{
      // swiper(){
      //   return this.$refs.mySwiper.swiper;
      // },
      listHeight: function() {
        return (document.documentElement.clientHeight-200-50-64) + 'px;'
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
      this.getHomeData();
      this.onPullingDown();

      // this.getLoginHeight();
      // this.swiper.slideTo(1,1000,false)

    },
    created(){
      window._app = this;
      this.getBanner();
    },
    methods:{
      // getLoginHeight(){
      //   // this.$refs.swiperFraction.style.marginLeft = (document.documentElement.clientWidth-this.$refs.swiperFraction.style.width-100)+"px"
      // },
      itemCollectArticle(item){
        if(item.collect){
           this.cancelCollect(item);
        }else{
          this.quitCollect(item);
        }
      },
      cancelCollect(item){
          this.$http.post(`/lg/uncollect_originId/${item.id}/json`).then(function(res){
            if(res.data.errorCode === 0)
            item.collect =false;
          })
      },
      quitCollect(item){
        let that = this;
        this.$http.post(`/lg/collect/${item.id}/json`).then(function(res){
          if(res.data.errorCode === 0){
            item.collect =true;
          }else if(res.data.errorCode === -1001){
            that.$Toast("请先登录！")
          }
        })
      },
      getBanner(){
        let that=this;
        this.$http.get('/banner/json').then(function (res) {
         that.listImage = res.data.data;
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
          this.currentPage = 0
          this.getHomeData()
        }, 500)
      },
      /**
       * 上拉刷新
       */
      onPullingUp() {
        console.log('pulling up and load data')
        setTimeout(() => {
          this.getHomeData()
        }, 500)
      },
      getHomeData(){
        let that = this;
        this.$http.get(`/article/list/${this.currentPage}/json`).then(function (res) {
          console.log(res.data);
          if (that.currentPage === 0){
            if (res.data.data.datas){
              that.homeArticleList = res.data.data.datas;
            }else {
              that.homeArticleList =[]
            }
          }else {
            that.homeArticleList = that.homeArticleList.concat(res.data.data.datas)
          }
         that.currentPage+=1
          that.$Toast.Dismiss()
        }).catch(data=>{
          console.log('请求出错，'+data)
          that.$Toast.Dismiss()
        })
      }
  },
  watch:{

    /**
     * Scroll配置
     */
    scrollbarObj: {
      handler() {
        this.rebuildScroll()
      },
      deep: true
    },
    pullDownRefreshObj: {
      handler(val) {
        const scroll = this.$refs.scroll.scroll
        if (val) {
          scroll.openPullDown()
        } else {
          scroll.closePullDown()
        }
      },
      deep: true
    },
    pullUpLoadObj: {
      handler(val) {
        const scroll = this.$refs.scroll.scroll
        if (val) {
          scroll.openPullUp()
        } else {
          scroll.closePullUp()
        }
      },
      deep: true
    }
  }
  }
</script>

<style>
  .swiper-image{
    height: 200px;
    width: 100%;
    align-content: center;
    background-size: 100% 100%;

    background-repeat: no-repeat;
  }
  .swiper_pagination_content{
    height: 50px;
    width: 100%;
    float: bottom;

  }
  .swiper-box{
    clear: both;
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
  }
  .float_span{
    width: 100%;
    height: 30px;
    background: rgba(18, 0, 0, 0.2);
    font-size: 14px;
    color: white;
    position: absolute;
    margin-top: -30px;
    z-index: 999;
    vertical-align: middle;
  }
  #heart {
    position: relative;

  }



  #heart:before,#heart:after {
    content: "";
    width: 10px;
    height: 18px;
    position: absolute;
    background: #ff3300;
    left: 10px;
    top: 0;
    -webkit-border-radius: 45px 45px 0 0;
    -moz-border-radius: 45px 45px 0 0;
    border-radius: 45px 45px 0 0;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-transform-origin: 0 100%;
    -moz-transform-origin: 0 100%;
    -ms-transform-origin: 0 100%;
    -o-transform-origin: 0 100%;
    transform-origin: 0 100%;
  }



  #heart:after {
    left: 0;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-transform-origin: 100% 100%;
    -moz-transform-origin: 100% 100%;
    -ms-transform-origin: 100% 100%;
    -o-transform-origin: 100% 100%;
    transform-origin: 100% 100%;
  }
  #heart1 {
    position: relative;

  }



  #heart1:before,#heart1:after {
    content: "";
    width: 10px;
    height: 18px;
    position: absolute;
    background: #ffffff;
    left: 10px;
    top: 0;
    -webkit-border-radius: 45px 45px 0 0;
    -moz-border-radius: 45px 45px 0 0;
    border-radius: 45px 45px 0 0;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-transform-origin: 0 100%;
    -moz-transform-origin: 0 100%;
    -ms-transform-origin: 0 100%;
    -o-transform-origin: 0 100%;
    transform-origin: 0 100%;
  }



  #heart1:after {
    left: 0;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-transform-origin: 100% 100%;
    -moz-transform-origin: 100% 100%;
    -ms-transform-origin: 100% 100%;
    -o-transform-origin: 100% 100%;
    transform-origin: 100% 100%;
  }
  .homeItemBg:hover{
    background: bisque;

  }

</style>
