<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <cookie-alert :message= "cookieMessage" @accepted="showThanks"></cookie-alert>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import 'cookie-alert-demo'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data: function() {
    return {
      cookieMessage: 'We use cookies, but respect your privacy!'
    }
  },
  methods: {
    showThanks: function() {
      alert("Thanks for accepting our cookie policy!");
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
