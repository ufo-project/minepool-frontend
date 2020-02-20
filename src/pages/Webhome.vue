<template>
  <div class="web_home">
      <div class="web-home-top">
        <el-row>
          <el-col :span="5" class="text_right" style="padding-top: 10px;">
            <!-- <img src="../../static/img/ufo.png"/> -->
          </el-col>
          <el-col :offset="4" :span="32">
            <el-menu :default-active="activeIndex"  class="el-menu-demo"  mode="horizontal"  @select="handleSelect"  background-color="#2f3f61"  text-color="#909399"  active-text-color="#ffffff">
              <el-menu-item index="/home">{{$t("home.homepage")}}</el-menu-item>
              <el-menu-item index="/workers">{{$t("home.workers")}}</el-menu-item>
              <el-menu-item index="/guide">{{$t("home.userguide")}}</el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <div class="main">
        <div class="content">
          <router-view class="router-content" :webHomeParam="webHomeParam"/>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'WebHome',
  data () {
    return {
      activeIndex: '/home',
      webHomeParam: {

      },
      theme: 'dark'
    }
  },
  watch: {
    '$route.path' (newVal, oldVal) {
      this.activeIndex = newVal
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      this.$router.push(key)
    },
    iconClick () {
    }
  }
}
</script>
<style scoped>
.web-home-top {
  position: fixed;
  background: #2f3f61;
  line-height: 80px;
  top: 0;
  right: 0;
  bottom: 0;
  height: 80px;
  width: 100%;
}
.main {
  position: fixed;
  top: 80px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
}
.content {
  position: absolute;
  right: 0;
  left: 0;
  height: 100%;
  overflow-y: auto;
}

.web-home-top .el-col {
  height: 80px;
}
.el-menu--horizontal {
  border-bottom: #e6e6e6;
}
.text_right {
  text-align: right;
}
</style>
<style>
.el-submenu .el-menu--horizontal {
  top: 80px !important;
}
.web_home .el-menu--horizontal>.el-submenu .el-submenu__title {
  height: 80px;
  width: 150px;
  line-height: 80px;
  font-size: 18px;
}
.web_home .el-menu--horizontal>.el-menu-item {
  height: 80px;
  width: 150px;
  line-height: 80px;
  font-size: 18px;
}
</style>
