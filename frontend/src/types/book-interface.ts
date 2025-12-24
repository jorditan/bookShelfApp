export interface Book {
  id_book: number;
  title: string;
  author: string;
  publisher: string;
  review?: string;
  price?: number;
  read_date?: string;
}
