package model

/*Se usan tags para pasar a JSON y especificar como se va a llamar. También se puede hacer con XML*/

type Book struct {
	ID        int      `json:"id_book"`
	Title     string   `json:"title"`
	Author    string   `json:"author"`
	Publisher string   `json:"publisher"`
	Review    *string  `json:"review"`
	Rating    *float64 `json:"rating"`
	ReadDate  *string  `json:"read_date"`
}
