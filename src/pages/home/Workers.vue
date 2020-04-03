<template>
  <div class="workers">
    <div>
      <ul>
        <el-row>
        <span class="workers-title">UFO Pool</span>
        <el-button round><router-link to="/home" class="workers-homepage">{{$t("home.homepage")}}</router-link></el-button>
        <el-button type="primary" round><router-link to="/workers" class="workers-workers">{{$t("home.workers")}}</router-link></el-button>
        <el-button round><router-link to="/guide" class="workers-userguide">{{$t("home.userguide")}}</router-link></el-button>
        </el-row>
      </ul>
    </div>
    <div class="search">
      <el-input :placeholder="$t('workers.input')" v-model="value" class="input-with-select">
        <el-button class="button-select" slot="append" icon="el-icon-search" @click="search()"></el-button>
      </el-input>
    </div>
    <div class="workers-top">
      <el-row type="flex" justify="space-around">
        <el-col :span="6">
          <div class="top-label">{{$t("workers.onlineworkers")}}</div>
          <div class="top-value">{{target.workercount}}</div>
        </el-col>
        <div class = "vertical-line"></div>
        <el-col :span="6">
          <div class="top-label">{{$t("workers.validshares")}}</div>
          <div class="top-value">{{target.validshares}}</div>
        </el-col>
        <div class = "vertical-line"></div>
        <el-col :span="6">
          <div class="top-label">{{$t("workers.totalrewards")}}</div>
          <div class="top-value">{{target.totalrewards}} UFO</div>
        </el-col>
      </el-row>
      <hr class = "horizontal-line"/>
      <el-row type="flex" justify="space-around">
        <el-col :span="6">
          <div class="top-label">{{$t("workers.avgpower")}}</div>
          <div class="top-value">{{target.avgpower}}</div>
        </el-col>
        <div class = "vertical-line"></div>
        <el-col :span="6">
          <div class="top-label">{{$t("workers.invalidshares")}}</div>
          <div class="top-value">{{target.invalidshares}}</div>
        </el-col>
        <div class = "vertical-line"></div>
        <el-col :span="6">
          <div class="top-label">{{$t("workers.sentrewards")}}</div>
          <div class="top-value">{{target.sentrewards}} UFO</div>
        </el-col>
      </el-row>
    </div>
      <div class="line">
       <div id="lineCharts" ref="lineCharts"></div>
    </div>
    <div class="line">
       <div id="lineCharts2" ref="lineCharts2"></div>
    </div>
  </div>
</template>
<script>
import workersApi from '../../api/workers.js'
export default {
  props: ['webHomeParam'],
  data () {
    return {
      value: '',
      target: {
        workercount: 0,
        realtimepower: 0,
        validshares: 0,
        totalrewards: 0,
        avgpower: 0,
        invalidshares: 0,
        sentrewards: 0
      }
    }
  },
  watch: {
    webHomeParam: {
      handler (newVal, oldVal) {
        let lineCharts = this.$echarts.init(document.getElementById('lineCharts'))
        let newLineOption = lineCharts.getOption()
        if (newLineOption !== undefined) {
          newLineOption.title = {text: this.$t('workers.powerline')}
          newLineOption.legend = {data: [this.$t('workers.power')]}
          newLineOption.series[0].name = this.$t('workers.power')
          lineCharts.setOption(newLineOption)
        }
        let lineCharts2 = this.$echarts.init(document.getElementById('lineCharts2'))
        let newLineOption2 = lineCharts2.getOption()
        if (newLineOption2 !== undefined) {
          newLineOption2.title = {text: this.$t('workers.rewardline')}
          newLineOption2.legend = {data: [this.$t('workers.reward')]}
          newLineOption2.series[1].name = this.$t('workers.reward')
          lineCharts2.setOption(newLineOption2)
        }
      },
      deep: true
    }
  },
  mounted () {
    // let that = this
    // if (this.$route.query.miner) {
    //   that.value = this.$route.query.miner
    //   that.getTarget(that.value)
    //   that.getLine(that.value)
    // }
    // that.getTarget(that.value)
    // that.getLine(that.value)
  },
  methods: {
    getTarget (param) {
      let that = this
      workersApi.getTarget(param).then(function (result) {
        that.target = Object.assign(that.target, result)
      }, function (err) {
        that.$message.error({showClose: true, message: err.toString(), duration: 2000})
      }).catch(function (error) {
        console.log(error)
        that.$message.error({showClose: true, message: 'Request Exception', duration: 2000})
      })
    },
    getLine (param) {
      let that = this
      workersApi.getLine(param).then(function (result) {
        let slData = []
        let syData = []
        let xAxisData = []
        let sortArray = that.sortByKey(result, 'timestamp')
        sortArray.forEach(i => {
          xAxisData.push(that.timestampToTime(i.timestamp))
          slData.push(i.power)
          syData.push(i.rewards)
        })
        that.$nextTick(_ => {
          const lineCharts = that.$echarts.init(document.getElementById('lineCharts'))
          const lineCharts2 = that.$echarts.init(document.getElementById('lineCharts2'))
          let lineOptions = {
            title: {
              text: that.$t('workers.powerline'),
              textStyle: {
                fontSize: 24,
                fontWeight: 600,
                fontFamily: 'Calibri'
              }
            },
            tooltip: {
              trigger: 'axis',
              textStyle: {
                align: 'left'
              }
            },
            legend: {
              data: [that.$t('workers.power')],
              textStyle: {
                fontSize: 16
              }
            },
            xAxis: [{
              type: 'category',
              boundaryGap: false,
              axisLabel: {
                fontSize: 14,
                interval: 0,
                rotate: 60,
                margin: 30,
                textStyle: {
                  align: 'center'
                },
                axisTick: {
                  alignWithLabel: true
                }
              },
              data: xAxisData
            }],
            yAxis: [{
              name: 'Msh/s',
              type: 'value',
              axisLabel: {
                formatter: '{value}',
                fontSize: 18
              }
            }],
            series: [
              {
                name: that.$t('workers.power'),
                type: 'line',
                data: slData
              }
            ]
          }
          let lineOptions2 = {
            title: {
              text: that.$t('workers.rewardline'),
              textStyle: {
                fontSize: 24,
                fontWeight: 600,
                fontFamily: 'Calibri'
              }
            },
            tooltip: {
              trigger: 'axis',
              textStyle: {
                align: 'left'
              }
            },
            legend: {
              data: [that.$t('workers.reward')],
              textStyle: {
                fontSize: 16
              }
            },
            xAxis: [{
              type: 'category',
              boundaryGap: false,
              axisLabel: {
                fontSize: 14,
                interval: 0,
                rotate: 60,
                margin: 30,
                textStyle: {
                  align: 'center'
                },
                axisTick: {
                  alignWithLabel: true
                }
              },
              data: xAxisData
            }],
            yAxis: [{
              name: 'UFO',
              type: 'value',
              axisLabel: {
                formatter: '{value}',
                fontSize: 18
              }
            }],
            series: [
              {
                name: that.$t('workers.reward'),
                type: 'line',
                data: syData
              }
            ]
          }
          lineCharts.setOption(lineOptions)
          lineCharts2.setOption(lineOptions2)
        })
      }, function (err) {
        that.$message.error({showClose: true, message: err.toString(), duration: 2000})
      }).catch(function (error) {
        console.log(error)
        that.$message.error({showClose: true, message: 'Request Exception', duration: 2000})
      })
    },
    search () {
      this.getTarget(this.value)
      this.getLine(this.value)
    },
    sortByKey (array, key) {
      return array.sort(function (a, b) {
        var x = a[key]
        var y = b[key]
        return ((x < y) ? -1 : ((x > y) ? 1 : 0))
      })
    },
    timestampToTime (time) {
      var date = new Date(time * 1000)
      var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      var m = date.getMinutes() ? date.getMinutes() : '00'
      return h + ':' + m
    }
  }
}
</script>
<style scoped>
.workers-homepage {
  text-decoration: none;
}
.workers-workers {
  text-decoration: none;
}
.workers-userguide {
  text-decoration: none;
}
.workers {
  width: 1200px;
  margin: 0 auto;
  background-color: rgba(248,249,250,1);
  position: relative;
  height: auto;
  padding: 10px 20px 100px;
}
.workers-title {
  width:68%;
  text-align:left;
  font-size:30px;
  font-weight:600;
  font-family: "Calibri";
  color:rgba(30,32,34,1);
  line-height:25px;
  float:left;
}
.search {
  width: 60%;
  margin: 60px auto;
}
.input-with-select >>> .el-input__inner {
  border-top-left-radius:22px;
  border-bottom-left-radius:22px;
}
.vertical-line {
  float:left;
  margin-top: 5px;
  width: 1px;
  height: 70px;
  background: rgba(231,234,243,1);
}
.horizontal-line {
  height:1px;
  border:none;
  background: rgba(231,234,243,1);
}
.workers-top {
  padding-top: 5px;
  width:1200px;
  height:180px;
  /*background:rgba(248,249,250,1);*/
  border-radius:4px;
  border:1px solid rgba(231,234,243,1);
  background-color: #ffffff;
}
.top-label {
  font-size:16px;
  font-weight:300;
  font-family: "Calibri Light";
  color:rgba(119,131,143,1);
}
.top-value {
  font-size:20px;
  font-weight:600;
  font-family: "Calibri";
  color:rgba(30,32,34,1);
}
.list, .line {
  margin-top: 50px;
  border:1px solid rgba(231,234,243,1);
}
.el-col {
  padding-top: 15px;
  line-height: 25px;
  text-align: left;
}
#lineCharts {
  width: 100%;
  height: 400px;
  background-color: #ffffff;
}
#lineCharts2 {
  width: 100%;
  height: 400px;
  background-color: #ffffff;
}
</style>
