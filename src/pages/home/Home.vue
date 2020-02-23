<template>
  <div class="home">
    <div class="home-top">
      <el-row type="flex" justify="space-around">
        <el-col :span="6">{{$t("home.totalpower")}}：{{target.totalpower}}</el-col>
        <el-col :span="6">{{$t("home.totalusers")}}：{{target.totalusers}}</el-col>
        <el-col :span="6">{{$t("home.totalworkers")}}：{{target.totalworkers}}</el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col :span="6">{{$t("home.currheight")}}：{{target.currentheight}}</el-col>
        <el-col :span="6">{{$t("home.currdiff")}}：{{target.currentdiff}}</el-col>
        <el-col :span="6">{{$t("home.totalrewards")}}：{{target.totalrewards}} UFO</el-col>
      </el-row>
    </div>
    <div class="list">
      <div class="title">{{$t("home.latestblocks")}}</div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="blockheight" :label="$t('home.blockheight')" width="100"></el-table-column>
        <el-table-column prop="miner" :label="$t('home.blockminer')" width="120">
        </el-table-column>
        <el-table-column prop="blockreward" :label="$t('home.blockreward')" width="180"></el-table-column>
        <el-table-column prop="blocktime" :label="$t('home.blocktime')" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.blocktime<60">
              &lt;1Minute
            </span>
            <span v-else>
              <span v-if="scope.row.hour">{{scope.row.hour}}{{$t("home.hour")}}</span> {{scope.row.minute}}{{$t("home.beforem")}}
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
        totalrewards: 0
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
              text: that.$t('home.summaryPower')
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
              name: 'Msh/s',
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
              text: that.$t('home.summaryDiff')
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
              text: '24 Hours Rewards'
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
      if (theTime >= 60) {
        theTime1 = parseInt(theTime / 60)
        theTime = parseInt(theTime % 60)
        if (theTime1 > 60) {
          theTime2 = parseInt(theTime1 / 60)
          theTime1 = parseInt(theTime1 % 60)
          if (theTime2 > 24) {
            theTime2 = parseInt(theTime2 % 24)
          }
        }
      }
      that.$set(row, 'minute', parseInt(theTime1))
      that.$set(row, 'hour', parseInt(theTime2))
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
  background-color: #ffffff;
  padding: 50px 20px;
}
.home-top {
  font-size: 16px;
}
.el-col {
  line-height: 50px;
  text-align: left;
}
.list, .line {
  margin-top: 50px;
}
.title {
  text-align: left;
  line-height: 50px;
  font-size: 16px;
  padding-left: 20px;
  background-color: #eeeeee;
}
#lineCharts {
  width: 100%;
  height: 400px;
}
#lineCharts2{
  width: 100%;
  height: 400px;
}
#pieCharts {
  width: 100%;
  height: 600px;
}
</style>
