<template>
  <div id="main">
      <!-- 父组件给子组件传值 title ，子组件用prop 接受 -->
       <Header title="喵喵电影院中心" />
       <Cinema />
       <TabBar />
   </div>
</template>

<script>
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import Cinema from '@/components/Cinema'
export default {
 name:'cinema',
 components:{
    Header,
    TabBar,
    Cinema
}
}
</script>

<style>

</style>
