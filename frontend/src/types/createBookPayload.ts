export interface createBookPayload {
  id_book: number;
  title: string;
  author: string;
  publisher: string;
  rating?: number;
  review?: string;
  price?: number;
  read_date?: string | null;
}
