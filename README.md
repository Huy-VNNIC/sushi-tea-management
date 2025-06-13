# 🍵 Sushi Tea Management System

<div align="center">

![Sushi Tea Logo](https://via.placeholder.com/200x100/4CAF50/white?text=Sushi+Tea)

**Hệ thống quản lý quán nước hiện đại với công nghệ QR Code và thanh toán điện tử**

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6+-green.svg)](https://mongodb.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-4+-black.svg)](https://socket.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[🚀 Demo Live](#) | [📖 Tài Liệu](#) | [🐛 Báo Lỗi](https://github.com/Huy-VNNIC/sushi-tea-management/issues)

</div>

---

## 📋 Mục Lục

- [🎯 Giới Thiệu](#-giới-thiệu)
- [✨ Tính Năng](#-tính-năng)
- [🏗️ Kiến Trúc](#️-kiến-trúc)
- [🚀 Cài Đặt](#-cài-đặt)
- [📱 Hướng Dẫn Sử Dụng](#-hướng-dẫn-sử-dụng)
- [🔧 API Documentation](#-api-documentation)
- [🤝 Đóng Góp](#-đóng-góp)
- [📄 License](#-license)

---

## 🎯 Giới Thiệu

**Sushi Tea Management System** là giải pháp quản lý quán nước toàn diện, tích hợp công nghệ QR Code và thanh toán điện tử. Hệ thống giúp tối ưu hóa quy trình vận hành, nâng cao trải nghiệm khách hàng và tăng hiệu quả kinh doanh.

### 🎪 **Vấn Đề Giải Quyết:**
- ❌ Gọi món truyền thống chậm, dễ sai sót
- ❌ Thanh toán thủ công mất thời gian
- ❌ Khó quản lý doanh thu và báo cáo
- ❌ Thiếu tương tác real-time giữa bếp và khách

### ✅ **Giải Pháp:**
- 📱 **Self-ordering** qua QR Code
- 💳 **Thanh toán đa dạng** (QR Banking, Tiền mặt)
- 📊 **Dashboard quản lý** real-time
- 🔔 **Thông báo tức thời** Socket.io

---

## ✨ Tính Năng

### 👑 **ADMIN DASHBOARD**
```
📊 Quản lý doanh thu
├── Biểu đồ theo ngày/tháng/năm
├── Phân tích món bán chạy
├── Báo cáo giờ cao điểm
└── Export Excel/PDF

🍽️ Quản lý menu
├── CRUD món ăn/uống
├── Upload hình ảnh
├── Phân loại danh mục
└── Cập nhật giá real-time

👥 Quản lý nhân viên
├── Phân quyền user roles
├── Quản lý ca làm việc
├── Theo dõi hiệu suất
└── Lịch sử hoạt động

🎁 Khuyến mãi & Ưu đãi
├── Tạo voucher discount
├── Chương trình loyalty
├── Khuyến mãi theo thời gian
└── Quản lý membership
```

### 💼 **STAFF INTERFACE**
```
🎯 Dashboard bán hàng
├── Trạng thái bàn real-time
├── Danh sách đơn hàng chờ
├── Thông báo gọi nhân viên
└── Queue management

💰 Xử lý thanh toán
├── Xác nhận QR Banking
├── Thu tiền mặt
├── Tính VAT linh hoạt (8%-20%)
└── In hóa đơn nhiệt

📋 Quản lý đặt bàn
├── Check-in/Check-out
├── Booking trước
├── Ghi chú đặc biệt
└── Lịch sử giao dịch
```

### 📱 **CUSTOMER EXPERIENCE**
```
🔍 QR Code Ordering
├── Quét mã QR trên bàn
├── Tự động nhận diện số bàn
├── Menu responsive mobile-first
└── Progressive Web App (PWA)

🛒 Gọi món thông minh
├── Duyệt menu theo danh mục
├── Hình ảnh HD, mô tả chi tiết
├── Thêm món với ghi chú đặc biệt
└── Tính toán VAT tự động

💳 Thanh toán đa dạng
├── 📱 QR Banking (VietQR)
├── 💵 Tiền mặt
├── 🔄 Chia sẻ hóa đơn (Split bill)
└── ⚡ Xác nhận tức thời

🌟 Tính năng bổ sung
├── 🔔 Gọi nhân viên
├── ⏱️ Theo dõi trạng thái món
├── ⭐ Đánh giá & review
└── 🎯 Tích điểm thành viên
```

---

## 🏗️ Kiến Trúc

### **📊 System Architecture**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React)       │◄──►│   (Node.js)     │◄──►│   (MongoDB)     │
│                 │    │                 │    │                 │
│ • Admin Panel   │    │ • REST APIs     │    │ • Collections   │
│ • Staff App     │    │ • Socket.io     │    │ • Indexes       │
│ • Customer PWA  │    │ • Auth JWT      │    │ • Replication   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  External APIs  │
                    │                 │
                    │ • VietQR        │
                    │ • ZaloPay       │
                    │ • MoMo          │
                    │ • Cloudinary    │
                    └─────────────────┘
```

### **🛠️ Tech Stack**

#### **Backend**
```yaml
Runtime: Node.js 18+
Framework: Express.js + TypeScript
Database: MongoDB 6+ with Mongoose ODM
Cache: Redis 7+
Real-time: Socket.io 4+
Authentication: JWT + Bcrypt
File Upload: Multer + Cloudinary
Validation: Joi + express-validator
Payment: VietQR API, ZaloPay SDK
QR Code: qrcode + jimp
Testing: Jest + Supertest
```

#### **Frontend**
```yaml
Framework: React 18 + TypeScript
UI Library: Ant Design 5+
State Management: Redux Toolkit + RTK Query
Routing: React Router v6
Charts: Chart.js + react-chartjs-2
QR Scanner: react-qr-reader
Real-time: Socket.io-client
PWA: Workbox
Build Tool: Vite
Testing: React Testing Library + Jest
```

#### **DevOps & Infrastructure**
```yaml
Containerization: Docker + Docker Compose
CI/CD: GitHub Actions
Hosting: 
  - Frontend: Vercel/Netlify
  - Backend: Railway/Render
  - Database: MongoDB Atlas
Monitoring: Winston + Morgan
Security: Helmet + CORS + Rate Limiting
```

---

## 🚀 Cài Đặt

### **📋 Yêu Cầu Hệ Thống**
- Node.js 18+
- MongoDB 6+
- Redis 7+
- npm/yarn

### **⚡ Quick Start**

#### **1. Clone Repository**
```bash
git clone https://github.com/Huy-VNNIC/sushi-tea-management.git
cd sushi-tea-management
```

#### **2. Backend Setup**
```bash
cd backend
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

#### **3. Frontend Setup**
```bash
cd frontend
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm start
```

#### **4. Database Setup**
```bash
# Start MongoDB và Redis với Docker
docker-compose up -d mongodb redis

# Seed sample data
npm run seed
```

### **🔧 Environment Variables**

#### **Backend (.env)**
```env
# Server Configuration
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb://localhost:27017/sushi-tea
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# Payment Gateways
VIETQR_API_KEY=your-vietqr-api-key
ZALOPAY_APP_ID=your-zalopay-app-id
ZALOPAY_KEY1=your-zalopay-key1
MOMO_PARTNER_CODE=your-momo-partner-code

# File Upload
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Banking Information
BANK_ACCOUNT_NUMBER=0123456789
BANK_NAME=Techcombank
ACCOUNT_HOLDER=QUAN SUSHI TEA
```

#### **Frontend (.env)**
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
REACT_APP_BANK_QR_TEMPLATE=compact
```

---

## 📱 Hướng Dẫn Sử Dụng

### **👑 Admin Dashboard**

#### **🚀 Đăng Nhập Admin**
```
URL: http://localhost:3000/admin
Email: admin@sushitea.com
Password: admin123
```

#### **📊 Xem Báo Cáo Doanh Thu**
1. Vào **Dashboard** → **Analytics**
2. Chọn khoảng thời gian (Hôm nay/Tuần/Tháng/Năm)
3. Xem biểu đồ doanh thu, món bán chạy
4. Export báo cáo Excel/PDF

#### **🍽️ Quản Lý Menu**
```bash
# Thêm món mới
1. Vào "Quản lý Menu" → "Thêm món"
2. Nhập: Tên, giá, danh mục, mô tả
3. Upload hình ảnh (tối đa 5MB)
4. Lưu và publish

# Cập nhật giá
1. Tìm món cần sửa
2. Click "Chỉnh sửa"
3. Thay đổi giá → Lưu
4. Giá cập nhật real-time cho khách
```

#### **🎁 Tạo Khuyến Mãi**
```javascript
// Ví dụ: Giảm 20% cho đồ uống vào cuối tuần
{
  name: "Weekend Drink Promotion",
  type: "percentage",
  value: 20,
  applicableItems: ["drinks"],
  startDate: "2025-06-14",
  endDate: "2025-06-15",
  conditions: {
    minOrderValue: 50000,
    maxDiscount: 30000
  }
}
```

### **💼 Staff Interface**

#### **🎯 Dashboard Nhân Viên**
```
URL: http://localhost:3000/staff
Email: staff@sushitea.com
Password: staff123
```

#### **🔔 Xử Lý Đơn Hàng**
1. **Nhận thông báo** đơn mới qua Socket.io
2. **Chuẩn bị món** → Cập nhật trạng thái "Đang làm"
3. **Hoàn thành** → Thông báo khách "Sẵn sàng"

#### **💰 Xử Lý Thanh Toán Tiền Mặt**
```bash
1. Nhận thông báo "Khách chọn tiền mặt"
2. Đến bàn số X
3. Thu tiền → Nhập số tiền thực tế
4. Click "Xác nhận đã thu"
5. In hóa đơn (nếu cần)
```

### **📱 Customer Experience**

#### **🔍 Quy Trình Gọi Món**
```bash
# Bước 1: Quét QR
1. Mở camera điện thoại
2. Quét mã QR trên bàn
3. Tự động mở web app

# Bước 2: Gọi món
1. Duyệt menu theo danh mục
2. Click món muốn gọi
3. Chọn size, topping (nếu có)
4. Thêm ghi chú đặc biệt
5. Thêm vào giỏ hàng

# Bước 3: Thanh toán
1. Review giỏ hàng
2. Chọn phương thức:
   - 📱 QR Banking: Quét mã → Chuyển khoản
   - 💵 Tiền mặt: Chờ nhân viên đến thu
3. Xác nhận đơn hàng
```

#### **💳 Hướng Dẫn Thanh toán QR**
```markdown
1. Chọn "Chuyển khoản QR"
2. Mở app ngân hàng (Techcombank, VCB, BIDV...)
3. Chọn "Chuyển khoản QR" hoặc "Quét mã"
4. Quét mã QR hiển thị trên màn hình
5. Kiểm tra thông tin:
   - Số tài khoản: 19037158999999
   - Tên: QUAN SUSHI TEA
   - Số tiền: 85,000 VND
   - Nội dung: SushiTea_Ban5_ORD123
6. Xác nhận chuyển khoản
7. Chờ xác nhận từ hệ thống (5-10 giây)
```

---

## 🔧 API Documentation

### **🔐 Authentication Endpoints**
```typescript
POST /api/auth/login
POST /api/auth/register
POST /api/auth/refresh
POST /api/auth/logout
GET  /api/auth/profile
```

### **🍽️ Menu Management**
```typescript
GET    /api/menu                    // Lấy danh sách menu
GET    /api/menu/:id               // Chi tiết món
POST   /api/menu                   // Thêm món mới [ADMIN]
PUT    /api/menu/:id               // Cập nhật món [ADMIN]
DELETE /api/menu/:id               // Xóa món [ADMIN]
GET    /api/menu/categories        // Danh sách danh mục
```

### **🛒 Order Processing**
```typescript
POST   /api/orders                 // Tạo đơn hàng mới
GET    /api/orders                 // Danh sách đơn hàng
GET    /api/orders/:id             // Chi tiết đơn hàng
PUT    /api/orders/:id/status      // Cập nhật trạng thái [STAFF]
DELETE /api/orders/:id             // Hủy đơn hàng
```

### **💳 Payment Integration**
```typescript
POST   /api/payments/qr-generate   // Tạo mã QR thanh toán
POST   /api/payments/verify        // Xác thực thanh toán
POST   /api/payments/cash-confirm  // Xác nhận tiền mặt [STAFF]
GET    /api/payments/history       // Lịch sử thanh toán
```

### **📊 Analytics & Reports**
```typescript
GET    /api/analytics/revenue      // Báo cáo doanh thu
GET    /api/analytics/bestsellers  // Món bán chạy
GET    /api/analytics/peak-hours   // Giờ cao điểm
GET    /api/analytics/export       // Export Excel/PDF [ADMIN]
```

### **🔌 Socket.io Events**
```typescript
// Client Events
'join-table'          // Khách vào bàn
'new-order'           // Đơn hàng mới
'call-staff'          // Gọi nhân viên
'payment-completed'   // Thanh toán thành công

// Server Events
'order-status-update' // Cập nhật trạng thái món
'staff-notification'  // Thông báo cho nhân viên
'payment-confirmed'   // Xác nhận thanh toán
'table-status-change' // Thay đổi trạng thái bàn
```

### **📝 API Response Format**
```typescript
// Success Response
{
  "success": true,
  "data": {
    // Response data
  },
  "message": "Operation completed successfully"
}

// Error Response
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  }
}
```

---

## 🧪 Testing

### **🔬 Chạy Tests**
```bash
# Backend tests
cd backend
npm test                # Unit tests
npm run test:integration # Integration tests
npm run test:coverage   # Coverage report

# Frontend tests
cd frontend
npm test                # Component tests
npm run test:e2e        # End-to-end tests
```

### **📊 Test Coverage Goals**
- **Backend**: > 80% coverage
- **Frontend**: > 70% coverage
- **E2E**: Critical user flows

---

## 🚀 Deployment

### **🐳 Docker Deployment**
```bash
# Build và start tất cả services
docker-compose up -d

# Scale services
docker-compose up -d --scale backend=3

# View logs
docker-compose logs -f backend
```

### **☁️ Cloud Deployment**

#### **Frontend (Vercel)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod
```

#### **Backend (Railway)**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Deploy
cd backend
railway login
railway deploy
```

#### **Database (MongoDB Atlas)**
1. Tạo cluster tại [MongoDB Atlas](https://cloud.mongodb.com)
2. Thêm IP whitelist
3. Tạo user database
4. Cập nhật `MONGODB_URI` trong production

---

## 🛡️ Security

### **🔒 Security Features**
- **Authentication**: JWT với refresh token
- **Authorization**: Role-based access control
- **Rate Limiting**: Giới hạn request per IP
- **Input Validation**: Joi schema validation
- **SQL Injection**: Mongoose ODM protection
- **XSS Protection**: Helmet middleware
- **CORS**: Configured origins
- **HTTPS**: SSL/TLS encryption

### **🔐 Security Checklist**
```markdown
✅ Environment variables không commit
✅ Database connection encrypted
✅ API rate limiting enabled
✅ Input validation trên mọi endpoint
✅ Error handling không leak information
✅ JWT tokens có expiration
✅ File upload validation
✅ CORS properly configured
```

---

## 🤝 Đóng Góp

### **🎯 Cách Đóng Góp**
1. **Fork** repository này
2. **Clone** fork về máy local
3. **Tạo branch** mới: `git checkout -b feature/amazing-feature`
4. **Commit** thay đổi: `git commit -m 'Add amazing feature'`
5. **Push** lên branch: `git push origin feature/amazing-feature`
6. **Tạo Pull Request**

### **📝 Coding Standards**
```typescript
// TypeScript/JavaScript
- Sử dụng TypeScript cho type safety
- ESLint + Prettier cho code formatting
- Camel case cho variables và functions
- Pascal case cho Components và Classes
- Kebab case cho file names

// Git Commit Messages
feat: add new payment method
fix: resolve QR code generation bug
docs: update API documentation
style: format code with prettier
refactor: optimize database queries
test: add unit tests for order service
```

### **🐛 Báo Cáo Bug**
Khi báo cáo bug, vui lòng include:
- **Mô tả bug**: Mô tả rõ ràng vấn đề
- **Steps to reproduce**: Các bước tái hiện
- **Expected behavior**: Kết quả mong đợi
- **Screenshots**: Ảnh chụp màn hình (nếu có)
- **Environment**: OS, Browser, Node version

### **💡 Đề Xuất Tính Năng**
- Mô tả tính năng chi tiết
- Lý do cần thiết
- Mockup/wireframe (nếu có)
- Implementation approach

---

## 📊 Roadmap

### **🎯 Version 1.0 (Current)**
- ✅ Basic ordering system
- ✅ QR code integration
- ✅ Payment processing
- ✅ Admin dashboard
- ✅ Real-time notifications

### **🚀 Version 1.1 (Q3 2025)**
- 🔄 Mobile app (React Native)
- 🔄 Advanced analytics
- 🔄 Inventory management
- 🔄 Customer loyalty program
- 🔄 Multi-language support

### **🌟 Version 2.0 (Q4 2025)**
- 🔮 AI-powered recommendations
- 🔮 Voice ordering
- 🔮 Kitchen display system
- 🔮 Integration with delivery platforms
- 🔮 Franchise management

---

## 📞 Hỗ Trợ

### **📧 Liên Hệ**
- **Developer**: Huy-VNNIC
- **Email**: huy.vnnic@gmail.com
- **GitHub**: [@Huy-VNNIC](https://github.com/Huy-VNNIC)

### **🔗 Links Hữu Ích**
- [📖 Documentation](https://sushi-tea-docs.vercel.app)
- [🎮 Live Demo](https://sushi-tea-demo.vercel.app)
- [🐛 Bug Reports](https://github.com/Huy-VNNIC/sushi-tea-management/issues)
- [💬 Discussions](https://github.com/Huy-VNNIC/sushi-tea-management/discussions)

### **❓ FAQ**

**Q: Có thể tùy chỉnh menu cho từng quán không?**
A: Có, admin có thể quản lý menu hoàn toàn qua dashboard.

**Q: Hệ thống có hỗ trợ offline không?**
A: PWA hỗ trợ một số tính năng offline cơ bản.

**Q: Có thể tích hợp với POS khác không?**
A: Hiện tại chưa, nhưng đang trong roadmap version 2.0.

**Q: Chi phí vận hành hàng tháng là bao nhiêu?**
A: Phụ thuộc vào số lượng bàn và giao dịch, ước tính ~500k-2M VND/tháng.

---

## 📄 License

Dự án này được phát hành dưới [MIT License](LICENSE).

```
MIT License

Copyright (c) 2025 Huy-VNNIC

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

<div align="center">

**🍵 Made with ❤️ by [Huy-VNNIC](https://github.com/Huy-VNNIC)**

**⭐ Star repository này nếu bạn thấy hữu ích!**

[🔝 Back to Top](#-sushi-tea-management-system)

</div>
