import { useState } from 'react';
import BookCard from './BookCard';

const booksData = [
  { title: 'Atomic Habits', author: 'James Clear', year: 2018 },
  { title: 'Deep Work', author: 'Cal Newport', year: 2016 },
  { title: 'Clean Code', author: 'Robert C. Martin', year: 2008 },
];

export default function BookList() {
  const [search, setSearch] = useState('');

  const filteredBooks = booksData.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Book List</h2>

      <input
        placeholder="Search books..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredBooks.map((book) => (
        <BookCard key={book.title} {...book} />
      ))}
    </div>
  );
}
