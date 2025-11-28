# Mercenary API Starter Kit (NestJS)

### **Role:** Senior Backend Asset

### **Purpose:** Rapid deployment for "Fix-it" and "MVP" contracts.

------------------------------------------------------------------------

## 1. The "Senior" Difference

Most freelancers deliver raw JSON and 500 errors.\
This boilerplate includes production-grade essentials:

### ✅ **Rate Limiting**

-   Pre-configured throttling (10 req/min) to prevent abuse and DDoS.

### ✅ **Security Headers**

-   Uses **helmet** to set secure HTTP headers by default.

### ✅ **CORS Configured**

-   Ready for frontend integration immediately.

### ✅ **Global Response Interceptor**

-   Wraps every success response in:

    ``` json
    { "data": ... }
    ```

-   Ensures consistent client parsing.

### ✅ **Global Exception Filter**

-   Catches errors and returns **clean JSON error messages**, not stack
    traces.

### ✅ **Swagger UI**

-   Auto-generated API documentation at **/api/docs**.
-   Shows professionalism before any business logic is written.

### ✅ **Health Checks**

-   Dedicated **/health** endpoint that pings the database.
-   Essential for AWS / Kubernetes deployments.

### ✅ **Strict Env Validation**

-   App refuses to start unless all required environment variables are
    present (DB credentials, etc).

------------------------------------------------------------------------

## 2. Setup Instructions

``` bash
npm install
```

Create a `.env` file in the project root (copy from `.env.example`).

Start Postgres:

``` bash
docker-compose up -d
```

Run the app:

``` bash
npm run start:dev
```

------------------------------------------------------------------------

## 3. How to Sell This

When applying for a job, include a link to the GitHub repository.

Use this pitch:

> "I use a custom, production-ready NestJS architecture that handles
> security, validation, and documentation out of the box. I can start
> coding your business logic in Hour 1, not Day 2."

------------------------------------------------------------------------

## 4. Environment Variables (`.env`)

### **Option A: Using Docker (Recommended)**

Use port **5435** to avoid conflicts with local Postgres installations.

``` env
PORT=3000
NODE_ENV=development

# Database (Docker)
DB_HOST=localhost
DB_PORT=5435
DB_USERNAME=admin
DB_PASSWORD=password123
DB_NAME=mercenary_api
```

------------------------------------------------------------------------

### **Option B: Using Local System Postgres**

If you prefer local installation, use port **5432** and your local
credentials.

``` env
# Database (Local)
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=yourpassword
DB_NAME=mercenary_api
```

------------------------------------------------------------------------

## 5. Docker Compose Configuration

``` yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: mercenary_db
    ports:
      - '5435:5432'
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password123
      POSTGRES_DB: mercenary_api
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U admin -d mercenary_api"]
      interval: 10s
      timeout: 5s
      retries: 5
    restart: always

volumes:
  postgres_data:
```
