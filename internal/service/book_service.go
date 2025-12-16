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
type Logger interface {
	Log(msg, error string)
}

// -----------------------------
// SERVICE
// -----------------------------

// Service representa la capa de negocio.
// Depende de:
// - Un Store (persistencia)
// - Un Logger (observabilidad)
type Service struct {
	store  store.Store
	logger Logger
}

// -----------------------------
// CONSTRUCTOR
// -----------------------------

// New crea una nueva instancia del Service.
// Recibe el store como dependencia (inyección).
func New(s store.Store) *Service {
	return &Service{
		store:  s,
		logger: nil, // ⚠️ PROBLEMA: logger nil (lo veremos más abajo)
	}
}

// -----------------------------
// OBTENER TODOS LOS LIBROS
// -----------------------------

func (s *Service) ObtenTodosLosLibros() ([]*model.Libro, error) {

	// ❌ PELIGRO: si logger es nil esto va a causar panic
	s.logger.Log("Estamos obteniendo los libros", "")

	// Delegación al store
	libros, err := s.store.GetAll()
	if err != nil {

		// Registro del error
		s.logger.Log("El error es %v\n", err.Error())

		return nil, err
	}

	return libros, nil
}

// -----------------------------
// OBTENER LIBRO POR ID
// -----------------------------

func (s *Service) ObtenLibroPorId(id int) (*model.Libro, error) {

	// No hay lógica de negocio adicional,
	// simplemente se delega al store
	return s.store.GetById(id)
}

// -----------------------------
// CREAR LIBRO
// -----------------------------

func (s *Service) CrearLibro(libro model.Libro) (*model.Libro, error) {

	// Regla de negocio:
	// No se permite crear un libro sin título
	if libro.Titulo == "" {
		return nil, errors.New("necesitamos el título")
	}

	// Se delega la persistencia al store
	return s.store.Create(&libro)
}

// -----------------------------
// ACTUALIZAR LIBRO
// -----------------------------

func (s *Service) UpdateAlLibro(id int, libro model.Libro) (*model.Libro, error) {

	// Regla de negocio:
	// El título es obligatorio
	if libro.Titulo == "" {
		return nil, errors.New("necesitamos el título")
	}

	// Se delega al store
	return s.store.Update(id, &libro)
}

// -----------------------------
// ELIMINAR LIBRO
// -----------------------------

func (s *Service) RemoverLibro(id int) error {

	// No hay reglas de negocio adicionales,
	// se delega directamente al store
	return s.store.Delete(id)
}
