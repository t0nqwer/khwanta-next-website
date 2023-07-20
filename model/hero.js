import { Schema, model, models } from "mongoose";
import Product from "@model/product";

const recommendSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: Product },
});
const heroSchema = new Schema({
  Image: Array,
  Data: Object,
  recommend: [recommendSchema],
});

const Hero = models.Hero || model("Hero", heroSchema);
export default Hero;
