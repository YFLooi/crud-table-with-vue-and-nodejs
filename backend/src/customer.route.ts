import { Request, Response, Router } from "express";
import { body } from "express-validator";
import CustomerModel from "./customer.model";
import _ from "lodash";
import { TradingPermissions } from "./customer.type";
import { getExistingCustomerProfile } from "./customer.service";

const CustomerRouter = Router();

CustomerRouter.post(
  `/register-new-customer`,
  body("name").isString(),
  body("email").isEmail(),
  body("mobileNum").isString().optional(),
  body("tradingPermissions")
    .isArray()
    .contains(Object.values(TradingPermissions)),
  async (req: Request, res: Response) => {
    const { name, email, mobileNum, tradingPermissions } = req.body;

    console.log(
      `Request made to create record of new customer with:
      name == "${name}"
      email == "${email}"
      mobileNum == "${mobileNum}"
      tradingPermissions == "${tradingPermissions}"`
    );

    // Let's use customer's email as unique identifier
    try {
      const existingCustomerProfile = await getExistingCustomerProfile(email);

      if (!_.isEmpty(existingCustomerProfile)) {
        throw Error(`Customer profile already exists for email "${email}"`);
      }

      console.log(
        `No existing customer profile for email "${email}". Creating a new one`
      );
      await CustomerModel.create({
        name: name,
        email: email,
        mobileNum: mobileNum,
        tradingPermissions: tradingPermissions,
      });

      return res
        .status(200)
        .json({ message: `New entry created for customer "${email}"` });
    } catch (err) {
      return res.status(400).json({
        message: `Failed to create new entry created for customer "${email}". Err: ${err.message}`,
      });
    }
  }
);

CustomerRouter.post(
  `/get-all-customers`,
  async (req: Request, res: Response) => {
    console.log(`Getting details on all customers`);

    try {
      const customers = await CustomerModel.find({});

      return res.status(200).json(customers);
    } catch (err) {
      return res.status(400).json({
        message: `Failed to retrieve profile of all customers. Err: ${err.message}`,
      });
    }
  }
);

CustomerRouter.post(
  `/update-customer-details`,
  body("id").isString(),
  body("name").isString().optional(),
  body("email").isEmail().optional(),
  body("mobileNum").isString().optional(),
  body("tradingPermissions")
    .isArray()
    .contains(Object.values(TradingPermissions)),
  async (req: Request, res: Response) => {
    const customerId = req.body.id;
    const updateObj = { ...req.body };
    delete updateObj.id;

    console.log(
      `Updating details on customer. Details passed in: ${JSON.stringify(
        req.body,
        null,
        2
      )}`
    );

    try {
      const updatedCustomer = await CustomerModel.findOneAndUpdate(
        {
          _id: customerId,
        },
        updateObj
      );

      return res.status(200).json(updatedCustomer);
    } catch (err) {
      return res.status(400).json({
        message: `Failed to update customer profile of id ${customerId}. Err: ${err.message}`,
      });
    }
  }
);

CustomerRouter.post(
  `/delete-customers`,
  body("id").isArray(),
  async (req: Request, res: Response) => {
    const customerIds: string[] = req.body.id;

    console.log(
      `Deleting customer profile of ids ${JSON.stringify(customerIds, null, 2)}`
    );

    try {
      await CustomerModel.deleteMany({
        _id: { $in: customerIds },
      });

      return res
        .status(200)
        .json({ message: "Sucessfully deleted all supplied customer ids" });
    } catch (err) {
      return res.status(400).json({
        message: `Failed to delete all supplied customer ids. Err: ${err.message}`,
      });
    }
  }
);

export default CustomerRouter;
