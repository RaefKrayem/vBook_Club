import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { saveBook, unsaveBook, getBooks } from "../../features/books/bookSlice";
import { Link } from "react-router-dom";

function BookCard({ book, isSaved }) {
  const { title, authors, description, imageLinks, categories, publishedDate } =
    book.volumeInfo;
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
    <Card
      style={{
        width: "17rem",
        backgroundColor: "#1d1e20",
        height: "470px",
        border: "1px solid white",
        borderRadius: "20px",
      }}
    >
      <Card.Img
        variant="top"
        src={imageLinks && imageLinks.thumbnail}
        style={{
          height: 200,
          width: "100%",
          padding: 2,
          paddingTop: 10,
          width: "100%",
          objectPosition: "center",
          objectFit: "contain",
          backgroundColor: "#2f2a29",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
        }}
      />
      <Card.Body
        style={{
          borderBottomLeftRadius: "20px",
          borderBottomRightRadius: "20px",
        }}
      >
        <Card.Title>
          {title.length > 20 ? title.substring(0, 20) + "..." : title}
        </Card.Title>
        <Card.Text>
          {/* {description
            ? description.substring(0, 50) + "..."
            : "No description available"} */}
          <h4>
            {categories ? categories.join(", ") : "No categories available"}
          </h4>
          {authors ? authors.join(", ") : "No authors available"}
          <br />
          {publishedDate ? publishedDate : "No published date available"}
        </Card.Text>

        {/* if isSaved true show unsave button, else show save button */}
        {isSaved ? (
          <Button
            variant="danger"
            onClick={handleUnsaveBook}
            style={{ marginRight: 10 }}
          >
            unsave
          </Button>
        ) : (
          <Button
            variant="success"
            onClick={handleSaveBook}
            style={{ marginRight: 10 }}
          >
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
