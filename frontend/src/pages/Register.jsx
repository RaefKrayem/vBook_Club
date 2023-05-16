import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { login, register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { LazyLoadImage } from "react-lazy-load-image-component";
import RegisterImage from "../assets/Register.jpg";
import "../styles/Login.css";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const { username, email, password, password2 } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = { username, email, password };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Row className="justify-content-center align-items-center" id="loginRow">
      <Col lg={6} className="image_column">
        <LazyLoadImage
          height={"100%"}
          width={"100%"}
          threshold={0.95}
          src={RegisterImage}
          alt="register picture"
          fluid
        />
      </Col>
      <Col lg={6}>
        <section className="form-container">
          <section className="heading text-center page_title">
            <h1 className="title_text">
              <FaUser /> Register
            </h1>
          </section>
          <section className="form">
            <Form onSubmit={onSubmit} className="user_form">
              <Form.Group controlId="username">
                <Form.Label className="text-left">Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  name="username"
                  value={username}
                  minLength={6}
                  onChange={onChange}
                  required
                  className="user_input"
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label className="text-left">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                  className="user_input"
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label className="text-left">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={password}
                  minLength={4}
                  onChange={onChange}
                  required
                  className="user_input"
                />
              </Form.Group>
              <Form.Group controlId="password2">
                <Form.Label className="text-left">Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  name="password2"
                  value={password2}
                  minLength={4}
                  onChange={onChange}
                  required
                  className="user_input"
                />
              </Form.Group>
              <button type="submit" className="button">
                Register
              </button>
            </Form>
            <p>
              Already have an account?{" "}
              <a href="/login" className="create_link">
                Login
              </a>
            </p>
          </section>
        </section>
      </Col>
    </Row>
  );
}

export default Register;
