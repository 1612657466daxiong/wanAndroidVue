<template>
  <div>
    <Menu mode="horizontal" :active-name="selectIndex" :style="'display: flex; justify-content: space-around; align-items: center; margin-bottom: 2px;'+mStyle">
      <MenuItem name="1" v-for="(item,$index) in dataList" :key="item.index" @click.native="onSelected(item)" :style="'width:'+ itemPercent+'; text-align: center;'">
        <div :class="{'subActive':item.index === selectIndex,'unActiveStyle': item.index !== selectIndex}" class="ivu-tabs-item">{{item.value}}</div>
      </MenuItem>
    </Menu>
  </div>
</template>
<script>
  export default {
    model:{
      prop:'defaultIndex',
      event:'backValue'
    },
    props:{
      disabled:{
        type:Boolean,
        default: false
      },
      defaultIndex: '', // 选中下标
      /**
       * 数据源
       */
      dataList:{
        type:Array,
        default:[]
      },
      /**
       * 自定义样式
       */
      mStyle:{
        type:String,
        default: 'height: 40px;'
      },
      /**
       * item在容器的宽度百分比
       */
      itemPercent:{
        type:String,
        default:'50%'
      }
    },
    data(){
      return{
      }
    },
    methods: {
      /**
       * 选中item事件
       */
      onSelected:function (item) {
        if(this.disabled){
          return false
        }
        this.selectIndex = item.index
        this.$emit('onSelected',item)
      }
    },
    computed: {
      selectIndex: {
        // 动态计算currentValue的值
        get: function () {
          return this.defaultIndex; // 将props中的value赋值给currentValue
        },
        set: function (val) {
          this.$emit('backValue', val); // 通过$emit触发父组件
        }
      }
    }
  }
</script>

<style scoped lang="less" >
  .ivu-tabs-item{
    font-size: 11px;
    width: 100%;
    line-height: 40px;
    user-select: none;
    padding:0 2px;
    white-space: nowrap;
  }
  .ivu-menu-horizontal.ivu-menu-light:after {
    display: none;
  }
  .ivu-menu-horizontal .ivu-menu-item {
    padding: 0;
  }
  .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active,
  .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover,
  .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu-active,
  .ivu-menu-light.ivu-menu-horizontal .ivu-menu-submenu:hover{
    border-bottom: 2px solid transparent;/*no*/
    color: #666666;
  }
  .subActive{
    color: #0BAD47;
    border-bottom: 2px solid #0BAD47;/*no*/
  }
  .unActiveStyle{
    border-bottom: none;
  }

  .classify .move-enter-active, .food .move-leave-active {
    transition: all 0.3s linear;
    transform: translate3d(0, 0, 0);
  }
  .classify .move-enter, .food .move-leave {
    transform: translate3d(0, -100%, 0);
  }
</style>
