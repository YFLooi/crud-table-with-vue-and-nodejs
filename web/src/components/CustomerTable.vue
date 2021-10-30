<template>
  <div>
    <h1>Current customers</h1>
    <div id="table-container">
      <table id="customers-table" class="table table-hover table-responsive-sm">
        <thead>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">View details</th>
          <th scope="col">Delete</th>
        </thead>
        <tbody id="customers-table-body">
          <tr
            v-for="(customer, index) in currentRows"
            :key="[`customer-${index}`]"
          >
            <td>{{ customer.name ? customer.name : "n/a" }}</td>
            <td>{{ customer.email ? customer.email : "n/a" }}</td>
            <td @click="goToCustomerDetailsPage()">
              <i
                class="bi-search"
                role="img"
                aria-label="view-customer-details"
              ></i>
            </td>
            <td>
              <i
                class="bi-x-octagon"
                role="img"
                aria-label="delete-customer"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="nav" class="d-flex flex-row justify-content-end px-3 py-3">
      <div class="mx-1">
        <button
          type="button"
          class="btn btn-primary mx-1"
          style="width: 6rem"
          @click="paginate('prev')"
        >
          Previous
        </button>
        <button
          type="button"
          class="btn btn-primary mx-1"
          style="width: 6rem"
          @click="paginate('next')"
        >
          Next
        </button>
      </div>
      <div class="mx-1">
        <button type="button" class="btn btn-success" @click="refreshTable()">
          Refresh table
        </button>
      </div>
      <div class="px-3">
        <div>Results per page</div>
        <div class="d-flex flex-row justify-content-center">
          <div class="num-rows-button" @click="changeRowsPerPage(5)">
            <u>5</u>
          </div>
          &nbsp;&nbsp;
          <div class="num-rows-button" @click="changeRowsPerPage(10)">
            <u>10</u>
          </div>
          &nbsp;&nbsp;
          <div class="num-rows-button" @click="changeRowsPerPage(25)">
            <u>25</u>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from "lodash";

  export default {
    name: "CustomerTable",
    props: {
      customers: Array,
    },
    data() {
      return {
        numRowsPerPage: 5,
        currentPageStartRowNum: 0,
        currentRows: [],
      };
    },
    methods: {
      // For vue-router implementation
      // goToCustomerDetailsPage() {
      //   this.$router.push({ path: "/customer-details" });
      // },
      refreshTable() {
        console.log(`Request made to refresh table data`);
        this.$emit("getCustomers");
      },
      changeRowsPerPage(rowsPerPage) {
        console.log(`changeResultsPerPage to ${rowsPerPage}`);
        this.numRowsPerPage = rowsPerPage;

        // Loads the table again but with new num rows per page
        this.paginate("reset");
      },
      paginate(input) {
        console.log(`pagination triggered with input "${input}"`);
        console.log(`currentPageStartRowNum: "${this.currentPageStartRowNum}"`);
        if (
          input == "prev" &&
          this.currentPageStartRowNum - this.numRowsPerPage >= 0
        ) {
          const newRowStartNum =
            this.currentPageStartRowNum - this.numRowsPerPage;
          console.log(
            `New slice range: ${newRowStartNum}-${
              newRowStartNum + this.numRowsPerPage
            }`
          );
          this.currentRows = this.customers.slice(
            newRowStartNum,
            newRowStartNum + this.numRowsPerPage
          );

          // update currentPageStartRowNum
          this.currentPageStartRowNum = newRowStartNum;
          console.log(
            `New currentPageStartRowNum: "${this.currentPageStartRowNum}"`
          );
        }
        if (
          input == "next" &&
          this.currentPageStartRowNum + this.numRowsPerPage <
            this.customers.length
        ) {
          const newRowStartNum =
            this.currentPageStartRowNum + this.numRowsPerPage;
          console.log(
            `New slice range: ${newRowStartNum}-${
              newRowStartNum + this.numRowsPerPage
            }`
          );
          this.currentRows = this.customers.slice(
            newRowStartNum,
            newRowStartNum + this.numRowsPerPage
          );

          // update currentPageStartRowNum
          this.currentPageStartRowNum = newRowStartNum;
        }
        if (input == "reset") {
          // Triggers on page refresh/inital load
          this.currentRows = this.customers.slice(0, this.numRowsPerPage);
          this.currentPageStartRowNum = 0;
        }
      },
    },
    mounted() {
      if (_.isEmpty(this.customers)) {
        // The equivalent of calling the parent's function from child
        console.log(`props.customers is empty. Attempting to get it`);
        this.$emit("getCustomers");
      }
    },
    watch: {
      // loads table of customers when props.customers is updated
      customers: function (val, oldVal) {
        console.log(`
          props.customers is updated.
          Num New val: ${val.length}
          Num Old val: ${oldVal.length}
        `);
        this.paginate("reset");
      },
      currentRows: function () {
        console.log(`Customer table paginated`);
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #table-container {
    display: flex;
    justify-content: center;
  }
  #customers-table {
    max-width: 96vw;
    border: 2.5px solid black;
  }
  .num-rows-button {
    color: blue;
    cursor: pointer;
  }
</style>
