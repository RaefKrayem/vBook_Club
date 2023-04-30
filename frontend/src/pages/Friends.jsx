import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// to check if the user exists in the local storage
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { getFriends, reset } from "../features/friends/friendSlice";
import FriendItem from "../components/FriendItem";

function Friends() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      <section className="heading">
        <h1>Welcome {user && user.username}</h1>
        <p>Friends List</p>
      </section>

      <section className="content">
        {friends.length > 0 ? (
          <div className="goals">
            {friends.map((friend) => (
              <FriendItem key={friend.id} friend={friend} />
            ))}
          </div>
        ) : (
          <h3>Start Adding friends</h3>
        )}
      </section>

      <h1>Add new Friend</h1>

      {/* Users component to let the user add new friends */}
      {/* <Users /> */}
    </>
  );
}

export default Friends;
