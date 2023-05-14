import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import "../styles/Book.css";

function BardLogin() {
  return (
    <div className="contentContainer">
      <Card className="book_card">
        <div className="card_image_container">
          <Card.Img
            variant="top"
            src="http://books.google.com/books/content?id=gi3_wQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
            loading="lazy"
            className="card_image"
          />
        </div>
        <Card.Body className="card_body">
          <Card.Title>
            <div className="card_title_container">
              <h5 className="card_title">Productivity</h5>
              <span class="card_bookmark_icon">
                <Button variant="link" className="card_bookmark_button">
                  <FaRegBookmark id="bookmark-icon" />
                </Button>
              </span>
            </div>
          </Card.Title>
          <Card.Text className="card_text">
            <h3 className="book_title">The Procrastination Cure</h3>
            <h4 class="book_authors">By Damon Zahariades</h4>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default BardLogin;
