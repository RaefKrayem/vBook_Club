import { useDispatch } from "react-redux";
import { getAllClubs, joinClub } from "../features/clubs/clubSlice";
import { getMyClubs, leaveClub } from "../features/myClubs/myClubSlice";
import { getMessages } from "../features/messages/messageSlice";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import all images from assets folder
import Fantasy from "../assets/clubs/Fantasy.jpg";
import Mystery from "../assets/clubs/Mystery.jpg";
import Philosophy from "../assets/clubs/Philosophy.jpg";
import Poetry from "../assets/clubs/Poetry.jpg";
import Politics from "../assets/clubs/Politics.jpg";
import RomanceNovel from "../assets/clubs/RomanceNovel.jpg";
import Science from "../assets/clubs/ScienceFiction.jpg";
import Technology from "../assets/clubs/Technology.jpg";
import Thriller from "../assets/clubs/Thriller.jpg";

function ClubItem({ club, isJoined }) {
  const imagesObject = {
    Fantasy: Fantasy,
    Mystery: Mystery,
    Philosophy: Philosophy,
    Poetry: Poetry,
    Politics: Politics,
    RomanceNovel: RomanceNovel,
    ScienceFiction: Science,
    Technology: Technology,
    Thriller: Thriller,
  };
  const dispatch = useDispatch();

  return (
    // set a border of border: "1px solid #eef1f4"
    <Card className="my-3">
      <Row noGutters id="clubItem">
        <Col xs={12} md={4}>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100%" }}
          >
            <Card.Img
              variant="top"
              // convert the string to object name
              src={imagesObject[club.name.replace(/\s/g, "")]}
              // lazy loading
              loading="lazy"
              style={{ height: "100%", width: "100%" }}
            />
          </div>
        </Col>
        <Col xs={12} md={8}>
          <Card.Body
            className="d-flex flex-column"
            style={{
              backgroundColor: "#E5E5E5",
              color: "black",
              height: "100%",
            }}
          >
            {/* let the name be bold */}
            <Card.Title className="text-center mb-3">
              <strong>{club.name}</strong>
            </Card.Title>

            {/* let the text align to start from left and fill all the line */}

            <Card.Text
              className="flex-grow-1 mb-3"
              style={{
                textAlign: "left",
                textJustify: "inter-word",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
              }}
            >
              {club.description}
            </Card.Text>
            <div className="d-flex justify-content-end align-items-center">
              {isJoined ? (
                <>
                  <Link
                    to={`/messages`}
                    state={{ id: club.id }} // <-- state prop
                    key={club.id}
                    style={{ marginRight: "10px" }}
                  >
                    <Button
                      variant="success"
                      onClick={() => dispatch(getMessages(club.id))}
                    >
                      Chat
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    onClick={() => {
                      dispatch(leaveClub(club.id));
                      dispatch(getAllClubs());
                      dispatch(getMyClubs());
                    }}
                  >
                    Leave
                  </Button>
                </>
              ) : (
                <Button
                  // variant="primary"
                  onClick={() => {
                    dispatch(joinClub(club.id));
                    dispatch(getAllClubs());
                    dispatch(getMyClubs());
                  }}
                  style={{
                    backgroundColor: "#FCA311",
                    color: "black",
                    border: "none",
                  }}
                >
                  Join
                </Button>
              )}
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default ClubItem;
