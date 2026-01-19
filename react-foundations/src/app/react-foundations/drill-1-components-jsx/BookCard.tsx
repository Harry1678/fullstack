
import { useState } from 'react';
interface BookCardProps{
  title:string,
  author:string,
  year:number
}

export default function BookCard({title,author,year}:BookCardProps) {
  const [isAvailable,setIsAvailable]=useState(true);
  return (
    <div className="book-card">
      <h3>{title}</h3>
      <p>by {author} 
        ({year})
      </p>
       <p>Status: {isAvailable ? 'Available' : 'Not Available'}</p>

      <button onClick={() => setIsAvailable(!isAvailable)}>
        Toggle Availability
      </button>
    </div>
  );
}
