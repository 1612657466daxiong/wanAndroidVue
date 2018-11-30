<template>
  <div class="swiper-box" ref="swiperBox">
    <swiper class="box-container" :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(item,index) in listImage" :key="index"  @mouseenter.native="stopPlay" @mouseleave.natvie="play">
          <div>
            <img class="swiper-image" :src="item.url" :alt="item.name" >

          </div>
        </swiper-slide>
      <div class="swiper-pagination swiper-pagination-fraction" slot="pagination" ref="swiperFraction">

    </div>
    </swiper>
    <span style="color: #0BAD47;font-size: 14px" >ceshi</span>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css';
  import {swiper,swiperSlide} from 'vue-awesome-swiper'
  export default {
    data() {
      return {
        listImage:[
          {name:"Android", url:require('../assets/login/Androidbackground.jpg')},
          {name:"Android",url:require('../assets/login/androidroot.jpg')},
          {name:"Android", url:require('../assets/login/Androidbackground.jpg')},
          {name:"Android",url:require('../assets/login/androidroot.jpg')},
          {name:"Android", url:require('../assets/login/Androidbackground.jpg')},
        ],
        swiperOption:{
          notNextTick:true,
          autoplay:true,
          loop:2000,
          autoplayDisableOnInteraction:true,
          direction:'horizontal',
          pagination:{
            el:'.swiper-pagination',
            type:'fraction'
          },
          observeParents:true
        }
      }
    },

    computed:{
      mySwiperInstance(){
        return this.$refs.mySwiper.swiper;
      }

    },
    mounted(){
      this.getLoginHeight();
    },
    methods:{
      slideChangeTransitionEnd(){

      },
      getLoginHeight(){
        this.$refs.swiperFraction.style.marginLeft = (document.documentElement.clientWidth-this.$refs.swiperFraction.style.width-100)+"px"
      },
      stopPlay(){
        this.mySwiperInstance.stopAutoplay();
      },
      play(){
        this.mySwiperInstance.startAutopaly();
      }
  },
    comments:{
      swiper,
      swiperSlide
    }
  }
</script>

<style>
  img{
    height: 200px;
    width: 100%;
    align-content: center;
  }
  .swiper-pagination{
    width: 100px;
    background: #770000;
  }
  .swiper_pagination_content{
    height: 50px;
    width: 100%;
    float: bottom;

  }
  .swiper-box{
    height: 200px;
  }
</style>
