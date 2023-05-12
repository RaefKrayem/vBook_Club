import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import loginImage from "../assets/login.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
    <Row
      className="justify-content-center align-items-center"
      style={{
        backgroundColor: "#8e2b32",
        color: "#dcdcdc",
        fontSize: "1.1rem",
        minHeight: "100vh",
      }}
      id="loginRow"
    >
      <Col lg={6} style={{ height: "100vh" }}>
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
          <section className="heading text-center">
            <h1 style={{ color: "#d0ab7f", fontSize: "3rem" }}>
              <FaSignInAlt /> Login
            </h1>
          </section>
          <section className="form">
            <Form
              onSubmit={onSubmit}
              style={{ color: "#d0ab7f", fontSize: "1.2rem" }}
            >
              <Form.Group controlId="email">
                <Form.Label className="text-left">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                  style={{ fontSize: "1.2rem", marginBottom: "18px" }}
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
                  style={{ fontSize: "1.2rem" }}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="submit-button"
                style={{
                  margin: "15px 0px",
                  backgroundColor: "#d0ab7f",
                  color: "#8e2b32",
                  border: "none",
                  fontSize: "1.2rem",
                }}
              >
                Login
              </Button>
            </Form>
            <p
              className="create-account"
              style={{ color: "#d0ab7f", fontSize: "1.2rem" }}
            >
              Don't have an account?{" "}
              <a
                href="/register"
                style={{ color: "#d0ab7f", fontSize: "1.2rem" }}
              >
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
