import { useState, useEffect } from "react";
import BookCard from "../components/Book/BookCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../features/books/bookSlice";

// import bootstrap css
// import "bootstrap/dist/css/bootstrap.min.css";

function Books() {
  const [fetchedBooks, setFetchedBooks] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const maxResults = 20; // The maximum number of results to fetch in one request
  const query = "harry potter"; // The search query
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

  // function handleLoadMoreClick() {
  //   fetchBooks(startIndex + maxResults);
  // }

  return (
    <div>
      <h1>Books</h1>
      {/* <Row xs={1} md={4} className="g-4">
        {books.map((book) => (
          <Col>
            <BookCard book={book} />
          </Col>
        ))}
      </Row> */}

      {/* check if the saved_books array of saved books objects 
      contains a book with the same selfLink as the book being mapped over */}
      {/* if it does return the book with isSaved={true} */}
      {/* if it does not return the book with isSaved={false} */}
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
