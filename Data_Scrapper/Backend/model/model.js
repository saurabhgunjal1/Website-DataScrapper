import mongoose from "mongoose";
import { type } from "os";
import { v4 as uuidv4 } from "uuid";
const companySchema = new mongoose.Schema({
  Company: {
    id: { type: String, default: uuidv4, unique: true },
    name: { type: String, required: true },
    logo: { type: String, required: true },
  },
  Social_Profile: {
    instagram: { type: String },
    facebook: { type: String },
    X: { type: String }, // Twitter is now referred to as "X"
    linkedin: { type: String },
  },
  Description: { type: String },
  Address: { type: String },
  Phone_No: { type: String },
  Email: { type: String, required: true },
});

const Company = mongoose.model("Company", companySchema);

export default Company;
