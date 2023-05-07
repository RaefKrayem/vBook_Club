import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { saveBook, unsaveBook, getBooks } from "../../features/books/bookSlice";
import { Link } from "react-router-dom";

function BookCard({ book, isSaved }) {
  const { title, authors, description, imageLinks } = book.volumeInfo;
  const dispatch = useDispatch();

  const handleSaveBook = () => {
    // get the title and split it into an array and then join it with a + sign then add the id to the end
    // const bookId = title.split(" ").join("+") + "+" + book.id;
    // console.log(bookId);
    const bookData = {
      book_selfLink: book.selfLink,
      book_title: title,
      book_authors: authors,
      book_description: description,
      book_image: imageLinks ? imageLinks.thumbnail : null,
    };
    console.log(bookData);
    dispatch(saveBook(bookData));
    dispatch(getBooks());
  };

  const handleUnsaveBook = () => {
    dispatch(unsaveBook(book.selfLink));
    dispatch(getBooks());
  };

  return (
    <Card style={{ width: "17rem", backgroundColor: "red", height: "451px" }}>
      <Card.Img
        variant="top"
        src={imageLinks && imageLinks.thumbnail}
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
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description
            ? description.substring(0, 100) + "..."
            : "No description available"}
        </Card.Text>

        {/* if isSaved true show unsave button, else show save button */}
        {isSaved ? (
          <Button variant="danger" onClick={handleUnsaveBook}>
            unsave
          </Button>
        ) : (
          <Button variant="success" onClick={handleSaveBook}>
            save
          </Button>
        )}

        {/* Add a button to navigate to the book component */}
        <Link
          to={`/book/${book.id}`}
          state={{ book: book }} // <-- state prop
          key={book.id}
        >
          <Button variant="primary">View</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default BookCard;
