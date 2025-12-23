package main

import (
	"fmt"
	"log"
	"main/internal/db"
	"main/internal/service"
	"main/internal/store"
	"main/internal/transport"

	"github.com/joho/godotenv"

	"net/http"

	_ "modernc.org/sqlite"
)

func main() {
	_ = godotenv.Load()
	// Conectar a SQLLite
	db, err := db.Connect()
	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()

	// Crear el table si no existe
	q := `
		CREATE TABLE IF NOT EXISTS books (
			id SERIAL PRIMARY KEY NOT NULL, 
			tittle TEXT NOT NULL,
			author TEXT NOT NULL,
			price NUMERIC(10,2) NOT NULL
		)
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
	mux.HandleFunc("/book", bookHandler.HandleBookById)

	handler := transport.CORSMiddleware(mux)

	fmt.Println("Servidor ejectuándose en http://localhost:8080")

	// Empezar y escuchar al servidor
	http.ListenAndServe(":8080", handler)
}
