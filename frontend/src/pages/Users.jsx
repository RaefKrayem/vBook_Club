import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { getUsers, reset } from "../features/users/userSlice";
import { getFriends } from "../features/friends/friendSlice";
import UserItem from "../components/UserItem";
import { Container, Row, Col, Button } from "react-bootstrap";

function Users() {
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
            {users.length > 0 &&
              users
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
                  <UserItem user={friend} isFriend={true} />
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

export default Users;
