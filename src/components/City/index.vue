<template>
  <div class="city_body">
    <div class="city_list">
      <loading v-if="isLoading"></loading>
      <scroller ref="jump" v-else>
        <div>
          <div class="city_hot">
            <h2>热门城市</h2>
            <ul class="clearfix">
              <li
                v-for="item in hostlist"
                :key="item.id"
                @click="changCity(item.nm,item.id)"
              >{{item.nm}}</li>
            </ul>
          </div>
          <div class="city_sort" ref="city_ref">
            <div v-for="item in cityList" :key="item.index">
              <h2>{{item.index}}</h2>
              <ul>
                <li
                  v-for="itemList in item.list"
                  :key="itemList.id"
                  @click="changCity(itemList.nm,itemList.id)"
                >{{itemList.nm}}</li>
              </ul>
            </div>
          </div>
        </div>
      </scroller>
    </div>
    <div class="city_index">
      <ul>
        <li
          v-for="(item,index) in cityList"
          :key="item.index"
          @click="touchHandel(index)"
        >{{item.index}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
export default {
  name: "city",
  data() {
    return {
      cityList: [],
      hostlist: [],
      isLoading:true
    };
  },

  mounted() {
    let cityData = window.localStorage.getItem("cityList");
    let hostCity = window.localStorage.getItem("hostCity");
    // 判断本地存储是否存在，存在就不发送ajax请求
    if (cityData && hostCity) {
      this.cityData = JSON.parse(cityData);
      this.hostCity = JSON.parse(hostCity);
      this.isLoading = false;
    } else {
      this.axios.get("/api/cityList").then(res => {
        var msg = res.data.msg;
        if (msg === "ok") {
          this.isLoading = false;
          var cities = res.data.data.cities;
          var { cityList, hostlist } = this.formatCityList(cities);
          this.cityList = cityList;
          this.hostlist = hostlist;
          window.localStorage.setItem("cityList", JSON.stringify(cityList));
          window.localStorage.setItem("hostCity", JSON.stringify(hostlist));
        }
      });
    }
  },
  methods: {
    formatCityList(cities) {
      var hostlist = [];
      var cityList = [];
      var citiesCount = cities.length;

      for (var z = 0; z < citiesCount; z++) {
        if (cities[z].isHot === 1) {
          hostlist.push(cities[z]);
        }
      }
      for (var i = 0; i < citiesCount; i++) {
        var citiesIndex = cities[i].py.substring(0, 1).toUpperCase();
        if (tocom(citiesIndex)) {
          cityList.push({
            index: citiesIndex,
            list: [{ nm: cities[i].nm, id: cities[i].id }]
          });
        } else {
          for (var j = 0; j < cityList.length; j++) {
            if (cityList[j].index == citiesIndex) {
              cityList[j].list.push({ nm: cities[i].nm, id: cities[i].id });
            }
          }
        }
      }
      cityList.sort((a, b) => {
        if (a.index > b.index) {
          return 1;
        } else {
          return -1;
        }
      });
      function tocom(citiesIndex) {
        for (var i = 0; i < cityList.length; i++) {
          if (cityList[i].index == citiesIndex) {
            return false;
          }
        }
        return true;
      }
      // console.log(cityList);
      return { cityList, hostlist };
    },
    touchHandel(index) {
      // console.log(index)
      var h2 = this.$refs.city_ref.getElementsByTagName("h2");
      this.$refs.jump.jump(-h2[index].offsetTop);
      // this.$refs.city_ref.parentNode.scrollTop = h2[index].offsetTop;
    },
    changCity(nm, id) {
      // console.log(nm, id)
      // 调用vuex中的mutations中的方法进行处理  ok
      this.$store.commit("city/CITY_INFO", { nm, id });
      // 为了返回时，城市数据不再该改变。将数据本地化处理
      window.localStorage.setItem("city_nm", nm);
      window.localStorage.setItem("city_id", id);
      // 编程式导航
      this.$router.push("/movie/nowPlaying");
    }
  }
};
</script>

<style scoped>
#content .city_body {
  margin-top: 45px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.city_body .city_list {
  flex: 1;
  overflow: auto;
  background: #fff5f0;
}
.city_body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}
.city_body .city_hot {
  margin-top: 20px;
}
.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}
.city_body .city_sort div {
  margin-top: 20px;
}
.city_body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_sort ul {
  padding-left: 10px;
  margin-top: 10px;
}
.city_body .city_sort ul li {
  line-height: 30px;
  line-height: 30px;
}
.city_body .city_index {
  width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-left: 1px #e6e6e6 solid;
}
</style>
