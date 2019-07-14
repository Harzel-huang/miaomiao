<template>
  <div class="movie_body" ref="movie_body">
    <ul>
      <li class="msgshowDown">{{msgshowDown}}</li>
      <li v-for="item in movieList" :key="item.id">
        <div class="pic_show">
          <img :src="item.img | setWH('128.180')" @click="handleClick(item.id)" />
        </div>
        <div class="info_list">
          <h2>{{item.nm}}</h2>
          <p>
            观众评
            <span class="grade">{{item.sc}}</span>
          </p>
          <p>主演: {{item.star}}</p>
          <p>{{item.showInfo}}</p>
        </div>
        <div class="btn_mall">购票</div>
      </li>
    </ul>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
export default {
  name: "nowpalyComponent",
  data() {
    return {
      movieList: [],
      msgshowDown: ""
    };
  },
  // 页面加载获取数据
  // 由于使用了 keep-alive
  activated() {
    // console.log("ok");
    // 获取城市id
    let cityId = this.$store.state.city.id;
    // 需求就是没有更改城市的时候，不会重新发起请求
    if (this.cityId === cityId) return;
    this.isLoading = true;
    this.axios.get("/api/movieOnInfoList?cityId=" + cityId).then(res => {
      // console.log(res.status)
      // 作出判断数据是否获取成功
      if (res.status === 200) {
        this.movieList = res.data.data.movieList;
        this.isLoading = false;
        this.cityId = cityId;
      }
	});
  },
  methods: {
    handleClick(id) {
      // console.log(123);
      this.$router.push("/movie/detail/" + id);
    }
  }
};
</script>

<style scoped>
#content .movie_body {
  flex: 1;
  overflow: auto;
}
#msgshowDown {
  margin: 0px;
  padding: 0px;
}
.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
}
.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}
.movie_body .pic_show {
  width: 64px;
  height: 90px;
}
.movie_body .pic_show img {
  width: 100%;
}
.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}
.movie_body .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
.movie_body .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}
.movie_body .btn_mall,
.movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie_body .btn_pre {
  background-color: #3c9fe6;
}
</style>
