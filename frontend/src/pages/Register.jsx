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
import loginImage from "../assets/login.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";

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
    <Row
      className="justify-content-center align-items-center"
      style={{
        backgroundColor: "#8e2b32",
        color: "#dcdcdc",
        fontSize: "1.1rem",
        minHeight: "100vh",
      }}
      id="registerRow"
    >
      <Col lg={6} style={{ height: "100vh" }}>
        <LazyLoadImage
          height={"100%"}
          width={"100%"}
          threshold={0.95}
          src={loginImage}
          alt="register picture"
          fluid
        />
      </Col>
      <Col lg={6}>
        <section className="form-container">
          <section className="heading text-center">
            <h1 style={{ color: "#d0ab7f", fontSize: "3rem" }}>
              <FaUser /> Register
            </h1>
          </section>
          <section className="form">
            <Form
              onSubmit={onSubmit}
              style={{ color: "#d0ab7f", fontSize: "1.2rem" }}
            >
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
                  style={{ fontSize: "1.2rem", marginBottom: "18px" }}
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
                  minLength={4}
                  onChange={onChange}
                  required
                  style={{ fontSize: "1.2rem", marginBottom: "18px" }}
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
                Register
              </Button>
            </Form>
            <p
              className="create-account"
              style={{ color: "#d0ab7f", fontSize: "1.2rem" }}
            >
              Already have an account?{" "}
              <a href="/login" style={{ color: "#d0ab7f", fontSize: "1.2rem" }}>
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
