# 🚀 Stock Management API

RESTful API developed to support the **Stock Management** application, providing authentication, user management, business data processing and communication between the frontend and backend.

The API was designed with a focus on **scalability, security, maintainability and clean architecture**.

---

## 📌 About the Project

The **Stock Management API** is the backend layer of the Stock Management platform.

It is responsible for handling:

* 🔐 User authentication
* 👤 User management
* 🔑 Password encryption
* 🪪 Authentication tokens
* 📦 Product management
* 💰 Financial data
* 👥 Clients
* 👨‍💼 Employees
* 🤖 AI Assistant integration
* 🗄️ Database communication

The API follows a RESTful architecture and communicates with the frontend through HTTP requests.

---

## 🏗️ Architecture

The application follows a layered structure to keep responsibilities separated and make the code easier to maintain and scale.

```text
Client
  │
  │ HTTP Request
  ▼
Routes
  │
  ▼
Controllers
  │
  ▼
Services
  │
  ▼
Models
  │
  ▼
MongoDB
```

Authentication follows a similar flow:

```text
User
 │
 ▼
Login
 │
 ▼
Authentication Service
 │
 ▼
Password Validation
 │
 ▼
Token Generation
 │
 ▼
Authenticated Request
```

---

## 🛠️ Technologies

### Backend

* **Node.js**
* **Express.js**
* **TypeScript / JavaScript**
* **MongoDB**
* **Mongoose**
* **JWT**
* **bcrypt**
* **dotenv**

### Development & Testing

* **Postman**
* **Jenkins**
* **Git**
* **GitHub**

---

## 🔐 Authentication

The API provides authentication functionality using secure password handling and token-based authentication.

### Authentication flow

```text
User credentials
      │
      ▼
POST /authentication/signin
      │
      ▼
Validate user
      │
      ▼
Compare encrypted password
      │
      ▼
Generate authentication token
      │
      ▼
Return token
```

Passwords are never stored as plain text.

The API uses **bcrypt** to securely hash and validate user passwords.

---

## 📡 API Endpoints

### 🔑 Authentication

| Method | Endpoint                          | Description               |
| ------ | --------------------------------- | ------------------------- |
| `POST` | `/authentication/signin`          | Authenticate a user       |
| `POST` | `/authentication/signup`          | Create a new user         |
| `POST` | `/authentication/forgot-password` | Request password recovery |

---

### 👤 Users

| Method   | Endpoint            | Description              |
| -------- | ------------------- | ------------------------ |
| `POST`   | `/users/createUser` | Create a new user        |
| `GET`    | `/users`            | Retrieve users           |
| `GET`    | `/users/:id`        | Retrieve a specific user |
| `PUT`    | `/users/:id`        | Update a user            |
| `DELETE` | `/users/:id`        | Delete a user            |

> Additional endpoints may be added as the application evolves.

---

## 📦 Example Request

### Sign In

```http
POST /authentication/signin
Content-Type: application/json
```

```json
{
  "email": "user@email.com",
  "password": "your-password"
}
```

### Example Response

```json
{
  "message": "Login successful",
  "token": "your-authentication-token"
}
```

---

## 🗄️ Database

The API uses **MongoDB** as its database and **Mongoose** as the ODM.

The application connects to MongoDB using an environment variable.

Example:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
```

Sensitive credentials should never be committed to the repository.

---

## 📁 Project Structure

```text
src/
├── controllers/
│
├── models/
│
├── routes/
│   ├── authRoutes.js
│   └── userRoutes.js
│
├── services/
│
├── middlewares/
│
├── utils/
│   ├── passwordEncryption
│   ├── passwordValidation
│   └── userToken
│
├── config/
│
└── index.js
```

The structure may evolve as new modules and features are implemented.

---

## ⚙️ Environment Variables

Create a `.env` file in the project root.

```env
PORT=8080

MONGODB_URI=your-mongodb-connection-string

JWT_SECRET=your-secret-key
```

### Example

```env
PORT=8080
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/stock-management
JWT_SECRET=your-super-secret-key
```

⚠️ Never commit your `.env` file.

Make sure it is included in `.gitignore`:

```gitignore
.env
.env.local
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/GabrielBitencourty/StockManagementAPI.git
```

### 2. Navigate to the project

```bash
cd StockManagementAPI
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create your `.env` file:

```env
PORT=8080
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
```

### 5. Start the development server

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:8080
```

---

## 🧪 API Testing

The API can be tested using tools such as **Postman**.

Recommended testing flow:

```text
1. Create user
      ↓
2. Authenticate user
      ↓
3. Receive authentication token
      ↓
4. Send authenticated requests
      ↓
5. Validate API responses
```

---

## 🔒 Security

Security is an important part of the API architecture.

The project uses:

* Password hashing with bcrypt
* Token-based authentication
* Environment variables for sensitive configuration
* MongoDB connection security
* Input validation
* Authentication middleware
* Separation of application responsibilities

---

## 🔮 Roadmap

Future improvements planned for the API:

* [ ] Complete CRUD operations
* [ ] Implement JWT middleware
* [ ] Improve request validation
* [ ] Add centralized error handling
* [ ] Add API documentation with Swagger
* [ ] Add automated unit tests
* [ ] Add integration tests
* [ ] Improve logging
* [ ] Implement refresh tokens
* [ ] Add role-based authorization
* [ ] Integrate AI Assistant
* [ ] Dockerize the API
* [ ] Deploy the API

---

## 🎯 Project Goals

The main goal of this API is to provide a reliable and scalable backend for the Stock Management platform.

This project demonstrates practical experience with:

* REST API development
* Node.js
* Express
* MongoDB
* Mongoose
* Authentication
* Password security
* API architecture
* Database integration
* Backend development
* API testing

---

## 👨‍💻 Author

**Gabriel Bitencourt**

Software Engineering student and software developer focused on building modern, scalable and maintainable applications.

### Connect with me

* 💼 LinkedIn: [Gabriel Bitencourt](https://www.linkedin.com/in/gabriel-bitencourt-931b4b248/)
* 🐙 GitHub: [GabrielBitencourty](https://github.com/GabrielBitencourty)

---

⭐ If you found this project interesting, consider giving it a star!
