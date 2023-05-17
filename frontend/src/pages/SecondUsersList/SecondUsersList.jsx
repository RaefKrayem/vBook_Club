import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FaUserPlus, FaUserMinus, FaComment } from "react-icons/fa";
import { Container, Row, Col, Button } from "react-bootstrap";

import { getUsers, addFriend, reset } from "../../features/users/userSlice";
import { getFriends, removeFriend } from "../../features/friends/friendSlice";
import { getFriendMessages } from "../../features/messages/messageSlice";

import Spinner from "../../components/Spinner";

function SecondUsersList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { users, isLoading, isError, message } = useSelector(
    (state) => state.users
  );
  const { friends } = useSelector((state) => state.friends);

  const [limit, setLimit] = useState(12);

  const loadMore = () => {
    setLimit(limit + 12);
  };

  const handleAddFriend = (userId) => {
    dispatch(addFriend(userId));
    dispatch(getUsers());
    dispatch(getFriends());
  };

  const handleRemoveFriend = (userId) => {
    dispatch(removeFriend(userId));
    dispatch(getUsers());
    dispatch(getFriends());
  };

  const handleChat = (friendId, chatName) => {
    dispatch(getFriendMessages({ friend_id: friendId, chatName }));
  };

  useEffect(() => {
    if (isError && users.length > 0) {
      console.log(message);
    }

    if (!user) navigate("/login");

    dispatch(getUsers());
    dispatch(getFriends());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <p>Users List</p>
      </section>

      <section className="content">
        <Container fluid>
          <Row xs={1} sm={1} md={1} lg={1} xl={2} xxl={2} g={3}>
            {users
              .filter(
                (user) => !friends.find((friend) => friend.id === user.id)
              )
              .slice(0, limit)
              .map((user) => (
                <Col key={user.id}>
                  <div
                    className="user-item my-3 py-2 px-3"
                    style={{ backgroundColor: "#f8f9fa" }}
                  >
                    <Row className="align-items-center">
                      <Col xs={12} md={2} className="text-center mb-2 mb-md-0">
                        <img
                          src={user.profilePicture}
                          alt={user.username}
                          className="user-avatar"
                        />
                      </Col>
                      <Col xs={12} md={6}>
                        <h2 className="user-item__username mb-2">
                          {user.username}
                        </h2>
                      </Col>
                      <Col
                        xs={12}
                        md={4}
                        className="d-flex justify-content-end align-items-center"
                      >
                        <Button
                          variant="primary"
                          size="sm"
                          className="me-2"
                          onClick={() => handleAddFriend(user.id)}
                        >
                          <FaUserPlus />
                          Add
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Col>
              ))}

            {friends.map((friend) => (
              <Col key={friend.id}>
                <div
                  className="user-item my-3 py-2 px-3"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <Row className="align-items-center">
                    <Col xs={12} md={2} className="text-center mb-2 mb-md-0">
                      <img
                        src={friend.profilePicture}
                        alt={friend.username}
                        className="user-avatar"
                      />
                    </Col>
                    <Col xs={12} md={6}>
                      <h2 className="user-item__username mb-2">
                        {friend.username}
                      </h2>
                    </Col>
                    <Col
                      xs={12}
                      md={4}
                      className="d-flex justify-content-end align-items-center"
                    >
                      <Button
                        variant="danger"
                        size="sm"
                        className="me-2"
                        onClick={() => handleRemoveFriend(friend.id)}
                      >
                        <FaUserMinus />
                        Remove
                      </Button>
                      <Link
                        to={`/messages`}
                        state={{ userInfo: friend }}
                        className="text-decoration-none"
                      >
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => handleChat(friend.id, friend.username)}
                        >
                          <FaComment />
                          Chat
                        </Button>
                      </Link>
                    </Col>
                  </Row>
                </div>
              </Col>
            ))}

            {users.length > limit && (
              <Col xs={12} className="text-center">
                <Button variant="primary" onClick={loadMore}>
                  Load More
                </Button>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </>
  );
}

SecondUsersList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      profilePicture: PropTypes.string.isRequired,
      isFriend: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default SecondUsersList;
