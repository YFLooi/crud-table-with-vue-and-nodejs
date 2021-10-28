import mongoose, { Document, Schema, Model } from "mongoose";

export interface ICustomer extends Document {
  name: string;
  email: string;
  mobile: string;
  permissions: { featureName: string; canAccess: boolean }[];
}

const customersSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    mobile: { type: String }, // Expect "+60123456789"
    tradingPermissions: { type: Array },
  },
  { timestamps: true }
);

interface CustomerModelInterface extends Model<ICustomer> {}

export default mongoose.model<ICustomer, CustomerModelInterface>(
  "customers",
  customersSchema
);
