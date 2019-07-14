<template>
   <div id="main">
       <Header  title="喵喵电影"/>
       <div id="content">
           <div class="movie_menu">
				<router-link tag="div" to='/movie/city' class="city_name">
					<span> {{ $store.state.city.nm}}</span><i class="iconfont icon-lower-triangle"></i>
				</router-link>
				<div class="hot_swtich">
					<router-link tag="div" to='/movie/nowPlaying' class="hot_item active">正在热映</router-link>
					<router-link tag="div" to='/movie/comingSoon' class="hot_item">即将上映</router-link>
				</div>
				<router-link tag="div" to='/movie/search' class="search_entry">
					<i class="iconfont icon-sousuo"></i>
				</router-link>
			</div>
            <keep-alive>
               <router-view/>
            </keep-alive>    
       </div>
       <TabBar />
        <router-view name="detail"/>
   </div>
</template>

<script>

import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import { messageBox } from "@/components/js";

export default {
name:'movie',
components:{
    Header,
    TabBar,
    
},
mounted() {
    // 调用城市定位的location
    this.axios.get("/api/getLocation").then(res => {
      // console.log(res)
      // 判断是否调用成功
      if (res.status === 200) {
        // console.log(res.data.data.nm);
        // 做出一个判断，当前城市与选择城市一致的时候。不用弹窗
        if (this.$store.state.city.id == res.data.data.id) return;
        // 调用messageBox()函数
        // 为了提高体验度，加一个定时器
        setTimeout(() => {
          messageBox({
            title: "定位",
            content: res.data.data.nm,
            cancel: "取消",
            ok: "切换定位",
            // 取消事件暂时不用处理
            // handleCancel() {
            //   console.log(1);
            // },
            handleOk() {
              // console.log(2);
              // 将获取到的数据本地存储
              window.localStorage.setItem("city_nm", res.data.data.nm);
              window.localStorage.setItem("city_id", res.data.data.id);
              // 刷新本页
              window.location.reload();
            }
          });
        }, 1000);
      }
    });
  }
}
</script>

<style scoped>
#content{ flex:1; overflow:auto; margin-bottom: 50px; position: relative; display: flex; flex-direction:column;}
#content .movie_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-between; align-items:center; background:white; z-index:10;}
.movie_menu .city_name{ margin-left: 20px; height:100%; line-height: 45px;}
.movie_menu .city_name.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .city_name.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .hot_swtich{ display: flex; height:100%; line-height: 45px;}
.movie_menu .hot_item{ font-size: 15px; color:#666; width:80px; text-align:center; margin:0 12px; font-weight:700;}
/* .movie_menu .hot_item.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;} */
.movie_menu .hot_item.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry{ margin-right:20px; height:100%; line-height: 45px;}
.movie_menu .search_entry.active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry.router-link-active{ color: #ef4238; border-bottom: 2px #ef4238 solid;}
.movie_menu .search_entry i{  font-size:24px; color:red;}
</style>
