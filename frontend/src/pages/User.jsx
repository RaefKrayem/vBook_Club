import { useDispatch, useSelector } from "react-redux";
import { addFriend, getUsers } from "../features/users/userSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMessages } from "../features/messages/messageSlice";

function User() {
  const location = useLocation();
  console.log(location.state.user);
  console.log(location.state.isFriend);
  const user = location.state.user;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { messages } = useSelector((state) => state.messages);

  return (
    <section className="heading">
      {user.username}
      <button className="primary">Chat</button>
    </section>
  );
}

export default User;
