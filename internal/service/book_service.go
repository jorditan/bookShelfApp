// El paquete service contiene la lógica de negocio.
// No accede directamente a la base de datos ni a HTTP.
package service

import (
	// Paquete estándar para crear errores personalizados
	"errors"

	// Modelos de dominio
	"main/internal/model"

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

func (s *Service) GetAllBooks() ([]*model.Book, error) {

	// Delegación al store
	books, err := s.store.GetAll()
	if err != nil {

		// Registro del error
		return nil, err
	}

	return books, nil
}

// -----------------------------
// OBTENER LIBRO POR ID
// -----------------------------

func (s *Service) GetBookById(id int) (*model.Book, error) {

	// No hay lógica de negocio adicional,
	// simplemente se delega al store
	return s.store.GetById(id)
}

// -----------------------------
// CREAR LIBRO
// -----------------------------

func (s *Service) CreateBook(book model.Book) (*model.Book, error) {

	// Regla de negocio:
	// No se permite crear un libro sin título
	if book.Title == "" {
		return nil, errors.New("Title is required")
	}

	if book.Author == "" {
		return nil, errors.New("Author is required")
	}

	// Se delega la persistencia al store
	return s.store.Create(&book)
}

// -----------------------------
// ACTUALIZAR LIBRO
// -----------------------------

func (s *Service) UpdateBook(id int, book model.Book) (*model.Book, error) {

	// Regla de negocio:
	// El título es obligatorio
	if book.Title == "" {
		return nil, errors.New("necesitamos el título")
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
