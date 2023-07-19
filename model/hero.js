import { Schema, model, models } from "mongoose";

const heroSchema = new Schema({
  Image: Array,
  Data: Object,
});

const Hero = models.Hero || model("Hero", heroSchema);
export default Hero;
