import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

let isConfigured = false;

const configureCloudinary = () => {
    if (isConfigured) return;

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    isConfigured = true;
};

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        configureCloudinary(); // 🔥 configure AFTER dotenv

        const absolutePath = path
            .resolve(localFilePath)
            .replace(/\\/g, "/");

        const response = await cloudinary.uploader.upload(absolutePath, {
            resource_type: "auto",
        });

        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }

        console.log("✅ Uploaded to Cloudinary:", response.secure_url);
        return response;

    } catch (error) {
        console.error("❌ Cloudinary error:", error.message);
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return null;
    }
};

export { uploadOnCloudinary };
