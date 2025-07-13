"use server";

import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcrypt";
import { connectToDatabase } from "@/lib/connectToDatabase";
import { allowedImageTypes } from "@/constant/statics";
import User from "@/models/User.model";
import { fileTypeFromBuffer } from "file-type";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "./verifyToken";
// import axios from "axios";
// import sharp from "sharp";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const LogoutFunc = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("userToken");
  redirect("/auth/signin");
};

const validateImageFile = (buffer: Buffer): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const fileType = await fileTypeFromBuffer(buffer);
      if (!fileType || !allowedImageTypes.includes(fileType.mime)) {
        resolve(false);
      } else {
        resolve(true);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const errResponse = async (message: string) => {
  return {
    success: false,
    message,
  };
};

const successResponse = async (message: string) => {
  return {
    success: true,
    message,
  };
};

const uploadImageToCloudinary = async (image: File, folderName: string) => {
  if (!allowedImageTypes.includes(image.type)) {
    await errResponse(
      "Invalid image format. Allowed formats: PNG, JPEG, JPG , GIF"
    );
  }

  const buffer = Buffer.from(await image.arrayBuffer());
  const isValidImage = await validateImageFile(buffer);
  if (!isValidImage) {
    await errResponse(
      "Invalid image format. Allowed formats: PNG, JPEG, JPG , GIF"
    );
  }

  const userFolderPath = `farah-studio/images/${folderName}`;

  const uploadResult = await cloudinary.uploader.upload(
    `data:${image.type};base64,${buffer.toString("base64")}`,
    {
      folder: userFolderPath,
      width: 500,
      height: 500,
      crop: "fill",
      gravity: "faces",
      use_filename: true,
      unique_filename: false,
      quality: "100",
      format: "webp",
    }
  );

  if (!uploadResult.secure_url || !uploadResult.public_id) {
    await errResponse("Failed to upload image to Cloudinary.");
  }

  return {
    imageUrl: uploadResult.secure_url,
    publicId: uploadResult.public_id,
  };
};

const uploadBannerToCloudinary = async (image: File, folderName: string) => {
  if (!allowedImageTypes.includes(image.type)) {
    await errResponse(
      "Invalid image format. Allowed formats: PNG, JPEG, JPG , GIF"
    );
  }

  const buffer = Buffer.from(await image.arrayBuffer());
  const isValidImage = await validateImageFile(buffer);
  if (!isValidImage) {
    await errResponse(
      "Invalid image format. Allowed formats: PNG, JPEG, JPG , GIF"
    );
  }
  const userFolderPath = `farah-studio/images/${folderName}`;

  const uploadResult = await cloudinary.uploader.upload(
    `data:${image.type};base64,${buffer.toString("base64")}`,
    {
      folder: userFolderPath,
      width: 1920,
      height: 1080,
      crop: "fill",
      gravity: "center",
      use_filename: true,
      unique_filename: false,
      quality: "100",
      format: "webp",
      timeout: 60000,
    }
  );

  if (!uploadResult.secure_url || !uploadResult.public_id) {
    await errResponse("Failed to upload image to Cloudinary.");
  }

  return {
    imageUrl: uploadResult.secure_url,
    publicId: uploadResult.public_id,
  };
};

const deleteImageFromCloudinary = async (publicId: string) => {
  await cloudinary.uploader.destroy(publicId);
};

const updateImageInCloudinary = async (
  image: File,
  folderName: string,
  publicId: string
) => {
  if (!allowedImageTypes.includes(image.type)) {
    await errResponse("Invalid image format. Allowed formats: PNG, JPEG, JPG");
  }

  if (publicId) {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      await errResponse("Failed to delete old image from Cloudinary.");
    }
  }

  const buffer = Buffer.from(await image.arrayBuffer());
  const isValidImage = await validateImageFile(buffer);
  if (!isValidImage) {
    await errResponse(
      "Invalid image format. Allowed formats: PNG, JPEG, JPG , GIF"
    );
  }
  const uploadResult = await cloudinary.uploader.upload(
    `data:${image.type};base64,${buffer.toString("base64")}`,
    {
      folder: `farah-studio/images/${folderName}`,
      width: 500,
      height: 500,
      crop: "fill",
      gravity: "faces",
      use_filename: true,
      unique_filename: false,
      quality: "100",
      format: "webp",
    }
  );

  if (!uploadResult || !uploadResult.secure_url || !uploadResult.public_id) {
    await errResponse("Failed to upload image to Cloudinary.");
  }

  return {
    imageUrl: uploadResult.secure_url,
    publicId: uploadResult.public_id,
  };
};

const hashPassword = async (password: string) => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS || "");
  return await bcrypt.hash(password, saltRounds);
};

const verifyPassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

const authenticateUser = async () => {
  const token = (await cookies()).get("userToken")?.value;
  if (!token) {
    await errResponse("Unauthorized: No token provided");
  }
  const decodedToken = await verifyToken(token);
  if (!decodedToken) {
    await errResponse("Unauthorized: Invalid token");
  }
  return decodedToken;
};

const authorizeUser = async () => {
  try {
    await connectToDatabase();

    const user = await authenticateUser();
    if (!user?.id) {
      return await errResponse("Unauthorized: Invalid user");
    }

    const existingUser = await User.findById(user.id);
    if (!existingUser) {
      return await errResponse("User not found");
    }

    if (existingUser._id.toString() !== user.id) {
      return await errResponse("Unauthorized: User mismatch");
    }
    return existingUser;
  } catch (error: any) {
    return await errResponse("An unexpected error occurred");
  }
};

const compressImage = async (
  file: File,
  type: "banner" | "default" = "default"
): Promise<Blob | null> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return reject(new Error("Failed to get canvas context"));

    const img = new Image();
    const objectURL = URL.createObjectURL(file);

    img.onload = () => {
      const targetWidth = type === "banner" ? 1920 : 500;
      const targetHeight = type === "banner" ? 1080 : 500;
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const imgWidth = img.width;
      const imgHeight = img.height;

      const scale = Math.max(targetWidth / imgWidth, targetHeight / imgHeight);
      const newWidth = imgWidth * scale;
      const newHeight = imgHeight * scale;

      const offsetX = (targetWidth - newWidth) / 2;
      const offsetY = (targetHeight - newHeight) / 2;

      ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);

      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(objectURL);
          resolve(blob);
        },
        file.type === "image/gif" ? "image/jpeg" : file.type,
        1
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectURL);
      reject(new Error("Failed to load image"));
    };

    img.src = objectURL;
  });
};

function formatDate(
  dateString: string,
  format: "date" | "time-ago" = "date"
): string {
  const date = new Date(dateString);
  const now = new Date();

  if (format === "date") {
    return formatToReadableDate(date);
  } else {
    return formatToTimeAgo(date, now);
  }
}

function formatToReadableDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

function formatToTimeAgo(date: Date, now: Date): string {
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);

    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? "" : "s"} ago`;
    }
  }

  return "just now";
}

const getTimeSince = (createdAt: string | Date | undefined) => {
  if (!createdAt) return "Member since: Unknown";

  const createdDate = new Date(createdAt);
  if (isNaN(createdDate.getTime())) return "Member since: Invalid Date";

  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - createdDate.getTime()) / 1000
  );

  const years = Math.floor(diffInSeconds / (60 * 60 * 24 * 365));
  if (years > 0) return `Member since: ${years} years ago`;

  const days = Math.floor(diffInSeconds / (60 * 60 * 24));
  if (days > 0) return `Member since: ${days} days ago`;

  const hours = Math.floor(diffInSeconds / (60 * 60));
  if (hours > 0) return `Member since: ${hours} hours ago`;

  const minutes = Math.floor(diffInSeconds / 60);
  if (minutes > 0) return `Member since: ${minutes} minutes ago`;

  return `Member since: ${diffInSeconds} seconds ago`;
};

// const getImageBufferFromUrl = async (imageUrl: string): Promise<Buffer> => {
//   const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
//   return Buffer.from(response.data, "binary");
// };

// const getDominantColor = async (imageUrl: string): Promise<string> => {
//   const imageBuffer = await getImageBufferFromUrl(imageUrl);
//   const stats = await sharp(imageBuffer).stats();
//   const { r, g, b } = stats.dominant;

//   return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
// };

// const getContrastColor = (hexColor: string): string => {
//   const r = parseInt(hexColor.slice(1, 3), 16);
//   const g = parseInt(hexColor.slice(3, 5), 16);
//   const b = parseInt(hexColor.slice(5, 7), 16);

//   const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
//   return luminance > 0.5 ? "#000000" : "#FFFFFF";
// };

// const getImageColors = async (imageUrl: string) => {
//   const dominantColor = await getDominantColor(imageUrl);
//   const textColor = getContrastColor(dominantColor);

//   return { dominantColor, textColor };
// };

export {
  LogoutFunc,
  validateImageFile,
  errResponse,
  successResponse,
  uploadImageToCloudinary,
  uploadBannerToCloudinary,
  deleteImageFromCloudinary,
  updateImageInCloudinary,
  hashPassword,
  verifyPassword,
  authenticateUser,
  authorizeUser,
  compressImage,
  formatDate,
  getTimeSince,
  //   getImageColors,
};
