<template>
<!-- app.vue 是一个项目的主页 -->
<!-- keep-alive 是用来缓存的，当主footer切换来回，为了优化性能 -->
 <keep-alive>
    <router-view/>
 </keep-alive>
</template>

