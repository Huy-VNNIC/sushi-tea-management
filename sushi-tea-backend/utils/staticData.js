// Dữ liệu mẫu cho categories
const categories = [
  {
    _id: "65a1b2c3d4e5f6a7b8c9d0e1",
    name: 'Đá Xay',
    slug: 'da-xay',
    description: 'Các loại đồ uống đá xay',
    order: 1,
    isActive: true
  },
  {
    _id: "65a1b2c3d4e5f6a7b8c9d0e2",
    name: 'Trà Sữa',
    slug: 'tra-sua',
    description: 'Các loại trà sữa',
    order: 2,
    isActive: true
  }
];

// Dữ liệu mẫu cho menu items
const menuItems = [
  {
    _id: "65a1b2c3d4e5f6a7b8c9d0e3",
    name: 'Trà Sữa Truyền Thống',
    description: 'Trà sữa hương vị truyền thống',
    price: 25000,
    discountPrice: 0,
    categoryId: "65a1b2c3d4e5f6a7b8c9d0e2",
    isAvailable: true,
    isBestSeller: true
  },
  {
    _id: "65a1b2c3d4e5f6a7b8c9d0e4",
    name: 'Đá Xay Matcha',
    description: 'Đá xay hương vị matcha',
    price: 30000,
    discountPrice: 0,
    categoryId: "65a1b2c3d4e5f6a7b8c9d0e1",
    isAvailable: true,
    isBestSeller: false
  }
];

module.exports = {
  categories,
  menuItems
};
