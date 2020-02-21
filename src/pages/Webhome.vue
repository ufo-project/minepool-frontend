<template>
  <div class="web_home">
      <div class="web-home-top">
      <header class="site-header">
    <div class="header-content">
    <div class="header-logo"><a href="/"><img src="/static/img/h-logo.svg" alt="UFO"></a><span>UFO POOL</span></div>
    <ul class="header-nav">
      <li><router-link to="/home">{{$t("home.homepage")}}</router-link></li>
      <li><router-link to="/workers">{{$t("home.workers")}}</router-link></li>
      <li><router-link to="/guide">{{$t("home.userguide")}}</router-link></li>
    </ul>
  </div>
  </header>
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
  background: #07111d;
  line-height: 80px;
  top: 0;
  right: 0;
  bottom: 0;
  height: 80px;
  width: 100%;
  z-index: 1000;
}
.main {
  position: fixed;
  top: 80px;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #edf0f5;
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
<style>
@font-face {
  font-family: 'Jura';
  src: url("/static/fonts/Jura-Regular.woff2") format("woff2");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
.site-header {
  font-family: 'Jura', sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: white;
}
.site-header * {
  margin: 0;
  padding: 0;
  font: inherit;
  color: inherit;
  list-style: none;
}
.site-header a {
  text-decoration: none;
}
.site-header .header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  max-width: 1240px;
  height: 80px;
  margin: 0 auto;
}
.site-header .header-logo {
  display: flex;
  align-items: center;
}

.site-header .header-logo a {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 32px;
  background-color: #1d7cf2;
  border-radius: 50%;
  margin-right: 10px;
}

.site-header .header-logo a img {
  width: 26px;
}

.site-header .header-logo span {
  letter-spacing: 2px;
  font-size: 20px;
}

.site-header .header-nav {
  display: flex;
}
.site-header .header-nav li {
  margin-left: 35px;
}
.site-header .header-nav li  a {
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  color: white;
  height: 80px;
  opacity: 0.8;
  transition: all 0.3s ease-in-out;
}
.site-header .header-nav li a.router-link-active::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 4px;
  background-color: #1d7cf2;
}
.site-header .header-nav li a:hover, .site-header .header-nav li a.router-link-active {
  color: #1d7cf2;
  opacity: 1;
}
</style>
