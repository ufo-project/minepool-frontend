<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

localStorage.setItem('lang', 'en')

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html, body {
  margin: 0px;
  padding: 0px;
}
</style>
