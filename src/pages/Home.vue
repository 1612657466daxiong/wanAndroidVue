<template>
  <div class="swiper-box" ref="swiperBox"  >
    <swiper class="swiper_container" v-if="listImage.length>0" :options="swiperOption" ref="mySwiper"  >
        <swiper-slide v-for="(item,index) in listImage" :key="index">
          <div>
            <img class="swiper-image" :src="item.imagePath" :alt="item.title" >
          </div>
        </swiper-slide>
      <!--<div class="swiper-pagination swiper-pagination-fraction" slot="pagination" ref="swiperFraction"></div>-->
    </swiper>
    <div ref="bottom_text" id="span_ceshi" class="float_span"  >
      <!--<span style="color:white; position: absolute;bottom: 0px;right: 0px" id="span_count" ></span>-->
    </div>
  </div>

</template>

<script>
  import {swiper,swiperSlide} from 'vue-awesome-swiper'
  export default {
    comments:{
      swiper,
      swiperSlide
    },

    data() {
      return {
        listImage:[
          // {title:"Android1", imagePath:require('../assets/login/Androidbackground.jpg')},
          // {title:"Android2",imagePath:require('../assets/login/androidroot.jpg')},
          // {title:"Android3", imagePath:require('../assets/login/Androidbackground.jpg')},
          // {title:"Android4",imagePath:require('../assets/login/androidroot.jpg')},
          // {title:"Android5", imagePath:require('../assets/login/Androidbackground.jpg')},
        ],
        swiperOption:{

          notNextTick:true,
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
    },
    mounted(){

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
      getBanner(){
        let that=this;
        this.$http.get('/banner/json').then(function (res) {
         that.listImage = res.data.data;
        })
      }
  },
  watch:{


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
    z-index: 9999;
  }
  .swiper_pagination_content{
    height: 50px;
    width: 100%;
    float: bottom;

  }
  .swiper-box{
    clear: both;
    height: 200px;
    position: relative;
  }
  .float_span{
    width: 100%;
    height: 30px;
    background: rgba(18, 0, 0, 0.2);
    font-size: 14px;
    color: white;
    position: absolute;
    padding-left: 20px;
    margin-top: -30px;
    z-index: 999;
    vertical-align: middle;
  }
</style>
