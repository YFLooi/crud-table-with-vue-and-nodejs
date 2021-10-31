import { createRouter, createWebHashHistory } from "vue-router";
import CustomerRegistrationForm from "../components/CustomerRegistrationForm";
import CustomerTable from "../components/CustomerTable/CustomerTable";
import PageNotFound from "../components/PageNotFound";

const routes = [
  {
    path: "/",
    name: "CustomerTable",
    component: CustomerTable,
    meta: {
      title: "Customers table",
      icon: "",
    },
  },
  {
    path: "/customer-registration-form",
    name: "CustomerRegistrationForm",
    component: CustomerRegistrationForm,
    meta: {
      title: "Registration form",
      icon: "",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: PageNotFound,
    meta: {
      title: "Error",
      icon: "",
    },
  },
];

const router = createRouter({
  // createWebHashHistory uses a base-url as its basis
  history: createWebHashHistory(),
  routes,
});

export default router;
