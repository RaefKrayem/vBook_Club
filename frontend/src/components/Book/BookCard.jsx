import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { saveBook, unsaveBook, getBooks } from "../../features/books/bookSlice";
import { Link } from "react-router-dom";

function BookCard({ book, isSaved }) {
  const { title, authors, description, imageLinks, categories, publishedDate } =
    book.volumeInfo;
  const dispatch = useDispatch();

  const handleSaveBook = () => {
    const bookData = {
      book_selfLink: book.selfLink,
      book_title: title,
      book_authors: authors,
      book_description: description,
      book_image: imageLinks ? imageLinks.thumbnail : null,
    };
    dispatch(saveBook(bookData));
    dispatch(getBooks());
  };

  const handleUnsaveBook = () => {
    dispatch(unsaveBook(book.selfLink));
    dispatch(getBooks());
  };

  return (
    <Card
      style={{
        maxWidth: "100%",
        borderRadius: "20px",
        overflow: "hidden",
        height: "500px",
      }}
    >
      <div
        style={{
          height: "60%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F5F5F5",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            backgroundImage: `url(${imageLinks && imageLinks.thumbnail})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
          }}
        />
      </div>
      <Card.Body style={{ padding: "20px" }}>
        <Card.Title style={{ marginBottom: "10px" }}>
          {title.length > 20 ? title.substring(0, 20) + "..." : title}
        </Card.Title>
        <Card.Text>
          {authors ? authors.join(", ") : "No authors available"}
          <br />
          {publishedDate
            ? publishedDate.substring(0, 4)
            : "No published date available"}
          <br />
          {categories ? categories.join(", ") : "No categories available"}
        </Card.Text>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {isSaved ? (
            <Button variant="outline-secondary" onClick={handleUnsaveBook}>
              Unsave
            </Button>
          ) : (
            <Button variant="success" onClick={handleSaveBook}>
              Save
            </Button>
          )}
          <Link
            to={`/book/${book.id}`}
            state={{ book: book }}
            key={book.id}
            style={{ textDecoration: "none" }}
          >
            <Button variant="primary">View</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default BookCard;
