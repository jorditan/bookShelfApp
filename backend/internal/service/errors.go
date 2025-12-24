package service

import "errors"

var (
	ErrNotFound          = errors.New("resource not found")
	ErrInvalidInput      = errors.New("invalid input")
	ErrTitleRequired     = errors.New("title is required")
	ErrAuthorRequired    = errors.New("author is required")
	ErrPublisherRequired = errors.New("publisher is required")
)
