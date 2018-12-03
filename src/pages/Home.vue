<template>
  <div class="swiper-box" ref="swiperBox">
    <swiper class="swiper_container" :options="swiperOption" ref="mySwiper"  >
        <swiper-slide v-for="(item,index) in listImage" :key="index" >
          <div>
            <img class="swiper-image" :src="item.url" :alt="item.name" >

          </div>
        </swiper-slide>
      <div class="swiper-pagination swiper-pagination-fraction" slot="pagination" ref="swiperFraction">

    </div>
    </swiper>
    <span id="span_ceshi" style="color: #0BAD47;font-size: 14px" v-text="this.listImage[this.activeIndexSwiper].name" ></span>
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

        activeIndexSwiper:0,
        listImage:[
          {name:"Android1", url:require('../assets/login/Androidbackground.jpg')},
          {name:"Android2",url:require('../assets/login/androidroot.jpg')},
          {name:"Android3", url:require('../assets/login/Androidbackground.jpg')},
          {name:"Android4",url:require('../assets/login/androidroot.jpg')},
          {name:"Android5", url:require('../assets/login/Androidbackground.jpg')},
        ],
        swiperOption:{

          notNextTick:true,
          autoplay:true,
          grabCursor: true,
          autoHeight:true,
          setWrapperSize:true,
          loop:2000,
          autoplayDisableOnInteraction:true,
          observeParents:true,
          direction:'horizontal',
          pagination:{
            el:'.swiper-pagination',
            type:'fraction'
          },
          on:{

            // slideChangeTransitionEnd:()=>this.showText()
            // slideChangeTransitionEnd:()=>this.getIndexToCallBack(this.swiper,this.showText)
            // slideChangeTransitionEnd:()=>{
            //   console.log(this)
            //   // let swiper = this.$refs.mySwiper.swiper;
            //   let i =  this.$refs.mySwiper.swiper.activeIndex;
            //   this.activeIndexSwiper = i;
            //   // let flag =this.listImage[i];
            //   // console.error(flag.name)
            // },
            slideChangeTransitionEnd: function(){
              console.error("翻页")
              // let i = this.$refs.mySwiper.swiper.activeIndex;
              // console.error(i)
              console.log(this,this.activeIndex)
              let  i =this.activeIndex;
              console.error(i)
             
              // that.activeIndexSwiper = i;
              console.error(this.activeIndexSwiper)
            },

          }
        }
      }
    },

    computed:{
      swiper(){
        return this.$refs.mySwiper.swiper;
      },
    },
    mounted(){

      this.getLoginHeight();
      console.log('this is current swiper instance object', this.swiper)
      this.swiper.slideTo(4,1000,false)

    },
    methods:{
      getLoginHeight(){
        this.$refs.swiperFraction.style.marginLeft = (document.documentElement.clientWidth-this.$refs.swiperFraction.style.width-100)+"px"
      },
      showText(index){

        var  r =document.getElementById("span_ceshi");
        r.innerText=this.listImage[index].name
      },
      getIndexToCallBack(index,callback){
        console.error(index)
        callback(index.activeIndex)
      }

  },

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
