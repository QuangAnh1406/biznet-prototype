# BizNet Prototype - Nền Tảng Kinh Doanh Đa Nhân Vật

Một nền tảng B2B toàn diện cho Platform Owner, Association (Hiệp hội), và Open User (Doanh nghiệp mở).

## 🎯 Cấu Trúc Hệ Thống

### 3 Nhóm User Chính:

1. **Platform Owner (Chủ nền tảng)** 👑
   - Quản trị toàn hệ thống
   - Quản lý sản phẩm & dịch vụ
   - Marketplace & gian hàng
   - Tài chính & doanh thu

2. **Association (Hiệp hội)** 🏢
   - 8 vai trò: Org Admin, Reviewer, Group Leader, Member
   - Quản lý hội viên & danh bộ
   - Quản lý hội phí & cước hợp
   - Kết nối & Community

3. **Open User (Doanh nghiệp mở)** 🚀
   - Đăng ký & hồ sơ doanh nghiệp
   - B2B Marketplace
   - Giao dịch & thanh toán
   - Nâng cấp Premium

## 🛠️ Tech Stack

### Frontend
- React 18+ with TypeScript
- Tailwind CSS
- Redux Toolkit for state management
- React Router for navigation
- Axios for API calls

### Backend
- Node.js + Express
- MongoDB with Mongoose
- JWT Authentication
- Passport.js for OAuth
- Socket.io for real-time features

### Core Features
- Multi-role authentication (SSO/2FA)
- Dynamic marketplace with catalog management
- Payment integration (VietQR, VNPay, Bank)
- Real-time notifications
- Analytics & reporting
- KYC/Verification system
- Community & messaging

## 📁 Project Structure

```
biznet-prototype/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── services/
│   │   └── hooks/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   └── services/
│   └── package.json
├── docker-compose.yml
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- MongoDB 4.4+
- Docker & Docker Compose (optional)

### Installation

#### Using Docker (Recommended)
```bash
docker-compose up -d
```

#### Manual Setup

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm start
```

## 📝 API Documentation

API documentation will be available at `/api/docs` after backend starts.

## 🔐 Authentication

- JWT Token-based authentication
- SSO integration (OIDC)
- 2FA support
- Role-based access control (RBAC)

## 💾 Database Models

- Users (Platform Owner, Association, Open User)
- Organizations/Associations
- Products & Services
- Marketplace Listings
- Transactions
- Notifications
- Community Posts

## 🧪 Testing

```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test
```

## 📄 License

MIT

## 👥 Author

Quang Anh
