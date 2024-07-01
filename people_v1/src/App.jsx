

import React, { useEffect, useState } from "react";
import { AddAuthor } from "./components/AddAuthor";
import { AuthorsList } from "./components/AuthorsList";
import './App.css';
const API_URL = "http://localhost:8000";

function App() {
  const [authors, setAuthors] = useState([]);

  const fetchAuthors = () => {
    fetch(`${API_URL}/authors`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched authors data:', data);
        setAuthors(data);
      });
  };

  const onDeleteAuthorClickHandler = (authorId) => {
    fetch(`${API_URL}/authors/${authorId}`, {
      method: "DELETE",
    })
      .then((res) => {
        console.log('Delete response status:', res.status);
        if (res.status === 200) {
          setAuthors((prevAuthors) =>
            prevAuthors.filter((author) => author.id !== authorId)
          );
        }
      });
  };

  const onAddAuthorSubmitHandler = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const surname = event.target.surname.value;

    fetch(`${API_URL}/authors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        surname,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Add author response data:', data);
        if (data.id) {
          // Update state with the newly added author
          setAuthors((prevAuthors) => [...prevAuthors, data]);
        }
      });
  };

  const onUpdateAuthorSubmitHandler = (authorId, newName, newSurname) => {
    fetch(`${API_URL}/authors/${authorId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
        surname: newSurname,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((updatedAuthor) => {
        setAuthors((prevAuthors) =>
          prevAuthors.map((author) =>
            author.id === updatedAuthor.id ? updatedAuthor : author
          )
        );
      })
      .catch((error) => {
        console.error('Error updating author:', error);
      });
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  return (
    <>
      <h1>Authors App</h1>
      <AddAuthor onAdd={onAddAuthorSubmitHandler} />
      <AuthorsList
        authors={authors}
        onDelete={onDeleteAuthorClickHandler}
        onUpdate={onUpdateAuthorSubmitHandler}
        onRefresh={fetchAuthors}
      />
    </>
  );
}

export default App;
