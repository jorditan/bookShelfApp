// El paquete service contiene la lógica de negocio.
// No accede directamente a la base de datos ni a HTTP.
package service

import (
	// Paquete estándar para crear errores personalizados

	// Modelos de dominio
	"database/sql"
	"errors"
	"main/internal/model"
	"strings"

	// Capa de persistencia (store)
	"main/internal/store"
)

// -----------------------------
// LOGGER (ABSTRACCIÓN)
// -----------------------------

// Logger define una interfaz mínima para registrar mensajes.
// Se abstrae para no depender de una implementación concreta
// (log estándar, zap, logrus, etc.)

// -----------------------------
// SERVICE
// -----------------------------

// Service representa la capa de negocio.
// Depende de:
// - Un Store (persistencia)
// - Un Logger (observabilidad)
type Service struct {
	store store.Store
}

// -----------------------------
// CONSTRUCTOR
// -----------------------------

// New crea una nueva instancia del Service.
// Recibe el store como dependencia (inyección).
func New(s store.Store) *Service {
	return &Service{
		store: s,
	}
}

// -----------------------------
// OBTENER TODOS LOS LIBROS
// -----------------------------

func (s *Service) GetAllBooks(page, limit int, author, title string) ([]*model.Book, error) {
	if page < 1 {
		page = 1
	}

	if limit < 1 || limit > 100 {
		limit = 10
	}

	offset := (page - 1) * limit

	// Optional normalization (example)
	author = strings.TrimSpace(author)
	title = strings.TrimSpace(title)

	// Delegación al store
	return s.store.GetAll(limit, offset, author, title)
}

// -----------------------------
// OBTENER LIBRO POR ID
// -----------------------------

func (s *Service) GetBookById(id int) (*model.Book, error) {

	book, err := s.store.GetById(id)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, ErrNotFound
		}
	}
	// No hay lógica de negocio adicional,
	// simplemente se delega al store
	return book, nil
}

// -----------------------------
// CREAR LIBRO
// -----------------------------

func (s *Service) CreateBook(book *model.Book) (*model.Book, error) {

	// Regla de negocio:
	// No se permite crear un libro sin título
	if book.Title == "" {
		return nil, ErrTitleRequired
	}

	if book.ReadDate != nil && *book.ReadDate == "" {
		book.ReadDate = nil
	}

	if book.Author == "" {
		return nil, ErrAuthorRequired
	}


	// Se delega la persistencia al store
	return s.store.Create(book)
}

// -----------------------------
// ACTUALIZAR LIBRO
// -----------------------------

func (s *Service) UpdateBook(id int, book model.Book) (*model.Book, error) {

	// Regla de negocio:
	// El título es obligatorio
	if book.Title == "" {
		return nil, ErrTitleRequired
	}

	// Se delega al store
	return s.store.Update(id, &book)
}

// -----------------------------
// ELIMINAR LIBRO
// -----------------------------

func (s *Service) DeleteBook(id int) error {

	// No hay reglas de negocio adicionales,
	// se delega directamente al store
	return s.store.Delete(id)
}
