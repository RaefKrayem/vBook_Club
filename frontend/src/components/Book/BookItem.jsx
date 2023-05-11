import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveBook, unsaveBook, getBooks } from "../../features/books/bookSlice";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Comments from "../Comments/Comments";
import { LazyLoadImage } from "react-lazy-load-image-component";

function BookItem() {
  const location = useLocation();
  console.log(location.state.book);
  const book = location.state.book;
  const bookInfo = book.volumeInfo;
  return (
    <>
      <Container>
        <Row>
          <Col xs={12} md={4}>
            <LazyLoadImage
              height={400}
              width={400}
              threshold={0.95}
              src={bookInfo.imageLinks && bookInfo.imageLinks.thumbnail}
              alt="book cover"
              // style={{ height: "400px", objectFit: "contain" }}
            />
          </Col>
          <Col xs={12} md={8}>
            <Row>
              <Col>
                <h2>{bookInfo.title}</h2>
                <h4>by {bookInfo.authors}</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>{bookInfo.description}</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col>
            <h3>Comments</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Comments book_selfLink={book.selfLink} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default BookItem;
