import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveBook, unsaveBook, getBooks } from "../../features/books/bookSlice";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Comments from "../Comments/Comments";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useState } from "react";
import "../../styles/BookPage.css";

function BookItem() {
  const location = useLocation();
  console.log(location.state.book);
  const book = location.state.book;
  const bookInfo = book.volumeInfo;

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <>
      <Container className="book_box">
        <Container
          style={{
            marginBottom: "1rem",
          }}
        >
          <Row>
            <Col xs={12} md={4}>
              <div className="image_container">
                <LazyLoadImage
                  height={"100%"}
                  width={"100%"}
                  threshold={0.95}
                  src={bookInfo.imageLinks && bookInfo.imageLinks.thumbnail}
                  alt="book cover"
                  className="book_image"
                  // style={{ height: "400px", objectFit: "contain" }}
                />
              </div>
            </Col>
            <Col
              xs={12}
              md={8}
              style={{
                paddingTop: "1rem",
              }}
            >
              <Row>
                <Col>
                  {/* get the book categories array and join the array */}

                  <h3
                    style={{
                      color: "#878a94",
                    }}
                  >
                    {bookInfo.categories &&
                      bookInfo.categories.join(", ").toUpperCase()}
                  </h3>
                  <h2>{bookInfo.title}</h2>
                  <h4>by {bookInfo.authors}</h4>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>
                    {showFullDescription
                      ? bookInfo.description
                      : bookInfo.description.slice(0, 1200) + "..."}
                  </p>
                  <button onClick={toggleDescription} className="button">
                    {showFullDescription ? "Show Less" : "Show More"}
                  </button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>

        <Container>
          <Row>
            <Col>
              <Comments book_selfLink={book.selfLink} />
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default BookItem;
