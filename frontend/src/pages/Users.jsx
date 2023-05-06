import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { getUsers, reset } from "../features/users/userSlice";
import { getFriends } from "../features/friends/friendSlice";
import UserItem from "../components/UserItem";

function Users() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { users, isLoading, isError, message } = useSelector(
    (state) => state.users
  );
  const { friends } = useSelector((state) => state.friends);

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
        <p>users List</p>
      </section>

      <section className="content">
        <div className="goals">
          {/* select only the users that are not friends */}
          {users.length > 0 ? (
            users
              .filter(
                (user) => !friends.find((friend) => friend.id === user.id)
              )
              .map((user) => (
                <UserItem key={user.id} user={user} isFriend={false} />
              ))
          ) : (
            <></>
          )}

          {/* display friends  */}
          {friends.length > 0 ? (
            friends.map((friend) => (
              <UserItem key={friend.id} user={friend} isFriend={true} />
            ))
          ) : (
            <></>
          )}
        </div>
      </section>
    </>
  );
}

export default Users;
