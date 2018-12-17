<template>
    <div class="sidebar">
        <div class="sidebar-menu"
             :class="transitionClass"
             :style="wrapStyle"
        style="background: #f5f5f5">
          <slot name="menu">
          </slot>
        </div>
        <div class="sidebar-content"
             :class="transitionClass"
             :style="contentStyle"
             style="height: 100%;background: #f5f5f5"
             @touchstart="touchstart"
             @touchmove="touchmove"
             @touchend="touchend">
          <slot name="content">
          </slot>

        </div>
    </div>

</template>

<script>
    export default {
        name: "siderbar",
      components:{
      },
      props: {//宽度
        width: {
          type: String,
          default: '250'
        },
        ratio: {//移动的比例
          type: Number,
          default: 2
        }
      },
      data(){
        return{
          isMoving:false,
          transitionClass: '',
          startPoint: {
            X: 0,
            y: 0
          },
          oldPoint: {
            x: 0,
            y: 0
          },
          move: {
            x: 0,
            y: 0
          }
        }
      },
      computed: {
        wrapStyle () {
          let style = {
            width: `${this.width}px`,
            left: `-${this.width }px`,
            transform: `translate3d(${this.move.x }px, 0px, 0px) `
          }
          return style
        },
        contentStyle () {
          let style = {
            transform: `translate3d(${this.move.x}px, 0px, 0px) scale(${((this.width-this.move.x) /this.width)<=0.85?0.85:((this.width-this.move.x) /this.width)})`,
          }
          return style
        }
      },
      methods: {

        touchstart (e) {
          this.oldPoint.x = e.touches[0].pageX
          this.oldPoint.y = e.touches[0].pageY
          this.startPoint.x = this.move.x
          this.startPoint.y = this.move.y
          this.setTransition()
        },
        touchmove (e) {
          let newPoint = {
            x: e.touches[0].pageX,
            y: e.touches[0].pageY
          }
          let moveX = newPoint.x - this.oldPoint.x
          let moveY = newPoint.y - this.oldPoint.y
          if (Math.abs(moveX) < Math.abs(moveY)) return false
          e.preventDefault()
          this.isMoving = true
          moveX = this.startPoint.x * 1 + moveX * 1
          moveY = this.startPoint.y * 1 + moveY * 1
          if (moveX >= this.width) {
            this.move.x = this.width
          } else if (moveX <= 0) {
            this.move.x = 0
          } else {
            this.move.x = moveX
          }
        },
        touchend (e) {
          this.setTransition(true)
          this.isMoving = false
          this.move.x = (this.move.x > this.width / this.ratio) ? this.width : 0
        },
        switch () {
          this.setTransition(true)
          this.move.x = (this.move.x === 0) ? this.width : 0
        },
        setTransition (isTransition = false) {
          this.transitionClass = isTransition ? 'r-slide-menu-transition' : ''
        }
      }
    }
</script>

<style scoped lang="scss">
  @mixin one-screen{
    position: absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
    overflow: hidden;
  }


  .sidebar-menu{
    @include one-screen;
    &-wrap, &-content{
      @include one-screen;
    }
    &-transition{
      -webkit-transition: transform .3s;
      transition: transform .3s;
    }
  }
  .sidebar{
    height: 100%;
    background: -webkit-linear-gradient(
    left,#3399cc,#33ccff,#e4e4e4
    );
  }
  /*.sidebar-content{*/
    /*animation: out.5s;*/
  /*}*/
  /*@keyframes out {*/
    /*0% {*/
      /*transform: scale(1);*/
    /*}*/
    /*50% {*/
      /*transform: scale(0.8);*/
    /*}*/
    /*100% {*/
      /*transform: scale(0.6);*/
    /*}*/
  /*}*/
</style>
