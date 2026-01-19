"use client";
import BookList from './BookList';
import UserProfile from './UserProfile';
import Counter from './Counter';

export default function Page() {
  return (
    <main>
      <UserProfile
        name="Kunal Bhurse"
        email="kunal@example.com"
        age={23}
      />
      <BookList />
      <Counter />
    </main>
  );
  
}
