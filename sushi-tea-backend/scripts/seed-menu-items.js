require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/database');
const Category = require('../models/Category');
const MenuItem = require('../models/MenuItem');

// Hàm lấy category ID từ slug
const getCategoryIdBySlug = async (slug) => {
  const category = await Category.findOne({ slug });
  if (!category) throw new Error(`Không tìm thấy category với slug: ${slug}`);
  return category._id;
};

// Hàm seed menu items
const seedMenuItems = async () => {
  try {
    await connectDB();
    
    // Xóa menu items hiện tại
    console.log('🔄 Xóa menu items hiện tại...');
    await MenuItem.deleteMany({});
    
    // Lấy category IDs
    const daXayId = await getCategoryIdBySlug('da-xay');
    const traHoaQuaId = await getCategoryIdBySlug('tra-hoa-qua');
    const nuocEpId = await getCategoryIdBySlug('nuoc-ep');
    const traSuaId = await getCategoryIdBySlug('tra-sua');
    const traChanhId = await getCategoryIdBySlug('tra-chanh');
    const suaChuaId = await getCategoryIdBySlug('sua-chua');
    const samBiDaoId = await getCategoryIdBySlug('sam-bi-dao');
    const biaId = await getCategoryIdBySlug('bia-do-uong-co-con');
    const coffeeId = await getCategoryIdBySlug('coffee');
    const toppingId = await getCategoryIdBySlug('topping');
    const doAnVatId = await getCategoryIdBySlug('do-an-vat');
    
    // Danh sách menu items từ menu
    const menuItems = [
      // ĐÁ XAY
      {
        name: 'Cốt Dừa Xoài Tuyết',
        price: 25000,
        categoryId: daXayId,
        description: 'Đá xay cốt dừa kết hợp với xoài, mát lạnh',
        isAvailable: true
      },
      {
        name: 'Frezze Trà Xanh',
        price: 30000,
        categoryId: daXayId,
        description: 'Đá xay trà xanh refreshing',
        isAvailable: true
      },
      {
        name: 'Frezze Chocolate',
        price: 30000,
        categoryId: daXayId,
        description: 'Đá xay vị chocolate béo ngậy',
        isAvailable: true
      },
      {
        name: 'Chuối Milo Đá Tuyết Ôi',
        price: 25000,
        categoryId: daXayId,
        description: 'Đá xay chuối kết hợp với bột milo',
        isAvailable: true
      },
      {
        name: 'Đào Việt Quất Bưởi',
        price: 25000,
        categoryId: daXayId,
        description: 'Đá xay đào kết hợp với việt quất và bưởi',
        isAvailable: true
      },
      {
        name: 'Hồng Dâu Tây',
        price: 25000,
        categoryId: daXayId,
        description: 'Đá xay hồng và dâu tây',
        isAvailable: true
      },
      {
        name: 'Việt Quất-Dâu',
        price: 25000,
        categoryId: daXayId,
        description: 'Đá xay việt quất và dâu',
        isAvailable: true
      },
      {
        name: 'Ổi Dưa Lưới',
        price: 25000,
        categoryId: daXayId,
        description: 'Đá xay ổi kết hợp với dưa lưới',
        isAvailable: true
      },
      {
        name: 'Cookie Cream Matcha',
        price: 25000,
        categoryId: daXayId,
        description: 'Đá xay matcha với cookie cream',
        isAvailable: true
      },
      {
        name: 'Đá Xay Sầu Riêng Đá Xay',
        price: 25000,
        categoryId: daXayId,
        description: 'Đá xay hương vị sầu riêng',
        isAvailable: true
      },
      
      // TRÀ HOA QUẢ
      {
        name: 'Trà Đào Cam Sả',
        price: 25000,
        categoryId: traHoaQuaId,
        description: 'Trà đào kết hợp với cam và sả',
        isAvailable: true
      },
      {
        name: 'Cam Dâu Sả',
        price: 25000,
        categoryId: traHoaQuaId,
        description: 'Trà cam với dâu và sả',
        isAvailable: true
      },
      {
        name: 'Trà Hoa Quả Nhiệt Đới',
        price: 25000,
        categoryId: traHoaQuaId,
        description: 'Trà kết hợp với các loại hoa quả nhiệt đới',
        isAvailable: true
      },
      {
        name: 'Trà Hoa Quả Đặc Biệt',
        price: 25000,
        categoryId: traHoaQuaId,
        description: 'Trà đặc biệt kết hợp với hoa quả',
        isAvailable: true
      },
      {
        name: 'Ôlong Kiwi',
        price: 20000,
        categoryId: traHoaQuaId,
        description: 'Trà ôlong kết hợp với kiwi',
        isAvailable: true
      },
      {
        name: 'Trà Đào Dưa Lưới',
        price: 20000,
        categoryId: traHoaQuaId,
        description: 'Trà đào kết hợp với dưa lưới',
        isAvailable: true
      },
      {
        name: 'Trà Dâu Tây',
        price: 25000,
        categoryId: traHoaQuaId,
        description: 'Trà với dâu tây tươi',
        isAvailable: true
      },
      {
        name: 'Trà Đào Tươi',
        price: 25000,
        categoryId: traHoaQuaId,
        description: 'Trà với đào tươi',
        isAvailable: true
      },
      {
        name: 'Trà Đào Mango',
        price: 20000,
        categoryId: traHoaQuaId,
        description: 'Trà đào kết hợp với xoài',
        isAvailable: true
      },
      
      // NƯỚC ÉP
      {
        name: 'Táo Mỹ',
        price: 25000,
        categoryId: nuocEpId,
        description: 'Nước ép táo mỹ',
        isAvailable: true
      },
      {
        name: 'Cà Rốt Táo',
        price: 25000,
        categoryId: nuocEpId,
        description: 'Nước ép cà rốt kết hợp với táo',
        isAvailable: true
      },
      {
        name: 'Khớm',
        price: 25000,
        categoryId: nuocEpId,
        description: 'Nước ép khớm (dứa)',
        isAvailable: true
      },
      {
        name: 'Bưởi',
        price: 25000,
        categoryId: nuocEpId,
        description: 'Nước ép bưởi',
        isAvailable: true
      },
      {
        name: 'Lựu',
        price: 25000,
        categoryId: nuocEpId,
        description: 'Nước ép lựu',
        isAvailable: true
      },
      {
        name: 'Cam Sành Nha Đam',
        price: 25000,
        categoryId: nuocEpId,
        description: 'Nước ép cam sành với nha đam',
        isAvailable: true
      },
      {
        name: 'Cam Sành Ép',
        price: 20000,
        categoryId: nuocEpId,
        description: 'Nước ép cam sành',
        isAvailable: true
      },
      {
        name: 'Xoài Ổi',
        price: 20000,
        categoryId: nuocEpId,
        description: 'Nước ép xoài kết hợp với ổi',
        isAvailable: true
      },
      {
        name: 'Chanh Dây',
        price: 20000,
        categoryId: nuocEpId,
        description: 'Nước ép chanh dây',
        isAvailable: true
      },
      {
        name: 'Dưa Hấu',
        price: 20000,
        categoryId: nuocEpId,
        description: 'Nước ép dưa hấu',
        isAvailable: true
      },
      {
        name: 'Ổi',
        price: 18000,
        categoryId: nuocEpId,
        description: 'Nước ép ổi',
        isAvailable: true
      },
      {
        name: 'Cà Rốt',
        price: 18000,
        categoryId: nuocEpId,
        description: 'Nước ép cà rốt',
        isAvailable: true
      },

      // TRÀ SỮA
      {
        name: 'TS Truyền Thống',
        price: 15000,
        discountPrice: 20000,
        categoryId: traSuaId,
        description: 'Trà sữa truyền thống',
        isAvailable: true
      },
      {
        name: 'TS Thái Xanh',
        price: 15000,
        discountPrice: 20000,
        categoryId: traSuaId,
        description: 'Trà sữa thái xanh',
        isAvailable: true
      },
      {
        name: 'TS Thái Đỏ',
        price: 15000,
        discountPrice: 20000,
        categoryId: traSuaId,
        description: 'Trà sữa thái đỏ',
        isAvailable: true
      },
      {
        name: 'Hồng Trà Trân Châu',
        price: 15000,
        discountPrice: 20000,
        categoryId: traSuaId,
        description: 'Hồng trà với trân châu',
        isAvailable: true
      },
      {
        name: 'TS Dừa Non',
        price: 20000,
        discountPrice: 25000,
        categoryId: traSuaId,
        description: 'Trà sữa vị dừa non',
        isAvailable: true
      },
      {
        name: 'TS Khoai Môn',
        price: 18000,
        discountPrice: 23000,
        categoryId: traSuaId,
        description: 'Trà sữa vị khoai môn',
        isAvailable: true
      },
      {
        name: 'TS Hoa Đậu Biếc',
        price: 18000,
        discountPrice: 23000,
        categoryId: traSuaId,
        description: 'Trà sữa hoa đậu biếc',
        isAvailable: true
      },
      {
        name: 'TS Dâu Tây',
        price: 18000,
        discountPrice: 23000,
        categoryId: traSuaId,
        description: 'Trà sữa vị dâu tây',
        isAvailable: true
      },
      {
        name: 'TS Việt Quất',
        price: 18000,
        discountPrice: 23000,
        categoryId: traSuaId,
        description: 'Trà sữa vị việt quất',
        isAvailable: true
      },
      {
        name: 'TS Dưa Lưới',
        price: 18000,
        discountPrice: 23000,
        categoryId: traSuaId,
        description: 'Trà sữa vị dưa lưới',
        isAvailable: true
      },
      {
        name: 'TS Bạc Hà',
        price: 18000,
        discountPrice: 23000,
        categoryId: traSuaId,
        description: 'Trà sữa vị bạc hà',
        isAvailable: true
      },
      {
        name: 'TS Matcha',
        price: 18000,
        discountPrice: 23000,
        categoryId: traSuaId,
        description: 'Trà sữa matcha',
        isAvailable: true
      },
      {
        name: 'Chocolate 3Q',
        price: 18000,
        discountPrice: 23000,
        categoryId: traSuaId,
        description: 'Chocolate với ba loại topping',
        isAvailable: true
      },
      {
        name: 'TS Trân Châu',
        price: 20000,
        discountPrice: 25000,
        categoryId: traSuaId,
        description: 'Trà sữa với trân châu',
        isAvailable: true
      },
      {
        name: 'Đường Đen',
        price: 23000,
        discountPrice: 0,
        categoryId: traSuaId,
        description: 'Trà sữa đường đen',
        isAvailable: true
      },
      {
        name: 'Milo Đậm',
        price: 23000,
        discountPrice: 0,
        categoryId: traSuaId,
        description: 'Trà sữa milo đậm đà',
        isAvailable: true
      },
      {
        name: 'TS KTRỨNG DỪA NƯỚNG',
        price: 25000,
        discountPrice: 0,
        categoryId: traSuaId,
        description: 'Trà sữa với trứng và dừa nướng',
        isAvailable: true
      },
      {
        name: 'TS TRỨNG CHÁY',
        price: 25000,
        discountPrice: 0,
        categoryId: traSuaId,
        description: 'Trà sữa với trứng cháy',
        isAvailable: true
      },
      {
        name: 'STTC TRỨNG CHÁY',
        price: 25000,
        discountPrice: 0,
        categoryId: traSuaId,
        description: 'Sữa tươi trân châu với trứng cháy',
        isAvailable: true
      },
      {
        name: 'TSTCDDKT DỪA NƯỚNG',
        price: 25000,
        discountPrice: 0,
        categoryId: traSuaId,
        description: 'Trà sữa trân châu đường đen kem trứng với dừa nướng',
        isAvailable: true
      },

      // TRÀ CHANH
      {
        name: 'TRÀ CHANH',
        price: 10000,
        categoryId: traChanhId,
        description: 'Trà chanh truyền thống',
        isAvailable: true
      },
      {
        name: 'CHANH TƯƠI',
        price: 10000,
        categoryId: traChanhId,
        description: 'Nước chanh tươi',
        isAvailable: true
      },
      {
        name: 'TRÀ CHANH ĐÀO',
        price: 15000,
        categoryId: traChanhId,
        description: 'Trà chanh với đào',
        isAvailable: true
      },
      {
        name: 'TRÀ CHANH SẢ',
        price: 18000,
        categoryId: traChanhId,
        description: 'Trà chanh với sả',
        isAvailable: true
      },
      {
        name: 'QUẤT NHA DAM',
        price: 15000,
        categoryId: traChanhId,
        description: 'Nước quất với nha đam',
        isAvailable: true
      },
      {
        name: 'QUẤT XÍ MUỘI',
        price: 18000,
        categoryId: traChanhId,
        description: 'Nước quất với xí muội',
        isAvailable: true
      },
      {
        name: 'QUỐC LẮC SỮA',
        price: 15000,
        categoryId: traChanhId,
        description: 'Quất lắc với sữa',
        isAvailable: true
      },
      {
        name: 'QUỐC LẮC SỮA BẠC HÀ',
        price: 18000,
        categoryId: traChanhId,
        description: 'Quất lắc với sữa và bạc hà',
        isAvailable: true
      },
      {
        name: 'TRÀ ỔI ĐÀO',
        price: 18000,
        categoryId: traChanhId,
        description: 'Trà ổi với đào',
        isAvailable: true
      },

      // SỮA CHUA
      {
        name: 'SỮA CHUA HỘP',
        price: 10000,
        categoryId: suaChuaId,
        description: 'Sữa chua đóng hộp',
        isAvailable: true
      },
      {
        name: 'SỮA CHUA ĐÁ',
        price: 15000,
        categoryId: suaChuaId,
        description: 'Sữa chua với đá',
        isAvailable: true
      },
      {
        name: 'SỮA CHUA NHA DAM',
        price: 15000,
        categoryId: suaChuaId,
        description: 'Sữa chua với nha đam',
        isAvailable: true
      },
      {
        name: 'SỮA CHUA NẾP CẨM',
        price: 15000,
        categoryId: suaChuaId,
        description: 'Sữa chua với nếp cẩm',
        isAvailable: true
      },
      {
        name: 'SỮA CHUA CACAO',
        price: 22000,
        categoryId: suaChuaId,
        description: 'Sữa chua với cacao',
        isAvailable: true
      },
      {
        name: 'SỮA CHUA HOA QUẢ',
        price: 22000,
        categoryId: suaChuaId,
        description: 'Sữa chua với hoa quả',
        isAvailable: true
      },
      {
        name: 'SỮA CHUA SẦU RIÊNG',
        price: 25000,
        categoryId: suaChuaId,
        description: 'Sữa chua với sầu riêng',
        isAvailable: true
      },

      // SÂM BÍ ĐAO
      {
        name: 'HỒNG SÂM CAM DỨA',
        price: 20000,
        categoryId: samBiDaoId,
        description: 'Hồng sâm với cam và dứa',
        isAvailable: true
      },
      {
        name: 'SÂM BÍ ĐAO NHA DAM',
        price: 20000,
        categoryId: samBiDaoId,
        description: 'Sâm bí đao với nha đam',
        isAvailable: true
      },
      {
        name: 'SÂM CAM ĐÀO NHA DAM',
        price: 25000,
        categoryId: samBiDaoId,
        description: 'Sâm với cam, đào và nha đam',
        isAvailable: true
      },

      // BIA & ĐỒ UỐNG CÓ CỒN
      {
        name: 'STRONGBOW TÁO ỔI ĐÀO',
        price: 30000,
        categoryId: biaId,
        description: 'Strongbow vị táo, ổi và đào',
        isAvailable: true
      },
      {
        name: 'STRONGBOW DÂU VIỆT QUỐC',
        price: 30000,
        categoryId: biaId,
        description: 'Strongbow vị dâu và việt quất',
        isAvailable: true
      },

      // COFFEE
      {
        name: 'Đen Nóng',
        price: 10000,
        categoryId: coffeeId,
        description: 'Cà phê đen nóng',
        isAvailable: true
      },
      {
        name: 'Đen Đá',
        price: 10000,
        categoryId: coffeeId,
        description: 'Cà phê đen đá',
        isAvailable: true
      },
      {
        name: 'Nâu Nóng',
        price: 15000,
        categoryId: coffeeId,
        description: 'Cà phê sữa nóng',
        isAvailable: true
      },
      {
        name: 'Nâu Đá',
        price: 15000,
        categoryId: coffeeId,
        description: 'Cà phê sữa đá',
        isAvailable: true
      },
      {
        name: 'Bạc Sỉu',
        price: 20000,
        categoryId: coffeeId,
        description: 'Cà phê bạc sỉu',
        isAvailable: true
      },
      {
        name: 'Cafe Cốt Dừa',
        price: 20000,
        categoryId: coffeeId,
        description: 'Cà phê với cốt dừa',
        isAvailable: true
      },
      {
        name: 'Cacao Đá',
        price: 20000,
        categoryId: coffeeId,
        description: 'Cacao đá',
        isAvailable: true
      },
      {
        name: 'Sữa Nóng',
        price: 10000,
        categoryId: coffeeId,
        description: 'Sữa nóng',
        isAvailable: true
      },
      {
        name: 'Cacao Nóng',
        price: 18000,
        categoryId: coffeeId,
        description: 'Cacao nóng',
        isAvailable: true
      },
      {
        name: 'Chocolate Sữa Dừa',
        price: 23000,
        categoryId: coffeeId,
        description: 'Chocolate với sữa dừa',
        isAvailable: true
      },
      {
        name: 'Matcha Sữa Dừa',
        price: 23000,
        categoryId: coffeeId,
        description: 'Matcha với sữa dừa',
        isAvailable: true
      },
      {
        name: 'Trà Cam Quế Mật',
        price: 23000,
        categoryId: coffeeId,
        description: 'Trà cam với quế và mật ong',
        isAvailable: true
      },

      // TOPPING
      {
        name: 'Thạch Lá Dứa',
        price: 5000,
        categoryId: toppingId,
        description: 'Thạch lá dứa',
        isAvailable: true
      },
      {
        name: 'Thạch Dứa',
        price: 5000,
        categoryId: toppingId,
        description: 'Thạch dứa',
        isAvailable: true
      },
      {
        name: 'Trân Châu Trắng',
        price: 5000,
        categoryId: toppingId,
        description: 'Trân châu trắng',
        isAvailable: true
      },
      {
        name: 'Nha Đam',
        price: 5000,
        categoryId: toppingId,
        description: 'Nha đam',
        isAvailable: true
      },
      {
        name: 'Thạch Thái Xanh',
        price: 5000,
        categoryId: toppingId,
        description: 'Thạch thái xanh',
        isAvailable: true
      },
      {
        name: 'Thạch Cafe',
        price: 5000,
        categoryId: toppingId,
        description: 'Thạch cafe',
        isAvailable: true
      },
      {
        name: 'Trân Châu 3Q',
        price: 5000,
        categoryId: toppingId,
        description: 'Trân châu ba loại',
        isAvailable: true
      },

      // ĐỒ ĂN VẶT
      {
        name: 'Xoài Lắc',
        price: 20000,
        categoryId: doAnVatId,
        description: 'Xoài lắc',
        isAvailable: true
      },
      {
        name: 'Xoài Non/Cóc Non Chấm Thần Thánh',
        price: 20000,
        categoryId: doAnVatId,
        description: 'Xoài non hoặc cóc non với nước chấm thần thánh',
        isAvailable: true
      },
      {
        name: 'Trái Cây Mix Theo Mùa',
        price: 30000,
        categoryId: doAnVatId,
        description: 'Hỗn hợp trái cây theo mùa',
        isAvailable: true
      },
      {
        name: 'Hướng Dương Truyền Thống',
        price: 10000,
        categoryId: doAnVatId,
        description: 'Hạt hướng dương truyền thống',
        isAvailable: true
      },
      {
        name: 'Hướng Dương Dừa',
        price: 15000,
        categoryId: doAnVatId,
        description: 'Hạt hướng dương vị dừa',
        isAvailable: true
      },
      {
        name: 'Bánh Tráng Trộn',
        price: 15000,
        categoryId: doAnVatId,
        description: 'Bánh tráng trộn',
        isAvailable: true
      },
      {
        name: 'Bánh Tráng Cuộn',
        price: 15000,
        categoryId: doAnVatId,
        description: 'Bánh tráng cuộn',
        isAvailable: true
      },
      {
        name: 'Xúc Xích',
        price: 10000,
        categoryId: doAnVatId,
        description: 'Xúc xích',
        isAvailable: true
      },
      {
        name: 'Phoinal Que',
        price: 10000,
        categoryId: doAnVatId,
        description: 'Phomai que',
        isAvailable: true
      },
      {
        name: 'Khoai Tây Lắc Phomai',
        price: 20000,
        categoryId: doAnVatId,
        description: 'Khoai tây lắc phomai',
        isAvailable: true
      },
      {
        name: 'Khoai Lang Kén',
        price: 20000,
        categoryId: doAnVatId,
        description: 'Khoai lang kén',
        isAvailable: true
      },
      {
        name: 'Cá Viên',
        price: 20000,
        categoryId: doAnVatId,
        description: 'Cá viên chiên',
        isAvailable: true
      },
      {
        name: 'Bò Viên',
        price: 20000,
        categoryId: doAnVatId,
        description: 'Bò viên chiên',
        isAvailable: true
      },
      {
        name: 'Tôm Viên',
        price: 20000,
        categoryId: doAnVatId,
        description: 'Tôm viên chiên',
        isAvailable: true
      },
      {
        name: 'Combo Nhỏ',
        price: 40000,
        categoryId: doAnVatId,
        description: 'Combo đồ ăn vặt nhỏ',
        isAvailable: true
      },
      {
        name: 'Combo Lớn',
        price: 50000,
        categoryId: doAnVatId,
        description: 'Combo đồ ăn vặt lớn',
        isAvailable: true
      },
      {
        name: 'Chả Cá Rau Răm',
        price: 20000,
        categoryId: doAnVatId,
        description: 'Chả cá với rau răm',
        isAvailable: true
      }
    ];
    
    console.log('🌱 Đang thêm menu items...');
    await MenuItem.insertMany(menuItems);
    
    console.log('✅ Thêm menu items thành công!');
    process.exit();
  } catch (error) {
    console.error('❌ Lỗi khi seed menu items:', error);
    process.exit(1);
  }
};

seedMenuItems();
