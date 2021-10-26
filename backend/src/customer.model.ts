import mongoose, { Schema, Document } from "mongoose";

export interface ICustomer extends Document {
  email: string;
  permissions: { featureName: string; canAccess: boolean }[];
}

const customerSchema: Schema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    mobile: { type: String }, // Expect "+60123456789"
    tradingPermissions: { type: Array },
  },
  { timestamps: true }
);

interface CustomerModelInterface extends mongoose.Model<ICustomer> {}

export default mongoose.model<ICustomer, CustomerModelInterface>(
  "customers",
  customerSchema
);
