import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaUserFriends,
} from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { RiMessage3Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { GiBookCover } from "react-icons/gi";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/js/bootstrap";

import "../styles/Header.css";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    // <Navbar
    //   bg="#A8763E"
    //   expand="md"
    //   style={{
    //     backgroundColor: "#1d1e20",
    //     color: "#eeeff0",
    //     borderColor: "#37383c",
    //     borderBottom: "5px solid #505258",
    //     maxWidth: "1424px",
    //     position: "sticky",
    //   }}
    //   // text color
    //   variant="#F7F3E3"
    // >
    //   <Container>
    //     <Navbar.Brand>
    //       <span
    //         to="/"
    //         style={{
    //           color: "#eeeff0",
    //           textDecoration: "none",
    //         }}
    //       >
    //         vBookClub
    //       </span>
    //     </Navbar.Brand>
    //     <Navbar.Toggle aria-controls="navbar-nav" />
    //     <Navbar.Collapse id="navbar-nav">
    //       <Nav classNameName="mx-auto">
    //         {user ? (
    //           <>
    //             <Nav.Link>
    //               <Link
    //                 to="/challenges"
    //                 style={{
    //                   color: "#eeeff0",
    //                   textDecoration: "none",
    //                 }}
    //               >
    //                 Challenges
    //               </Link>
    //             </Nav.Link>
    //             <Nav.Link>
    //               <Link
    //                 to="/mybooks"
    //                 style={{
    //                   color: "#eeeff0",
    //                   textDecoration: "none",
    //                 }}
    //               >
    //                 <GiBookCover /> {"    "}
    //                 My Books
    //               </Link>
    //             </Nav.Link>
    //             <Nav.Link>
    //               <Link
    //                 to="/books"
    //                 style={{
    //                   color: "#eeeff0",
    //                   textDecoration: "none",
    //                 }}
    //               >
    //                 <GiBookCover /> {"    "}
    //                 Books
    //               </Link>
    //             </Nav.Link>
    //             <Nav.Link>
    //               <Link
    //                 to="/clubs"
    //                 style={{
    //                   color: "#eeeff0",
    //                   textDecoration: "none",
    //                 }}
    //               >
    //                 <MdGroups /> {"    "}
    //                 Clubs
    //               </Link>
    //             </Nav.Link>
    //             <Nav.Link>
    //               <Link
    //                 to="/myclubs"
    //                 style={{
    //                   color: "#eeeff0",
    //                   textDecoration: "none",
    //                 }}
    //               >
    //                 <MdGroups /> {"    "}
    //                 My Clubs
    //               </Link>
    //             </Nav.Link>
    //             <Nav.Link>
    //               <Link
    //                 to="/friends"
    //                 style={{
    //                   color: "#eeeff0",
    //                   textDecoration: "none",
    //                 }}
    //               >
    //                 <FaUserFriends /> {"    "}
    //                 Friends
    //               </Link>
    //             </Nav.Link>
    //             <Nav.Link>
    //               <Link
    //                 to="/users"
    //                 style={{
    //                   color: "#eeeff0",
    //                   textDecoration: "none",
    //                 }}
    //               >
    //                 <FaUserFriends /> {"    "}
    //                 Users
    //               </Link>
    //             </Nav.Link>
    //             <Nav.Link>
    //               <Link
    //                 to="/inbox"
    //                 style={{
    //                   color: "#eeeff0",
    //                   textDecoration: "none",
    //                 }}
    //               >
    //                 <RiMessage3Fill /> {"    "}
    //                 Inbox
    //               </Link>
    //             </Nav.Link>
    //           </>
    //         ) : (
    //           <></>
    //         )}
    //       </Nav>
    //       {user && (
    //         <Nav>
    //           <Nav.Link>
    //             <button
    //               className="btn header-link"
    //               onClick={onLogout}
    //               style={{
    //                 color: "#eeeff0",
    //               }}
    //             >
    //               <FaSignOutAlt /> {"    "} Logout
    //             </button>
    //           </Nav.Link>
    //         </Nav>
    //       )}
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>

    <header id="header" className=" header sticky-top header-scrolled">
      <nav className="navbar mr-lg-4 ml-lg-4 navbar-expand-xl navbar-light py-2 px-lg-5">
        <div className="container-fluid">
          <a className="navbar-brand title" id="nav_brand" to="#">
            vBook Club
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto d-flex justify-content-between">
              {user.isAdmin === 1 ? (
                <li className="nav-item px-3">
                  <Link className="nav-link" to="/clubs">
                    Clubs
                  </Link>
                </li>
              ) : (
                <>
                  <li className="nav-item px-3">
                    <Link className="nav-link" to="/challenges">
                      Challenges
                    </Link>
                  </li>
                  <li className="nav-item px-3">
                    <Link className="nav-link" to="/mybooks">
                      My Books
                    </Link>
                  </li>
                  <li className="nav-item px-3">
                    <Link className="nav-link" to="/books">
                      Books
                    </Link>
                  </li>
                  <li className="nav-item px-3">
                    <Link className="nav-link" to="/clubs">
                      Clubs
                    </Link>
                  </li>
                  <li className="nav-item px-3">
                    <Link className="nav-link" to="/myclubs">
                      My Clubs
                    </Link>
                  </li>
                  <li className="nav-item px-3">
                    <Link className="nav-link" to="/friends">
                      Friends
                    </Link>
                  </li>
                  <li className="nav-item px-3">
                    <Link className="nav-link" to="/users">
                      Users
                    </Link>
                  </li>
                  <li className="nav-item px-3">
                    <Link className="nav-link" to="/inbox">
                      Inbox
                    </Link>
                  </li>
                </>
              )}

              <li className="nav-item pr-3 pl-1">
                <Link
                  className="nav-link sessionEmpty"
                  to="/"
                  onClick={onLogout}
                >
                  {user.username} <FaSignOutAlt />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
