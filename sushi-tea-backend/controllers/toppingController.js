const Topping = require('../models/Topping');
const ApiResponse = require('../utils/apiResponse');

/**
 * @desc    Get all toppings
 * @route   GET /api/toppings
 * @access  Public
 */
exports.getToppings = async (req, res, next) => {
  try {
    const toppings = await Topping.find({ isAvailable: true });
    ApiResponse.success(res, { toppings }, 'Toppings retrieved successfully');
  } catch (error) {
    console.error('Error in getToppings:', error);
    next(error);
  }
};

/**
 * @desc    Create new topping
 * @route   POST /api/toppings
 * @access  Private/Admin
 */
exports.createTopping = async (req, res, next) => {
  try {
    const { name, price, isAvailable } = req.body;
    
    const topping = await Topping.create({
      name,
      price,
      isAvailable: isAvailable !== undefined ? isAvailable : true
    });
    
    ApiResponse.success(res, { topping }, 'Topping created successfully', 201);
  } catch (error) {
    console.error('Error in createTopping:', error);
    next(error);
  }
};

/**
 * @desc    Update topping
 * @route   PUT /api/toppings/:id
 * @access  Private/Admin
 */
exports.updateTopping = async (req, res, next) => {
  try {
    const { name, price, isAvailable } = req.body;
    
    const topping = await Topping.findByIdAndUpdate(req.params.id, {
      name,
      price,
      isAvailable
    }, { new: true, runValidators: true });
    
    if (!topping) {
      return ApiResponse.error(res, 'Topping not found', 404);
    }
    
    ApiResponse.success(res, { topping }, 'Topping updated successfully');
  } catch (error) {
    console.error('Error in updateTopping:', error);
    next(error);
  }
};

/**
 * @desc    Delete topping
 * @route   DELETE /api/toppings/:id
 * @access  Private/Admin
 */
exports.deleteTopping = async (req, res, next) => {
  try {
    const topping = await Topping.findById(req.params.id);
    
    if (!topping) {
      return ApiResponse.error(res, 'Topping not found', 404);
    }
    
    await topping.remove();
    
    ApiResponse.success(res, {}, 'Topping deleted successfully');
  } catch (error) {
    console.error('Error in deleteTopping:', error);
    next(error);
  }
};
