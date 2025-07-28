import { models, Schema, model } from "mongoose";

const testimonialSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  position: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: String,
    required: true,
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
});

const Testimonial =
  models.Testimonial || model("Testimonial", testimonialSchema);

export default Testimonial;
