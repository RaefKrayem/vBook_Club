import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// to check if the user exists in the local storage
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { getAllClubs, reset } from "../features/clubs/clubSlice";
import ClubItem from "../components/ClubItem";
import { getMyClubs } from "../features/myClubs/myClubSlice";

function Clubs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { clubs, isLoading, isError, message } = useSelector(
    (state) => state.clubs
  );
  const { myClubs } = useSelector((state) => state.myClubs);

  useEffect(() => {
    if (isError && clubs.length > 0) {
      console.log(message);
    }

    if (!user) navigate("/login");

    dispatch(getAllClubs());
    dispatch(getMyClubs());

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
        <p>Clubs List</p>
      </section>

      {/* if the club id is in the myClubs array return the club item with isJoined={true} */}
      {/* if the club id is not in the myClubs array return the club item with isJoined={false} */}

      <section className="content">
        <div className="goals">
          {clubs.length > 0 ? (
            <>
              {clubs
                .filter(
                  (club) =>
                    !myClubs.find((joinedClub) => joinedClub.id === club.id)
                )
                .map((club) => (
                  <ClubItem key={club.id} club={club} isJoined={false} />
                ))}
            </>
          ) : (
            <></>
          )}
          {myClubs.length > 0 ? (
            <>
              {myClubs.map((club) => (
                <ClubItem key={club.id} club={club} isJoined={true} />
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
      </section>
    </>
  );
}

export default Clubs;
