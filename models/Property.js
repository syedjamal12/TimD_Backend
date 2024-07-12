import mongoose from "mongoose";

const Property = new mongoose.Schema({
   Name: {
    type: String,
    required: [true, "Please provide a title."],
    minLength: [3, "Title must contain at least 3 Characters!"],
    maxLength: [30, "Title cannot exceed 30 Characters!"],
  },
  description: {
    type: String,
    required: [true, "Please provide decription."],
    
  },
  address: {
    type: String,
    required: [true, "Please provide a category."],
  },
  Number: {
    type: Number,
    required: [true, "Please enter your Phone Number!"],
  },
  Image: {
    public_id: String,
    url: String,
  },
 
 
});

export const Pro = mongoose.model("Pro", Property);