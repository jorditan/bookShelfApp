// El paquete store representa la capa de acceso a datos (persistencia).
// Su única responsabilidad es comunicarse con la base de datos.
package store

import (
	// Paquete estándar de Go para trabajar con bases de datos SQL
	"database/sql"
	"strconv"
	"strings"

	// Paquete interno que contiene los modelos de dominio.
	// En este caso, el struct Libro.
	"main/internal/model"
)

// -----------------------------
// INTERFAZ STORE
// -----------------------------

// Store define el contrato que cualquier implementación
// de acceso a datos para Libros debe cumplir.
//
// Gracias a esta interfaz:
// - Los handlers no dependen de SQL directamente
// - Se puede mockear fácilmente en tests
// - Se puede cambiar la implementación sin romper el resto del sistema
type Store interface {

	// GetAll devuelve todos los libros almacenados.
	// Retorna un slice de punteros a Libro o un error.
	GetAll(limit, offset int, author, title string) ([]*model.Book, error)

	// GetById devuelve un libro por su ID.
	// Si no existe o hay error en la DB, devuelve error.
	GetById(id int) (*model.Book, error)

	// Create inserta un nuevo libro en la base de datos.
	// Devuelve el libro creado con su ID asignado.
	Create(libro *model.Book) (*model.Book, error)

	// Update modifica un libro existente.
	// Recibe el ID del libro a modificar y los nuevos datos.
	Update(id int, libro *model.Book) (*model.Book, error)

	// Delete elimina un libro por su ID.
	Delete(id int) error
}

// -----------------------------
// IMPLEMENTACIÓN CONCRETA
// -----------------------------

// store es la implementación concreta de la interfaz Store.
// Es privada (minúscula) para forzar el uso de la interfaz.
type store struct {
	// db mantiene la conexión a la base de datos
	db *sql.DB
}

// -----------------------------
// CONSTRUCTOR
// -----------------------------

// New crea una nueva instancia del store.
// Recibe la conexión a la base de datos ya inicializada.
//
// Devuelve la interfaz Store (no el struct concreto),
// lo cual es una buena práctica en Go.
func New(db *sql.DB) Store {
	return &store{db: db}
}

// -----------------------------
// GET ALL
// -----------------------------

// GetAll obtiene todos los libros de la base de datos.
func (s *store) GetAll(limit, offset int, author, title string) ([]*model.Book, error) {

	// Consulta SQL para obtener todos los libros
	q := `SELECT 
		id_book, title, author, rating, publisher, review,read_date 
	FROM book
	`

	args := []any{}
	conditions := []string{}

	if author != "" {
		conditions = append(conditions, "author ILIKE $"+strconv.Itoa(len(args)+1))
		args = append(args, "%"+author+"%")
	}

	if title != "" {
		conditions = append(conditions, "title ILIKE $"+strconv.Itoa(len(args)+1))
		args = append(args, "%"+title+"%")
	}

	if len(conditions) > 0 {
		q += " WHERE " + strings.Join(conditions, " AND ")
	}

	q += " ORDER BY id_book"
	q += " LIMIT $" + strconv.Itoa(len(args)+1)
	q += " OFFSET $" + strconv.Itoa(len(args)+2)

	args = append(args, limit, offset)

	// Ejecuta la consulta
	rows, err := s.db.Query(q, args...)
	if err != nil {
		return nil, err
	}

	// Asegura que el cursor se cierre al salir de la función
	defer rows.Close()

	// Slice donde se almacenarán los libros
	books := make([]*model.Book, 0)

	// Itera sobre cada fila devuelta por la consulta
	for rows.Next() {
		// Se inicializa un nuevo Libro
		// Esto es CLAVE para evitar nil pointer dereference
		b := &model.Book{}
		err := rows.Scan(
			&b.ID,
			&b.Title,
			&b.Author,
			&b.Rating,
			&b.Publisher,
			&b.Review,
			&b.ReadDate,
		)
		if err != nil {
			return nil, err
		}

		// Se agrega el libro al slice
		books = append(books, b)
	}

	return books, nil
}

// -----------------------------
// GET BY ID
// -----------------------------

// GetById obtiene un libro específico por su ID.
func (s *store) GetById(id int) (*model.Book, error) {

	// Consulta SQL con parámetro
	q := `SELECT id_book, title, author, rating, publisher, review, read_date FROM book WHERE id_book = $1`

	// Se inicializa el struct donde se cargará el resultado
	book := &model.Book{}

	// QueryRow se usa cuando se espera una sola fila
	err := s.db.QueryRow(q, id).Scan(
		&book.ID,
		&book.Title,
		&book.Author,
		&book.Rating,
		&book.Publisher,
		&book.Review,
		&book.ReadDate,
	)

	if err != nil {
		// Puede ser sql.ErrNoRows u otro error
		return nil, err
	}

	return book, nil
}

// -----------------------------
// CREATE
// -----------------------------

// Create inserta un nuevo libro en la base de datos.
func (s *store) Create(book *model.Book) (*model.Book, error) {
	q := `
		INSERT INTO book (title, author, publisher, review, rating, read_date) 
		VALUES ($1, $2, $3, $4, $5, $6)
		RETURNING id_book
	`

	err := s.db.QueryRow(
		q,
		book.Title,
		book.Author,
		book.Publisher,
		book.Review,
		book.Rating,
		book.ReadDate,
	).Scan(&book.ID)

	if err != nil {
		return nil, err
	}

	return book, nil
}

// -----------------------------
// UPDATE
// -----------------------------

// Update modifica un libro existente.
func (s *store) Update(id int, book *model.Book) (*model.Book, error) {

	// Consulta SQL de actualización
	q := `UPDATE book SET title = $1, author = $2, publisher = $3, review = $4, rating = $5, read_date = $6 WHERE id_book = $7`

	// Ejecuta la actualización
	_, err := s.db.Exec(q, book.Title, book.Author, book.Publisher, book.Review, book.Rating, book.ReadDate, id)
	if err != nil {
		return nil, err
	}

	// Se asegura que el ID del struct coincida
	book.ID = id

	return book, nil
}

// -----------------------------
// DELETE
// -----------------------------

// Delete elimina un libro por su ID.
func (s *store) Delete(id int) error {

	// Consulta SQL de eliminación
	q := `DELETE FROM book WHERE id_book = $1`

	// Ejecuta el delete
	_, err := s.db.Exec(q, id)

	// Se devuelve el error directamente (nil si todo salió bien)
	return err
}
