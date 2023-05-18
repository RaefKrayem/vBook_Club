import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Friends from "./pages/Friends";
import Clubs from "./pages/Clubs";
import MyClubs from "./pages/MyClubs";
import Inbox from "./pages/Inbox";
import Messages from "./pages/Messages";
import Users from "./pages/Users";
import Books from "./pages/Books";
import MyBooks from "./pages/MyBooks";
import BookItem from "./components/Book/BookItem";
import BardLogin from "./components/BardLogin";
import { useSelector } from "react-redux";

function App() {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  return (
    <>
      <Router>
        {user && <Header />}
        <Routes>
          <Route path="/challenges" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/myclubs" element={<MyClubs />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/users" element={<Users />} />
          <Route path="/books" element={<Books />} />
          <Route path="/mybooks" element={<MyBooks />} />
          <Route path="/book/:id" element={<BookItem />} />
          <Route path="/bard" element={<BardLogin />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
