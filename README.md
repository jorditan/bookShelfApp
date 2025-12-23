# BookShelf API

**BookShelf API** is a REST API built with **Go** and **PostgreSQL**.

The application allows a single user to log books and store personal reading information such as reviews, price, and read date. It is heavily inspired by **Letterboxd**, but focused on books.

This project is designed to be extended in the future to support multiple users.

---

## 🚀 Features

- **Full CRUD**: Create, Read, Update, and Delete books.
- **Input Validation**: Robust validation at the service layer.
- **Error Handling**: Domain-specific error management.
- **Frontend Ready**: CORS support enabled for seamless integration.

---

## 🏗️ Architecture

The project follows a layered architecture with a clear separation of concerns:



| Layer | Responsibility |
| :--- | :--- |
| **Handlers (Transport)** | Manages HTTP requests and responses. |
| **Service** | Contains business rules, validations, and domain errors. |
| **Store / Repository** | Handles persistence and direct communication with the database. |

---

## 🛠️ Tech Stack

- **Language:** Go
- **Database:** PostgreSQL
- **Router:** `net/http` (Standard Library)
- **Driver:** `database/sql`

---

## 📊 Data Model

### Book
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | integer | Primary key |
| `title` | string | Book title (required) |
| `author` | string | Book author (required) |
| `publisher` | string | Book publisher |
| `review` | string | Personal review (nullable) |
| `price` | numeric | Book price (nullable) |
| `read_date` | date | Date when the book was read (nullable) |

---

## 🛣️ API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/books` | Get all books |
| `POST` | `/books` | Create a new book |
| `GET` | `/book/{id}` | Get a book by ID |
| `PUT` | `/book/{id}` | Update a book |
| `DELETE` | `/book/{id}` | Delete a book |

### Example Request (Create a Book)

```bash
curl -X POST http://localhost:8080/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "1984",
    "author": "George Orwell",
    "publisher": "Secker & Warburg",
    "review": "Disturbing and brilliant",
    "price": 19.99,
    "read_date": "2024-06-10"
  }'
🌐 CORS & Error Handling
CORS
CORS is enabled to allow requests from frontend applications (e.g., React).

Development Origin: http://localhost:5173

Handles preflight (OPTIONS) requests automatically.

Error Handling
The service layer maps domain errors to proper HTTP status codes:

400 Bad Request: Missing required fields or invalid input.

404 Not Found: Resource does not exist.

500 Internal Server Error: Unexpected server issues.

⚙️ Setup & Run
Requirements
Go 1.21+

PostgreSQL

1. Environment Variables
Create a .env file in the root directory:

Fragmento de código

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=books
2. Run the API
Bash

go run cmd/api/main.go
The server will start at: http://localhost:8080

📈 Project Status
✅ Single-user support

✅ Full CRUD for books

✅ Clean layered architecture

🚧 In Progress: Frontend integration (React + TypeScript)

🚧 Future: Multi-user support (Many-to-Many model)

🎯 Purpose
This project was built to:

Practice backend development using Go.

Apply database modeling and SQL concepts.

Build a clean, maintainable REST API.

Improve technical English communication within a codebase.