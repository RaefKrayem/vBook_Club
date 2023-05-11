import { useDispatch } from "react-redux";
import { getAllClubs, joinClub } from "../features/clubs/clubSlice";
import { getMyClubs, leaveClub } from "../features/myClubs/myClubSlice";
import { getMessages } from "../features/messages/messageSlice";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

function ClubItem({ club, isJoined }) {
  const dispatch = useDispatch();

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="https://picsum.photos/100" />
      <Card.Body>
        <Card.Title>{club.name}</Card.Title>
        <Card.Text>{club.description}</Card.Text>
        {isJoined ? (
          <>
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
            <Link
              to={`/messages`}
              state={{ id: club.id }} // <-- state prop
              key={club.id}
            >
              <Button
                variant="primary"
                onClick={() => dispatch(getMessages(club.id))}
              >
                Access Chat
              </Button>
            </Link>
          </>
        ) : (
          <Button
            variant="success"
            onClick={() => {
              dispatch(joinClub(club.id));
              dispatch(getAllClubs());
              dispatch(getMyClubs());
            }}
          >
            Join
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ClubItem;
