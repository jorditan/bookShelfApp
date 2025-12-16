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

		// Se obtienen todos los libros desde el service
		libros, err := h.service.ObtenTodosLosLibros()
		if err != nil {
			// Error interno del servidor
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Se setea el tipo de contenido
		w.Header().Set("Content-Type", "application/json")

		// Se escribe la respuesta en JSON
		json.NewEncoder(w).Encode(libros)

	// -----------------------------
	// POST /books
	// -----------------------------
	case http.MethodPost:

		// Struct donde se cargará el JSON recibido
		var libro model.Libro

		// Decodifica el body JSON → struct
		if err := json.NewDecoder(r.Body).Decode(&libro); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		// Llama al service para crear el libro
		created, err := h.service.CrearLibro(libro)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Código HTTP 201: recurso creado
		w.WriteHeader(http.StatusCreated)
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(created)

	// -----------------------------
	// MÉTODO NO SOPORTADO
	// -----------------------------
	default:
		http.Error(w, "Método no disponible", http.StatusMethodNotAllowed)
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
		http.Error(w, "ID inválido", http.StatusBadRequest)
		return
	}

	// Se decide la acción según el método HTTP
	switch r.Method {

	// -----------------------------
	// GET /book/{id}
	// -----------------------------
	case http.MethodGet:

		libro, err := h.service.ObtenLibroPorId(id)
		if err != nil {
			http.Error(w, "No lo encontramos", http.StatusNotFound)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(libro)

	// -----------------------------
	// PUT /book/{id}
	// -----------------------------
	case http.MethodPut:

		var libro model.Libro

		// Decodifica el JSON recibido
		if err := json.NewDecoder(r.Body).Decode(&libro); err != nil {
			http.Error(w, "Input inválido", http.StatusBadRequest)
			return
		}

		// Llama al service para actualizar
		updated, err := h.service.UpdateAlLibro(id, libro)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(updated)

	// -----------------------------
	// DELETE /book/{id}
	// -----------------------------
	case http.MethodDelete:

		if err := h.service.RemoverLibro(id); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// 204: operación exitosa sin cuerpo
		w.WriteHeader(http.StatusNoContent)

	// -----------------------------
	// MÉTODO NO SOPORTADO
	// -----------------------------
	default:
		http.Error(w, "Método no disponible", http.StatusMethodNotAllowed)
	}
}
