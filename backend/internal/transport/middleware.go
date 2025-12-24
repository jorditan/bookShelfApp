package transport

import "net/http"

func CORSMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		// Allow requests from your frontend
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")

		// Allowed HTTP methods
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

		// Allowed headers
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		// If this is a preflight request, stop here
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		// Continue to the next handler
		next.ServeHTTP(w, r)
	})
}
