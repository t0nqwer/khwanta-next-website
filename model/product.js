import { Schema, model, models } from "mongoose";
import Fabric from "@model/fabric";
import Brand from "@model/brand";
import Category from "@model/category";

const subImageSchema = new Schema({
  url: { type: String, required: true },
  show: { type: Boolean, required: true },
  position: { type: String },
});
const subDetailSchema = new Schema({
  id: { type: String, required: true },
  detail: { type: String, required: true },
});
const ProductSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  name: { type: String, required: true },
  fabric: { type: Schema.Types.ObjectId, ref: Fabric },
  price: { type: Number, required: true },
  detail: { type: [subDetailSchema], required: true },
  description: { type: String },
  image: { type: [subImageSchema], required: true },
  category: { type: Schema.Types.ObjectId, ref: Category },
  brand: { type: Schema.Types.ObjectId, ref: Brand },
  size: { type: Array, required: true },
});

const Product = models.Product || model("Product", ProductSchema);
export default Product;
