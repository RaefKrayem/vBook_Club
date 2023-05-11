import { useDispatch, useSelector } from "react-redux";
import { addFriend, getUsers } from "../features/users/userSlice";
import { getFriends, removeFriend } from "../features/friends/friendSlice";
import { getFriendMessages } from "../features/messages/messageSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

function UserItem({ user, isFriend }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.messages);
  const [chatClicked, setChatClicked] = useState(false);

  const handleAddFriend = () => {
    dispatch(addFriend(user.id));
    dispatch(getUsers());
    dispatch(getFriends());
  };

  const handleRemoveFriend = () => {
    dispatch(removeFriend(user.id));
    dispatch(getUsers());
    dispatch(getFriends());
  };

  const handleChat = () => {
    dispatch(
      getFriendMessages({ friend_id: user.id, chatName: user.username })
    );
  };

  return (
    <Container
      className="user-item my-3 py-2 px-3"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <Row className="align-items-center">
        <Col xs={12} md={2} className="text-center mb-2 mb-md-0">
          <Image src="https://picsum.photos/100" roundedCircle fluid />
        </Col>
        <Col xs={12} md={6}>
          <h2 className="user-item__username mb-2">{user.username}</h2>
        </Col>
        <Col
          xs={12}
          md={4}
          className="d-flex justify-content-end align-items-center"
        >
          {isFriend ? (
            <>
              <Button
                variant="danger"
                size="sm"
                className="me-2"
                onClick={handleRemoveFriend}
              >
                Remove
              </Button>
              <Link
                to={`/messages`}
                state={{ userInfo: user }}
                key={user.id}
                className="text-decoration-none"
              >
                <Button variant="success" size="sm" onClick={handleChat}>
                  Chat
                </Button>
              </Link>
            </>
          ) : (
            <Button
              variant="primary"
              size="sm"
              className="me-2"
              onClick={handleAddFriend}
            >
              Add
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default UserItem;
