<template>
  <div>
    <h1>Customer management system</h1>
    <customer-table />
  </div>
</template>

<script>
  import CustomerTable from "./components/CustomerTable.vue";

  export default {
    name: "App",
    components: {
      CustomerTable,
    },
    data() {},
    methods: {
      async getCustomers() {
        let customers;
        try {
          const response = await fetch(
            "http://localhost:5000/customer/get-customers",
            {
              method: "POST",
              body: JSON.stringify({}),
              headers: { "Content-type": "application/json; charset=UTF-8" },
            }
          );
          customers = await response.json();

          console.log(
            `Sample of customer retrieved on component mount: ${JSON.stringify(
              [customers[0], customers[1]],
              null,
              2
            )}`
          );
          // this.employees = data;
        } catch (error) {
          console.error(
            `Unable to retrive customer info. Err: ${error.message}`
          );
        }
      },
    },
    mounted() {
      // loads table of customers on page load
      this.getCustomers();
    },
  };
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
