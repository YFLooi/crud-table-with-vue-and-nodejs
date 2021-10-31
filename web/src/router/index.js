import { createRouter, createWebHashHistory } from "vue-router";
import CustomerRegistrationForm from "../components/CustomerRegistrationForm";
import CustomerTable from "../components/CustomerTable";
import PageNotFound from "../components/PageNotFound";

const routes = [
  {
    path: "/",
    name: "Home",
    component: CustomerTable,
  },
  {
    path: "/customer-registration-form",
    name: "CustomerRegistrationForm",
    component: CustomerRegistrationForm,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: PageNotFound,
  },
];

const router = createRouter({
  // createWebHashHistory uses a base-url as its basis
  history: createWebHashHistory(),
  routes,
});

export default router;
