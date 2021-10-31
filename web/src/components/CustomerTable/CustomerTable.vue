<template>
  <div>
    <customer-details-display
      :selectedCustomersDetails="selectedCustomersDetails"
      @toggleCustomersDetailsPopup="toggleCustomersDetailsPopup"
    />
    <h2 class="my-3">Current customers</h2>
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
            <td
              @click="toggleCustomersDetailsPopup(customer._id)"
              class="cursor-pointer"
            >
              <i
                class="bi-search"
                role="img"
                aria-label="view-customer-details"
              ></i>
            </td>
            <td @click="deleteCustomer(customer._id)" class="cursor-pointer">
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
  </div>
</template>

<script>
  import _ from "lodash";
  import moment from "moment";
  import CustomerDetailsDisplay from "./CustomerDetailsDisplay";

  export default {
    name: "CustomerTable",
    components: {
      CustomerDetailsDisplay,
    },
    data() {
      return {
        customers: [],
        numRowsPerPage: 5,
        currentPageStartRowNum: 0,
        currentRows: [],
        selectedCustomersDetails: {},
      };
    },
    methods: {
      async deleteCustomer(customerId) {
        try {
          const response = await fetch(
            "http://localhost:5000/customer/delete-customers",
            {
              method: "POST",
              body: JSON.stringify({
                id: [customerId],
              }),
              headers: { "Content-type": "application/json; charset=UTF-8" },
            }
          );
          const result = await response.json();

          if (response.status == "200") {
            console.log(`Sucessfully deleted customer`);

            // Show a new table without the deleted entry
            this.refreshTable();
          } else {
            throw new Error(JSON.stringify(result, null, 2));
          }
        } catch (error) {
          console.error(`Unable to delete customer. Err: ${error.message}`);
        }
      },
      toggleCustomersDetailsPopup(customerId) {
        if (customerId) {
          const customersDetails = this.customers.filter(
            (customer) => customer._id == customerId
          )[0];
          this.selectedCustomersDetails = {
            id: customersDetails._id,
            name: customersDetails.name,
            email: customersDetails.email,
            "trading permissions": customersDetails.tradingPermissions
              .join(", ")
              .toUpperCase(),
            "created at": moment(customersDetails.createdAt).format(
              "DD-MMM-YYYY"
            ),
            "updated on": moment(customersDetails.updatedAt).format(
              "DD-MMM-YYYY"
            ),
          };
        } else {
          this.selectedCustomersDetails = {};
        }
      },
      refreshTable() {
        console.log(`Request made to refresh table data`);
        this.getCustomers();
      },
      changeRowsPerPage(rowsPerPage) {
        console.log(`changeResultsPerPage to ${rowsPerPage}`);
        this.numRowsPerPage = rowsPerPage;

        // Loads the table again but with new num rows per page
        this.paginate("reset");
      },
      paginate(input) {
        if (
          input == "prev" &&
          this.currentPageStartRowNum - this.numRowsPerPage >= 0
        ) {
          const newRowStartNum =
            this.currentPageStartRowNum - this.numRowsPerPage;

          this.currentRows = this.customers.slice(
            newRowStartNum,
            newRowStartNum + this.numRowsPerPage
          );

          // update currentPageStartRowNum
          this.currentPageStartRowNum = newRowStartNum;
        }
        if (
          input == "next" &&
          this.currentPageStartRowNum + this.numRowsPerPage <
            this.customers.length
        ) {
          const newRowStartNum =
            this.currentPageStartRowNum + this.numRowsPerPage;

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

          this.customers = customers;
        } catch (error) {
          console.error(
            `Unable to retrive customer info. Err: ${error.message}`
          );
        }
      },
    },
    mounted() {
      if (_.isEmpty(this.customers)) {
        this.getCustomers();
      } else {
        // Sometimes, the table does not load when the page refreshes
        // although props.customers is loaded. This solves it
        this.refreshTable();
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
