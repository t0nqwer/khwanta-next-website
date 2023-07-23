import { Schema, model, models } from "mongoose";

const productSetSchema = new Schema({
  name: { type: String, required: true },
});

const ProductSet = models.ProductSet || model("ProductSet", productSetSchema);
export default ProductSet;
