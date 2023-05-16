import { useDispatch } from "react-redux";
import { getAllClubs, joinClub } from "../features/clubs/clubSlice";
import { getMyClubs, leaveClub } from "../features/myClubs/myClubSlice";
import { getMessages } from "../features/messages/messageSlice";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import all images from assets folder
import Fantasy from "../assets/clubs/Fantasy.jpg";
import Mystery from "../assets/clubs/Mystery.jpg";
import Philosophy from "../assets/clubs/Philosophy.jpg";
import Poetry from "../assets/clubs/Poetry.jpg";
import Politics from "../assets/clubs/Politics.jpg";
import RomanceNovel from "../assets/clubs/RomanceNovel.jpg";
import Science from "../assets/clubs/ScienceFiction.jpg";
import Technology from "../assets/clubs/Technology.jpg";
import Thriller from "../assets/clubs/Thriller.jpg";
import "../styles/testClub.css";

function ClubItem({ club, isJoined }) {
  const imagesObject = {
    Fantasy: Fantasy,
    Mystery: Mystery,
    Philosophy: Philosophy,
    Poetry: Poetry,
    Politics: Politics,
    RomanceNovel: RomanceNovel,
    ScienceFiction: Science,
    Technology: Technology,
    Thriller: Thriller,
  };
  const dispatch = useDispatch();

  return (
    // set a border of border: "1px solid #eef1f4"

    <div className="club_card_container">
      <img
        src={imagesObject[club.name.replace(/\s/g, "")]}
        alt=""
        loading="lazy"
      />
      <div className="club_card_content">
        <div className="club_card_text">
          <div className="club_card_title">
            <h2>{club.name}</h2>
          </div>
          {club.description}
        </div>

        <div className="club_card_btns">
          {isJoined ? (
            <>
              <Link
                to={`/messages`}
                state={{ id: club.id }} // <-- state prop
                key={club.id}
              >
                <button
                  className="button"
                  onClick={() => dispatch(getMessages(club.id))}
                >
                  Chat
                </button>
              </Link>
              <button
                className="button"
                onClick={() => {
                  dispatch(leaveClub(club.id));
                  dispatch(getAllClubs());
                  dispatch(getMyClubs());
                }}
              >
                Leave
              </button>
            </>
          ) : (
            <button
              // variant="primary"
              onClick={() => {
                dispatch(joinClub(club.id));
                dispatch(getAllClubs());
                dispatch(getMyClubs());
              }}
              className="button"
            >
              Join
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClubItem;
