# Project Commands & Simple Explanation

## 1. Running with Docker (Recommended)
Command:
docker-compose up

Explanation:
Starts the entire system (backend, frontend, and database) automatically using Docker containers.

---

## 2. Running Backend Without Docker
Command:
cd licensing
mvn spring-boot:run

Explanation:
Starts the Spring Boot backend server locally.

---

## 3. Running Backend Tests
Command:
mvn test

Explanation:
Runs unit and integration tests for the backend.

---

## 4. Running Frontend
Command:
cd frontend
npm install
npm start

Explanation:
Installs dependencies and starts the React frontend application.

---

## 5. Database Setup
Command:
Import SQL file (bnrchallengeseeds0.sql) into MySQL Workbench

Explanation:
Creates and populates the database schema required for the system.

---

## Summary
- Docker = full system in one command
- Maven = backend execution and testing
- NPM = frontend execution
- SQL file = database initialization
