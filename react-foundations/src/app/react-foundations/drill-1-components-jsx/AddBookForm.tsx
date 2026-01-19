"use client";
import { useState } from "react";
export default function AddBookform() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("New Book ", { title, author });
        setTitle('');
        setAuthor('')
        return (
            <form onSubmit={handleSubmit}>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Book title"
                />
                <input
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author"
                />
                <button type="submit">Add</button>
            </form>
        );


    }

}
