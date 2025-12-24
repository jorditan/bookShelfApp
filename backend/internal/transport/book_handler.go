// El paquete transport contiene los handlers HTTP.
// Su responsabilidad es convertir requests HTTP
// en llamadas al service, y devolver responses HTTP.
package transport

import (
	// Codificación y decodificación JSON
	"encoding/json"

	// Modelo de dominio
	"main/internal/model"

	// Capa de servicio (lógica de negocio)
	"main/internal/service"

	// Paquete estándar HTTP
	"net/http"

	// Conversión de strings a números
	"strconv"

	// Manipulación de strings
	"strings"
)

// -----------------------------
// HANDLER
// -----------------------------

// BookHandler es el handler HTTP para la entidad Libro.
// Depende del Service, no del Store ni de la DB.
type BookHandler struct {
	service *service.Service
}

// -----------------------------
// CONSTRUCTOR
// -----------------------------

// New crea una nueva instancia del handler,
// inyectando la dependencia del service.
func New(s *service.Service) *BookHandler {
	return &BookHandler{
		service: s,
	}
}

// -----------------------------
// /books
// -----------------------------

// HandleBooks maneja las requests a la ruta /books
// Soporta:
// - GET  → obtener todos los libros
// - POST → crear un libro
func (h *BookHandler) HandleBooks(w http.ResponseWriter, r *http.Request) {

	// Se decide la acción según el método HTTP
	switch r.Method {

	// -----------------------------
	// GET /books
	// -----------------------------
	case http.MethodGet:

		pageStr := r.URL.Query().Get("page")
		limitStr := r.URL.Query().Get("limit")
		author := r.URL.Query().Get("author")
		title := r.URL.Query().Get("title")

		page := 1
		limit := 10

		if pageStr != "" {
			if p, err := strconv.Atoi(pageStr); err == nil {
				page = p
			}
		}

		if limitStr != "" {
			if l, err := strconv.Atoi(limitStr); err == nil {
				limit = l
			}
		}

		// Se obtienen todos los libros desde el service
		books, err := h.service.GetAllBooks(page, limit, author, title)
		if err != nil {
			// Error interno del servidor
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Se setea el tipo de contenido
		w.Header().Set("Content-Type", "application/json")

		// Se escribe la respuesta en JSON
		json.NewEncoder(w).Encode(books)

	// -----------------------------
	// POST /books
	// -----------------------------
	case http.MethodPost:

		// Struct donde se cargará el JSON recibido
		var book model.Book

		// Decodifica el body JSON → struct
		if err := json.NewDecoder(r.Body).Decode(&book); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		// Llama al service para crear el book
		created, err := h.service.CreateBook(&book)
		if err != nil {
			handleServiceError(w, err)
			return
		}

		// Código HTTP 201: recurso creado
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(created)

	// -----------------------------
	// MÉTODO NO SOPORTADO
	// -----------------------------
	default:
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
	}
}

// -----------------------------
// /book/{id}
// -----------------------------

// HandleBookById maneja requests a rutas como:
// /book/1
func (h *BookHandler) HandleBookById(w http.ResponseWriter, r *http.Request) {

	// Se obtiene el ID desde la URL
	// Ej: "/book/5" → "5"
	idStr := strings.TrimPrefix(r.URL.Path, "/book/")

	// Se convierte el ID a int
	id, err := strconv.Atoi(idStr)
	if err != nil {
		handleServiceError(w, service.ErrInvalidInput)
		return
	}

	// Se decide la acción según el método HTTP
	switch r.Method {

	// -----------------------------
	// GET /book/{id}
	// -----------------------------
	case http.MethodGet:

		book, err := h.service.GetBookById(id)
		if err != nil {
			handleServiceError(w, err)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(book)

	// -----------------------------
	// PUT /book/{id}
	// -----------------------------
	case http.MethodPut:

		var book model.Book

		// Decodifica el JSON recibido
		if err := json.NewDecoder(r.Body).Decode(&book); err != nil {
			handleServiceError(w, err)
			return
		}

		// Llama al service para actualizar
		updated, err := h.service.UpdateBook(id, book)
		if err != nil {
			handleServiceError(w, err)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(updated)

	// -----------------------------
	// DELETE /book/{id}
	// -----------------------------
	case http.MethodDelete:

		if err := h.service.DeleteBook(id); err != nil {
			handleServiceError(w, err)
			return
		}

		// 204: operación exitosa sin cuerpo
		w.WriteHeader(http.StatusNoContent)

	// -----------------------------
	// MÉTODO NO SOPORTADO
	// -----------------------------
	default:
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
	}
}

func handleServiceError(w http.ResponseWriter, err error) {
	switch err {
	case service.ErrNotFound:
		http.Error(w, err.Error(), http.StatusNotFound)
	case service.ErrTitleRequired,
		service.ErrAuthorRequired,
		service.ErrInvalidInput,
		service.ErrPublisherRequired:
		http.Error(w, err.Error(), http.StatusBadRequest)
	default:
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
}
