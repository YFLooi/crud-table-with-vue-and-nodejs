<template>
  <div>
    <h2 class="my-3">New customer registration</h2>
    <form @submit.prevent="handleSubmit">
      <div class="d-flex flex-row justify-content-center">
        <div class="mx-2">
          <label for="customer-name">Name</label>
          &nbsp;&nbsp;
          <input
            id="customer-name"
            placeholder="Shi Fu"
            v-model="customer.name"
            type="text"
            class="rounded"
            :class="{ 'has-error': submitting && invalidName }"
            @focus="clearStatus"
            @keypress="clearStatus"
          />
        </div>
        <div class="mx-2">
          <label for="customer-email">Email</label>
          &nbsp;&nbsp;
          <input
            id="customer-email"
            placeholder="shifu@company.my"
            v-model="customer.email"
            type="text"
            class="rounded"
            :class="{ 'has-error': submitting && invalidEmail }"
            @focus="clearStatus"
            @keypress="clearStatus"
          />
        </div>
      </div>
      <div class="my-3">
        <div>
          <div class="mb-0"><b>Trading permissions</b></div>
        </div>
        <div class="d-flex flex-row justify-content-center">
          <div
            v-for="(name, index) of this.availableTradingProducts"
            :key="[`traing-product-${index}`]"
            class="mx-1"
          >
            <input
              type="checkbox"
              v-model="customer.tradingPermissions"
              :id="[`trading-product-${index}`]"
              :value="name"
            />
            &nbsp;&nbsp;
            <label
              class="trading-product-label"
              :for="[`trading-product-${index}`]"
              >{{ name }}</label
            >
          </div>
        </div>
      </div>

      <!-- Error checking -->
      <div class="my-3">
        <p v-if="error && submitting" class="error-message">
          ❗ Error:{{ this.errorMsg }}
        </p>
        <p v-if="success" class="success-message">
          ✅ Customer successfully added
        </p>
      </div>

      <button type="submit" class="btn btn-primary">Add customer</button>
    </form>
  </div>
</template>

<script>
  import _ from "lodash";

  export default {
    name: "CustomerRegistrationForm",
    data() {
      return {
        customer: {
          name: "",
          email: "",
          tradingPermissions: [],
        },
        // submitting, error, and false are possible states for the form after verification
        submitting: false,
        error: false,
        errorMsg: "",
        success: false,
        availableTradingProducts: [
          "bursa-main",
          "bursa-futures",
          "bursa-bonds",
          "sgx",
        ],
      };
    },
    methods: {
      handleSubmit() {
        this.submitting = true;
        this.clearStatus();

        // Error checking
        if (this.invalidName || this.invalidEmail || this.invalidPermissions) {
          if (this.invalidName) {
            this.errorMsg = `${this.errorMsg} Enter a valid name.`;
          }
          if (this.invalidEmail) {
            this.errorMsg = `${this.errorMsg} Enter a valid email.`;
          }
          if (this.invalidPermissions) {
            this.errorMsg = `${this.errorMsg} Choose trading permission(s).`;
          }
          this.error = true;
          return;
        }

        // Creates customer profile in db
        this.addCustomer(this.customer);

        console.log(
          `New customer info submitted successfully. Setting this.success == true`
        );
        this.success = true;
      },
      clearStatus() {
        this.success = false;
        this.error = false;
        this.errorMsg = "";
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
    computed: {
      // methods to verify form inputs which trigger upon calling handleSubmit()
      invalidName() {
        return this.customer.name === "";
      },
      invalidEmail() {
        return this.customer.email === "" || !this.customer.email.includes("@");
      },
      invalidPermissions() {
        return _.isEmpty(this.customer.tradingPermissions);
      },
    },
  };
</script>

<style scoped>
  .error-message {
    color: #d33c40;
  }
  .success-message {
    color: #32a95d;
  }
  .has-error {
    border: 2px solid red;
  }
</style>
