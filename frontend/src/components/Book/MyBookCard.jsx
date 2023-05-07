import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { unsaveBook, getBooks } from "../../features/books/bookSlice";

function MyBookCard({ book }) {
  const { book_title, book_authors, book_description, book_image } = book;
  const dispatch = useDispatch();

  const handleUnsaveBook = () => {
    dispatch(unsaveBook(book.book_selfLink));
    dispatch(getBooks());
  };

  return (
    <Card style={{ width: "17rem", backgroundColor: "red", height: "451px" }}>
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
    </Card>
  );
}

export default MyBookCard;
