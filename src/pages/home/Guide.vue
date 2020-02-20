<template>
  <div class="guide">
    <div class="content">
      <div class="title"><span class="bg-gray">Step 1:</span></div>
      <div class="text">Click on the link: <el-link  href="https://github.com/ufo-project/ufochain/releases"  type="primary" target="_blank">https://github.com/ufo-project/ufochain/releases</el-link></div>
      <div class="text">Download the corresponding file according to the system and extract it.</div>
      <el-image src="/static/img/1.png"></el-image>
      <div class="title"><span class="bg-gray">Step 2:</span></div>
      <div class="text">Enter the unzipped folder,</div>
      <div class="text">click the "UFO Wallet" program,</div>
      <div class="text">install the UFO wallet,</div>
      <div class="text">and generate the address.</div>
      <el-image src="/static/img/2.png"></el-image>
      <el-image src="/static/img/3.png"></el-image>
      <div class="title"><span class="bg-gray">Step 3:</span></div>
      <div class="text">Open terminal</div>
      <div class="text">Execute: minepool_client --server = mainnet-pool01.ufo.link: 8080</div>
      <div class="text">--miner-address=</div>
      <div class="text text-red">9a68d7ec30d3314c9a9ed78eba2e880208149f7dedaa9b72152d4930ca80ddab25</div>
      <div class="text">--worker-name = <span class="text-red">ufoplan01</span></div>
      <div class="text">Note: Change the miner-address to your payment address, and worker-name to your mining username.</div>
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
