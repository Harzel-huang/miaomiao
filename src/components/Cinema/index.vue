<template>
  <div id="content">
    <div class="cinema_menu">
      <div class="city_switch">
        全城
        <i class="iconfont icon-lower-triangle"></i>
      </div>
      <div class="brand_swtich">
        品牌
        <i class="iconfont icon-lower-triangle"></i>
      </div>
      <div class="feature_switch">
        特色
        <i class="iconfont icon-lower-triangle"></i>
      </div>
    </div>
    <div class="cinema_body">
      <ul>
        <li v-for="item in cinemas" :key="item.id">
          <div>
            <span>{{item.nm}}</span>
            <span class="q">
              <span class="price">{{item.sellPrice}}</span> 元起
            </span>
          </div>
          <div class="address">
            <span>{{item.addr}}</span>
            <span>{{item.distance}}</span>
          </div>
          <div class="card">
            <!-- 注意添加样式，也是用适配器filters  ：class=" 内容 | 适配规则" -->
            <div v-for="(card,key) in item.tag" v-if="card===1" :key="key" :class="key | colorfilter(key)">{{key | cardfilter(key)}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "cinemaComponent",
  data() {
    return {
      cinemas: []
    };
  },
  mounted() {
    this.axios.get("/api/cinemaList?cityId=10").then(res => {
      var msg = res.data.msg;
      if (msg === "ok") {
        this.cinemas = res.data.data.cinemas;
      }
    });
  },
  filters: {
    cardfilter(key) {
      var cardlist = [
        { key: "allowRefund", values: "退款" },
        { key: "endorse", values: "收购" },
        { key: "sell", values: "售卖" },
        { key: "snack", values: "折扣" }
      ];
      for (var i = 0; i < cardlist.length; i++) {
        if (key === cardlist[i].key) {
          return cardlist[i].values;
        }
      }
      return '';
    },
    colorfilter(key) {
      var cardlist = [
        { key: "allowRefund", values: "or" },
        { key: "endorse", values: "or" },
        { key: "sell", values: "bl" },
        { key: "snack", values: "bl" }
      ];
      for (var i = 0; i < cardlist.length; i++) {
        if (key === cardlist[i].key) {
          return cardlist[i].values;
        }
      }
    }
  }
};
</script>

<style scoped>
#content .cinema_menu {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: white;
}
#content .cinema_body {
  flex: 1;
  overflow: auto;
}
.cinema_body ul {
  padding: 20px;
}
.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.cinema_body div {
  margin-bottom: 10px;
}
.cinema_body .q {
  font-size: 11px;
  color: #f03d37;
}
.cinema_body .price {
  font-size: 18px;
}
.cinema_body .address {
  font-size: 13px;
  color: #666;
}
.cinema_body .address span:nth-of-type(2) {
  float: right;
}
.cinema_body .card {
  display: flex;
}
.cinema_body .card div {
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  color: #f90;
  border: 1px solid #f90;
  font-size: 13px;
  margin-right: 5px;
}
.cinema_body .card div.or {
  color: #f90;
  border: 1px solid #f90;
}
.cinema_body .card div.bl {
  color: #589daf;
  border: 1px solid #589daf;
}
</style>
