import { useEffect, useState } from 'react'
import type { Book } from './types/book-interface'

function App() {

  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    fetch('http://localhost:8080/books')
      .then(response => response.json())
      .then((data: Book[]) => {
        console.log(data)
        setBooks(data)
      })
      .catch(error => console.error('Error fetching books:', error))
  }, [])

  return (
    <>
      <p className='font-bold text-2xl'>
        Book List
      </p>

      <ul>

        {books.map((book: Book) => (
          <li key={book.id_book}>
            {book.title} by {book.author}
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
