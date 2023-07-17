import { Schema, model, models } from "mongoose";

const aboutSchema = new Schema({
  address: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  facebook: {
    type: String,
    required: true,
  },
  instagram: {
    type: String,
    required: true,
  },
});

const About = models.About || model("About", aboutSchema);
export default About;
