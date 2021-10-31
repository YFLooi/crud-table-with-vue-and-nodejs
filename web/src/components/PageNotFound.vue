<template>
  <div class="my-3">
    <h1>Page not found</h1>
    <a @click="this.$router.push({ path: '/' })"><u>Back to home</u></a>
  </div>
</template>

<script>
  export default {
    name: "PageNotFound",
  };
</script>

<style scoped>
  a u {
    color: blue;
    cursor: pointer;
  }
</style>
