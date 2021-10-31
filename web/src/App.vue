<template>
  <div id="app">
    <h1>Customer management system</h1>
    <nav>
      <router-link to="/">Table of customers</router-link>
      &nbsp;&nbsp;
      <router-link to="/customer-registration-form"
        >Customer Registration Form</router-link
      >
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "App",
    components: {},
    data() {
      return {
        data: [],
      };
    },
    methods: {},
    mounted() {},
  };
</script>

<style>
  /* Overall styles for the enitre #app */
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
