import { useState, useEffect } from "react";
import BookCard from "../components/Book/BookCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../features/books/bookSlice";
import randomwords from "random-words";
import Form from "react-bootstrap/Form";
import { FaSearch } from "react-icons/fa";
import Button from "react-bootstrap/Button";

function Books() {
  const [fetchedBooks, setFetchedBooks] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  // const [query, setQuery] = useState(randomwords(1)[0]); // Set default category to Computer Science
  const [query, setQuery] = useState("The Phoenix Project");
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

  const handleSearchSubmit = (e) => {
    setQuery(query);
    setFetchedBooks([]);
    setStartIndex(0);
    fetchBooks(0);
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
          Books
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

        <Row xs={1} md={2} lg={4} className="g-4">
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
    </>
  );
}

export default Books;
