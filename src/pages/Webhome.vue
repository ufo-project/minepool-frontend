<template>
  <div class="web_home">
      <div class="web-home-top">
      <!--<header class="site-header">-->
    <!--<div class="header-content">-->
    <!--<div class="header-logo"><a href="http://ufo.link/"><img src="/static/img/h-logo.svg" alt="UFO"></a><span>UFO POOL</span></div>-->
    <!--<ul class="header-nav">-->
      <!--<li><router-link to="/home">{{$t("home.homepage")}}</router-link></li>-->
      <!--<li><router-link to="/workers">{{$t("home.workers")}}</router-link></li>-->
      <!--<li><router-link to="/guide">{{$t("home.userguide")}}</router-link></li>-->
    <!--</ul>-->
  <!--</div>-->
  <!--</header>-->

      <header class="site-header">
          <div class="header-content">
              <div class="header-logo"><a href="/"><img src="/static/img/h-logo.svg" alt="UFO"></a><span>UFO</span></div>
              <ul class="header-nav">
                  <li><a href="https://github.com/ufo-project/whitepaper/blob/master/UFO.whitepaper.pdf" target="_blank">Whitepaper</a></li>
                  <li><a href="https://github.com/ufo-project/ufochain/releases" target="_blank">Wallet</a></li>
                  <li><a href="http://explorer.ufo.link" target="_blank">Explorer</a></li>
                  <li>
                      <a href="javascript:;">Pool</a>
                      <div class="nav-menu">
                          <ul>
                              <li><a href="http://mainnet-pool01.ufo.link/#/home" target="_blank">UFO.Pool</a></li>
                              <li class="line"></li>
                              <li><a href="https://www.666pool.cn/" target="_blank">666pool</a></li>
                              <li class="line"></li>
                              <li><a href="http://ufo.zettapool.com/" target="_blank">Zettapool</a></li>
                              <li class="line"></li>
                              <li><a href="http://web.666ufo.com:90/#/home" target="_blank">666UFO</a></li>
                              <li class="line"></li>
                              <li><a href="http://ufo.52hash.com/#/home" target="_blank">52hash</a></li>
                              <li class="line"></li>
                              <li><a href="http://www.alienpools.com:8888/#/home" target="_blank">Alienspool</a></li>
                              <li class="line"></li>
                              <li><a href="http://www.ufopool.top/" target="_blank">TOP</a></li>
                              <li class="line"></li>
                              <li><a href="http://ufopools.vip/" target="_blank">VIP</a></li>
                          </ul>
                      </div>
                  </li>
                  <li><a href="https://github.com/ufo-project" target="_blank">Github</a></li>
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

.router-content {
    width:1400px;
    height:3000px;
    background-color:rgba(248,249,250,1);
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

/*.site-header .header-nav {*/
  /*display: flex;*/
/*}*/
/*.site-header .header-nav li {*/
  /*margin-left: 35px;*/
/*}*/
/*.site-header .header-nav li  a {*/
  /*position: relative;*/
  /*display: flex;*/
  /*align-items: center;*/
  /*overflow: hidden;*/
  /*color: white;*/
  /*height: 80px;*/
  /*opacity: 0.8;*/
  /*transition: all 0.3s ease-in-out;*/
/*}*/
/*.site-header .header-nav li a.router-link-active::before {*/
  /*content: "";*/
  /*position: absolute;*/
  /*left: 0;*/
  /*right: 0;*/
  /*bottom: 0;*/
  /*height: 4px;*/
  /*background-color: #1d7cf2;*/
/*}*/
/*.site-header .header-nav li a:hover, .site-header .header-nav li a.router-link-active {*/
  /*color: #1d7cf2;*/
  /*opacity: 1;*/
/*}*/

.site-header .header-nav {
    display: flex;
}

.site-header .header-nav > li {
    position: relative;
    margin-left: 35px;
}

.site-header .header-nav > li > a {
    position: relative;
    display: block;
    overflow: hidden;
    color: white;
    padding: 5px 0;
    opacity: 0.8;
    transition: all 0.3s ease-in-out;
}

.site-header .header-nav > li .nav-menu {
    position: absolute;
    left: 0;
    padding-top: 10px;
    transform: translateY(-5px);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease-in-out;
}

.site-header .header-nav > li .nav-menu ul {
    background-color: #1d7cf2;
    border-radius: 6px;
    position: relative;
}

.site-header .header-nav > li .nav-menu ul::before {
    content: "";
    position: absolute;
    left: 13px;
    top: -5px;
    width: 0;
    height: 0;
    border-width: 0 5px 5px 5px;
    border-style: solid;
    border-color: transparent transparent #1d7cf2 transparent;
}

.site-header .header-nav > li .nav-menu .line {
    height: 1px;
    border-bottom: 1px dotted rgba(255, 255, 255, 0.2);
}

.site-header .header-nav > li .nav-menu a {
    display: block;
    padding: 10px 20px;
    white-space: nowrap;
    transition: all 0.3s;
}

.site-header .header-nav > li .nav-menu a:hover {
    background-color: rgba(0, 0, 0, 0.2);
}

.site-header .header-nav > li:hover > a {
    opacity: 1;
    color: #1d7cf2;
}

.site-header .header-nav > li:hover .nav-menu {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
}

</style>
