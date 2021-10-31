<template>
  <div>
    <h1>Customer management system</h1>
    <CustomerTable :customers="customers" @getCustomers="getCustomers" />
    <CustomerRegistrationForm @add:customer="addCustomer" />
  </div>
</template>

<script>
  import CustomerTable from "./components/CustomerTable.vue";
  import CustomerRegistrationForm from "./components/CustomerRegistrationForm.vue";

  export default {
    name: "App",
    components: {
      CustomerTable,
      CustomerRegistrationForm,
    },
    data() {
      return {
        customers: [],
      };
    },
    methods: {
      async getCustomers() {
        try {
          const response = await fetch(
            "http://localhost:5000/customer/get-customers",
            {
              method: "POST",
              body: JSON.stringify({}),
              headers: { "Content-type": "application/json; charset=UTF-8" },
            }
          );
          const customers = await response.json();

          console.log(
            `Sample of customer retrieved on component mount: ${JSON.stringify(
              [customers[0], customers[5]],
              null,
              2
            )}`
          );
          this.customers = customers;
        } catch (error) {
          console.error(
            `Unable to retrive customer info. Err: ${error.message}`
          );
        }
      },
      async addCustomer(customer) {
        try {
          const response = await fetch(
            "http://localhost:5000/customer/register-new-customer",
            {
              method: "POST",
              body: JSON.stringify(customer),
              headers: { "Content-type": "application/json; charset=UTF-8" },
            }
          );
          const data = await response.json();
          const status = response.status;

          if (status == "200") {
            console.log(
              `Successfully saved customer of email ${
                customer.email
              }. Info: ${JSON.stringify(data, null, 2)}`
            );
          } else {
            console.log(
              `Failed to save customer of email ${
                customer.email
              }. Info: ${JSON.stringify(data, null, 2)}`
            );
          }
        } catch (error) {
          console.error(error);
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
