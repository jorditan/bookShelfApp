package main

import (
	"fmt"
	"log"
	"main/internal/db"
	"main/internal/service"
	"main/internal/store"
	"main/internal/transport"

	"net/http"

	"github.com/joho/godotenv"
)

func main() {

	_ = godotenv.Load("../../.env")

	db, err := db.Connect()
	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()

	// Crear el table si no existe
	q := `
		CREATE TABLE IF NOT EXISTS book (
			id_book SERIAL PRIMARY KEY,
			title TEXT NOT NULL,
			author TEXT NOT NULL,
			publisher TEXT NOT NULL,
			review TEXT,
			price REAL,
			read_date TEXT
);
	`
	if _, err := db.Exec(q); err != nil {
		log.Fatal(err.Error())
	}

	mux := http.NewServeMux()

	// Inyectar nuestras dependencias
	bookStore := store.New(db)
	bookService := service.New(bookStore)
	bookHandler := transport.New(bookService)

	mux.HandleFunc("/books", bookHandler.HandleBooks)
	mux.HandleFunc("/book/", bookHandler.HandleBookById)

	handler := transport.CORSMiddleware(mux)

	fmt.Println("Servidor ejectuándose en http://localhost:8080")

	// Empezar y escuchar al servidor
	http.ListenAndServe(":8080", handler)
}
