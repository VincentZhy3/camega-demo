# Firebase 数据存储指南

## 概述

Firebase 提供了多种数据存储服务，可以满足不同的业务需求：

### 1. Firestore (推荐)
- **文档型数据库**，类似 MongoDB
- 支持复杂查询和实时更新
- 适合存储结构化数据如订单、用户信息、产品目录等
- 自动扩展，无需管理服务器

### 2. Realtime Database
- JSON 树形结构
- 实时同步
- 适合简单的数据结构
- 适合实时协作应用

### 3. Cloud Storage
- 存储文件、图片等二进制数据
- 适合存储产品图片、用户头像、文档等
- 支持 CDN 加速

## 当前项目实现

### 订单管理功能

#### 数据结构示例

**订单集合 (orders)**
```javascript
{
  "orderId": "auto-generated",
  "userId": "user_uid",
  "userEmail": "user@example.com",
  "orderNumber": "CMG1234567890123",
  "items": [
    {
      "name": "Camega Omega-3 深海鱼油",
      "quantity": 2,
      "price": 29.99,
      "total": 59.98
    }
  ],
  "totalAmount": 59.98,
  "status": "pending", // pending, confirmed, shipped, delivered, cancelled
  "shippingAddress": "123 Main Street, Toronto, ON M5V 2H1",
  "paymentMethod": "credit_card",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

**浏览历史集合 (browsing_history)**
```javascript
{
  "historyId": "auto-generated",
  "userId": "user_uid",
  "productId": "omega-3-product",
  "productName": "Camega Omega-3 深海鱼油",
  "productImage": "assets/camega-omega.jpg",
  "viewedAt": "timestamp"
}
```

### 主要功能

1. **创建订单** - `createOrder(orderData)`
2. **获取用户订单** - `getUserOrders(userId)`
3. **更新订单状态** - `updateOrderStatus(orderId, newStatus)`
4. **获取订单详情** - `getOrderDetails(orderId)`
5. **添加浏览历史** - `addToHistory(productId, productName, productImage)`
6. **获取浏览历史** - `getBrowsingHistory(limit)`

## 使用方法

### 1. 在页面中引入必要的脚本

```html
<!-- Firebase SDK -->
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore-compat.js"></script>

<!-- 项目脚本 -->
<script src="config.js"></script>
<script src="js/order-management.js"></script>
```

### 2. 创建订单示例

```javascript
const orderData = {
  items: [{
    name: "Camega Omega-3 深海鱼油",
    quantity: 2,
    price: 29.99,
    total: 59.98
  }],
  totalAmount: 59.98,
  shippingAddress: "123 Main Street, Toronto, ON M5V 2H1",
  paymentMethod: "credit_card"
};

const result = await window.orderManager.createOrder(orderData);
if (result.success) {
  console.log('订单创建成功:', result.orderNumber);
}
```

### 3. 获取订单历史

```javascript
const result = await window.orderManager.getUserOrders();
if (result.success) {
  result.orders.forEach(order => {
    console.log('订单:', order.orderNumber, order.status);
  });
}
```

### 4. 添加浏览历史

```javascript
await window.orderManager.addToHistory(
  'omega-3-product',
  'Camega Omega-3 深海鱼油',
  'assets/camega-omega.jpg'
);
```

## Firebase 控制台设置

### 1. 启用 Firestore
1. 登录 [Firebase Console](https://console.firebase.google.com/)
2. 选择你的项目
3. 在左侧菜单中点击 "Firestore Database"
4. 点击 "创建数据库"
5. 选择 "测试模式" 开始（生产环境需要设置安全规则）

### 2. 设置安全规则

在 Firestore 控制台中，点击 "规则" 标签，设置基本安全规则：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 用户只能访问自己的数据
    match /orders/{orderId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    match /browsing_history/{historyId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

## 其他可存储的数据类型

### 1. 用户信息
```javascript
{
  "userId": "user_uid",
  "profile": {
    "name": "张三",
    "email": "zhangsan@example.com",
    "phone": "+1-416-555-0123",
    "address": "123 Main Street, Toronto, ON M5V 2H1"
  },
  "preferences": {
    "language": "zh-CN",
    "currency": "CAD",
    "newsletter": true
  },
  "createdAt": "timestamp",
  "lastLogin": "timestamp"
}
```

### 2. 产品目录
```javascript
{
  "productId": "omega-3-product",
  "name": "Camega Omega-3 深海鱼油",
  "description": "高品质深海鱼油，富含 EPA 和 DHA",
  "price": 29.99,
  "currency": "CAD",
  "category": "supplements",
  "images": ["assets/camega-omega.jpg"],
  "inStock": true,
  "rating": 4.8,
  "reviews": 156
}
```

### 3. 购物车
```javascript
{
  "cartId": "auto-generated",
  "userId": "user_uid",
  "items": [
    {
      "productId": "omega-3-product",
      "name": "Camega Omega-3 深海鱼油",
      "quantity": 2,
      "price": 29.99
    }
  ],
  "totalAmount": 59.98,
  "updatedAt": "timestamp"
}
```

### 4. 用户收藏
```javascript
{
  "favoriteId": "auto-generated",
  "userId": "user_uid",
  "productId": "omega-3-product",
  "productName": "Camega Omega-3 深海鱼油",
  "addedAt": "timestamp"
}
```

## 性能优化建议

1. **索引优化** - 为常用查询字段创建复合索引
2. **分页查询** - 使用 `limit()` 和 `startAfter()` 进行分页
3. **缓存策略** - 在客户端缓存常用数据
4. **批量操作** - 使用 `batch()` 进行批量写入
5. **实时监听** - 使用 `onSnapshot()` 监听数据变化

## 成本考虑

- **Firestore** 按读取、写入、删除操作收费
- **Cloud Storage** 按存储量和传输量收费
- 建议在开发阶段使用免费配额
- 生产环境需要监控使用量和成本

## 演示页面

访问 `order-demo.html` 查看完整的订单管理演示，包括：
- 创建订单
- 查看订单历史
- 更新订单状态
- 浏览历史记录

这个演示页面展示了如何使用 Firebase 存储和管理各种业务数据。 