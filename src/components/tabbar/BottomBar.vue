<template>
    <div>
      <m-tabbar v-model="select">
        <m-tabbar-item id='index' isRouter>
          <img src="../../assets/bottom/icon_home_pager_not_selected.png" alt="" slot="icon-normal">
          <img src="../../assets/bottom/icon_home_pager_selected.png" alt="" slot="icon-active">
          首页
        </m-tabbar-item>
        <m-tabbar-item id='knowledge' isRouter>
          <img src="../../assets/bottom/icon_knowledge_hierarchy_not_selected.png" alt="" slot="icon-normal">
          <img src="../../assets/bottom/icon_knowledge_hierarchy_selected.png" alt="" slot="icon-active">
        知识体系
        </m-tabbar-item>
        <m-tabbar-item id='navigation' isRouter>
          <img src="../../assets/bottom/icon_navigation_not_selected.png" alt="" slot="icon-normal">
          <img src="../../assets/bottom/icon_navigation_selected.png" alt="" slot="icon-active">
        导航
        </m-tabbar-item>
        <m-tabbar-item id='project' isRouter>
          <img src="../../assets/bottom/icon_project_not_selected.png" alt="" slot="icon-normal">
          <img src="../../assets/bottom/icon_project_selected.png" alt="" slot="icon-active">
         项目
        </m-tabbar-item>
        <!--<m-tabbar-item id='MArticleList' isRouter>-->
          <!--<img src="../../assets/img/appbar/icon_grzx_default.png" alt="" slot="icon-normal">-->
          <!--<img src="../../assets/img/appbar/icon_grzx_selected.png" alt="" slot="icon-active">-->
        <!--我的-->
        <!--</m-tabbar-item>-->
      </m-tabbar>
    </div>
</template>
<script type="text/ecmascript-6">
  import mTabbar from './tabbar'
  import mTabbarItem from './tabbar-item'
    export default {
      name: 'ClientApp',
      components:{
        mTabbar,
        mTabbarItem
      },
      data() {
        return {
          select:"index"
        }
      }
    }
</script>
