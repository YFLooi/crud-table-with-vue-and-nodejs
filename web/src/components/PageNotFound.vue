<template>
  <div class="my-3">
    <h1>Page not found</h1>
    <a @click="this.$router.push({ path: '/' })"><u>Back to home</u></a>
  </div>
</template>

<script>
  export default {
    name: "PageNotFound",

    data() {
      return {
        state: "",
      };
    },
    methods: {},
    mounted() {},
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  a u {
    color: blue;
    cursor: pointer;
  }
</style>
