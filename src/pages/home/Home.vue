<template>
  <div class="home">
    <div>
      <ul>
        <el-row>
        <span class="home-title">UFO Pool</span>
        <el-button type="primary" round><router-link to="/home" class="home-homepage">{{$t("home.homepage")}}</router-link></el-button>
        <el-button round><router-link to="/workers" class="home-workers">{{$t("home.workers")}}</router-link></el-button>
        <el-button round><router-link to="/guide" class="home-userguide">{{$t("home.userguide")}}</router-link></el-button>
        </el-row>
      </ul>
    </div>
    <div class="home-top">
      <el-row type="flex" justify="space-around">
        <el-col :span="6">
          <div class="top-label">{{$t("home.totalpower")}}</div>
          <div class="top-value">{{target.totalpower}}</div>
        </el-col>
        <div class = "vertical-line"></div>
        <el-col :span="6">
          <div class="top-label">{{$t("home.totalworkers")}}</div>
          <div class="top-value">{{target.totalworkers}}</div>
        </el-col>
        <div class = "vertical-line"></div>
        <el-col :span="6">
          <div class="top-label">{{$t("home.feerate")}}</div>
          <div class="top-value">5%</div>
        </el-col>
      </el-row>
      <hr class = "horizontal-line"/>
      <el-row type="flex" justify="space-around">
        <el-col :span="6">
          <div class="top-label">{{$t("home.currheight")}}</div>
          <div class="top-value">{{target.currentheight}}</div>
        </el-col>
        <div class = "vertical-line"></div>
        <el-col :span="6">
          <div class="top-label">{{$t("home.currdiff")}}</div>
          <div class="top-value">{{target.currentdiff}}</div>
        </el-col>
        <div class = "vertical-line"></div>
        <el-col :span="6">
          <div class="top-label">{{$t("home.totalrewards")}}</div>
          <div class="top-value">{{target.totalrewards}} UFO</div>
        </el-col>
      </el-row>
      <hr class = "horizontal-line"/>
      <el-row type="flex" justify="space-around">
        <el-col :span="6">
          <div class="top-label">{{$t("home.totalpoolpower")}}</div>
          <div class="top-value">{{target.totalpoolpower}}</div>
        </el-col>
        <div class = "vertical-line"></div>
        <el-col :span="6">
          <div class="top-label">{{$t("home.minsent")}}</div>
          <div class="top-value">1 UFO</div>
        </el-col>
        <div class = "vertical-line"></div>
        <el-col :span="6">
          <div class="top-label">{{$t("home.totalsentrewards")}}</div>
          <div class="top-value">{{target.totalsentrewards}} UFO</div>
        </el-col>
      </el-row>
    </div>
    <div class="list">
      <div class="title">{{$t("home.latestblocks")}}</div>
      <el-table :data="tableData" :cell-style="tableStyle" :header-cell-style="tableHeaderStyle" style="width: 100%">
        <el-table-column prop="blockheight" :label="$t('home.blockheight')" width="120" ></el-table-column>
        <el-table-column prop="miner" :label="$t('home.blockminer')" width="120">
        </el-table-column>
        <el-table-column prop="blockreward" :label="$t('home.blockreward')" width="120"></el-table-column>
        <el-table-column prop="blocktime" :label="$t('home.blocktime')" width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.blocktime<60">
              &lt;1Minute
            </span>
            <span v-else>
              <!-- <span v-if="scope.row.hour">{{scope.row.hour}}{{$t("home.hour")}}</span> {{scope.row.minute}}{{$t("home.beforem")}} -->
              <span v-if="scope.row.day">{{scope.row.day}}{{$t("home.day")}} {{scope.row.hour}}{{$t("home.hour")}}</span> {{scope.row.minute}}{{$t("home.beforem")}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="blockhash" :label="$t('home.blockhash')" min-width="529"></el-table-column>
      </el-table>
    </div>
    <div class="line">
       <div id="lineCharts" ref="lineCharts"></div>
    </div>
    <div class="line">
       <div id="lineCharts2" ref="lineCharts2"></div>
    </div>
    <div class="pie">
       <div id="pieCharts" ref="pieCharts"></div>
    </div>
  </div>
</template>
<script>
import homeApi from '../../api/home.js'
export default {
  props: ['webHomeParam'],
  data () {
    return {
      target: {
        totalpower: 0,
        totalusers: 0,
        totalworkers: 0,
        currentheight: 0,
        currentdiff: 0,
        totalrewards: 0,
        totalpoolpower: 0
      },
      intervalList: null,
      intervalTarget: null,
      intervalLine: null,
      intervalPie: null,
      tableData: []
    }
  },
  mounted () {
    this.jishiFn()
    this.getList()
    this.getTarget(null)
    this.getLine()
    this.getPie()
  },
  watch: {
    webHomeParam: {
      handler (newVal, oldVal) {
        let lineCharts = this.$echarts.init(document.getElementById('lineCharts'))
        let newLineOption = lineCharts.getOption()
        newLineOption.title = {text: this.$t('home.summaryPower')}
        newLineOption.legend = {data: [this.$t('home.power')]}
        newLineOption.series[0].name = this.$t('home.power')
        lineCharts.setOption(newLineOption)
        let lineCharts2 = this.$echarts.init(document.getElementById('lineCharts2'))
        let newLineOption2 = lineCharts2.getOption()
        newLineOption.title = {text: this.$t('home.summaryDiff')}
        newLineOption.legend = {data: [this.$t('home.diff')]}
        newLineOption.series[0].name = this.$t('home.diff')
        lineCharts2.setOption(newLineOption2)
        let pieCharts = this.$echarts.init(document.getElementById('pieCharts'))
        let newPieOption = pieCharts.getOption()
        newPieOption.title = {text: this.$t('home.benefit')}
        pieCharts.setOption(newPieOption)
      },
      deep: true
    }
  },
  methods: {
    tableHeaderStyle ({row}) {
      return 'font-size:16px;font-weight:300;font-family: "Calibri Light";color:rgba(119,131,143,1)'
    },
    tableStyle ({row}) {
      return 'font-size:16px;font-weight:400;font-family: "Calibri";color:rgba(30,32,34,1)'
    },
    jishiFn () {
      let that = this
      this.intervalList = setInterval(that.getList, 60000)
      this.intervalTarget = setInterval(that.getTarget, 60000)
      this.intervalLine = setInterval(that.getLine, 3600000)
      this.intervalPie = setInterval(that.getPie, 3600000)
    },
    getTarget () {
      let that = this
      homeApi.getTarget().then(function (result) {
        that.target = Object.assign(that.target, result)
      }, function (err) {
        that.$message.error({showClose: true, message: err.toString(), duration: 2000})
      }).catch(function (error) {
        console.log(error)
        that.$message.error({showClose: true, message: 'Request Exception', duration: 2000})
      })
    },
    getLine () {
      let that = this
      homeApi.getLine().then(function (result) {
        let slData = []
        let ndData = []
        let xAxisData = []
        let sortArray = that.sortByKey(result, 'timestamp')
        sortArray.forEach(i => {
          xAxisData.push(that.timestampToTime(i.timestamp))
          slData.push(i.power)
          ndData.push(i.diff === 'NaN' ? '0.00' : i.diff)
        })
        that.$nextTick(_ => {
          const lineCharts = that.$echarts.init(document.getElementById('lineCharts'))
          const lineCharts2 = that.$echarts.init(document.getElementById('lineCharts2'))
          let lineOptions = {
            title: {
              text: that.$t('home.summaryPower'),
              textStyle: {
                fontSize: 24,
                fontWeight: 600,
                fontFamily: 'Calibri'
              }
            },
            tooltip: {
              trigger: 'axis',
              formatter: function (params, ticket, callback) {
                var showHtm = ''
                var name = params[0].name
                var seriesName = params[0].seriesName
                var value = params[0].value
                showHtm += name + ':00' + '<br>' + seriesName + '：' + value
                return showHtm
              }
            },
            legend: {
              data: [that.$t('home.power')],
              textStyle: {
                fontSize: 18
              }
            },
            xAxis: [{
              type: 'category',
              boundaryGap: false,
              axisLabel: {
                fontSize: 18
              },
              data: xAxisData
            }],
            yAxis: [{
              name: 'MHash/s',
              type: 'value',
              axisLabel: {
                formatter: '{value}',
                fontSize: 18
              }
            }],
            series: [
              {
                name: that.$t('home.power'),
                type: 'line',
                data: slData
              }
            ]
          }
          let lineOptions2 = {
            title: {
              text: that.$t('home.summaryDiff'),
              textStyle: {
                fontSize: 24,
                fontWeight: 600,
                fontFamily: 'Calibri'
              }
            },
            tooltip: {
              trigger: 'axis',
              formatter: function (params, ticket, callback) {
                var showHtm = ''
                var name = params[0].name
                var seriesName = params[0].seriesName
                var value = params[0].value
                showHtm += name + ':00' + '<br>' + seriesName + '：' + value
                return showHtm
              }
            },
            legend: {
              data: [that.$t('home.diff')],
              textStyle: {
                fontSize: 16
              }
            },
            xAxis: [{
              type: 'category',
              boundaryGap: false,
              axisLabel: {
                fontSize: 18
              },
              data: xAxisData
            }],
            yAxis: [{
              name: '',
              type: 'value',
              axisLabel: {
                formatter: '{value}',
                fontSize: 18
              }
            }],
            series: [
              {
                name: that.$t('home.diff'),
                type: 'line',
                data: ndData
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
    getPie () {
      let that = this
      homeApi.getPie().then(function (result) {
        let arr = that.sortByValue(result, 'value')
        if (result.length && result.length > 20) {
          arr = result.slice(0, 19)
          let list = result.slice(19, result.length)
          let obj = {name: 'Others', value: '0'}
          list.forEach(i => {
            obj.value = that.accAdd(i.value, obj.value)
          })
          arr.push(obj)
        } else {
          arr = result
        }
        arr.forEach(i => {
          i.value = (i.value / 100000000).toFixed(8)
        })
        that.$nextTick(_ => {
          const pieCharts = that.$echarts.init(document.getElementById('pieCharts'))
          let pieOptin = {
            title: {
              text: '24 Hours Rewards',
              textStyle: {
                fontSize: 24,
                fontWeight: 600,
                fontFamily: 'Calibri'
              }
            },
            tooltip: {
              trigger: 'item',
              formatter: '{b} <br/> {d}%'
            },
            series: [
              {
                type: 'pie',
                radius: '55%',
                width: 600,
                height: 600,
                left: 300,
                data: arr,
                label: {
                  normal: {
                    formatter: '{b}: {d}%',
                    textStyle: {
                      fontWeight: 'normal',
                      fontSize: 16
                    }
                  }
                }
              }
            ]
          }
          pieCharts.setOption(pieOptin)
        })
      }, function (err) {
        that.$message.error({showClose: true, message: err.toString(), duration: 2000})
      }).catch(function (error) {
        console.log(error)
        that.$message.error({showClose: true, message: 'Request Exception', duration: 2000})
      })
    },
    getList () {
      let that = this
      homeApi.getList().then(function (result) {
        result.forEach(i => {
          i = that.formatSeconds(i)
        })
        that.tableData = result
      }, function (err) {
        that.$message.error({showClose: true, message: err.toString(), duration: 2000})
      }).catch(function (error) {
        console.log(error)
        that.$message.error({showClose: true, message: 'Request Exception', duration: 2000})
      })
    },
    handleClick (row) {
      // this.$router.push({path: '/workers', query: {miner: row.miner}})
    },
    formatSeconds (row) {
      let that = this
      let theTime = parseInt(row.blocktime)
      let theTime1 = 0
      let theTime2 = 0
      let theTime3 = 0
      if (theTime >= 60) {
        theTime1 = parseInt(theTime / 60)
        theTime = parseInt(theTime % 60)
        if (theTime1 > 60) {
          theTime2 = parseInt(theTime1 / 60)
          theTime1 = parseInt(theTime1 % 60)
          if (theTime2 > 24) {
            theTime3 = parseInt(theTime2 / 24)
            theTime2 = parseInt(theTime2 % 24)
          }
        }
      }
      that.$set(row, 'minute', parseInt(theTime1))
      that.$set(row, 'hour', parseInt(theTime2))
      that.$set(row, 'day', parseInt(theTime3))
      return row
    },
    sortByKey (array, key) {
      return array.sort(function (a, b) {
        var x = a[key]
        var y = b[key]
        return ((x < y) ? -1 : ((x > y) ? 1 : 0))
      })
    },
    sortByValue (array, key) {
      return array.sort(function (a, b) {
        var x = a[key]
        var y = b[key]
        return ((x > y) ? -1 : ((x < y) ? 1 : 0))
      })
    },
    timestampToTime (time) {
      var date = new Date(time * 1000)
      var h = date.getHours()
      return h
    },
    accAdd (arg1, arg2) {
      var r1, r2, m, c
      try {
        r1 = arg1.toString().split('.')[1].length
      } catch (e) {
        r1 = 0
      }
      try {
        r2 = arg2.toString().split('.')[1].length
      } catch (e) {
        r2 = 0
      }
      c = Math.abs(r1 - r2)
      m = Math.pow(10, Math.max(r1, r2))
      if (c > 0) {
        var cm = Math.pow(10, c)
        if (r1 > r2) {
          arg1 = Number(arg1.toString().replace('.', ''))
          arg2 = Number(arg2.toString().replace('.', '')) * cm
        } else {
          arg1 = Number(arg1.toString().replace('.', '')) * cm
          arg2 = Number(arg2.toString().replace('.', ''))
        }
      } else {
        arg1 = Number(arg1.toString().replace('.', ''))
        arg2 = Number(arg2.toString().replace('.', ''))
      }
      return (arg1 + arg2) / m
    }
  },
  beforeDestroy () {
    clearInterval(this.intervalList)
    clearInterval(this.intervalTarget)
    clearInterval(this.intervalLine)
    clearInterval(this.intervalPie)
    this.intervalList = null
    this.intervalTarget = null
    this.intervalLine = null
    this.intervalPie = null
  }
}
</script>

<style scoped>
.home {
  width: 1200px;
  margin: 0 auto;
  background-color: rgba(248,249,250,1);
  padding: 10px 20px;
}
.home-title {
  width:68%;
  text-align:left;
  font-size:30px;
  font-weight:600;
  font-family: "Calibri";
  color:rgba(30,32,34,1);
  line-height:25px;
  float:left;
  margin-bottom: 60px
}
.home-homepage {
  text-decoration: none;
}
.home-workers {
  text-decoration: none;
}
.home-userguide {
  text-decoration: none;
}
.home-top {
  padding-top: 5px;
  width:1200px;
  height:280px;
  background:rgba(255,255,255,1);
  border-radius:4px;
  border:1px solid rgba(231,234,243,1);
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
.list-title {
  font-size:16px;
  font-weight:300;
  font-family: "Calibri Light";
  color:rgba(119,131,143,1);
}
.el-col {
  padding-top: 15px;
  line-height: 25px;
  text-align: left;
}
.list, .line {
  margin-top: 50px;
  border:1px solid rgba(231,234,243,1);
}
.title {
  text-align: left;
  line-height: 50px;
  font-size: 24px;
  font-weight:600;
  font-family: "Calibri";
  padding-left: 20px;
  border-bottom:1px solid rgba(231,234,243,1);
  background-color: #ffffff;
}
#lineCharts {
  width: 100%;
  height: 400px;
  background-color: #ffffff;
}
#lineCharts2{
  width: 100%;
  height: 400px;
  background-color: #ffffff;
}
#pieCharts {
  margin-top: 50px;
  width: 100%;
  height: 600px;
  border:1px solid rgba(231,234,243,1);
  background-color: #ffffff;
}
</style>
