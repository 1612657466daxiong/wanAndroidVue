<template>
    <a class="m-tabbar-item" :class="{'is-active':isActive}" @click="goToRouter">
        <span class="m-tabbar-item-icon" v-show="!isActive"><slot name="icon-normal"></slot></span>
        <span class="m-tabbar-item-icon" v-show="isActive"><slot name="icon-active"></slot></span>
        <span class="m-tabbar-item-text"><slot></slot></span>
    </a>
</template>
<script>
/**
 * m-tab-item
 * @desc 搭配 tabbar使用
 * @param id - 选中后的返回值，任意类型
 * @param isActive - 根据父组件的value和当前组件的id判断是否为选中状态
 * @param $parent.$emit('input',id) - 触发父组件的自定义事件
 * @param {slot} [icon-normal] - icon-默认图标
 * @param {slot} [icon-active] - icon-选中图标
 * @param {slot} - 文字
 *
 * @example
 * <m-tabbar-item id='tab1'>
 *       <img src="../assets/images/ic_tab_home_normal.png" alt="" slot="icon-normal">
 *       <img src="../assets/images/ic_tab_home_active.png" alt="" slot="icon-active">
 *       首页
 * </m-tabbar-item>
 */
    export default{
        props: {
        	id:{
        		type:String
        	},
        	isRouter:{
        		type:Boolean,
        		default:false
        	}
        },
        computed: {
           isActive(){
               if(this.$parent.tabbarValue===this.id){
                   return true;
               }
           }
        },
        methods:{
        	goToRouter(){
        	 //  if(this.id ==='index'){
            //   this.$parent.$emit('input',"")
            //   if(this.isRouter){
            //     this.$router.replace("")
            //   }
            //   return;
            // }
        		this.$parent.$emit('input',this.id)
        		if(this.isRouter){
        			this.$router.replace(this.id)
        		}
        	}
        }
    }
</script>
<style lang="less">
@import "../../assets/less/var.less";
.m-tabbar-item{
    flex: 1;
    text-align: center;
    .m-tabbar-item-icon{
        display: block;
        padding-top: 4px;

        img{
            width: 22px;
            height: 22px;
        }

    }
    .m-tabbar-item-text{
        display: block;
        font-size: 11px;
        color:#9F9F9F;
    }
    &.is-active{
        .m-tabbar-item-text{
            color:#f39c12;
        }
    }
}
</style>
