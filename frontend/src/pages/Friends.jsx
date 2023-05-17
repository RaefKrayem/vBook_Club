import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { getFriends, reset } from "../features/friends/friendSlice";
import UserItem from "../components/UserItem";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../styles/User.css";

function Friends() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [limit, setLimit] = useState(12);

  const loadMore = () => {
    setLimit(limit + 12);
  };

  const { user } = useSelector((state) => state.auth);
  const { friends, isLoading, isError, message } = useSelector(
    (state) => state.friends
  );

  useEffect(() => {
    if (isError && friends.length > 0) {
      console.log(message);
    }

    if (!user) navigate("/login");

    // get all friends and put it in friends variable above to be used in the return
    dispatch(getFriends());

    // when the component unmounts, reset the friends state by returning a function from useEffect
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section
        className="content"
        style={{
          backgroundColor: "#1d1e20",
          paddingTop: 20,
        }}
      >
        <h2
          style={{
            fontWeight: 500,
            fontSize: 32,
            lineHeight: "40px",
            color: "#fff",
            marginBottom: 20,
            // paddingLeft: 20,
            textAlign: "center",
          }}
        >
          Friends
        </h2>

        <Container
          fluid
          className="users-container"
          style={{
            margin: "0 auto",
            maxWidth: "85%",
            padding: "0 1rem",
            width: "100%",
          }}
        >
          <Row xs={1} sm={1} md={2} lg={3} xl={3} xxl={5} g={6}>
            {friends.length > 0 &&
              friends
                .filter(
                  (user) => !friends.find((friend) => friend.id === user.id)
                )
                .slice(0, limit)
                .map((user) => (
                  <Col key={user.id}>
                    <UserItem user={user} isFriend={false} />
                  </Col>
                ))}

            {friends.length > 0 &&
              friends.map((friend) => (
                <Col key={friend.id}>
                  <UserItem key={friend.id} user={friend} isFriend={true} />
                </Col>
              ))}

            {friends.length > limit && (
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

export default Friends;
