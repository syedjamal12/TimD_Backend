import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Pro } from "../models/Property.js";
import ErrorHandler from "../middlewares/error.js";
import cloudinary from "cloudinary";

export const getAll = catchAsyncErrors(async (req, res, next) => {
  const jobs = await Pro.find();
  res.status(200).json({
    success: true,
    jobs,
  });
});


export const postProperty = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Image!", 400));
  }
  const { Image } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(Image.mimetype)) {
    return next(new ErrorHandler("File Format Not Supported!", 400));
  }
 
  const {
    Name,
    description,
    address,
    Number
  } = req.body;

  if (!Name || !description || !address || !Number || !Image) {
    return next(new ErrorHandler("Please provide full Property details.", 400));
  }

 

  const cloudinaryResponse = await cloudinary.uploader.upload(
    Image.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(
      new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500)
    )
  }
  
  const job = await Pro.create({
   Name,
    description,
    address,
    Number,
    Image: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "Property Posted Successfully!",
    job,
  });
});






export const update= catchAsyncErrors(async (req, res, next) => {
 
  const { id } = req.params;
  let job = await Pro.findById(id);
  if (!job) {
    return next(new ErrorHandler("OOPS! Property not found.", 404));
  }
  job = await Pro.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Property Updated!",
  });
});


export const deleteP = catchAsyncErrors(async (req, res, next) => {
  
  const { id } = req.params;
  let job = await Pro.findById(id);
  if (!job) {
    return next(new ErrorHandler("OOPS! Property not found.", 404));
  }
  job = await Pro.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "Property Deleted!",
  });
});



