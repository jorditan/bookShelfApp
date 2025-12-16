package service

import (
	"errors"
	"main/internal/model"
	"main/internal/store"
)

type Logger interface {
	Log(msg, error string)
}

type Service struct {
	store  store.Store
	logger Logger
}

func New(s store.Store) *Service {
	return &Service{
		store:  s,
		logger: nil,
	}
}

func (s *Service) ObtenTodosLosLibros() ([]*model.Libro, error) {
	s.logger.Log("Estamos obteniendo los libros", "")

	libros, err := s.store.GetAll()

	if err != nil {
		s.logger.Log("El error es %v\n", err.Error())
		return nil, err
	}
	return libros, nil
}

func (s *Service) ObtenLibroPorId(id int) (*model.Libro, error) {
	return s.store.GetById(id)
}

func (s *Service) CrearLibro(libro model.Libro) (*model.Libro, error) {
	if libro.Titulo == "" {
		return nil, errors.New("necesitamos el título")
	}
	return s.store.Create(&libro)
}

func (s *Service) UpdateAlLibro(id int, libro model.Libro) (*model.Libro, error) {
	if libro.Titulo == "" {
		return nil, errors.New("necesitamos el título")
	}
	return s.store.Update(id, &libro)
}

func (s *Service) RemoverLibro(id int) error {
	return s.store.Delete(id)
}
