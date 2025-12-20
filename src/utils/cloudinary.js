import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        // Upload the cloudinary file
        const respone = await cloudinary.uploader.upload(localFilePath, {resource_type: "auto"})

        // file has been uploaded successfully
        console.log("File is uploaded on cloudinary", respone.url);
        return respone;
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed.
    }
}

export {uploadOnCloudinary}