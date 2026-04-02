import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.Cloudinary_name,
  api_key: process.env.Cloudinary_api_key ,
  api_secret: process.env.Cloudinary_secret_key,
});

console.log('Cloudinary configured with cloud name:', process.env.Cloudinary_name);

export default cloudinary;