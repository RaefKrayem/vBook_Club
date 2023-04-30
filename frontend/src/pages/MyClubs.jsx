import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// to check if the user exists in the local storage
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { getMyClubs, reset } from "../features/myClubs/myClubSlice";
import ClubItem from "../components/ClubItem";

function Clubs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { myClubs, isLoading, isError, message } = useSelector(
    (state) => state.myClubs
  );

  useEffect(() => {
    if (isError && myClubs.length > 0) {
      console.log(message);
    }

    if (!user) navigate("/login");

    // get all friends and put it in friends variable above to be used in the return
    dispatch(getMyClubs());

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
        <p>Your Clubs List</p>
      </section>

      <section className="content">
        {myClubs.length > 0 ? (
          <div className="goals">
            {myClubs.map((club) => (
              <ClubItem key={club.id} club={club} isJoined={true} />
            ))}
          </div>
        ) : (
          <h3>No clubs in database</h3>
        )}
      </section>
    </>
  );
}

export default Clubs;
