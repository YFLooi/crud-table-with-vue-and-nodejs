import CustomerModel from "./customer.model";
import _ from "lodash";

export async function getExistingCustomerProfile(email: string) {
  const existingCustomerProfile = await CustomerModel.findOne({
    email: email,
  });

  console.log(
    `Obtained customer profile: ${JSON.stringify(
      existingCustomerProfile,
      null,
      2
    )}`
  );
  if (_.isEmpty(existingCustomerProfile)) {
    return {};
  } else {
    return existingCustomerProfile;
  }
}
