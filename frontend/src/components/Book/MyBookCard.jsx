import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { unsaveBook, getBooks } from "../../features/books/bookSlice";
import { FaBookmark } from "react-icons/fa";
import "../../styles/Book.css";
import { Link } from "react-router-dom";

function MyBookCard({ book }) {
  const {
    id,
    book_title,
    book_authors,
    book_description,
    book_image,
    book_categories,
  } = book;
  console.log(book);
  const dispatch = useDispatch();

  const handleUnsaveBook = () => {
    dispatch(unsaveBook(book.book_selfLink));
    dispatch(getBooks());
  };

  return (
    <>
      <>
        <Card className="book_card">
          <div className="card_image_container">
            <Card.Img
              variant="top"
              src={book_image}
              loading="lazy"
              className="card_image"
            />
          </div>
          <Card.Body className="card_body">
            <Card.Title>
              <div className="card_title_container">
                <h5 className="card_title">
                  {book_categories
                    ? book_categories
                    : "No categories available"}
                </h5>
                <span class="card_bookmark_icon">
                  <Button
                    variant="link"
                    className="card_bookmark_button"
                    onClick={handleUnsaveBook}
                  >
                    <FaBookmark id="bookmark-icon" />
                  </Button>
                </span>
              </div>
            </Card.Title>
            <Card.Text className="card_text">
              <h3 className="book_title">
                {book_title.length > 20
                  ? book_title.substring(0, 20) + "..."
                  : book_title}
              </h3>
              <h4 class="book_authors">
                By {book_authors ? book_authors : "No authors available"}
              </h4>
            </Card.Text>
          </Card.Body>
        </Card>
      </>
      {/* <Card style={{ width: "17rem", backgroundColor: "red", height: "451px" }}>
      <Card.Img
        variant="top"
        src={book_image}
        style={{
          height: 200,
          padding: 2,
          paddingTop: 5,
          width: "100%",
          objectPosition: "center",
          objectFit: "contain",
        }}
      />
      <Card.Body>
        <Card.Title>{book_title}</Card.Title>
        <Card.Text>
          {book_description
            ? book_description.substring(0, 100) + "..."
            : "No description available"}
        </Card.Text>

        <Button variant="danger" onClick={handleUnsaveBook}>
          unsave
        </Button>
      </Card.Body>
    </Card> */}
    </>
  );
}

export default MyBookCard;
