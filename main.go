package main

import (
	"database/sql"
	"fmt"
	"log"
	"main/internal/service"
	"main/internal/store"
	"main/internal/transport"
	"net/http"

	_ "modernc.org/sqlite"
)

func main() {
	// Conectar a SQLLite
	db, err := sql.Open("sqlite", "./books.db")
	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()

	// Crear el table si no existe
	q := `
		CREATE TABLE IF NOT EXISTS books (
			id INTEGER PRIMARY KEY AUTOINCREMENT, 
			tittle TEXT NOT NULL,
			author TEXT NOT NULL
		)
	`
	if _, err := db.Exec(q); err != nil {
		log.Fatal(err.Error())
	}

	// Inyectar nuestras dependencias
	bookStore := store.New(db)
	bookService := service.New(bookStore)
	bookHandler := transport.New(bookService)

	// Configurar las rutas
	http.HandleFunc("/books", bookHandler.HandleBooks)
	http.HandleFunc("/books", bookHandler.HandleBookById)

	fmt.Println("Servidor ejectuándose en http://localhost:8080")

	// Empezar y escuchar al servidor
	log.Fatal(http.ListenAndServe(":8000", nil))
}
