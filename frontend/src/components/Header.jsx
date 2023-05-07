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
    <header className="header">
      <div className="logo">
        <Link to="/">vBookClub</Link>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <Link to="/mybooks">
                <GiBookCover />
                My Books
              </Link>
            </li>
            <li>
              <Link to="/books">
                <GiBookCover />
                Books
              </Link>
            </li>
            <li>
              <Link to="/clubs">
                <MdGroups />
                Clubs
              </Link>
            </li>
            <li>
              <Link to="/myclubs">
                <MdGroups />
                My Clubs
              </Link>
            </li>
            <li>
              <Link to="/friends">
                <FaUserFriends />
                Friends
              </Link>
            </li>
            <li>
              <Link to="/users">
                <FaUserFriends />
                Users
              </Link>
            </li>
            <li>
              <Link to="/inbox">
                <RiMessage3Fill />
                Inbox
              </Link>
            </li>
            <li>
              <button className="btn" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
