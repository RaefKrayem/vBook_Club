import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// to check if the user exists in the local storage
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { getFriends, reset } from "../features/friends/friendSlice";
import UserItem from "../components/UserItem";
import { Container, Row, Col, Button } from "react-bootstrap";

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
      <>
        <section className="heading">
          <p>Friends List</p>
        </section>

        <section className="content">
          <Container fluid>
            <Row xs={1} sm={1} md={1} lg={1} xl={2} xxl={2} g={3}>
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
    </>
  );
}

export default Friends;
