# 🚀 Admin Panel Project

A complete **Admin Management System** built using **Node.js**, **Express.js**, **MongoDB**, **Mongoose**, **EJS**, and the **Corona Admin Template**.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=node.js\&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge\&logo=express\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-8BC34A?style=for-the-badge)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge\&logo=bootstrap\&logoColor=white)

---

# ✨ Features

## 🔐 Authentication Module

* ✅ Admin Registration
* ✅ Admin Login
* ✅ Logout
* ✅ Forgot Password
* ✅ Email OTP Verification
* ✅ Password Reset
* ✅ Session Authentication

---

## 👨‍💼 Admin Management

* ✅ Add Admin
* ✅ View Admin
* ✅ Edit Admin
* ✅ Delete Admin
* ✅ Profile Management
* ✅ Avatar Upload

---

## 📂 Category Management

* ✅ Add Category
* ✅ View Category
* ✅ Edit Category
* ✅ Status Toggle
* ✅ Soft Delete
* ✅ Trash Category
* ✅ Restore Category
* ✅ Permanent Delete

---

## 📁 Sub Category Management

* ✅ Add Sub Category
* ✅ View Sub Category
* ✅ Category-wise Mapping
* ✅ Soft Delete
* ✅ Trash Sub Category
* ✅ Restore Sub Category
* ✅ Permanent Delete

---

## 🔔 Notifications

* ✅ Flash Messages
* ✅ SweetAlert2 Alerts

---

# 🛠️ Tech Stack

## Backend

* 🟢 Node.js
* ⚡ Express.js
* 🍃 MongoDB
* 📦 Mongoose

## Frontend

* 🎨 EJS
* 🎯 Bootstrap
* 📱 Responsive Design
* 🌟 Corona Admin Template

## Security

* 🔒 bcryptjs
* 🔑 express-session

## File Upload

* 📤 Multer

## Email Service

* 📧 Nodemailer

---

# 📁 Project Structure

```bash
project/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── views/
├── public/
│
├── app.js
├── package.json
└── README.md
```

---

# ⚙️ Installation

###1️⃣ Install Packages

```bash
npm install
```

### 2️⃣ Run Project

```bash
npm start
```

or

```bash
nodemon app.js
```

---

# 🔧 Environment Variables

Create a `.env` file:

```env
PORT=8000

MONGO_URL=mongodb://127.0.0.1:27017/admin_panel

EMAIL_USER=yourgmail@gmail.com

EMAIL_PASS=your_app_password
```

---

# 🗑️ Soft Delete System

Instead of permanently deleting records:

```js
isDeleted: true
```

Records are moved to Trash.

### Available Actions

* ♻️ Restore
* 🗑️ Delete Forever

---

# 📸 Screenshots

### 🔑 Login Page

* Admin Login System

### 🏠 Dashboard

* Admin Dashboard

### 📂 Category Module

* CRUD Operations

### 📁 Sub Category Module

* Category Relationship Management

### 🗑️ Trash Module

* Restore & Permanent Delete

---

# 👨‍💻 Author

 **_Hiya Shah_**
