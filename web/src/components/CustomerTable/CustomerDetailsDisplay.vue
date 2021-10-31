<template>
  <div>
    <div id="customer-details-display">
      <div id="customer-details-card" class="px-3 py-3">
        <h2>Customer details</h2>
        <table class="table table-hover">
          <tbody id="customers-table-body">
            <tr
              v-for="(value, key) in selectedCustomersDetails"
              :key="[`customer-${key}`]"
            >
              <td>{{ key.toUpperCase().trim() }}</td>
              <td>{{ value ? value : "n/a" }}</td>
            </tr>
          </tbody>
        </table>
        <button
          type="button"
          class="btn btn-primary mx-1"
          style="width: 6rem"
          @click="this.$emit('toggleCustomersDetailsPopup', '')"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from "lodash";

  export default {
    name: "CustomerDetailsDisplay",
    props: {
      selectedCustomersDetails: Object,
    },
    data() {
      return {
        customersDetails: {},
      };
    },
    watch: {
      selectedCustomersDetails: function (val) {
        if (_.isEmpty(val)) {
          document.getElementById("customer-details-display").style.display =
            "none";
        } else {
          document.getElementById("customer-details-display").style.display =
            "block";
        }
      },
    },
  };
</script>

<style scoped>
  #customer-details-display {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    min-width: 100vw;
    min-height: 125%;
    background-color: rgb(0, 0, 0, 0.5);
  }
  #customer-details-card {
    position: relative;
    background-color: rgb(255, 255, 255, 1);
    width: 90vw;
    margin: 5rem auto;
    min-height: 20vh;
  }
  .cursor-pointer {
    cursor: pointer;
  }
</style>
