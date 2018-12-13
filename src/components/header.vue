<template>
  <div>
    <div class="statusBar"></div>
    <header class="m-header" :class="{'is-bg':bg,'is-fixed':fixed}">
      <div class="m-header-button is-left" v-show="leftShow">
        <!--<div v-if="showBackBtn" class="backBtn" @click.stop="goBack()" style="height: 100%; width: 50%;">-->
          <!--<img class="m-icon-img"  src="../assets/ic_bar_back_white.png"/>-->
        <!--</div>-->
        <div class="pacman"></div>
        <slot name="left"></slot>
      </div>
      <h5 class="m-header-title" v-text="title"></h5>
      <div class="m-header-button is-right">
        <slot name="right"></slot>
      </div>
    </header>
  </div>
</template>
<script>
  /**
   * @param title - header显示的标题
   * @param bg - header是否显示的标题背景
   * @param {slot} [left] - 左侧的图片内容和文字
   * @param {slot} [right] - 右侧的图片内容和文字
   * @exmaple
   * <m-header title="豆瓣app" :bg="true">
   *  			<a href="javascript:;" slot="left"><img class="m-icon-img" src="../../assets/images/ic_bar_back_white.png"/>返回</a>
   *  			<a href="javascript:;" slot="right">分享</a>
   * </m-header>
   */
  export default {
    props: {
      showBackBtn: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
        default: ''
      },
      bg: {
        type: Boolean,
        default: true
      },
      fixed: {
        type: Boolean,
        default: true
      },
      leftShow: {
        type: Boolean,
        default: true
      },
      overWriteBackAction: { // 是否重写返回方法
        type: Boolean,
        default: false
      }
    },
    methods: {
      goBack() {
        if (this.overWriteBackAction) {
          this.$emit('backBtnClicked')
        }else {
          this.$router.go(-1)
        }
      }
    }
  }

</script>
<style lang="less">
  /*导入颜色变量*/

  @import "../assets/less/var.less";
  .statusBar{
    height: 20px;
    background: @defaultColor;
    z-index: 999;
    position: relative;
  }
  .m-header {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 10px;
    background: #fff;
    color: @headerDefaultColor;
    position: relative;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: 2px;
      background: @headerBorderColor;
      transform: scaleY(0.5);
    }
    a {
      color: @headerDefaultColor;
    }
    .m-header-button {
      width: 30%;
      align-items: stretch;
      &.is-left {
        text-align: left;
      }
      &.is-right {
        text-align: right;
      }
      .m-icon-img {
        width: 20px;
        height: 20px;
        vertical-align: middle;
      }
      .margin-right-10 {
        margin-right: 10px;
      }
    }
    .m-header-title {
      flex: 1;
      text-align: center;
      font-size: 18px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    &.is-bg {
      background: @headerBg;
      color: #fff;
      a {
        color: #fff;
      }
      .m-header-title {
        color: #fff;
      }
      &:after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 0px;
        background: @headerBorderColor;
        transform: scaleY(0.5);
      }
    }
    &.is-fixed {
      position: relative;
      left: 0;
      right: 0;
      top: 0;
      z-index: 999;
    }
  }
  .pacman {
    width: 0;
    height: 0;
    border-right: 10px solid #f39c12;
    border-top: 10px solid #f39c12;
    border-left: 10px solid transparent;
    border-bottom: 10px solid #f39c12;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

</style>
