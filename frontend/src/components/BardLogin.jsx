import "../styles/Book.css";
import RomanceNovel from "../assets/clubs/RomanceNovel.jpg";

import "../styles/testClub.css";
function BardLogin() {
  return (
    <></>
    // <div className="club_cards_container">
    //   <div className="club_card_container">
    //     <img
    //       src={imagesObject[club.name.replace(/\s/g, "")]}
    //       alt=""
    //       loading="lazy"
    //     />
    //     <div className="club_card_content">
    //       <div className="club_card_text">
    //         <div className="club_card_title">
    //           <h2>{club.name}</h2>
    //         </div>
    //         {club.description}
    //       </div>

    //       <div className="club_card_btns">
    //         {isJoined ? (
    //           <>
    //             <Link
    //               to={`/messages`}
    //               state={{ id: club.id }} // <-- state prop
    //               key={club.id}
    //             >
    //               <button
    //                 className="button"
    //                 onClick={() => dispatch(getMessages(club.id))}
    //               >
    //                 Chat
    //               </button>
    //             </Link>
    //             <button
    //               className="button"
    //               onClick={() => {
    //                 dispatch(leaveClub(club.id));
    //                 dispatch(getAllClubs());
    //                 dispatch(getMyClubs());
    //               }}
    //             >
    //               Leave
    //             </button>
    //           </>
    //         ) : (
    //           <button
    //             // variant="primary"
    //             onClick={() => {
    //               dispatch(joinClub(club.id));
    //               dispatch(getAllClubs());
    //               dispatch(getMyClubs());
    //             }}
    //             className="button"
    //           >
    //             Join
    //           </button>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default BardLogin;
