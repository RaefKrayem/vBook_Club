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
    <Navbar bg="light" expand="md">
      <Container>
        <Navbar.Brand>
          <Link to="/">vBookClub</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto">
            {user ? (
              <>
                <Nav.Link>
                  <Link to="/bard">Bard</Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/mybooks">
                    <GiBookCover />
                    My Books
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/books">
                    <GiBookCover />
                    Books
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/clubs">
                    <MdGroups />
                    Clubs
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/myclubs">
                    <MdGroups />
                    My Clubs
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/friends">
                    <FaUserFriends />
                    Friends
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/users">
                    <FaUserFriends />
                    Users
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/inbox">
                    <RiMessage3Fill />
                    Inbox
                  </Link>
                </Nav.Link>
              </>
            ) : (
              <>
                {/* <Nav.Link>
                  <Link to="/login">
                    <FaSignInAlt /> Login
                  </Link>
                </Nav.Link>
                <Nav.Link>
                  <Link to="/register">
                    <FaUser /> Register
                  </Link>
                </Nav.Link> */}
              </>
            )}
          </Nav>
          {user && (
            <Nav>
              <Nav.Link>
                <button className="btn" onClick={onLogout}>
                  <FaSignOutAlt /> Logout
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
