# Getting Started with BizNet

## Quick Start with Docker

```bash
# Clone repository
git clone https://github.com/QuangAnh1406/biznet-prototype.git
cd biznet-prototype

# Start all services
docker-compose up

# Wait for services to start (2-3 minutes)
# Access the app at http://localhost:3000
```

## Manual Setup

### Prerequisites
- Node.js 16+
- MongoDB 4.4+
- Git

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your configuration

# Start development server
npm run dev

# Server runs on http://localhost:5000
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start React development server
npm start

# App runs on http://localhost:3000
```

## Demo Credentials

### Test Account
- Email: `test@biznet.com`
- Password: `password`

### Or Create Your Own
1. Go to http://localhost:3000
2. Click "Sign Up"
3. Choose your role:
   - **Open User** (Doanh nghiệp mở)
   - **Association Member** (Hội viên)
   - **Organization Admin** (Quản trị viên)

## Features Overview

### 1. Authentication
- ✅ Email/Password registration
- ✅ JWT token-based login
- ✅ Role selection during signup
- ✅ Logout functionality

### 2. Dashboard
- ✅ User welcome message
- ✅ Platform statistics
- ✅ Role information
- ✅ Quick action buttons

### 3. Marketplace (B2B)
- ✅ Browse all products
- ✅ Search by product name
- ✅ Filter by category
- ✅ Sort by: newest, popular, top-rated, price
- ✅ Product ratings & reviews
- ✅ Add to cart

### 4. Associations
- ✅ View all associations
- ✅ Create new association
- ✅ View association details
- ✅ Manage members
- ✅ View statistics

### 5. Orders
- ✅ View order history
- ✅ Filter by status
- ✅ Track transaction details
- ✅ View payment status

## API Endpoints

### Authentication
```
POST   /api/auth/register       - Register new user
POST   /api/auth/login          - Login user
POST   /api/auth/logout         - Logout user
```

### Users
```
GET    /api/users               - List all users
GET    /api/users/:id           - Get user details
PUT    /api/users/:id           - Update user profile
POST   /api/users/:id/kyc       - Submit KYC verification
```

### Products
```
GET    /api/products            - List products
GET    /api/products/:id        - Get product details
POST   /api/products            - Create product
PUT    /api/products/:id        - Update product
DELETE /api/products/:id        - Delete product
```

### Marketplace
```
GET    /api/marketplace         - Browse marketplace
GET    /api/marketplace/featured - Get featured products
GET    /api/marketplace/stats   - Get marketplace statistics
```

### Associations
```
GET    /api/associations        - List associations
GET    /api/associations/:id    - Get association details
POST   /api/associations        - Create association
POST   /api/associations/:id/members      - Add member
GET    /api/associations/:id/members      - Get members
```

### Transactions
```
POST   /api/transactions        - Create transaction
GET    /api/transactions/buyer/:id - Get buyer transactions
PUT    /api/transactions/:id/status - Update status
POST   /api/transactions/:id/payment - Initiate payment
```

### Notifications
```
GET    /api/notifications/user/:id - Get notifications
PUT    /api/notifications/:id/read - Mark as read
POST   /api/notifications       - Create notification
```

## Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -i :5000  # for backend
lsof -i :3000  # for frontend

# Kill process
kill -9 <PID>
```

### MongoDB Connection Error
```bash
# Check MongoDB is running
mongod

# Or with Docker
docker run -d -p 27017:27017 mongo:5.0
```

### CORS Issues
Update `FRONTEND_URL` in `backend/.env` to match your frontend URL

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Development Tips

### Hot Reload
- Frontend: Changes are auto-reloaded
- Backend: Use `npm run dev` (requires nodemon)

### Database
- View MongoDB data with MongoDB Compass
- Connection: `mongodb://localhost:27017/biznet`

### API Testing
- Use Postman or Insomnia
- Import endpoints from API section above
- Include `Authorization: Bearer <token>` header

## Production Deployment

### Frontend Build
```bash
cd frontend
npm run build
# Deploy build/ folder to hosting (Netlify, Vercel, etc.)
```

### Backend Deployment
```bash
# On your server
cd backend
npm install --production
npm start

# Use process manager (PM2, systemd, etc.)
```

### Database
- Use managed MongoDB (Atlas, etc.)
- Update `MONGODB_URI` in `.env`

## Next Steps

1. **Customize UI**: Edit components in `frontend/src/pages` and `frontend/src/components`
2. **Add Database Models**: Edit models in `backend/src/models`
3. **Implement Features**: Add routes and controllers in `backend/src/routes`
4. **Integrate Payments**: Update transaction routes for real payment providers
5. **Deploy**: Follow deployment guide in DEPLOYMENT_GUIDE.md

## Support

- 📖 Check README.md for overview
- 🚀 See DEPLOYMENT_GUIDE.md for production setup
- 🐛 Report issues on GitHub

---

Happy coding! 🎉