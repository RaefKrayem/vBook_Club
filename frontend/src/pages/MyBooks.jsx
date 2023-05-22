import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../features/books/bookSlice";
import Form from "react-bootstrap/Form";
import { FaSearch } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import MyBookCard from "../components/Book/MyBookCard";
import "../styles/Book.css";
import BookCard from "../components/Book/BookCard";

function MyBooks() {
  const dispatch = useDispatch();
  const { books, isLoading, isError, message } = useSelector(
    (state) => state.books
  );

  const [fetchedBooks, setFetchedBooks] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [query, setQuery] = useState("");
  const maxResults = 20;

  useEffect(() => {
    dispatch(getBooks());
  }, [isError, message, dispatch]);

  const handleSearchSubmit = (e) => {
    setQuery(query);
    setFetchedBooks([]);
    setStartIndex(0);
    dispatch(getBooks());
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setQuery(searchValue);
  };

  return (
    <>
      <div className="contentContainer">
        <h2
          style={{
            fontWeight: 500,
            fontSize: 32,
            lineHeight: "40px",
            color: "#fff",
            marginBottom: 20,
            // paddingLeft: 20,
            textAlign: "center",
          }}
        >
          My Books
        </h2>

        {/* Add a search bar */}
        <div className="searchBox">
          <div
            className="mb-3"
            controlId="formBasicEmail"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: 1224,
              paddingLeft: 200,
              paddingRight: 200,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Form.Control
              type="text"
              placeholder="Enter a book title"
              value={query}
              style={{
                backgroundColor: "#37383c",
                borderColor: "#878a94",
                color: "#fff",
                ":focus": {
                  borderColor: "#878a94",
                },
                width: "40rem",
              }}
              onChange={handleSearchChange}
            />
            {query ? (
              <Button
                type="button"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  borderColor: "#878a94",
                  color: "#fff",
                }}
                onClick={handleSearchSubmit}
              >
                <FaSearch
                  style={{
                    color: "#fff",
                    fontSize: 20,
                  }}
                />
              </Button>
            ) : (
              <Button
                type="button"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  borderColor: "#878a94",
                  color: "#fff",
                }}
              >
                <FaSearch
                  style={{
                    color: "#fff",
                    fontSize: 20,
                  }}
                />
              </Button>
            )}
          </div>
        </div>

        <Row xs={1} md={4} className="g-4">
          {query && books.length > 0
            ? books
                .filter((book) =>
                  book.book_title.toLowerCase().includes(query.toLowerCase())
                )
                .map((book) => (
                  <Col>
                    <MyBookCard book={book} key={book.id} />
                  </Col>
                ))
            : books.map((book) => (
                <Col>
                  <MyBookCard book={book} key={book.id} />
                </Col>
              ))}
        </Row>
      </div>
    </>
  );
}

export default MyBooks;
