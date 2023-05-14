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
    <Navbar
      bg="#A8763E"
      expand="md"
      style={{
        backgroundColor: "#1d1e20",
        color: "#eeeff0",
        borderColor: "#37383c",
        borderBottom: "5px solid #505258",
        maxWidth: "1424px",
      }}
      // text color
      variant="#F7F3E3"
    >
      <Container>
        <Navbar.Brand>
          <Link
            to="/"
            style={{
              color: "#eeeff0",
              textDecoration: "none",
            }}
          >
            vBookClub
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto">
            {user ? (
              <>
                <Nav.Link>
                  <Link
                    to="/bard"
                    style={{
                      color: "#eeeff0",
                      textDecoration: "none",
                    }}
                  >
                    Bard
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link
                    to="/mybooks"
                    style={{
                      color: "#eeeff0",
                      textDecoration: "none",
                    }}
                  >
                    <GiBookCover /> {"    "}
                    My Books
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link
                    to="/books"
                    style={{
                      color: "#eeeff0",
                      textDecoration: "none",
                    }}
                  >
                    <GiBookCover /> {"    "}
                    Books
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link
                    to="/clubs"
                    style={{
                      color: "#eeeff0",
                      textDecoration: "none",
                    }}
                  >
                    <MdGroups /> {"    "}
                    Clubs
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link
                    to="/myclubs"
                    style={{
                      color: "#eeeff0",
                      textDecoration: "none",
                    }}
                  >
                    <MdGroups /> {"    "}
                    My Clubs
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link
                    to="/friends"
                    style={{
                      color: "#eeeff0",
                      textDecoration: "none",
                    }}
                  >
                    <FaUserFriends /> {"    "}
                    Friends
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link
                    to="/users"
                    style={{
                      color: "#eeeff0",
                      textDecoration: "none",
                    }}
                  >
                    <FaUserFriends /> {"    "}
                    Users
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link
                    to="/inbox"
                    style={{
                      color: "#eeeff0",
                      textDecoration: "none",
                    }}
                  >
                    <RiMessage3Fill /> {"    "}
                    Inbox
                  </Link>
                </Nav.Link>
              </>
            ) : (
              <></>
            )}
          </Nav>
          {user && (
            <Nav>
              <Nav.Link>
                <button
                  className="btn header-link"
                  onClick={onLogout}
                  style={{
                    color: "#eeeff0",
                  }}
                >
                  <FaSignOutAlt /> {"    "} Logout
                </button>
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
