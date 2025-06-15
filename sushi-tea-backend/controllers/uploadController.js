const ApiResponse = require('../utils/apiResponse');
const { cloudinary, deleteImage } = require('../config/cloudinary');

// @desc    Upload hình ảnh
// @route   POST /api/admin/upload
// @access  Private/Admin
exports.uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return ApiResponse.error(res, 'Vui lòng chọn hình ảnh', 400);
    }

    ApiResponse.success(res, { 
      imageUrl: req.file.path,
      publicId: req.file.filename,
      originalName: req.file.originalname
    }, 'Upload hình ảnh thành công', 201);
  } catch (error) {
    console.error('Error in uploadImage:', error);
    next(error);
  }
};

// @desc    Xóa hình ảnh
// @route   DELETE /api/admin/upload/:publicId
// @access  Private/Admin
exports.deleteUploadedImage = async (req, res, next) => {
  try {
    const { publicId } = req.params;
    
    if (!publicId) {
      return ApiResponse.error(res, 'Public ID là bắt buộc', 400);
    }
    
    await deleteImage(publicId);
    
    ApiResponse.success(res, {}, 'Xóa hình ảnh thành công');
  } catch (error) {
    console.error('Error in deleteUploadedImage:', error);
    next(error);
  }
};
