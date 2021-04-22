import React, { useState, useCallback, useRef } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const GET_BOOKS = gql`
  query {
    books {
      id
      title
      author
      price
      createdAt
    }
  }
`;

const ADD_BOOKS = gql`
  mutation AddBook($title: String!, $author: String!, $price: Int!) {
    addBook(newBook: { title: $title, author: $author, price: $price }) {
      id
    }
  }
`;

const REMOVE_BOOKS = gql`
  mutation RemoveBook($id: Int!) {
    removeBook(id: $id)
  }
`;

export default function BookList() {
  const inputTitleRef = useRef();
  const inputAuthorRef = useRef();
  const inputPriceRef = useRef();
  const buttonAddRef = useRef();

  const [addBookTitle, setAddBookTitle] = useState(null);
  const [addBookAuthor, setAddBookAuthor] = useState(null);
  const [addBookPrice, setAddBookPrice] = useState(null);

  const inputTitle = useCallback(
    (event) => {
      setAddBookTitle(event.target.value);
    },
    [setAddBookTitle]
  );

  const inputAuthor = useCallback(
    (event) => {
      setAddBookAuthor(event.target.value);
    },
    [setAddBookAuthor]
  );

  const inputPrice = useCallback(
    (event) => {
      setAddBookPrice(event.target.value);
    },
    [setAddBookPrice]
  );

  const { loading, error, data } = useQuery(GET_BOOKS);

  const [addBook] = useMutation(ADD_BOOKS, {
    refetchQueries: [{ query: GET_BOOKS }],
  });
  const [removeBook] = useMutation(REMOVE_BOOKS, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const addBookDetails = useCallback(() => {
    addBook({
      variables: {
        title: `${inputTitleRef.current.value}`,
        author: `${inputAuthorRef.current.value}`,
        price: parseInt(`${inputPriceRef.current.value}`),
      },
    });
  }, [inputTitleRef, inputAuthorRef, inputPriceRef]);

  const removeBookDetails = (id) => {
    removeBook({
      variables: { id: parseInt(id) },
    });
  };

  const valid = () => {
    if (!addBookTitle || !addBookAuthor || !addBookPrice) {
      return true;
    } else if (isNaN(addBookPrice)) {
      return true;
    } else {
      return false;
    }
  };

  const clear = () => {
    inputTitleRef.current.value = null;
    inputAuthorRef.current.value = null;
    inputPriceRef.current.value = null;
    setAddBookTitle(null);
    setAddBookAuthor(null);
    setAddBookPrice(null);
    buttonAddRef.current.disabled = true;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className={styles.container}>
      <Head>
        <title>Nextjs・Nestjs・GraphQL・Docker・AWS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <div>
          <h1 className={styles.center}>Test Case</h1>
          <p>
            Nextjs(apollo client)・Nestjs(GraphQL、typeORM、MySQL)・Docker・AWS
          </p>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.left}>
          <h2>Add Book</h2>
          <p>
            <b>Title</b>
          </p>
          <p>(MAX:30 characters)</p>
          <input
            ref={inputTitleRef}
            maxLength="30"
            type="text"
            onChange={inputTitle}
          />
          <p>
            <b>Memo</b>
          </p>
          <input ref={inputAuthorRef} type="text" onChange={inputAuthor} />
          <p>
            <b>Price</b>
          </p>
          <p>(MAX:999999)</p>
          <input
            ref={inputPriceRef}
            type="text"
            maxLength="6"
            onChange={inputPrice}
          />
          <br />
          <br />
          <button
            ref={buttonAddRef}
            disabled={valid()}
            onClick={() => addBookDetails()}
          >
            Add
          </button>{" "}
          <button onClick={() => clear()}>clear</button>
        </div>
        <div className={styles.right}>
          <h2 className={styles.center}>Book List</h2>
          <div className={styles.list}>
            {data.books.map((book) => (
              <div className={styles.listCard} key={book.id}>
                <h3>Title：{book.title}</h3>
                <p>Memo：{book.author}</p>
                <p>Price：{book.price.toLocaleString()}</p>
                <p>
                  CreateDay：
                  {book.createdAt.substring(0, book.createdAt.indexOf("T"))}
                </p>
                <div className={styles.center}>
                  <button onClick={() => removeBookDetails(book.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className={styles.footer}>© 2021 Hiroaki Nagata</footer>
    </div>
  );
}
