# 📦 API – Node.js Authentication Server

A secure and modular **Express.js API** implementing **JWT authentication with refresh tokens**, built with modern best practices for production use.

This API handles:
- User login with hashed passwords
- Access token issuance (short‑lived)
- Refresh token handling (long‑lived)
- Token revocation
- Middleware‑based protected routes

🔐 Tokens are managed using **JSON Web Tokens (JWT)** with refresh token support. :contentReference[oaicite:0]{index=0}

---

## 🧠 Features

✔ Login endpoint with secure password hashing  
✔ Access and refresh tokens support  
✔ Token refresh endpoint  
✔ Logout (refresh token revocation)  
✔ Authentication middleware  
✔ Clean folder structure with controllers, routes, and utils  
✔ Environment‑based configuration via `.env`

---

## 📦 Tech Stack

| Technology | Role |
|------------|------|
| Node.js | Runtime |
| Express.js | Web framework |
| MySQL (mysql2) | Database |
| JWT | Authentication |
| bcrypt | Password hashing |
| Joi | Input validation |
| express‑rate‑limit | Login rate limiting |
| dotenv | Environment variables |

---

## 🚀 Table of Contents

- [Installation](#installation)  
- [Setup](#setup)  
- [Environment Variables](#environment‑variables)  
- [Database](#database)  
- [Usage](#usage)  
  - Login  
  - Refresh Token  
  - Logout  
  - Protected Routes  
- [Project Structure](#project‑structure)  
- [Contributing](#contributing)  
- [License](#license)

---

## 📥 Installation

Clone the repository:

```bash
git clone https://github.com/Macaron27/API.git
cd API
