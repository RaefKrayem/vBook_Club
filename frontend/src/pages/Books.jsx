import { useState, useEffect } from "react";
import BookCard from "../components/Book/BookCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// import bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";

function Books() {
  const [books, setBooks] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const maxResults = 20; // The maximum number of results to fetch in one request
  const query = "harry potter"; // The search query

  useEffect(() => {
    fetchBooks(startIndex);
  }, []);

  async function fetchBooks(startIndex) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${maxResults}`;
    const response = await fetch(url);
    const data = await response.json();
    setBooks((prevBooks) => [...prevBooks, ...data.items]);
    setStartIndex(startIndex);
    setTotalItems(data.totalItems);
  }

  // function handleLoadMoreClick() {
  //   fetchBooks(startIndex + maxResults);
  // }

  return (
    <div>
      <h1>Books</h1>
      <Row xs={1} md={4} className="g-4">
        {books.map((book) => (
          <Col>
            <BookCard book={book} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Books;
