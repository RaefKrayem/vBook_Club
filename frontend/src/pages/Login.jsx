import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import loginImage from "../assets/login.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "../styles/Login.css";
import "../styles/testClub.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // destructuring the auth state from the store
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

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
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
          src={loginImage}
          alt="login picture"
          fluid
        />
      </Col>
      <Col lg={6}>
        <section className="form-container">
          <section className="heading text-center page_title">
            <h1 className="title_text">
              <FaSignInAlt /> Login
            </h1>
          </section>
          <section className="form">
            <Form onSubmit={onSubmit} className="user_form">
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
                  onChange={onChange}
                  required
                  className="user_input"
                />
              </Form.Group>
              <button type="submit" className="button">
                Login
              </button>
            </Form>
            <p>
              Don't have an account?{" "}
              <a href="/register" className="create_link">
                Create one
              </a>
            </p>
          </section>
        </section>
      </Col>
    </Row>
  );
}

export default Login;
