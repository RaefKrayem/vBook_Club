import { useEffect } from "react";
import BookCard from "../components/Book/BookCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../features/books/bookSlice";

// import bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
import MyBookCard from "../components/Book/MyBookCard";

function MyBooks() {
  const dispatch = useDispatch();
  const { books, isLoading, isError, message } = useSelector(
    (state) => state.books
  );

  useEffect(() => {
    dispatch(getBooks());
  }, [isError, message, dispatch]);

  // function handleLoadMoreClick() {
  //   fetchBooks(startIndex + maxResults);
  // }

  return (
    <div>
      <h1>My Books</h1>

      <Row xs={1} md={4} className="g-4">
        {books.map((book) => (
          <Col>
            <MyBookCard book={book} key={book.selfLink} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default MyBooks;
