import { Schema, model, models } from "mongoose";

const fabricSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  id: { type: Number, required: true },
});

const Fabric = models.Fabric || model("Fabric", fabricSchema);
export default Fabric;
