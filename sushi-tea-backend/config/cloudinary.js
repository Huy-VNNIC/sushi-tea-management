const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Storage cho menu items
const menuItemStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'sushi-tea/menu-items',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    transformation: [
      { width: 500, height: 500, crop: 'limit' },
      { quality: 'auto' }
    ]
  }
});

// Storage cho categories
const categoryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'sushi-tea/categories',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    transformation: [
      { width: 500, height: 300, crop: 'limit' },
      { quality: 'auto' }
    ]
  }
});

// Storage cho logos và banners
const brandingStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'sushi-tea/branding',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'svg'],
    transformation: [
      { quality: 'auto' }
    ]
  }
});

// Cấu hình upload
const uploadMenuItemImage = multer({ storage: menuItemStorage });
const uploadCategoryImage = multer({ storage: categoryStorage });
const uploadBrandingImage = multer({ storage: brandingStorage });

// Hàm upload hình ảnh
const uploadImage = async (file, folder) => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: `sushi-tea/${folder}`
    });
    return result;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Image upload failed');
  }
};

// Hàm xóa hình ảnh
const deleteImage = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
    return { success: true };
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw new Error('Image deletion failed');
  }
};

module.exports = {
  uploadMenuItemImage,
  uploadCategoryImage,
  uploadBrandingImage,
  uploadImage,
  deleteImage,
  cloudinary
};
