import { useDispatch } from "react-redux";
import { getAllClubs, joinClub } from "../features/clubs/clubSlice";
import { getMyClubs, leaveClub } from "../features/myClubs/myClubSlice";
import { getMessages } from "../features/messages/messageSlice";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function ClubItem({ club, isJoined }) {
  const dispatch = useDispatch();

  return (
    <Card className="my-3">
      <Row noGutters>
        <Col xs={12} md={4}>
          <Card.Img
            variant="top"
            src="https://picsum.photos/100"
            style={{ height: "100%" }}
          />
        </Col>
        <Col xs={12} md={8}>
          <Card.Body style={{ backgroundColor: "#8e2b32", color: "#dcdcdc" }}>
            {/* let the name be bold */}
            <Card.Title>
              <strong>{club.name}</strong>
            </Card.Title>

            <Card.Text>{club.description}</Card.Text>
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
                      variant="outline-secondary"
                      onClick={() => dispatch(getMessages(club.id))}
                    >
                      Chat
                    </Button>
                  </Link>
                  <Button
                    variant="outline-danger"
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
                  variant="outline-primary"
                  onClick={() => {
                    dispatch(joinClub(club.id));
                    dispatch(getAllClubs());
                    dispatch(getMyClubs());
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
