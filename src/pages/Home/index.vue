<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <!-- 用户信息卡片 -->
      <el-card class="user-card" shadow="always">
        <div slot="header" class="clearfix user-header">
          <img class="user-img" :src="userImg" height="100px" />
          <div class="user-info">
            <span class="user-name">{{ userInfo.name }}</span>
            <span class="user-rank">{{ userInfo.rank }}</span>
          </div>
        </div>
        <div class="text item login-info">
          <span>上次登录时间：</span>
          <span>{{ userInfo.lastLoginTime }}</span>
        </div>
        <div class="text item login-info">
          <span>上次登录地点：</span>
          <span>{{ userInfo.lastLoginLocation }}</span>
        </div>
      </el-card>
      <!-- 左侧表格 -->
      <el-card shadow="always" style="margin-top: 20px">
        <el-table
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          :data="leftTableData"
          style="width: 100%"
        >
          <el-table-column prop="date" label="日期" width="170">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="100">
          </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="order">
        <el-card
          class="order-card"
          :body-style="{ padding: 0 }"
          v-for="(item, index) in orderData"
          :key="index"
        >
          <i class="icon" :class="'el-icon-' + item.icon"></i>
          <div class="details">
            <p class="sum">￥{{ item.sum }}</p>
            <p class="txt">￥{{ item.txt }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 260px; margin-top: 20px">
        <div style="height: 260px" ref="lineGraph"></div>
      </el-card>
      <div class="graph" style="display: flex">
        <el-card style="height: 260px; width: 48%">
          <div style="height: 260px" ref="barGraph"></div>
        </el-card>
        <el-card style="height: 260px; width: 48%">
          <div style="height: 260px" ref="pieGraph"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import axios from "axios";
import * as echarts from "echarts";
import { mapState,mapMutations } from 'vuex';
export default {
  name: "Home",
  data() {
    return {
      userImg: require("@/assets/userImg.jpg"),
      leftTableData: [],
      orderData: [],
      graphData: [],
    };
  },
  computed:{
    ...mapState('user',['userInfo'])
  },
  methods: {
    getLeftTableData() {
      axios
        .get("/mock/leftTable")
        .then((res) => {
          this.leftTableData = res.data.data;
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
    getOrderData() {
      axios({
        url: "/mock/order",
        method: "get",
      })
        .then((res) => {
          this.orderData = res.data.data;
          this.setPieGraph();
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
    getGraphData() {
      axios
        .get("/mock/graph")
        .then((res) => {
          this.graphData = res.data.data;
          this.setLineGraph();
          this.setBarGraph();
        })
        .catch((err) => {
          throw new Error(err);
        });
    },
    handleGraphOption(type) {
      const legend = { data: [] };
      const series = [{ type }, { type }, { type }];
      this.graphData.forEach((item, index) => {
        legend.data.push(item.title);
        series[index].name = item.title;
        series[index].data = item.data;
      });
      const option = {
        legend,
        tooltip: {
          trigger: "item",
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series,
      };
      return option;
    },
    setLineGraph() {
      const option = this.handleGraphOption("line");
      const E = echarts.init(this.$refs.lineGraph);
      E.setOption(option);
    },
    setBarGraph() {
      const option = this.handleGraphOption("bar");
      const E = echarts.init(this.$refs.barGraph);
      E.setOption(option);
    },
    setPieGraph() {
      const series = [
        {
          type: "pie",
          radius: "50%",
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
          data: [],
        },
      ];
      this.orderData.slice(0, 3).forEach((item) => {
        series[0].data.push({ value: item.sum, name: item.txt });
      });
      const option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "horizontal",
          align: "auto",
        },
        series,
      };
      const E = echarts.init(this.$refs.pieGraph);
      E.setOption(option);
    },
  },
  mounted() {
    this.getLeftTableData();
    this.getOrderData();
    this.getGraphData();
  },
};
</script>

<style lang="less" scoped>
.item {
  margin: 18px 0;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.user-header {
  display: flex;
  align-items: center;
  .user-img {
    border-radius: 50%;
  }
  .user-info {
    display: flex;
    flex-direction: column;
    margin-left: 40px;
    .user-name {
      font-size: 20px;
      margin-bottom: 8px;
    }
    .user-rank {
      font-size: 14px;
      color: #aaa;
    }
  }
}

.login-info {
  font-size: 14px;
  color: #aaa;
  span {
    margin-right: 50px;
  }
}

.order {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 20px;
  row-gap: 10px;
  position: relative;
  .icon {
    font-size: 30px;
    padding: 30px;
    color: #fff;
    background-color: #fab;
  }
  .details {
    display: inline-block;
    height: 100%;
    margin-left: 20px;
    position: relative;
    bottom: -15px;
    .sum {
      font-size: 26px;
      margin-bottom: 10px;
    }
    .txt {
      font-size: 14px;
      color: #aaa;
    }
  }
}

.graph {
  margin-top: 20px;
  justify-content: space-between;
}
</style>