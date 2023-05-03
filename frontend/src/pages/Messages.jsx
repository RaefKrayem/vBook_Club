import { useEffect, useState, useContext } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { getMessages, reset } from "../features/messages/messageSlice";
import MessageItem from "../components/Message/MessageItem.jsx";
import MessageForm from "../components/Message/MessageForm.jsx";

function Messages() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { messages, isLoading, isError, message } = useSelector(
    (state) => state.messages
  );

  useEffect(() => {
    if (isError && messages.length > 0) {
      console.log(message);
    }

    if (!user) navigate("/login");

    dispatch(getMessages(id));

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <section className="content">
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </section>

      <MessageForm chat_id={id} />
    </div>
  );
}

export default Messages;
