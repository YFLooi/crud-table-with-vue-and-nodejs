<template>
  <div>
    <h1>Paginated table of planets</h1>
    <!-- <div style="width: 75vw; border: 2.5px solid black">
      <div id="planetsTableContainer">
        <table id="planetsTable">
          <thead id="planetsTable-head">
            <th>Name</th>
            <th>Email</th>
            <th></th>
            <th></th>
          </thead>
          <tbody id="planetsTable-body"></tbody>
        </table>
        <div id="nav">
          <button
            id="paginate-prev"
            style="visibility: hidden"
            onclick="paginate('prev')"
          >
            Prev
          </button>
          <button id="paginate-next" onclick="paginate('next')">Next</button>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
  export default {
    name: "CustomerTable",
    props: {},
    data() {
      return {
        rowStart: 0,
        rowEnd: 0,
      };
    },
    methods: {
      // paginate(input) {
      //   if (input == "prev") {
      //     rowStart -= 11;
      //     rowEnd -= 11;
      //   } else if (input == "next") {
      //     rowStart += 11;
      //     rowEnd += 11;
      //   }
      //   populateTable(rowStart, rowEnd);
      //   // Show/hide the pagination buttons
      //   const paginatePrevButton = document.getElementById("paginate-prev");
      //   const paginateNextButton = document.getElementById("paginate-next");
      //   if (rowStart <= 0) {
      //     paginatePrevButton.style.visibility = "hidden";
      //     paginateNextButton.style.visibility = "visible";
      //   }
      //   if (rowEnd >= planetList.length) {
      //     paginatePrevButton.style.visibility = "visible";
      //     paginateNextButton.style.visibility = "hidden";
      //   }
      // },
      // populateTable(start, end) {
      //   // Record for later
      //   rowStart = start;
      //   rowEnd = end;
      //   console.log(
      //     `Populating table with planetList elements ${rowStart} up to ${rowEnd}`
      //   );
      //   const planetsToInclude = planetList.slice(rowStart, rowEnd);
      //   const target = document.getElementById("planetsTable-body");
      //   // Clear previous child <tr>s
      //   // https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
      //   target.textContent = "";
      //   console.log(`Planets to populate..`);
      //   console.log(planetsToInclude);
      //   for (const planet of planetsToInclude) {
      //     const row = document.createElement("tr");
      //     const params = [
      //       "name",
      //       "climate",
      //       "diameter",
      //       "gravity",
      //       "terrain",
      //       "population",
      //       "surface_water",
      //     ];
      //     params.forEach((param) => {
      //       const td = document.createElement("td");
      //       td.innerHTML = planet[param];
      //       row.appendChild(td);
      //     });
      //     target.appendChild(row);
      //   }
      // },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
