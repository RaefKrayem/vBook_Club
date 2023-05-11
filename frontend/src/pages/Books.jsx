import { useState, useEffect } from "react";
import BookCard from "../components/Book/BookCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../features/books/bookSlice";
import randomwords from "random-words";
import Form from "react-bootstrap/Form";
import "../styles/general.css";

// import bootstrap css
// import "bootstrap/dist/css/bootstrap.min.css";

function Books() {
  const [fetchedBooks, setFetchedBooks] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  // const [query, setQuery] = useState(randomwords(1)[0]); // Set default category to Computer Science
  const [query, setQuery] = useState("computer science");
  const maxResults = 20;
  const dispatch = useDispatch();
  const { books, isLoading, isError, message } = useSelector(
    (state) => state.books
  );

  useEffect(() => {
    fetchBooks(startIndex);
    dispatch(getBooks());
  }, [isError, message, dispatch]);

  async function fetchBooks(startIndex) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${maxResults}`;
    const response = await fetch(url);
    const data = await response.json();
    setFetchedBooks((prevBooks) => [...prevBooks, ...data.items]);

    setStartIndex(startIndex);
    setTotalItems(data.totalItems);
  }

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setQuery(category);
    setFetchedBooks([]);
    setStartIndex(0);
    fetchBooks(0);
  };

  return (
    <div
      className="booksContainer"
      style={{
        backgroundColor: "#1d1e20",
      }}
    >
      <h1>Books</h1>

      <Form.Select
        aria-label="Floating label select example"
        onChange={handleCategoryChange}
      >
        <option>Select a category</option>
        <option value="Computer Science">Computer Science</option>
        <option value="Fiction">Fiction</option>
        <option value="History">History</option>
      </Form.Select>

      <Row xs={1} md={4} className="g-4">
        {fetchedBooks.map((fetched_book) => (
          <Col>
            {/* if an object of the books array contains an item that have the same selfLink with fetched_book then isSaved is true */}
            {books.some(
              (book) => book.book_selfLink === fetched_book.selfLink
            ) ? (
              <BookCard book={fetched_book} isSaved={true} />
            ) : (
              <BookCard book={fetched_book} isSaved={false} />
            )}
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Books;
