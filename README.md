# Retail Management – Billing & POS System

A full-stack retail billing application: admins manage categories, items and staff; cashiers ring up orders, take cash or **Razorpay** (UPI/card) payments, and print receipts. A dashboard summarises sales and recent orders.

**Live demo:** _add your URL here_ &nbsp;|&nbsp; **Demo login:** _add a demo user here_

## Features
- JWT authentication with **role-based access** (`ROLE_ADMIN`, `ROLE_USER`) enforced in Spring Security and in React routes
- Admin: manage categories, items (with image upload to **AWS S3**) and users
- POS screen: search/filter items by category, cart with quantity and tax summary, customer details
- Payments: cash, or online via **Razorpay** with server-side signature verification
- Printable receipt, order history, sales dashboard

## Tech stack
| Layer | Tech |
|---|---|
| Frontend | React 19, Vite, React Router, Axios, Bootstrap 5 |
| Backend | Java 21, Spring Boot 3.4, Spring Security, Spring Data JPA, JJWT |
| Database | MySQL 8 |
| Integrations | AWS S3, Razorpay |

## Project structure
```
backend/    Spring Boot REST API (context path /api/v1.0)
frontend/   React single-page app
database/   schema.sql (MySQL dump of the tables)
docs/       Postman collection
```

## Run locally
**Prerequisites:** JDK 21, Maven (or use `./mvnw`), Node 20+, MySQL 8.

1. Create the database: `CREATE DATABASE billing_app;`
2. Backend – set environment variables (see `backend/src/main/resources/application.properties` for all of them) and start:
   ```bash
   cd backend
   export DB_USERNAME=root DB_PASSWORD=yourpassword
   export AWS_ACCESS_KEY=... AWS_SECRET_KEY=... AWS_BUCKET_NAME=... AWS_REGION=ap-south-1
   export RAZORPAY_KEY_ID=rzp_test_... RAZORPAY_KEY_SECRET=...
   export JWT_SECRET_KEY=$(openssl rand -hex 32)
   ./mvnw spring-boot:run
   ```
   Tables are created automatically on first start.
3. Create the first admin user (password below is `123456` – change it):
   ```sql
   INSERT INTO tbl_users(name, email, password, role, created_at, updated_at, user_id)
   VALUES ('Admin','admin@example.com',
     '$2a$10$Jv28cuVrSxzPsZeujtM8F.aqV7aSlUDu05GhYzG/cbd1gtTNurQRe',
     'ROLE_ADMIN', current_timestamp(), current_timestamp(), uuid());
   ```
4. Frontend:
   ```bash
   cd frontend
   cp .env.example .env.local   # set VITE_RAZORPAY_KEY_ID
   npm install && npm run dev   # http://localhost:5173
   ```

## Deploy (free-tier friendly)
1. **Database** – create a MySQL instance (Railway, Aiven, PlanetScale-compatible, etc.) and note its JDBC URL.
2. **Backend** – deploy `backend/` as a Docker service (Render / Railway / Fly.io; a `Dockerfile` is included). Set env vars:
   `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET_KEY`, `AWS_*`, `RAZORPAY_*`, and
   `CORS_ALLOWED_ORIGINS=https://<your-frontend-domain>`.
3. **Frontend** – deploy `frontend/` to Vercel or Netlify (SPA rewrite files included). Set build env vars:
   `VITE_API_BASE_URL=https://<your-backend-domain>/api/v1.0` and `VITE_RAZORPAY_KEY_ID`.
4. Insert the admin user (step 3 above) in the hosted database, then log in.

> Use Razorpay **test** keys for a public demo, and never commit real keys – everything sensitive is read from environment variables.

## API
Import `docs/postman_collection.json` into Postman and set the `baseUrl` and `token` variables.

## Credits
Based on the open "Spring Boot + React Billing Software" tutorial project by Bushan Sirgur, extended and maintained by the repository owner.
