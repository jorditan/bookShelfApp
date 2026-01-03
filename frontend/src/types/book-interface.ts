export interface Book {
  id_book: number;
  title: string;
  author: string;
  publisher: string;
  review?: string;
  rating?: number;
  read_date?: string | null;
}
