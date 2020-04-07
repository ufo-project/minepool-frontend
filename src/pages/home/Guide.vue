<template>
  <div class="guide">
    <div>
      <ul>
        <el-row>
        <span class="guide-title">UFO Pool</span>
        <el-button round><router-link to="/home" class="guide-homepage">{{$t("home.homepage")}}</router-link></el-button>
        <el-button round><router-link to="/workers" class="guide-workers">{{$t("home.workers")}}</router-link></el-button>
        <el-button type="primary" round><router-link to="/guide" class="guide-userguide">{{$t("home.userguide")}}</router-link></el-button>
        </el-row>
      </ul>
    </div>
    <div class="content">
      <div class="title"><span class="bg-gray">Step 1:</span></div>
      <div class="text">Click on the link: <el-link  href="https://github.com/ufo-project/ufochain/releases"  type="primary" target="_blank">https://github.com/ufo-project/ufochain/releases</el-link></div>
      <div class="text">Download the corresponding file according to the system and extract it.</div>
      <el-image src="/static/img/1.png"></el-image>
      <div class="title"><span class="bg-gray">Step 2:</span></div>
      <div class="text">Click on the link: <el-link  href="https://github.com/ufo-project/UfoMiner/releases"  type="primary" target="_blank">https://github.com/ufo-project/UfoMiner/releases</el-link></div>
      <div class="text">Download the GPU mining file and extract it.</div>
      <el-image src="/static/img/4.png"></el-image>
      <div class="title"><span class="bg-gray">Step 3:</span></div>
      <div class="text">Enter the unzipped folder,</div>
      <div class="text">click the "UFO Wallet" program,</div>
      <div class="text">install the UFO wallet,</div>
      <div class="text">and generate the address.</div>
      <el-image src="/static/img/2.png"></el-image>
      <el-image src="/static/img/3.png"></el-image>
      <div class="title"><span class="bg-gray">Step 4:</span></div>
      <div class="text">Open terminal and enter into UfoMiner directory.</div>
      <div class="text">Execute: UfoMiner.exe --url=stratum+tcp://mainnet-pool01.ufo.link:8080 </div>
      <div class="text">--user=</div>
      <div class="text text-red">932ca7c1a1f6a2449360d186ff43741cee8d247bcec20b78174b59abbf397b2bab.ufoplan01</div>
      <div class="text">--pass=123456<span class="text-red"></span></div>
      <div class="text">Note: Change the user to your address.username.</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  }
}
</script>
<style scoped>
.guide {
  width: 100%;
  height: auto;
  padding: 40px 0 100px;
  background-color: #ffffff;
}
.guide-title {
  width:68%;
  text-align:left;
  font-size:30px;
  font-weight:600;
  font-family: "Calibri";
  color:rgba(30,32,34,1);
  line-height:25px;
  float:left;
}
.guide {
  width: 1200px;
  margin: 0 auto;
  background-color: rgba(248,249,250,1);
  position: relative;
  height: auto;
  padding: 10px 20px 100px;
}
.guide-homepage {
  text-decoration: none;
}
.guide-workers {
  text-decoration: none;
}
.guide-userguide {
  text-decoration: none;
}
.content {
  width: 1000px;
  margin: 0 auto;
}
.title {
  text-align: left;
  font-weight: bold;
  font-size: 20px;
  line-height: 40px;
}
.text {
  font-size: 18px;
  text-align: left;
  line-height: 30px;
}
.bg-gray {
  background-color: #eeeeee;
}
.text-red {
  color: #F56C6C;
}
</style>
<style>
el-link {
  font-size: 18px;
}
</style>
