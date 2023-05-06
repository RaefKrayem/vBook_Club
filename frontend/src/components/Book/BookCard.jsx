import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function BookCard({ book }) {
  const { title, authors, description, imageLinks } = book.volumeInfo;

  const saveBook = () => {
    // get the title and split it into an array and then join it with a + sign then add the id to the end
    // const bookId = title.split(" ").join("+") + "+" + book.id;
    // console.log(bookId);
    console.log(book.selfLink);
    // save the bookId
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
        <Button variant="success" onClick={saveBook}>
          save
        </Button>
      </Card.Body>
    </Card>
  );
}

export default BookCard;
